// ==========================================
// GAME: SPIN WHEEL — tách riêng file để lazy-load (chỉ tải khi bé thật sự bấm vào game này)
// ==========================================
// Cách chơi: bé bấm "Quay!" để quay bánh xe may mắn — bánh xe dừng ngẫu nhiên ở 1 từ tiếng Anh.
// Sau khi dừng, màn hiện ra câu hỏi trắc nghiệm "Từ này nghĩa là gì?" với vài đáp án nghĩa tiếng
// Việt (số lượng tuỳ độ khó) — bé chọn đúng nghĩa để ghi điểm. Chọn sai: đáp án đó khoá lại (màu
// đỏ), bé chọn tiếp đáp án còn lại, không bị mất lượt/qua vòng khác (giữ đúng phong cách "luyện
// tập tự do" retry-không-phạt của app).
let spwPool = [];
let spwTopicId = 'all';
let spwCurrentDifficulty = 'medium';
let spwRoundIndex = 0, spwScore = 0, spwWrongCount = 0;
let spwUsedTargets = new Set();
let spwCurrentRound = null; // { segments: [{w,vi}], targetIndex, targetWord, targetVi, options: [vi...], spun, answered }
let spwTotalRotation = 0; // tích luỹ góc quay để bánh xe luôn quay TIẾP chứ không giật về 0 mỗi vòng
let spwStartTime = 0, spwTimerInterval = null;

const SPW_DIFFICULTIES = {
    easy:   { label: 'Dễ',   rounds: 5,  segments: 6,  options: 3, color: 'emerald' },
    medium: { label: 'Vừa',  rounds: 8,  segments: 8,  options: 4, color: 'amber' },
    hard:   { label: 'Khó',  rounds: 10, segments: 10, options: 5, color: 'rose' }
};

// Bảng màu rực rỡ cho các múi bánh xe (giá trị hex thật để dùng trong conic-gradient)
const SPW_SEGMENT_COLORS = ['#fda4af', '#fcd34d', '#bef264', '#67e8f9', '#c4b5fd', '#f0abfc', '#93c5fd', '#fdba74', '#86efac', '#f9a8d4'];

async function startSpinWheelGame() {
    showLoadingOverlay("Đang dựng vòng quay may mắn...");
    try {
        await fetchAllQuestionsFlat();
        hideLoadingOverlay();
    } catch (e) {
        hideLoadingOverlay();
        alert('Không tải được từ vựng cho Spin Wheel: ' + e.message);
        return;
    }
    spwRenderTopicScreen();
}

/** Lấy nguồn từ vựng thật của chương trình (kho tra nghĩa xây từ Flashcards Library, mục 2
 * Vocabulary) — giới hạn độ dài vừa phải để nhãn trên múi bánh xe không bị quá dài, vỡ layout. */
function getSpinWheelVocabPool(topicId = spwTopicId) {
    return getMiniGameVocabPool({ topicId, maxLength: 12 })
        .map(item => ({ w: item.word.toUpperCase(), vi: item.vietnamese }));
}

function spwRenderTopicScreen() {
    clearInterval(spwTimerInterval);
    headerLevel3ClickHandler = null;
    document.getElementById('game-play-container').innerHTML = renderMiniGameTopicMenu({
        gameKey: 'spin-wheel',
        onChoose: 'spwChooseTopic',
        subtitle: 'Chọn 1 trong 6 Nhóm từ vựng để quay vòng may mắn nhé!',
        countFilter: item => item.word && item.vietnamese && item.word.length <= 12
    });
}

function spwChooseTopic(topicId) {
    spwTopicId = topicId;
    renderSpinWheelDifficultyScreen();
}

