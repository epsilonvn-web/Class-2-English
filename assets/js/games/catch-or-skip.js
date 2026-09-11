// ==========================================
// GAME: CATCH OR SKIP
// Nguồn dữ liệu duy nhất: Chuyên mục 2.1 - Flashcards Library.
// Cách chơi: nếu cặp English ↔ Tiếng Việt đúng thì CATCH, sai thì SKIP.
// ==========================================
let cosTopicId = 'all';
let cosDifficulty = 'easy';
let cosPool = [];
let cosRoundIndex = 0;
let cosScore = 0;
let cosWrongCount = 0;
let cosStartTime = 0;
let cosTimerInterval = null;
let cosCurrent = null;
let cosLocked = false;
let cosUsed = new Set();

const COS_DIFFICULTIES = {
    easy:   { label: 'Dễ',  rounds: 8,  trueRate: 0.65, note: '8 lượt' },
    medium: { label: 'Vừa', rounds: 10, trueRate: 0.55, note: '10 lượt' },
    hard:   { label: 'Khó', rounds: 12, trueRate: 0.50, note: '12 lượt' }
};

async function startCatchOrSkipGame() {
    showLoadingOverlay('Đang chuẩn bị Catch or Skip từ Chuyên mục 2.1...');
    try {
        await ensureMiniGameVocabReady();
        hideLoadingOverlay();
        cosRenderTopicScreen();
    } catch (e) {
        hideLoadingOverlay();
        alert('Không tải được dữ liệu Catch or Skip: ' + e.message);
    }
}

function cosRenderTopicScreen() {
    clearInterval(cosTimerInterval);
    headerLevel3ClickHandler = null;
    document.getElementById('game-play-container').innerHTML = renderMiniGameTopicMenu({
        gameKey: 'catch-or-skip',
        onChoose: 'cosChooseTopic',
        subtitle: 'Chọn 1 trong 6 Nhóm từ vựng để bắt đầu chơi Catch or Skip nhé!',
        countFilter: item => item.word && item.vietnamese
    });
}

function cosChooseTopic(topicId) {
    cosTopicId = topicId;
    const groups = getMiniGameTopicGroups();
    const group = groups.find(g => Number(g.id) === Number(topicId));
    const name = topicId === 'all' ? 'Trộn tất cả chủ đề' : (group?.name || `Nhóm ${topicId}`);
    document.getElementById('game-play-container').innerHTML = `
        <div class="pastel-card bg-white p-5 text-center">
            <div class="text-5xl mb-2">⚡</div>
            <h3 class="font-black text-orange-600 text-lg">Chọn độ khó</h3>
            <p class="text-xs text-gray-500 font-bold mb-4">${cosEscapeHtml(name)}</p>
            <div class="grid grid-cols-3 gap-2.5 max-w-md mx-auto">
                ${Object.entries(COS_DIFFICULTIES).map(([key,d]) => `<button onclick="cosStartWithDifficulty('${key}')" class="pastel-btn p-3 rounded-2xl border-2 border-orange-200 bg-orange-50 hover:bg-orange-100">
                    <div class="font-black text-orange-700">${d.label}</div>
                    <div class="text-xs font-bold text-gray-500 mt-1">${d.note}</div>
                </button>`).join('')}
            </div>
            <button onclick="cosRenderTopicScreen()" class="mt-4 text-xs font-black text-pink-600 bg-pink-50 border border-pink-200 px-4 py-2 rounded-xl pastel-btn">← Chọn lại nhóm từ</button>
        </div>`;
}

function cosStartWithDifficulty(key) {
    cosDifficulty = key;
    const diff = COS_DIFFICULTIES[key];
    let pool = getMiniGameVocabPool({ topicId: cosTopicId }).filter(x => x.word && x.vietnamese);
    const unique = new Map();
    pool.forEach(x => { const k = x.word.toLowerCase(); if (!unique.has(k)) unique.set(k, x); });
    cosPool = shuffleArray([...unique.values()]);
    if (cosPool.length < 6) {
        alert('Nhóm này chưa đủ từ để chơi Catch or Skip.');
        return;
    }
    cosRoundIndex = 0;
    cosScore = 0;
    cosWrongCount = 0;
    cosUsed = new Set();
    cosStartTime = Date.now();
    clearInterval(cosTimerInterval);
    cosTimerInterval = setInterval(cosUpdateTimer, 1000);
    headerLevel3ClickHandler = () => cosChooseTopic(cosTopicId);
    cosNextRound();
}

