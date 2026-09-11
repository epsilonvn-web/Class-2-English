// ==========================================
// GAME: BUNNY RESCUE — tách riêng file để lazy-load (chỉ tải khi bé thật sự bấm vào game này)
// ==========================================
// Cách chơi (kiểu đoán chữ Hangman, nhẹ nhàng): màn hiện sẵn 1 NGHĨA TIẾNG VIỆT, bé đoán từng
// CHỮ CÁI để ghép ra từ tiếng Anh khớp nghĩa đó. Đoán đúng: chữ hiện ra ở đúng vị trí. Đoán sai:
// con cáo tiến gần chuồng thỏ thêm 1 bước. Nếu ghép đủ từ trước khi cáo tới nơi -> cứu được thỏ!
// Nếu cáo tới nơi trước -> thỏ vẫn kịp chui vào hang an toàn (KHÔNG có màn "thua" nặng nề), lộ
// đáp án rồi sang từ tiếp theo luôn, giữ đúng tinh thần nhẹ nhàng của các mini game khác trong app.
let bunPool = [];
let bunCurrentDifficulty = 'medium';
let bunRoundIndex = 0, bunScore = 0, bunEscapeCount = 0;
let bunUsedWords = new Set();
let bunCurrentRound = null; // { word, vi, guessed: Set, wrongCount, locked }
let bunStartTime = 0, bunTimerInterval = null;

const BUN_DIFFICULTIES = {
    easy:   { label: 'Dễ',   rounds: 5,  minLen: 3, maxLen: 5, lives: 8, color: 'emerald' },
    medium: { label: 'Vừa',  rounds: 8,  minLen: 4, maxLen: 6, lives: 6, color: 'amber' },
    hard:   { label: 'Khó',  rounds: 10, minLen: 5, maxLen: 8, lives: 5, color: 'rose' }
};

const BUN_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

async function startBunnyRescueGame() {
    showLoadingOverlay("Đang dựng chuồng thỏ...");
    try {
        await fetchAllQuestionsFlat();
        hideLoadingOverlay();
    } catch (e) {
        hideLoadingOverlay();
        alert('Không tải được từ vựng cho Bunny Rescue: ' + e.message);
        return;
    }
    renderBunnyDifficultyScreen();
}

/** Lấy nguồn từ vựng thật của chương trình (kho tra nghĩa xây từ Flashcards Library, mục 2
 * Vocabulary) — chỉ lấy từ ĐƠN thuần chữ cái (không dấu cách/gạch nối) trong khoảng độ dài
 * cho trước, vì đoán chữ kiểu Hangman cần từng ký tự A-Z rõ ràng. */
function getBunnyVocabPool(minLen, maxLen) {
    const map = wordMeaningMapCache || {};
    const re = new RegExp(`^[a-z]{${minLen},${maxLen}}$`);
    return Object.entries(map)
        .filter(([w]) => re.test(w))
        .map(([w, vi]) => ({ w: w.toUpperCase(), vi }));
}