function renderSpinWheelDifficultyScreen() {
    clearInterval(spwTimerInterval);
    headerLevel3ClickHandler = null;
    const level3El = document.getElementById('header-level3-btn');
    if (level3El) { level3El.classList.remove('cursor-pointer', 'hover:bg-purple-100'); level3El.classList.add('cursor-default'); }
    const container = document.getElementById('game-play-container');
    container.innerHTML = `
        <div class="pastel-card bg-white p-5 flex flex-col items-center text-center">
            <div class="text-5xl mb-2">🎡</div>
            <h3 class="font-extrabold text-fuchsia-700 text-lg mb-1">Spin Wheel</h3>
            <p class="text-sm text-gray-500 font-bold mb-3">Chọn độ khó để bắt đầu nhé!</p>
            <div class="grid grid-cols-3 gap-2.5 w-full max-w-sm mb-3">
                ${Object.entries(SPW_DIFFICULTIES).map(([key, d]) => `
                    <button onclick="spwStartWithDifficulty('${key}')" class="pastel-btn flex flex-col items-center gap-1 p-3 rounded-2xl border-2 border-${d.color}-200 bg-${d.color}-50 hover:bg-${d.color}-100 text-${d.color}-700 shadow-sm">
                        <span class="font-black text-base">${d.label}</span>
                        <span class="text-xs font-bold opacity-80">${d.rounds} lượt quay</span>
                        <span class="text-xs font-bold opacity-70">${d.options} đáp án</span>
                    </button>
                `).join('')}
            </div>
            <button onclick="spwToggleRules()" class="text-sm font-black text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-200 pastel-btn">📖 Xem luật chơi</button>
            <div id="spw-rules-panel" class="hidden mt-3 w-full max-w-sm text-left bg-indigo-50/60 border border-indigo-200 rounded-2xl p-3.5 text-sm text-gray-600 font-bold leading-relaxed">
                <p class="mb-1.5">🎡 Con bấm nút <b>"Quay!"</b> để quay bánh xe may mắn — bánh xe sẽ tự dừng ngẫu nhiên ở 1 từ tiếng Anh.</p>
                <p class="mb-1.5">❓ Sau khi dừng, màn hiện câu hỏi: <b>"Từ này nghĩa là gì?"</b> kèm vài đáp án nghĩa tiếng Việt.</p>
                <p>👆 Con chạm đúng nghĩa để ghi điểm! Chọn nhầm cũng không sao, đáp án đó chỉ khoá lại, con chọn tiếp đáp án khác nhé.</p>
            </div>
            <button onclick="spwRenderTopicScreen()" class="mt-3 text-sm font-black text-pink-600 bg-pink-50 border border-pink-200 px-4 py-2 rounded-xl pastel-btn">← Chọn lại nhóm từ</button>
        </div>`;
}

function spwToggleRules() {
    const panel = document.getElementById('spw-rules-panel');
    if (panel) panel.classList.toggle('hidden');
}

function spwStartWithDifficulty(diffKey) {
    const diff = SPW_DIFFICULTIES[diffKey];
    spwCurrentDifficulty = diffKey;
    spwRoundIndex = 0;
    spwScore = 0;
    spwWrongCount = 0;
    spwUsedTargets = new Set();
    spwTotalRotation = 0;
    spwPool = shuffleArray(getSpinWheelVocabPool(spwTopicId));

    if (spwPool.length < diff.rounds + diff.segments) {
        document.getElementById('game-play-container').innerHTML = `<p class="text-center text-gray-500 font-bold py-8">Chưa đủ từ vựng phù hợp để chơi Spin Wheel, bé quay lại sau nhé!</p>`;
        return;
    }

    renderSpinWheelPlayShell();
    spwStartTime = Date.now();
    clearInterval(spwTimerInterval);
    spwTimerInterval = setInterval(spwUpdateTimerDisplay, 1000);
    spwNextRound();
}

function spwUpdateTimerDisplay() {
    const el = document.getElementById('spw-timer');
    if (!el) { clearInterval(spwTimerInterval); return; }
    const secs = Math.floor((Date.now() - spwStartTime) / 1000);
    const mm = String(Math.floor(secs / 60)).padStart(2, '0');
    const ss = String(secs % 60).padStart(2, '0');
    el.textContent = `⏱️ ${mm}:${ss}`;
}