function cosPickItem() {
    let candidates = cosPool.filter(x => !cosUsed.has(x.id || x.word.toLowerCase()));
    if (!candidates.length) { cosUsed.clear(); candidates = cosPool.slice(); }
    const item = candidates[Math.floor(Math.random() * candidates.length)];
    cosUsed.add(item.id || item.word.toLowerCase());
    return item;
}

function cosNextRound() {
    const diff = COS_DIFFICULTIES[cosDifficulty];
    if (cosRoundIndex >= diff.rounds) return cosFinish();
    cosLocked = false;
    const item = cosPickItem();
    const isMatch = Math.random() < diff.trueRate;
    let shownMeaning = item.vietnamese;
    let shownEmoji = item.emoji || '✨';
    let actualMatch = isMatch;
    if (!isMatch) {
        const other = shuffleArray(cosPool.filter(x => x.word.toLowerCase() !== item.word.toLowerCase() && x.vietnamese !== item.vietnamese))[0];
        if (other) {
            shownMeaning = other.vietnamese;
            shownEmoji = other.emoji || '✨';
        } else {
            actualMatch = true;
        }
    }
    cosCurrent = { item, shownMeaning, shownEmoji, isMatch: actualMatch };
    cosRenderRound();
}

function cosRenderRound() {
    const diff = COS_DIFFICULTIES[cosDifficulty];
    document.getElementById('game-play-container').innerHTML = `
        <div class="pastel-card bg-white p-3.5 md:p-5 overflow-hidden">
            <div class="flex items-center justify-between gap-2 mb-3 flex-wrap">
                <span id="cos-timer" class="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-full text-xs font-black text-slate-600">⏱️ 00:00</span>
                <span class="px-2.5 py-1 bg-orange-50 border border-orange-200 rounded-full text-xs font-black text-orange-700">🎯 ${cosRoundIndex + 1}/${diff.rounds}</span>
                <span id="cos-score" class="px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-black text-emerald-700">⭐ ${cosScore}</span>
            </div>
            <div class="max-w-lg mx-auto text-center">
                <p class="text-xs font-bold text-gray-400 mb-2">Hai mặt dưới đây có đúng nghĩa với nhau không?</p>
                <div id="cos-falling-card" class="rounded-3xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 via-white to-pink-50 p-5 shadow-md cos-float-card">
                    <div class="text-5xl mb-2">${cosCurrent.shownEmoji}</div>
                    <div class="text-2xl md:text-3xl font-black text-indigo-700">${cosEscapeHtml(cosCurrent.item.word)}</div>
                    <div class="my-2 text-gray-300 font-black">↕</div>
                    <div class="text-lg md:text-xl font-black text-pink-600">${cosEscapeHtml(cosCurrent.shownMeaning)}</div>
                    <button onclick="speakEnglish('${cosEscapeJs(cosCurrent.item.word)}')" class="mt-3 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-black pastel-btn">🔊 Nghe từ</button>
                </div>
                <div class="grid grid-cols-2 gap-3 mt-4">
                    <button onclick="cosAnswer(true)" class="py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-base shadow-md pastel-btn">🧤 CATCH</button>
                    <button onclick="cosAnswer(false)" class="py-3 rounded-2xl bg-gradient-to-r from-slate-500 to-gray-600 text-white font-black text-base shadow-md pastel-btn">⏭️ SKIP</button>
                </div>
                <p id="cos-status" class="min-h-[24px] text-sm font-black mt-3"></p>
            </div>
        </div>`;
    cosEnsureStyles();
    cosUpdateTimer();
}