function renderBunnyDifficultyScreen() {
    clearInterval(bunTimerInterval);
    headerLevel3ClickHandler = null;
    const level3El = document.getElementById('header-level3-btn');
    if (level3El) { level3El.classList.remove('cursor-pointer', 'hover:bg-purple-100'); level3El.classList.add('cursor-default'); }
    const container = document.getElementById('game-play-container');
    container.innerHTML = `
        <div class="pastel-card bg-white p-5 flex flex-col items-center text-center">
            <div class="text-5xl mb-2">🐰</div>
            <h3 class="font-extrabold text-lime-700 text-lg mb-1">Bunny Rescue</h3>
            <p class="text-sm text-gray-500 font-bold mb-3">Chọn độ khó để bắt đầu nhé!</p>
            <div class="grid grid-cols-3 gap-2.5 w-full max-w-sm mb-3">
                ${Object.entries(BUN_DIFFICULTIES).map(([key, d]) => `
                    <button onclick="bunStartWithDifficulty('${key}')" class="pastel-btn flex flex-col items-center gap-1 p-3 rounded-2xl border-2 border-${d.color}-200 bg-${d.color}-50 hover:bg-${d.color}-100 text-${d.color}-700 shadow-sm">
                        <span class="font-black text-base">${d.label}</span>
                        <span class="text-xs font-bold opacity-80">${d.rounds} từ</span>
                        <span class="text-xs font-bold opacity-70">${d.minLen}-${d.maxLen} chữ cái</span>
                        <span class="text-[10px] font-bold opacity-60">${d.lives} bước cáo</span>
                    </button>
                `).join('')}
            </div>
            <button onclick="bunToggleRules()" class="text-sm font-black text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-200 pastel-btn">📖 Xem luật chơi</button>
            <div id="bun-rules-panel" class="hidden mt-3 w-full max-w-sm text-left bg-indigo-50/60 border border-indigo-200 rounded-2xl p-3.5 text-sm text-gray-600 font-bold leading-relaxed">
                <p class="mb-1.5">🐰 Chú thỏ đang trốn trong chuồng — phía trên có sẵn <b>1 nghĩa tiếng Việt</b> của từ cần đoán.</p>
                <p class="mb-1.5">🔤 Con chạm vào từng <b>chữ cái</b> bên dưới để đoán. Đoán đúng: chữ hiện ra đúng vị trí trong từ!</p>
                <p>🦊 Đoán sai: con cáo tiến gần chuồng thêm 1 bước. Ghép đủ từ trước khi cáo tới nơi để <b>cứu được thỏ</b> nhé! Lỡ cáo tới nơi cũng không sao, thỏ vẫn kịp chạy trốn an toàn.</p>
            </div>
        </div>`;
}

function bunToggleRules() {
    const panel = document.getElementById('bun-rules-panel');
    if (panel) panel.classList.toggle('hidden');
}

function bunStartWithDifficulty(diffKey) {
    const diff = BUN_DIFFICULTIES[diffKey];
    bunCurrentDifficulty = diffKey;
    bunRoundIndex = 0;
    bunScore = 0;
    bunEscapeCount = 0;
    bunUsedWords = new Set();
    bunPool = shuffleArray(getBunnyVocabPool(diff.minLen, diff.maxLen));

    if (bunPool.length < diff.rounds) {
        document.getElementById('game-play-container').innerHTML = `<p class="text-center text-gray-500 font-bold py-8">Chưa đủ từ vựng phù hợp để chơi Bunny Rescue, bé quay lại sau nhé!</p>`;
        return;
    }

    renderBunnyPlayShell();
    bunStartTime = Date.now();
    clearInterval(bunTimerInterval);
    bunTimerInterval = setInterval(bunUpdateTimerDisplay, 1000);
    bunNextRound();
}

function bunUpdateTimerDisplay() {
    const el = document.getElementById('bun-timer');
    if (!el) { clearInterval(bunTimerInterval); return; }
    const secs = Math.floor((Date.now() - bunStartTime) / 1000);
    const mm = String(Math.floor(secs / 60)).padStart(2, '0');
    const ss = String(secs % 60).padStart(2, '0');
    el.textContent = `⏱️ ${mm}:${ss}`;
}