function renderSpinWheelPlayShell() {
    headerLevel3ClickHandler = renderSpinWheelDifficultyScreen;
    const level3El = document.getElementById('header-level3-btn');
    if (level3El) { level3El.classList.add('cursor-pointer', 'hover:bg-purple-100'); level3El.classList.remove('cursor-default'); }

    const container = document.getElementById('game-play-container');
    container.innerHTML = `
        <div class="pastel-card bg-white p-3 md:p-4 flex flex-col items-center">
            <div class="flex items-center justify-between w-full max-w-[420px] mb-3 gap-1.5">
                <span id="spw-timer" class="text-xs md:text-sm font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">⏱️ 00:00</span>
                <span id="spw-progress" class="text-xs md:text-sm font-black text-fuchsia-700 bg-fuchsia-50 px-2.5 py-1 rounded-full border border-fuchsia-200">Lượt 1/1</span>
                <span id="spw-score" class="text-xs md:text-sm font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">✅ 0</span>
                <button onclick="spwStartWithDifficulty(spwCurrentDifficulty)" class="text-xs md:text-sm font-black text-white bg-gradient-to-r from-fuchsia-500 to-violet-500 hover:from-fuchsia-600 hover:to-violet-600 px-2.5 py-1 rounded-full shadow-sm pastel-btn">🔄 Chơi lại</button>
            </div>

            <div id="spw-arena" class="relative w-full max-w-[300px] flex flex-col items-center mb-3">
                <div id="spw-deco" class="absolute inset-0 pointer-events-none overflow-visible"></div>
                <div class="relative z-10 mb-[-14px]" style="filter: drop-shadow(0 2px 2px rgba(0,0,0,.15));">
                    <div style="width:0;height:0;border-left:14px solid transparent;border-right:14px solid transparent;border-top:22px solid #db2777;"></div>
                </div>
                <div id="spw-wheel-outer" class="relative z-10 rounded-full border-[6px] border-white shadow-lg" style="width:260px; height:260px;">
                    <div id="spw-wheel" class="relative w-full h-full rounded-full" style="transition: transform 2.6s cubic-bezier(0.17,0.67,0.32,1.02);"></div>
                    <div class="absolute inset-0 m-auto rounded-full bg-white border-4 border-fuchsia-300 shadow flex items-center justify-center" style="width:52px; height:52px;">
                        <span class="text-2xl">🎯</span>
                    </div>
                </div>
                <button id="spw-spin-btn" onclick="spwHandleSpinClick()" class="mt-4 px-8 py-2.5 rounded-full font-black text-white text-sm shadow-md bg-gradient-to-r from-rose-500 to-fuchsia-500 hover:from-rose-600 hover:to-fuchsia-600 pastel-btn">🎡 Quay nào!</button>
            </div>

            <div id="spw-question" class="hidden w-full max-w-[420px] flex flex-col items-center">
                <div class="w-full bg-gradient-to-r from-pink-50 to-indigo-50 border-2 border-pink-200 rounded-2xl p-3 mb-3 text-center">
                    <p class="text-[11px] font-bold text-gray-400 mb-0.5">Bánh xe dừng ở từ:</p>
                    <p id="spw-target-word" class="text-lg md:text-xl font-black text-pink-600"></p>
                    <p class="text-xs font-bold text-gray-400 mt-1">Từ này nghĩa là gì?</p>
                </div>
                <div id="spw-options" class="flex flex-col gap-2 w-full"></div>
            </div>

            <p id="spw-status" class="text-sm font-bold text-fuchsia-500 text-center min-h-[18px] mt-2"></p>
        </div>`;

    spwRenderDecorations();
}

