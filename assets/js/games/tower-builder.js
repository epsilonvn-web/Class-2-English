// ==========================================
// GAME: TOWER BUILDER
// Nguồn dữ liệu duy nhất: Chuyên mục 2.1 - Flashcards Library.
// Trả lời đúng để xây thêm từng tầng tháp.
// ==========================================
let tbTopicId = 'all';
let tbDifficulty = 'easy';
let tbPool = [];
let tbRoundIndex = 0;
let tbScore = 0;
let tbWrongCount = 0;
let tbBuilt = [];
let tbCurrent = null;
let tbCurrentChoices = [];
let tbStartTime = 0;
let tbTimerInterval = null;
let tbLocked = false;
let tbUsed = new Set();

const TB_DIFFICULTIES = {
    easy:   { label: 'Dễ', floors: 6, choices: 3 },
    medium: { label: 'Vừa', floors: 8, choices: 4 },
    hard:   { label: 'Khó', floors: 10, choices: 5 }
};

async function startTowerBuilderGame() {
    showLoadingOverlay('Đang chuyển vật liệu xây tháp từ Chuyên mục 2.1...');
    try {
        await ensureMiniGameVocabReady();
        hideLoadingOverlay();
        tbRenderTopicScreen();
    } catch (e) {
        hideLoadingOverlay();
        alert('Không tải được dữ liệu Tower Builder: ' + e.message);
    }
}

function tbRenderTopicScreen() {
    clearInterval(tbTimerInterval);
    headerLevel3ClickHandler = null;
    document.getElementById('game-play-container').innerHTML = renderMiniGameTopicMenu({
        gameKey: 'tower-builder',
        onChoose: 'tbChooseTopic',
        subtitle: 'Chọn 1 trong 6 Nhóm từ vựng để bắt đầu xây tháp nhé!',
        countFilter: item => item.word && item.vietnamese && item.word.length <= 20
    });
}

function tbChooseTopic(topicId) {
    tbTopicId = topicId;
    document.getElementById('game-play-container').innerHTML = `
        <div class="pastel-card bg-white p-5 text-center">
            <div class="text-5xl mb-2">🧱</div>
            <h3 class="font-black text-amber-600 text-lg mb-3">Chọn chiều cao tháp</h3>
            <div class="grid grid-cols-3 gap-2.5 max-w-md mx-auto">
                ${Object.entries(TB_DIFFICULTIES).map(([key,d]) => `<button onclick="tbStartWithDifficulty('${key}')" class="pastel-btn p-3 rounded-2xl border-2 border-amber-200 bg-amber-50 hover:bg-amber-100">
                    <div class="font-black text-amber-700">${d.label}</div>
                    <div class="text-xs font-bold text-gray-500 mt-1">${d.floors} tầng</div>
                    <div class="text-[10px] font-bold text-gray-400">${d.choices} đáp án</div>
                </button>`).join('')}
            </div>
            <button onclick="tbRenderTopicScreen()" class="mt-4 text-xs font-black text-pink-600 bg-pink-50 border border-pink-200 px-4 py-2 rounded-xl pastel-btn">← Chọn lại nhóm từ</button>
        </div>`;
}

function tbStartWithDifficulty(key) {
    tbDifficulty = key;
    const diff = TB_DIFFICULTIES[key];
    let pool = getMiniGameVocabPool({ topicId: tbTopicId }).filter(x => x.word && x.vietnamese && x.word.length <= 20);
    const unique = new Map();
    pool.forEach(x => { const k = x.word.toLowerCase(); if (!unique.has(k)) unique.set(k, x); });
    tbPool = shuffleArray([...unique.values()]);
    if (tbPool.length < diff.choices + 2) { alert('Nhóm này chưa đủ từ để xây tháp ở mức đã chọn.'); return; }
    tbRoundIndex = 0;
    tbScore = 0;
    tbWrongCount = 0;
    tbBuilt = [];
    tbUsed = new Set();
    tbStartTime = Date.now();
    clearInterval(tbTimerInterval);
    tbTimerInterval = setInterval(tbUpdateTimer, 1000);
    headerLevel3ClickHandler = () => tbChooseTopic(tbTopicId);
    tbNextRound();
}

function tbPickItem() {
    let candidates = tbPool.filter(x => !tbUsed.has(x.id || x.word.toLowerCase()));
    if (!candidates.length) { tbUsed.clear(); candidates = tbPool.slice(); }
    const item = candidates[Math.floor(Math.random() * candidates.length)];
    tbUsed.add(item.id || item.word.toLowerCase());
    return item;
}