function renderBunnyPlayShell() {
    headerLevel3ClickHandler = renderBunnyDifficultyScreen;
    const level3El = document.getElementById('header-level3-btn');
    if (level3El) { level3El.classList.add('cursor-pointer', 'hover:bg-purple-100'); level3El.classList.remove('cursor-default'); }

    const container = document.getElementById('game-play-container');
    container.innerHTML = `
        <div class="pastel-card bg-white p-3 md:p-4 flex flex-col items-center">
            <div class="flex items-center justify-between w-full max-w-[460px] mb-2 gap-1.5">
                <span id="bun-timer" class="text-xs md:text-sm font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">⏱️ 00:00</span>
                <span id="bun-progress" class="text-xs md:text-sm font-black text-lime-700 bg-lime-50 px-2.5 py-1 rounded-full border border-lime-200">Từ 1/1</span>
                <span id="bun-score" class="text-xs md:text-sm font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">✅ 0</span>
                <button onclick="bunStartWithDifficulty(bunCurrentDifficulty)" class="text-xs md:text-sm font-black text-white bg-gradient-to-r from-lime-500 to-emerald-500 hover:from-lime-600 hover:to-emerald-600 px-2.5 py-1 rounded-full shadow-sm pastel-btn">🔄 Chơi lại</button>
            </div>
            <div class="w-full max-w-[460px] bg-gradient-to-r from-pink-50 to-indigo-50 border-2 border-pink-200 rounded-2xl p-3 mb-3 text-center">
                <p class="text-[11px] font-bold text-gray-400 mb-0.5">Nghĩa của từ là:</p>
                <p id="bun-meaning" class="text-lg md:text-xl font-black text-pink-600"></p>
            </div>
            <div id="bun-scene" class="relative overflow-hidden w-full max-w-[460px] min-h-[210px] border-2 border-lime-300 rounded-2xl mb-3 p-3" style="background: linear-gradient(to bottom, #bae6fd 0%, #bbf7d0 45%, #86efac 100%);">
                <div id="bun-scene-deco" class="absolute inset-0 pointer-events-none overflow-hidden"></div>
                <div class="relative z-10 flex flex-col items-center gap-3 pt-2">
                    <div class="relative w-full max-w-[400px] h-9">
                        <span id="bun-fox" class="absolute text-2xl transition-all duration-500 ease-out" style="left:0%; top:0;">🦊</span>
                        <span class="absolute text-2xl" style="right:0; top:0;">🐇🏠</span>
                    </div>
                    <p id="bun-lives-text" class="text-xs font-bold text-emerald-800"></p>
                    <div id="bun-blanks" class="flex gap-1.5 justify-center flex-wrap px-2"></div>
                </div>
            </div>
            <div id="bun-keyboard" class="grid grid-cols-7 sm:grid-cols-9 gap-1.5 w-full max-w-[460px] mb-2"></div>
            <p id="bun-status" class="text-sm font-bold text-lime-600 text-center min-h-[18px]"></p>
        </div>`;

    bunRenderSceneDecorations();
}

/** Trang trí đồng cỏ: mặt trời/hoa/cây đứng yên đung đưa nhẹ + bướm/ong/mây/chim bay lượn qua
 * lại — CHỈ để nhìn cho sinh động (pointer-events-none), không liên quan gì tới logic chơi/chấm
 * điểm. Render 1 LẦN duy nhất khi vào màn chơi, không vẽ lại mỗi vòng. */
function bunRenderSceneDecorations() {
    bunInjectStyleOnce();
    const deco = document.getElementById('bun-scene-deco');
    if (!deco) return;

    const sway = [
        { icon: '☀️', style: 'right:5%; top:3%; font-size:28px;' },
        { icon: '🌳', style: 'left:2%; bottom:2px; font-size:30px; animation-delay:.3s' },
        { icon: '🌲', style: 'right:3%; bottom:2px; font-size:28px; animation-delay:.7s' },
        { icon: '🌸', style: 'left:20%; bottom:0px; font-size:18px; animation-delay:.5s' },
        { icon: '🌼', style: 'left:38%; bottom:2px; font-size:18px; animation-delay:1s' },
        { icon: '🌻', style: 'left:56%; bottom:0px; font-size:20px; animation-delay:.8s' },
        { icon: '🌱', style: 'left:70%; bottom:2px; font-size:16px; animation-delay:1.2s' }
    ];

    const roamers = [
        { icon: '☁️', top: '6%',  dir: 'right', dur: '18s', delay: '0s'   },
        { icon: '☁️', top: '14%', dir: 'left',  dur: '22s', delay: '2s'   },
        { icon: '🦋', top: '28%', dir: 'right', dur: '9s',  delay: '1s'   },
        { icon: '🦋', top: '40%', dir: 'left',  dur: '10s', delay: '3s'   },
        { icon: '🐝', top: '34%', dir: 'right', dur: '7.5s', delay: '2.2s' },
        { icon: '🐦', top: '20%', dir: 'left',  dur: '11s', delay: '4s'   }
    ];

    deco.innerHTML =
        sway.map(s => `<span class="bun-deco" style="${s.style}">${s.icon}</span>`).join('') +
        roamers.map(r => `<span class="bun-roam bun-roam-${r.dir}" style="top:${r.top}; font-size:22px; animation-duration:${r.dur}; animation-delay:${r.delay};">${r.icon}</span>`).join('');
}

/** Chọn ngẫu nhiên 1 từ chưa dùng ở vòng trước cho vòng mới. */
function bunBuildRound() {
    const item = bunPool.find(it => !bunUsedWords.has(it.w));
    bunUsedWords.add(item.w);
    return { word: item.w, vi: item.vi, guessed: new Set(), wrongCount: 0, locked: false };
}