/** Trang trí không khí lễ hội quanh bánh xe: bóng bay/kim tuyến/ngôi sao đứng yên lấp lánh nhẹ —
 * CHỈ để nhìn cho sinh động (pointer-events-none), không liên quan gì tới logic chơi/chấm điểm.
 * Render 1 LẦN duy nhất khi vào màn chơi. */
function spwRenderDecorations() {
    spwInjectStyleOnce();
    const deco = document.getElementById('spw-deco');
    if (!deco) return;
    const items = [
        { icon: '🎈', style: 'left:-8%; top:6%; font-size:26px;' },
        { icon: '🎈', style: 'right:-8%; top:10%; font-size:24px; animation-delay:.4s' },
        { icon: '🎊', style: 'left:-4%; bottom:2%; font-size:22px; animation-delay:.7s' },
        { icon: '🎉', style: 'right:-4%; bottom:0%; font-size:22px; animation-delay:.2s' },
        { icon: '✨', style: 'left:6%; top:-4%; font-size:18px; animation-delay:1s' },
        { icon: '✨', style: 'right:8%; top:-6%; font-size:16px; animation-delay:1.3s' }
    ];
    deco.innerHTML = items.map(s => `<span class="spw-deco" style="${s.style}">${s.icon}</span>`).join('');
}

/** Chọn 1 từ đích chưa dùng ở vòng trước, dựng đủ số múi bánh xe (đích + vài từ khác trộn ngẫu
 * nhiên chỉ để hiển thị), và dựng bộ đáp án trắc nghiệm (1 nghĩa đúng + vài nghĩa nhiễu khác từ
 * đích, khác nghĩa) cho câu hỏi sau khi quay xong. */
function spwBuildRound() {
    const diff = SPW_DIFFICULTIES[spwCurrentDifficulty];
    const target = spwPool.find(it => !spwUsedTargets.has(it.w));
    spwUsedTargets.add(target.w);

    const others = shuffleArray(spwPool.filter(it => it.w !== target.w)).slice(0, diff.segments - 1);
    const segments = shuffleArray([target, ...others]);
    const targetIndex = segments.findIndex(it => it.w === target.w);

    const distractorMeanings = shuffleArray(spwPool.filter(it => it.vi !== target.vi && it.w !== target.w))
        .slice(0, diff.options - 1)
        .map(it => it.vi);
    const options = shuffleArray([target.vi, ...distractorMeanings]);

    return { segments, targetIndex, targetWord: target.w, targetVi: target.vi, options, spun: false, answered: false };
}

function spwNextRound() {
    const diff = SPW_DIFFICULTIES[spwCurrentDifficulty];
    if (spwRoundIndex >= diff.rounds) {
        spwFinishGame();
        return;
    }
    spwCurrentRound = spwBuildRound();
    spwRenderRound();
}

function spwRenderRound() {
    const diff = SPW_DIFFICULTIES[spwCurrentDifficulty];
    document.getElementById('spw-progress').textContent = `Lượt ${spwRoundIndex + 1}/${diff.rounds}`;
    document.getElementById('spw-score').textContent = `✅ ${spwScore}`;
    document.getElementById('spw-status').textContent = '';
    document.getElementById('spw-question').classList.add('hidden');

    const spinBtn = document.getElementById('spw-spin-btn');
    spinBtn.disabled = false;
    spinBtn.classList.remove('opacity-40', 'pointer-events-none');

    const segCount = spwCurrentRound.segments.length;
    const segAngle = 360 / segCount;
    const wheelEl = document.getElementById('spw-wheel');

    const gradientStops = spwCurrentRound.segments.map((s, i) =>
        `${SPW_SEGMENT_COLORS[i % SPW_SEGMENT_COLORS.length]} ${i * segAngle}deg ${(i + 1) * segAngle}deg`
    ).join(', ');
    wheelEl.style.background = `conic-gradient(${gradientStops})`;
    wheelEl.style.transform = `rotate(${spwTotalRotation}deg)`;

    wheelEl.innerHTML = spwCurrentRound.segments.map((s, i) => {
        const centerAngle = i * segAngle + segAngle / 2;
        return `<span class="spw-label" style="transform: rotate(${centerAngle}deg) translateY(-104px) rotate(${-centerAngle}deg);">${escapeHtml(s.w)}</span>`;
    }).join('');
}