function cosAnswer(userSaysMatch) {
    if (cosLocked || !cosCurrent) return;
    cosLocked = true;
    const correct = userSaysMatch === cosCurrent.isMatch;
    const status = document.getElementById('cos-status');
    if (correct) {
        cosScore += 10;
        playAudio('correct');
        if (status) { status.textContent = cosCurrent.isMatch ? '✅ Bắt đúng rồi!' : '✅ Bỏ qua chính xác!'; status.className = 'min-h-[24px] text-sm font-black mt-3 text-emerald-600'; }
        speakEnglish(cosCurrent.item.word);
    } else {
        cosWrongCount++;
        playAudio('wrong');
        if (status) {
            status.textContent = cosCurrent.isMatch ? `❌ Cặp này đúng: ${cosCurrent.item.word} = ${cosCurrent.item.vietnamese}` : `❌ Cặp này sai, cần SKIP!`;
            status.className = 'min-h-[24px] text-sm font-black mt-3 text-rose-500';
        }
    }
    const scoreEl = document.getElementById('cos-score');
    if (scoreEl) scoreEl.textContent = `⭐ ${cosScore}`;
    cosRoundIndex++;
    document.querySelectorAll('#game-play-container button').forEach(b => b.disabled = true);
    setTimeout(cosNextRound, 850);
}

function cosUpdateTimer() {
    const el = document.getElementById('cos-timer');
    if (!el || !cosStartTime) return;
    const secs = Math.floor((Date.now() - cosStartTime) / 1000);
    el.textContent = `⏱️ ${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`;
}

function cosFinish() {
    clearInterval(cosTimerInterval);
    playAudio('win');
    const diff = COS_DIFFICULTIES[cosDifficulty];
    const secs = Math.floor((Date.now() - cosStartTime) / 1000);
    document.getElementById('game-play-container').innerHTML = `
        <div class="pastel-card bg-white p-6 text-center">
            <div class="text-6xl mb-2">🎯🏆</div>
            <h3 class="text-xl font-black text-orange-600">Hoàn thành Catch or Skip!</h3>
            <div class="grid grid-cols-3 gap-2 max-w-md mx-auto my-4">
                <div class="rounded-2xl bg-emerald-50 border border-emerald-200 p-3"><div class="text-xl font-black text-emerald-700">${cosScore}</div><div class="text-[10px] font-bold text-gray-500">Điểm</div></div>
                <div class="rounded-2xl bg-rose-50 border border-rose-200 p-3"><div class="text-xl font-black text-rose-600">${cosWrongCount}</div><div class="text-[10px] font-bold text-gray-500">Lần sai</div></div>
                <div class="rounded-2xl bg-cyan-50 border border-cyan-200 p-3"><div class="text-xl font-black text-cyan-700">${Math.floor(secs/60)}:${String(secs%60).padStart(2,'0')}</div><div class="text-[10px] font-bold text-gray-500">Thời gian</div></div>
            </div>
            <div class="flex justify-center gap-2 flex-wrap">
                <button onclick="cosStartWithDifficulty('${cosDifficulty}')" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-sm pastel-btn">🔄 Chơi lại ${diff.label}</button>
                <button onclick="cosRenderTopicScreen()" class="px-5 py-2.5 rounded-xl bg-pink-50 border border-pink-200 text-pink-700 font-black text-sm pastel-btn">📚 Đổi nhóm từ</button>
            </div>
        </div>`;
}

function cosEnsureStyles() {
    if (document.getElementById('cos-game-style')) return;
    const style = document.createElement('style');
    style.id = 'cos-game-style';
    style.textContent = `
        @keyframes cosFloatCard { 0%,100% { transform: translateY(0) rotate(-0.5deg); } 50% { transform: translateY(7px) rotate(0.5deg); } }
        .cos-float-card { animation: cosFloatCard 1.8s ease-in-out infinite; }
    `;
    document.head.appendChild(style);
}

function cosEscapeHtml(v) { return String(v ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
function cosEscapeJs(v) { return String(v ?? '').replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/\r?\n/g,' '); }