function bunNextRound() {
    const diff = BUN_DIFFICULTIES[bunCurrentDifficulty];
    if (bunRoundIndex >= diff.rounds) {
        bunFinishGame();
        return;
    }
    bunCurrentRound = bunBuildRound();
    bunRenderRound();
}

function bunRenderRound() {
    const diff = BUN_DIFFICULTIES[bunCurrentDifficulty];
    document.getElementById('bun-progress').textContent = `Từ ${bunRoundIndex + 1}/${diff.rounds}`;
    document.getElementById('bun-score').textContent = `✅ ${bunScore}`;
    document.getElementById('bun-meaning').textContent = bunCurrentRound.vi;
    document.getElementById('bun-status').textContent = '';
    document.getElementById('bun-lives-text').textContent = `Cáo còn cách chuồng: ${diff.lives} bước`;

    const foxEl = document.getElementById('bun-fox');
    if (foxEl) { foxEl.style.left = '0%'; }

    bunRenderBlanks();

    const kbEl = document.getElementById('bun-keyboard');
    kbEl.innerHTML = BUN_ALPHABET.map(letter => `
        <button id="bun-key-${letter}" onclick="bunGuessLetter('${letter}')"
            class="bun-key-btn pastel-btn py-2 rounded-xl border-2 border-lime-200 bg-white text-lime-700 font-black text-xs md:text-sm shadow-sm transition-colors duration-150">${letter}</button>
    `).join('');
}

function bunRenderBlanks() {
    const blanksEl = document.getElementById('bun-blanks');
    if (!blanksEl || !bunCurrentRound) return;
    blanksEl.innerHTML = bunCurrentRound.word.split('').map(ch => {
        const revealed = bunCurrentRound.guessed.has(ch);
        return `<span class="w-7 h-9 md:w-8 md:h-10 flex items-center justify-center bg-white border-2 border-lime-400 rounded-lg font-black text-base md:text-lg text-lime-800 shadow-sm">${revealed ? escapeHtml(ch) : ''}</span>`;
    }).join('');
}

function bunGuessLetter(letter) {
    if (!bunCurrentRound || bunCurrentRound.locked) return;
    if (bunCurrentRound.guessed.has(letter)) return;

    const btn = document.getElementById('bun-key-' + letter);
    bunCurrentRound.guessed.add(letter);
    if (btn) { btn.disabled = true; btn.classList.add('pointer-events-none'); }

    if (bunCurrentRound.word.includes(letter)) {
        if (btn) btn.classList.add('bg-emerald-300', 'border-emerald-500', 'text-emerald-900');
        playAudio('correct');
        bunRenderBlanks();

        const allRevealed = bunCurrentRound.word.split('').every(ch => bunCurrentRound.guessed.has(ch));
        if (allRevealed) bunRoundWin();
    } else {
        if (btn) btn.classList.add('bg-rose-300', 'border-rose-500', 'text-rose-900');
        bunCurrentRound.wrongCount++;
        playAudio('wrong');

        const diff = BUN_DIFFICULTIES[bunCurrentDifficulty];
        const foxEl = document.getElementById('bun-fox');
        const pct = Math.min(100, Math.round((bunCurrentRound.wrongCount / diff.lives) * 88));
        if (foxEl) foxEl.style.left = pct + '%';
        const remaining = Math.max(0, diff.lives - bunCurrentRound.wrongCount);
        document.getElementById('bun-lives-text').textContent = `Cáo còn cách chuồng: ${remaining} bước`;

        if (bunCurrentRound.wrongCount >= diff.lives) bunRoundEscape();
    }
}

function bunRoundWin() {
    bunCurrentRound.locked = true;
    bunScore++;
    document.getElementById('bun-score').textContent = `✅ ${bunScore}`;
    const statusEl = document.getElementById('bun-status');
    statusEl.className = 'text-sm font-black text-emerald-600 text-center min-h-[18px]';
    statusEl.textContent = `🎉 Cứu được thỏ rồi! "${bunCurrentRound.word}" nghĩa là "${bunCurrentRound.vi}"`;
    speakEnglish(bunCurrentRound.word);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    bunRoundIndex++;
    setTimeout(bunNextRound, 1300);
}