function spwHandleSpinClick() {
    if (!spwCurrentRound || spwCurrentRound.spun) return;
    spwCurrentRound.spun = true;
    const spinBtn = document.getElementById('spw-spin-btn');
    spinBtn.disabled = true;
    spinBtn.classList.add('opacity-40', 'pointer-events-none');

    const segCount = spwCurrentRound.segments.length;
    const newRotation = spwComputeTargetRotation(spwTotalRotation, spwCurrentRound.targetIndex, segCount);
    spwTotalRotation = newRotation;
    const wheelEl = document.getElementById('spw-wheel');
    wheelEl.style.transform = `rotate(${newRotation}deg)`;

    setTimeout(spwRevealQuestion, 2650);
}

/** Tính góc quay TUYỆT ĐỐI (cộng dồn từ lần quay trước, KHÔNG bao giờ giật lùi về 0) sao cho múi
 * đích (targetIndex) dừng đúng dưới mũi tên (đỉnh 12h, 0 độ) sau khi quay thêm ít nhất 4 vòng
 * trọn (cho đẹp mắt, có cảm giác "quay thật"). */
function spwComputeTargetRotation(prevRotation, targetIndex, segmentsCount) {
    const segAngle = 360 / segmentsCount;
    const targetCenter = targetIndex * segAngle + segAngle / 2;
    const minSpins = 4;
    const baseFull = Math.ceil(prevRotation / 360) * 360;
    let R = baseFull + minSpins * 360;
    const rem = (targetCenter + R) % 360;
    R += (360 - rem) % 360;
    return R;
}

function spwRevealQuestion() {
    const round = spwCurrentRound;
    document.getElementById('spw-target-word').textContent = round.targetWord;
    const questionEl = document.getElementById('spw-question');
    questionEl.classList.remove('hidden');

    const optsEl = document.getElementById('spw-options');
    optsEl.innerHTML = round.options.map((vi, i) => `
        <button id="spw-opt-${i}" onclick="spwHandleOptionClick(${i})"
            class="spw-opt-btn pastel-btn w-full p-2.5 md:p-3 bg-white hover:bg-fuchsia-50 border-2 border-fuchsia-200 rounded-2xl font-extrabold text-gray-800 text-left transition-colors duration-150 text-sm md:text-base">
            ${escapeHtml(vi)}
        </button>
    `).join('');
}

function spwHandleOptionClick(optIndex) {
    if (!spwCurrentRound || spwCurrentRound.answered) return;
    const round = spwCurrentRound;
    const btn = document.getElementById('spw-opt-' + optIndex);
    const statusEl = document.getElementById('spw-status');
    const chosenVi = round.options[optIndex];

    if (chosenVi === round.targetVi) {
        round.answered = true;
        spwScore++;
        btn.classList.remove('bg-white', 'border-fuchsia-200');
        btn.classList.add('bg-emerald-100', 'border-emerald-400', 'text-emerald-800');
        document.getElementById('spw-score').textContent = `✅ ${spwScore}`;
        statusEl.className = 'text-sm font-black text-emerald-600 text-center min-h-[18px] mt-2';
        statusEl.textContent = `🎉 Chính xác! "${round.targetWord}" nghĩa là "${round.targetVi}"`;
        speakEnglish(round.targetWord);
        playAudio('correct');
        confetti({ particleCount: 40, spread: 65, origin: { y: 0.6 } });
        document.querySelectorAll('.spw-opt-btn').forEach(b => { b.disabled = true; b.classList.add('pointer-events-none'); });
        spwRoundIndex++;
        setTimeout(spwNextRound, 1300);
    } else {
        btn.disabled = true;
        btn.classList.remove('bg-white', 'border-fuchsia-200');
        btn.classList.add('bg-rose-100', 'border-rose-400', 'text-rose-700', 'opacity-70', 'pointer-events-none');
        spwWrongCount++;
        playAudio('wrong');
        statusEl.className = 'text-sm font-bold text-rose-500 text-center min-h-[18px] mt-2';
        statusEl.textContent = `Chưa đúng, con thử đáp án khác nhé!`;
    }
}

