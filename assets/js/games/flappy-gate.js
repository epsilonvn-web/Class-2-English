// ==========================================
// GAME: FLAPPY GATE — tách riêng file để lazy-load (chỉ tải khi bé thật sự bấm vào game này)
// ==========================================
// Cách chơi: màn hiện sẵn 1 NGHĨA TIẾNG VIỆT, bầu trời có vài cổng cầu vồng mỗi cổng mang 1 từ
// tiếng Anh — bé chạm/click đúng cổng khớp nghĩa để chim bay xuyên qua. Chạm nhầm cổng: chim va
// nhẹ rồi lùi lại, KHÔNG bị thua/mất lượt, bé được thử lại tới khi đúng (nhẹ nhàng, phù hợp lớp 2,
// khác với "Flappy Bird" gốc yêu cầu phản xạ và có thể thua).
let flgPool = [];
let flgCurrentDifficulty = 'medium';
let flgRoundIndex = 0, flgScore = 0, flgWrongCount = 0;
let flgUsedWords = new Set();
let flgCurrentRound = null; // { correctW, correctVi, gates: [{w, vi, isCorrect}], locked }
let flgStartTime = 0, flgTimerInterval = null;

const FLG_DIFFICULTIES = {
    easy:   { label: 'Dễ',   rounds: 5,  gateCount: 4, color: 'emerald' },
    medium: { label: 'Vừa',  rounds: 8,  gateCount: 5, color: 'amber' },
    hard:   { label: 'Khó',  rounds: 10, gateCount: 6, color: 'rose' }
};

// Màu cổng cầu vồng xoay vòng cho rực rỡ, không liên quan tới đúng/sai (chỉ lộ ra SAU khi bấm)
const FLG_GATE_COLORS = [
    'bg-rose-100 border-rose-400 text-rose-800', 'bg-amber-100 border-amber-400 text-amber-800',
    'bg-lime-100 border-lime-400 text-lime-800', 'bg-sky-100 border-sky-400 text-sky-800',
    'bg-violet-100 border-violet-400 text-violet-800', 'bg-fuchsia-100 border-fuchsia-400 text-fuchsia-800'
];

async function startFlappyGateGame() {
    showLoadingOverlay("Đang bơm căng cánh cho chim bay...");
    try {
        await fetchAllQuestionsFlat();
        hideLoadingOverlay();
    } catch (e) {
        hideLoadingOverlay();
        alert('Không tải được từ vựng cho Flappy Gate: ' + e.message);
        return;
    }
    renderFlappyDifficultyScreen();
}

/** Lấy nguồn từ vựng thật của chương trình (kho tra nghĩa xây từ Flashcards Library, mục 2
 * Vocabulary) — giống hệt nguồn Word Search/Fishing Game đang dùng, không giới hạn độ dài từ. */
function getFlappyVocabPool() {
    const map = wordMeaningMapCache || {};
    return Object.entries(map).map(([w, vi]) => ({ w: w.toUpperCase(), vi }));
}

function renderFlappyDifficultyScreen() {
    clearInterval(flgTimerInterval);
    headerLevel3ClickHandler = null;
    const level3El = document.getElementById('header-level3-btn');
    if (level3El) { level3El.classList.remove('cursor-pointer', 'hover:bg-purple-100'); level3El.classList.add('cursor-default'); }
    const container = document.getElementById('game-play-container');
    container.innerHTML = `
        <div class="pastel-card bg-white p-5 flex flex-col items-center text-center">
            <div class="text-5xl mb-2">🐤</div>
            <h3 class="font-extrabold text-sky-700 text-lg mb-1">Flappy Gate</h3>
            <p class="text-sm text-gray-500 font-bold mb-3">Chọn độ khó để bắt đầu nhé!</p>
            <div class="grid grid-cols-3 gap-2.5 w-full max-w-sm mb-3">
                ${Object.entries(FLG_DIFFICULTIES).map(([key, d]) => `
                    <button onclick="flgStartWithDifficulty('${key}')" class="pastel-btn flex flex-col items-center gap-1 p-3 rounded-2xl border-2 border-${d.color}-200 bg-${d.color}-50 hover:bg-${d.color}-100 text-${d.color}-700 shadow-sm">
                        <span class="font-black text-base">${d.label}</span>
                        <span class="text-xs font-bold opacity-80">${d.rounds} vòng</span>
                        <span class="text-xs font-bold opacity-70">${d.gateCount} cổng/vòng</span>
                    </button>
                `).join('')}
            </div>
            <button onclick="flgToggleRules()" class="text-sm font-black text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-200 pastel-btn">📖 Xem luật chơi</button>
            <div id="flg-rules-panel" class="hidden mt-3 w-full max-w-sm text-left bg-indigo-50/60 border border-indigo-200 rounded-2xl p-3.5 text-sm text-gray-600 font-bold leading-relaxed">
                <p class="mb-1.5">🐤 Chú chim nhỏ đang bay lượn trên trời — phía trên có sẵn <b>1 nghĩa tiếng Việt</b>.</p>
                <p class="mb-1.5">🌈 Mỗi vòng có vài <b>cổng cầu vồng</b> trôi nổi, mỗi cổng mang <b>1 từ tiếng Anh</b>.</p>
                <p>👆 Con chạm đúng cổng khớp với nghĩa để chim bay xuyên qua! Chạm nhầm cổng khác cũng không sao, chim chỉ lùi lại rồi con thử cổng khác nhé.</p>
            </div>
        </div>`;
}