/** Cáo tới nơi nhưng thỏ vẫn kịp chạy thoát an toàn — cố tình KHÔNG coi đây là "thua", chỉ lộ
 * đáp án nhẹ nhàng rồi sang từ tiếp theo, giữ trải nghiệm tích cực phù hợp với bé lớp 2. */
function bunRoundEscape() {
    bunCurrentRound.locked = true;
    bunEscapeCount++;
    bunCurrentRound.word.split('').forEach(ch => bunCurrentRound.guessed.add(ch));
    bunRenderBlanks();
    const statusEl = document.getElementById('bun-status');
    statusEl.className = 'text-sm font-bold text-amber-600 text-center min-h-[18px]';
    statusEl.textContent = `Thỏ đã kịp chạy vào hang an toàn rồi! Từ đó là "${bunCurrentRound.word}" (${bunCurrentRound.vi})`;
    speakEnglish(bunCurrentRound.word);
    bunRoundIndex++;
    setTimeout(bunNextRound, 1600);
}

function bunFinishGame() {
    clearInterval(bunTimerInterval);
    const diff = BUN_DIFFICULTIES[bunCurrentDifficulty];
    const secs = Math.floor((Date.now() - bunStartTime) / 1000);
    const mm = String(Math.floor(secs / 60)).padStart(2, '0');
    const ss = String(secs % 60).padStart(2, '0');
    confetti({ particleCount: 80, spread: 75, origin: { y: 0.6 } });

    const container = document.getElementById('game-play-container');
    container.innerHTML = `
        <div class="pastel-card bg-white p-6 flex flex-col items-center text-center">
            <div class="text-5xl mb-2">🐰🎉</div>
            <h3 class="font-extrabold text-emerald-600 text-lg mb-3">Xong rồi! Đã cứu ${bunScore}/${diff.rounds} chú thỏ!</h3>
            <div class="grid grid-cols-3 gap-2.5 w-full max-w-sm mb-4">
                <div class="bg-emerald-50 rounded-xl p-2.5 border border-emerald-200">
                    <div class="text-[10px] font-bold text-emerald-500">Cứu được</div>
                    <div class="text-base font-black text-emerald-700">${bunScore}/${diff.rounds}</div>
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
                <button onclick="bunStartWithDifficulty('${bunCurrentDifficulty}')" class="flex-1 py-2.5 bg-gradient-to-r from-lime-500 to-emerald-500 text-white font-black rounded-2xl text-sm pastel-btn shadow-md">🔄 Chơi lại (${diff.label})</button>
                <button onclick="renderBunnyDifficultyScreen()" class="flex-1 py-2.5 bg-gray-100 text-gray-600 font-black rounded-2xl text-sm pastel-btn">Đổi độ khó</button>
            </div>
        </div>`;
}

/** Thêm 1 lần duy nhất khối CSS cho: hoa/cây đung đưa tại chỗ + mây/bướm/ong/chim bay ngang qua
 * đồng cỏ. Con cáo di chuyển bằng cách đổi trực tiếp style.left (transition CSS có sẵn trong
 * class ở HTML), không cần thêm keyframe riêng. */
function bunInjectStyleOnce() {
    if (document.getElementById('bun-style')) return;
    const style = document.createElement('style');
    style.id = 'bun-style';
    style.textContent = `
        @keyframes bunSway {
            0%, 100% { transform: rotate(-6deg); }
            50%      { transform: rotate(6deg); }
        }
        .bun-deco { position: absolute; transform-origin: bottom center; animation: bunSway 2.8s ease-in-out infinite; }

        @keyframes bunRoamRight { 0% { left: -12%; transform: scaleX(-1); } 100% { left: 108%; transform: scaleX(-1); } }
        @keyframes bunRoamLeft  { 0% { left: 108%;  transform: scaleX(1);  } 100% { left: -12%; transform: scaleX(1); } }
        .bun-roam { position: absolute; animation-timing-function: linear; animation-iteration-count: infinite; opacity: 0.9; }
        .bun-roam-right { animation-name: bunRoamRight; }
        .bun-roam-left  { animation-name: bunRoamLeft; }
    `;
    document.head.appendChild(style);
}