function spwFinishGame() {
    clearInterval(spwTimerInterval);
    const diff = SPW_DIFFICULTIES[spwCurrentDifficulty];
    const secs = Math.floor((Date.now() - spwStartTime) / 1000);
    const mm = String(Math.floor(secs / 60)).padStart(2, '0');
    const ss = String(secs % 60).padStart(2, '0');
    confetti({ particleCount: 80, spread: 75, origin: { y: 0.6 } });

    const container = document.getElementById('game-play-container');
    container.innerHTML = `
        <div class="pastel-card bg-white p-6 flex flex-col items-center text-center">
            <div class="text-5xl mb-2">🎉</div>
            <h3 class="font-extrabold text-emerald-600 text-lg mb-3">Xuất sắc! Bé đã quay xong ${diff.rounds} lượt!</h3>
            <div class="grid grid-cols-3 gap-2.5 w-full max-w-sm mb-4">
                <div class="bg-emerald-50 rounded-xl p-2.5 border border-emerald-200">
                    <div class="text-[10px] font-bold text-emerald-500">Trả lời đúng</div>
                    <div class="text-base font-black text-emerald-700">${spwScore}/${diff.rounds}</div>
                </div>
                <div class="bg-indigo-50 rounded-xl p-2.5 border border-indigo-200">
                    <div class="text-[10px] font-bold text-indigo-500">Thời gian</div>
                    <div class="text-base font-black text-indigo-700">${mm}:${ss}</div>
                </div>
                <div class="bg-${diff.color}-50 rounded-xl p-2.5 border border-${diff.color}-200">
                    <div class="text-[10px] font-bold text-${diff.color}-500">Độ khó</div>
                    <div class="text-base font-black text-${diff.color}-700">${diff.label}</div>
                </div>
            </div>
            <div class="flex gap-2.5 w-full max-w-sm">
                <button onclick="spwStartWithDifficulty('${spwCurrentDifficulty}')" class="flex-1 py-2.5 bg-gradient-to-r from-fuchsia-500 to-violet-500 text-white font-black rounded-2xl text-sm pastel-btn shadow-md">🔄 Chơi lại (${diff.label})</button>
                <button onclick="renderSpinWheelDifficultyScreen()" class="flex-1 py-2.5 bg-gray-100 text-gray-600 font-black rounded-2xl text-sm pastel-btn">Đổi độ khó</button>
            </div>
        </div>`;
}

/** Thêm 1 lần duy nhất khối CSS cho nhãn múi bánh xe (căn giữa tuyệt đối) và hiệu ứng lấp lánh
 * nhẹ cho bóng bay/kim tuyến trang trí quanh bánh xe. */
function spwInjectStyleOnce() {
    if (document.getElementById('spw-style')) return;
    const style = document.createElement('style');
    style.id = 'spw-style';
    style.textContent = `
        .spw-label {
            position: absolute; left: 50%; top: 50%; transform-origin: 0 0;
            font-weight: 900; font-size: 11px; color: #1f2937; white-space: nowrap;
            text-shadow: 0 1px 1px rgba(255,255,255,.5);
        }
        @keyframes spwTwinkle {
            0%, 100% { opacity: 0.55; transform: scale(0.9) rotate(-6deg); }
            50%      { opacity: 1;    transform: scale(1.05) rotate(6deg); }
        }
        .spw-deco { position: absolute; animation: spwTwinkle 2.2s ease-in-out infinite; }
    `;
    document.head.appendChild(style);
}