function flgToggleRules() {
    const panel = document.getElementById('flg-rules-panel');
    if (panel) panel.classList.toggle('hidden');
}

function flgStartWithDifficulty(diffKey) {
    const diff = FLG_DIFFICULTIES[diffKey];
    flgCurrentDifficulty = diffKey;
    flgRoundIndex = 0;
    flgScore = 0;
    flgWrongCount = 0;
    flgUsedWords = new Set();
    flgPool = shuffleArray(getFlappyVocabPool());

    if (flgPool.length < diff.rounds + diff.gateCount) {
        document.getElementById('game-play-container').innerHTML = `<p class="text-center text-gray-500 font-bold py-8">Chưa đủ từ vựng phù hợp để chơi Flappy Gate, bé quay lại sau nhé!</p>`;
        return;
    }

    renderFlappyPlayShell();
    flgStartTime = Date.now();
    clearInterval(flgTimerInterval);
    flgTimerInterval = setInterval(flgUpdateTimerDisplay, 1000);
    flgNextRound();
}

function flgUpdateTimerDisplay() {
    const el = document.getElementById('flg-timer');
    if (!el) { clearInterval(flgTimerInterval); return; }
    const secs = Math.floor((Date.now() - flgStartTime) / 1000);
    const mm = String(Math.floor(secs / 60)).padStart(2, '0');
    const ss = String(secs % 60).padStart(2, '0');
    el.textContent = `⏱️ ${mm}:${ss}`;
}

function renderFlappyPlayShell() {
    // Trong lúc đang chơi, bấm vào tên game trên breadcrumb -> quay lại màn chọn độ khó.
    headerLevel3ClickHandler = renderFlappyDifficultyScreen;
    const level3El = document.getElementById('header-level3-btn');
    if (level3El) { level3El.classList.add('cursor-pointer', 'hover:bg-purple-100'); level3El.classList.remove('cursor-default'); }

    const container = document.getElementById('game-play-container');
    container.innerHTML = `
        <div class="pastel-card bg-white p-3 md:p-4 flex flex-col items-center">
            <div class="flex items-center justify-between w-full max-w-[500px] mb-2 gap-1.5">
                <span id="flg-timer" class="text-xs md:text-sm font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">⏱️ 00:00</span>
                <span id="flg-progress" class="text-xs md:text-sm font-black text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">Vòng 1/1</span>
                <span id="flg-score" class="text-xs md:text-sm font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">✅ 0</span>
                <button onclick="flgStartWithDifficulty(flgCurrentDifficulty)" class="text-xs md:text-sm font-black text-white bg-gradient-to-r from-fuchsia-500 to-purple-500 hover:from-fuchsia-600 hover:to-purple-600 px-2.5 py-1 rounded-full shadow-sm pastel-btn">🔄 Chơi lại</button>
            </div>
            <div class="w-full max-w-[500px] bg-gradient-to-r from-pink-50 to-indigo-50 border-2 border-pink-200 rounded-2xl p-3 mb-3 text-center">
                <p class="text-[11px] font-bold text-gray-400 mb-0.5">Nghĩa của từ là:</p>
                <p id="flg-meaning" class="text-lg md:text-xl font-black text-pink-600"></p>
            </div>
            <div id="flg-sky" class="relative overflow-hidden w-full max-w-[500px] min-h-[300px] border-2 border-sky-300 rounded-2xl mb-2" style="background: linear-gradient(to bottom, #93c5fd 0%, #bfdbfe 55%, #fef9c3 100%);">
                <div id="flg-sky-deco" class="absolute inset-0 pointer-events-none overflow-hidden"></div>
                <span id="flg-bird" class="absolute pointer-events-none select-none" style="left:6%; top:42%; font-size:34px;">🐤</span>
                <div id="flg-gate-layer" class="relative z-10 h-full min-h-[300px] px-6 py-5 flex flex-wrap gap-4 md:gap-5 items-center justify-center content-center"></div>
            </div>
            <p id="flg-status" class="text-sm font-bold text-sky-500 text-center min-h-[18px]"></p>
        </div>`;

    flgRenderSkyDecorations();
}