function tbNextRound() {
    const diff = TB_DIFFICULTIES[tbDifficulty];
    if (tbRoundIndex >= diff.floors) return tbFinish();
    tbLocked = false;
    tbCurrent = tbPickItem();
    const distractors = shuffleArray(tbPool.filter(x => x.word.toLowerCase() !== tbCurrent.word.toLowerCase())).slice(0, diff.choices - 1);
    tbCurrentChoices = shuffleArray([tbCurrent, ...distractors]);
    tbRenderRound();
}

function tbRenderRound() {
    const diff = TB_DIFFICULTIES[tbDifficulty];
    const cols = diff.choices <= 3 ? 'grid-cols-3' : diff.choices === 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2 sm:grid-cols-5';
    document.getElementById('game-play-container').innerHTML = `
        <div class="pastel-card bg-white p-3 md:p-4">
            <div class="flex items-center justify-between gap-2 mb-3 flex-wrap">
                <span id="tb-timer" class="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-full text-xs font-black text-slate-600">⏱️ 00:00</span>
                <span class="px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs font-black text-amber-700">🏗️ Tầng ${tbRoundIndex + 1}/${diff.floors}</span>
                <span id="tb-score" class="px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-black text-emerald-700">⭐ ${tbScore}</span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 items-stretch">
                <div class="rounded-2xl border-2 border-amber-100 bg-gradient-to-b from-sky-50 to-emerald-50 p-3 flex flex-col justify-end min-h-[270px] overflow-hidden">
                    <div class="text-center text-xs font-black text-gray-400 mb-2">THÁP CỦA CON</div>
                    <div id="tb-tower" class="flex flex-col-reverse items-center justify-start gap-1 flex-1">${tbRenderTowerFloors(diff.floors)}</div>
                    <div class="h-3 rounded-full bg-emerald-300 mt-2"></div>
                </div>
                <div class="flex flex-col justify-center">
                    <div class="text-center bg-gradient-to-r from-pink-50 to-amber-50 border-2 border-pink-100 rounded-2xl p-4 mb-4">
                        <div class="text-5xl mb-1">${tbCurrent.emoji || '✨'}</div>
                        <div class="text-[10px] uppercase tracking-wide font-black text-gray-400">Chọn từ tiếng Anh có nghĩa là</div>
                        <div class="text-xl md:text-2xl font-black text-pink-600 mt-1">${tbEscapeHtml(tbCurrent.vietnamese)}</div>
                    </div>
                    <div class="grid ${cols} gap-2">
                        ${tbCurrentChoices.map((x,i) => `<button id="tb-choice-${i}" onclick="tbChooseAnswer(${i})" class="min-h-[58px] rounded-2xl border-2 border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-black text-xs sm:text-sm p-2 pastel-btn">${tbEscapeHtml(x.word)}</button>`).join('')}
                    </div>
                    <p id="tb-status" class="min-h-[24px] text-center text-sm font-black mt-3"></p>
                </div>
            </div>
        </div>`;
    tbEnsureStyles();
    tbUpdateTimer();
}

function tbRenderTowerFloors(totalFloors) {
    const palette = ['bg-pink-300 border-pink-400','bg-violet-300 border-violet-400','bg-cyan-300 border-cyan-400','bg-amber-300 border-amber-400','bg-emerald-300 border-emerald-400'];
    const built = tbBuilt.map((_,i) => {
        const width = 96 - Math.min(i * 5, 36);
        return `<div class="h-6 rounded-md border-2 ${palette[i % palette.length]} shadow-sm tb-floor" style="width:${width}%"></div>`;
    }).join('');
    const empty = [...Array(Math.max(0,totalFloors - tbBuilt.length))].map(() => `<div class="h-2 w-2 rounded-full bg-gray-200"></div>`).join('');
    return `${built}${empty}`;
}