/** Trang trí bầu trời: mặt trời/cầu vồng/diều đứng yên đung đưa nhẹ + mây/chim/bướm/khinh khí
 * cầu/máy bay trôi ngang qua bầu trời liên tục — CHỈ để nhìn cho sinh động (pointer-events-none),
 * không liên quan gì tới logic chơi/chấm điểm (khác với cổng để BẤM CHỌN đáp án ở lớp
 * #flg-gate-layer phía trên). Render 1 LẦN duy nhất khi vào màn chơi, không vẽ lại mỗi vòng. */
function flgRenderSkyDecorations() {
    flgInjectStyleOnce();
    const deco = document.getElementById('flg-sky-deco');
    if (!deco) return;

    const sway = [
        { icon: '☀️', style: 'right:6%; top:4%; font-size:32px;' },
        { icon: '🌈', style: 'left:4%; top:4%; font-size:32px; animation-delay:.3s' },
        { icon: '🪁', style: 'left:22%; top:8%; font-size:22px; animation-delay:.6s' },
        { icon: '🪁', style: 'right:38%; top:6%; font-size:20px; animation-delay:1.1s' },
        { icon: '🪁', style: 'left:60%; top:14%; font-size:18px; animation-delay:.9s' },
        { icon: '⭐', style: 'right:26%; top:12%; font-size:16px; animation-delay:1s' },
        { icon: '⭐', style: 'left:42%; top:6%; font-size:14px; animation-delay:1.4s' }
    ];

    const roamers = [
        { icon: '☁️', top: '8%',  dir: 'right', dur: '16s', delay: '0s'   },
        { icon: '☁️', top: '24%', dir: 'left',  dur: '20s', delay: '2s'   },
        { icon: '🕊️', top: '18%', dir: 'right', dur: '10s', delay: '1s'   },
        { icon: '🐦', top: '55%', dir: 'left',  dur: '9s',  delay: '2.5s' },
        { icon: '🐦', top: '30%', dir: 'right', dur: '8.5s', delay: '3.6s' },
        { icon: '🐦', top: '62%', dir: 'right', dur: '9.5s', delay: '.4s' },
        { icon: '🐧', top: '20%', dir: 'left',  dur: '12.5s', delay: '2.2s' },
        { icon: '🦜', top: '40%', dir: 'left',  dur: '10.5s', delay: '4.2s' },
        { icon: '🦆', top: '72%', dir: 'right', dur: '11s',  delay: '1.7s' },
        { icon: '🦋', top: '35%', dir: 'right', dur: '11s', delay: '3.5s' },
        { icon: '🎈', top: '68%', dir: 'right', dur: '18s', delay: '1.5s' },
        { icon: '✈️', top: '15%', dir: 'left',  dur: '14s', delay: '4s'   },
        { icon: '☁️', top: '46%', dir: 'right', dur: '22s', delay: '5s'   },
        { icon: '🦅', top: '76%', dir: 'left',  dur: '13s', delay: '3s'   },
        { icon: '🦢', top: '50%', dir: 'left',  dur: '13.8s', delay: '5.5s' }
    ];

    deco.innerHTML =
        sway.map(s => `<span class="flg-deco" style="${s.style}">${s.icon}</span>`).join('') +
        roamers.map(r => `<span class="flg-roam flg-roam-${r.dir}" style="top:${r.top}; font-size:24px; animation-duration:${r.dur}; animation-delay:${r.delay};">${r.icon}</span>`).join('');
}

/** Chọn ngẫu nhiên 1 từ đúng (chưa dùng ở vòng trước) + đủ số cổng mồi sai (từ/nghĩa khác từ
 * đúng), rồi trộn thứ tự hiển thị các cổng trong trời. */
function flgBuildRound() {
    const diff = FLG_DIFFICULTIES[flgCurrentDifficulty];
    const correctItem = flgPool.find(item => !flgUsedWords.has(item.w));
    flgUsedWords.add(correctItem.w);

    const distractorPool = shuffleArray(flgPool.filter(item => item.w !== correctItem.w && item.vi !== correctItem.vi));
    const distractors = distractorPool.slice(0, diff.gateCount - 1);

    const gates = shuffleArray([
        { w: correctItem.w, vi: correctItem.vi, isCorrect: true },
        ...distractors.map(d => ({ w: d.w, vi: d.vi, isCorrect: false }))
    ]);

    return { correctW: correctItem.w, correctVi: correctItem.vi, gates, locked: false };
}

function flgNextRound() {
    const diff = FLG_DIFFICULTIES[flgCurrentDifficulty];
    if (flgRoundIndex >= diff.rounds) {
        flgFinishGame();
        return;
    }
    flgCurrentRound = flgBuildRound();
    flgRenderRound();
}

function flgRenderRound() {
    const diff = FLG_DIFFICULTIES[flgCurrentDifficulty];
    document.getElementById('flg-progress').textContent = `Vòng ${flgRoundIndex + 1}/${diff.rounds}`;
    document.getElementById('flg-score').textContent = `✅ ${flgScore}`;
    document.getElementById('flg-meaning').textContent = flgCurrentRound.correctVi;
    document.getElementById('flg-status').textContent = '';

    const gateLayerEl = document.getElementById('flg-gate-layer');
    gateLayerEl.innerHTML = flgCurrentRound.gates.map((g, i) => `
        <button id="flg-gate-${i}" onclick="flgHandleGateClick(${i})"
            style="animation-delay: ${(i * 0.45).toFixed(2)}s"
            class="flg-gate-btn flg-gate-float-${i % 3} pastel-btn flex flex-col items-center justify-center gap-0.5 px-2.5 py-1.5 rounded-t-full rounded-b-2xl border-4 font-black text-[11px] md:text-xs shadow-md transition-colors duration-150 whitespace-nowrap ${FLG_GATE_COLORS[i % FLG_GATE_COLORS.length]}">
            <span class="text-sm">🌈</span><span>${escapeHtml(g.w)}</span>
        </button>
    `).join('');
}

function flgHandleGateClick(gateIndex) {
    if (!flgCurrentRound || flgCurrentRound.locked) return;
    const gate = flgCurrentRound.gates[gateIndex];
    const btn = document.getElementById('flg-gate-' + gateIndex);
    const statusEl = document.getElementById('flg-status');
    const bird = document.getElementById('flg-bird');

    if (gate.isCorrect) {
        flgCurrentRound.locked = true;
        flgScore++;
        btn.style.animation = 'none'; // dừng trôi nổi khi đã bay qua, để hiệu ứng phóng to hiện rõ
        btn.classList.add('bg-emerald-300', 'border-emerald-500', 'text-emerald-900', 'scale-110');
        if (bird) { bird.style.animation = 'none'; bird.classList.add('flg-bird-fly'); }
        document.getElementById('flg-score').textContent = `✅ ${flgScore}`;
        statusEl.className = 'text-sm font-black text-emerald-600 text-center min-h-[18px]';
        statusEl.textContent = `🎉 Bay đúng cổng rồi! "${gate.w}" nghĩa là "${gate.vi}"`;
        speakEnglish(gate.w);
        playAudio('correct');
        confetti({ particleCount: 30, spread: 55, origin: { y: 0.7 } });
        flgRoundIndex++;
        setTimeout(() => {
            if (bird) { bird.classList.remove('flg-bird-fly'); bird.style.animation = ''; }
            flgNextRound();
        }, 1100);
    } else {
        flgWrongCount++;
        btn.style.animation = 'none'; // tạm dừng trôi nổi trong lúc chớp đỏ, để hiệu ứng hiện rõ
        btn.classList.add('bg-rose-300', 'border-rose-500', 'opacity-50', 'translate-y-2');
        statusEl.className = 'text-sm font-bold text-rose-500 text-center min-h-[18px]';
        statusEl.textContent = `Chưa đúng, chim va nhẹ cổng đó rồi lùi lại, thử cổng khác nhé!`;
        playAudio('wrong');
        setTimeout(() => {
            if (btn) {
                btn.classList.remove('bg-rose-300', 'border-rose-500', 'opacity-50', 'translate-y-2');
                btn.style.animation = ''; // bỏ khoá -> quay lại trôi nổi bình thường theo class
            }
        }, 700);
    }
}