function tbChooseAnswer(index) {
    if (tbLocked || !tbCurrent) return;
    const chosen = tbCurrentChoices[index];
    const status = document.getElementById('tb-status');
    if (chosen.word.toLowerCase() === tbCurrent.word.toLowerCase()) {
        tbLocked = true;
        tbScore += 10;
        tbBuilt.push(tbCurrent.word);
        playAudio('correct');
        speakEnglish(tbCurrent.word);
        if (status) { status.textContent = '🧱 Chính xác! Thêm một tầng mới!'; status.className = 'min-h-[24px] text-center text-sm font-black mt-3 text-emerald-600'; }
        const score = document.getElementById('tb-score'); if (score) score.textContent = `⭐ ${tbScore}`;
        const btn = document.getElementById(`tb-choice-${index}`); if (btn) btn.classList.add('bg-emerald-100','border-emerald-400','text-emerald-700');
        const tower = document.getElementById('tb-tower'); if (tower) tower.innerHTML = tbRenderTowerFloors(TB_DIFFICULTIES[tbDifficulty].floors);
        tbRoundIndex++;
        if (typeof confetti === 'function') confetti({ particleCount: 18, spread: 40, origin: { y: 0.65 } });
        setTimeout(tbNextRound, 850);
    } else {
        tbWrongCount++;
        playAudio('wrong');
        const btn = document.getElementById(`tb-choice-${index}`);
        if (btn) { btn.classList.add('bg-rose-50','border-rose-300','text-rose-600'); setTimeout(() => btn.classList.remove('bg-rose-50','border-rose-300','text-rose-600'), 450); }
        if (status) { status.textContent = '❌ Chưa đúng, chọn viên gạch khác nhé!'; status.className = 'min-h-[24px] text-center text-sm font-black mt-3 text-rose-500'; }
    }
}

function tbUpdateTimer() {
    const el = document.getElementById('tb-timer');
    if (!el || !tbStartTime) return;
    const secs = Math.floor((Date.now() - tbStartTime) / 1000);
    el.textContent = `⏱️ ${String(Math.floor(secs/60)).padStart(2,'0')}:${String(secs%60).padStart(2,'0')}`;
}

function tbFinish() {
    clearInterval(tbTimerInterval);
    playAudio('win');
    if (typeof confetti === 'function') confetti({ particleCount: 100, spread: 85, origin: { y: 0.6 } });
    const diff = TB_DIFFICULTIES[tbDifficulty];
    const secs = Math.floor((Date.now() - tbStartTime) / 1000);
    document.getElementById('game-play-container').innerHTML = `
        <div class="pastel-card bg-white p-6 text-center">
            <div class="text-6xl mb-2">🏰</div>
            <h3 class="text-xl font-black text-amber-600">Xây tháp hoàn thành!</h3>
            <p class="text-sm font-bold text-gray-500 mt-1">Con đã xây đủ ${diff.floors} tầng.</p>
            <div class="grid grid-cols-3 gap-2 max-w-md mx-auto my-4">
                <div class="rounded-2xl bg-emerald-50 border border-emerald-200 p-3"><div class="text-xl font-black text-emerald-700">${tbScore}</div><div class="text-[10px] font-bold text-gray-500">Điểm</div></div>
                <div class="rounded-2xl bg-rose-50 border border-rose-200 p-3"><div class="text-xl font-black text-rose-600">${tbWrongCount}</div><div class="text-[10px] font-bold text-gray-500">Lần sai</div></div>
                <div class="rounded-2xl bg-cyan-50 border border-cyan-200 p-3"><div class="text-xl font-black text-cyan-700">${Math.floor(secs/60)}:${String(secs%60).padStart(2,'0')}</div><div class="text-[10px] font-bold text-gray-500">Thời gian</div></div>
            </div>
            <div class="flex justify-center gap-2 flex-wrap">
                <button onclick="tbStartWithDifficulty('${tbDifficulty}')" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-sm pastel-btn">🔄 Xây lại ${diff.label}</button>
                <button onclick="tbRenderTopicScreen()" class="px-5 py-2.5 rounded-xl bg-pink-50 border border-pink-200 text-pink-700 font-black text-sm pastel-btn">📚 Đổi nhóm từ</button>
            </div>
        </div>`;
}

function tbEnsureStyles() {
    if (document.getElementById('tb-game-style')) return;
    const style = document.createElement('style');
    style.id = 'tb-game-style';
    style.textContent = `@keyframes tbFloorIn { from { transform: translateY(-18px) scale(.85); opacity:0; } to { transform:translateY(0) scale(1); opacity:1; } } .tb-floor:last-of-type { animation: tbFloorIn .35s ease-out; }`;
    document.head.appendChild(style);
}

function tbEscapeHtml(v) { return String(v ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