function flgFinishGame() {
    clearInterval(flgTimerInterval);
    const diff = FLG_DIFFICULTIES[flgCurrentDifficulty];
    const secs = Math.floor((Date.now() - flgStartTime) / 1000);
    const mm = String(Math.floor(secs / 60)).padStart(2, '0');
    const ss = String(secs % 60).padStart(2, '0');
    confetti({ particleCount: 80, spread: 75, origin: { y: 0.6 } });

    const container = document.getElementById('game-play-container');
    container.innerHTML = `
        <div class="pastel-card bg-white p-6 flex flex-col items-center text-center">
            <div class="text-5xl mb-2">🎉</div>
            <h3 class="font-extrabold text-emerald-600 text-lg mb-3">Xuất sắc! Chim đã bay qua ${diff.rounds} cổng!</h3>
            <div class="grid grid-cols-3 gap-2.5 w-full max-w-sm mb-4">
                <div class="bg-emerald-50 rounded-xl p-2.5 border border-emerald-200">
                    <div class="text-[10px] font-bold text-emerald-500">Bay đúng</div>
                    <div class="text-base font-black text-emerald-700">${flgScore}/${diff.rounds}</div>
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
                <button onclick="flgStartWithDifficulty('${flgCurrentDifficulty}')" class="flex-1 py-2.5 bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white font-black rounded-2xl text-sm pastel-btn shadow-md">🔄 Chơi lại (${diff.label})</button>
                <button onclick="renderFlappyDifficultyScreen()" class="flex-1 py-2.5 bg-gray-100 text-gray-600 font-black rounded-2xl text-sm pastel-btn">Đổi độ khó</button>
            </div>
        </div>`;
}

/** Thêm 1 lần duy nhất khối CSS cho: chim vỗ cánh tại chỗ, hiệu ứng chim bay vút khi bấm đúng,
 * cổng cầu vồng trôi nổi (3 kiểu quỹ đạo khác nhau để không đồng bộ), vật thể đung đưa tại chỗ,
 * và mây/chim/bướm trôi ngang qua bầu trời. */
function flgInjectStyleOnce() {
    if (document.getElementById('flg-style')) return;
    const style = document.createElement('style');
    style.id = 'flg-style';
    style.textContent = `
        @keyframes flgFlap {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50%      { transform: translateY(-10px) rotate(8deg); }
        }
        #flg-bird { animation: flgFlap 1.1s ease-in-out infinite; }

        @keyframes flgBirdFly {
            0%   { transform: translate(0, 0) scale(1); }
            60%  { transform: translate(170px, -22px) scale(0.85); }
            100% { transform: translate(0, 0) scale(1); }
        }
        .flg-bird-fly { animation: flgBirdFly 1.05s ease-in-out 1 !important; }

        @keyframes flgGateFloat0 {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            25%      { transform: translate(16px, -24px) rotate(-6deg); }
            50%      { transform: translate(-10px, -30px) rotate(3deg); }
            75%      { transform: translate(-18px, -8px) rotate(-4deg); }
        }
        @keyframes flgGateFloat1 {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            25%      { transform: translate(-20px, -18px) rotate(6deg); }
            50%      { transform: translate(-6px, -30px) rotate(-3deg); }
            75%      { transform: translate(16px, -10px) rotate(5deg); }
        }
        @keyframes flgGateFloat2 {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            25%      { transform: translate(14px, -12px) rotate(-5deg); }
            50%      { transform: translate(22px, -28px) rotate(4deg); }
            75%      { transform: translate(-14px, -16px) rotate(-3deg); }
        }
        .flg-gate-btn { will-change: transform; }
        .flg-gate-float-0 { animation: flgGateFloat0 2.2s ease-in-out infinite; }
        .flg-gate-float-1 { animation: flgGateFloat1 2.5s ease-in-out infinite; }
        .flg-gate-float-2 { animation: flgGateFloat2 2.35s ease-in-out infinite; }
        .flg-gate-btn:active { animation-play-state: paused; }

        @keyframes flgSway {
            0%, 100% { transform: rotate(-6deg); }
            50%      { transform: rotate(6deg); }
        }
        .flg-deco { position: absolute; transform-origin: center; animation: flgSway 2.8s ease-in-out infinite; }

        @keyframes flgRoamRight { 0% { left: -12%; transform: scaleX(-1); } 100% { left: 108%; transform: scaleX(-1); } }
        @keyframes flgRoamLeft  { 0% { left: 108%;  transform: scaleX(1);  } 100% { left: -12%; transform: scaleX(1); } }
        .flg-roam { position: absolute; animation-timing-function: linear; animation-iteration-count: infinite; opacity: 0.9; }
        .flg-roam-right { animation-name: flgRoamRight; }
        .flg-roam-left  { animation-name: flgRoamLeft; }
    `;
    document.head.appendChild(style);
}
