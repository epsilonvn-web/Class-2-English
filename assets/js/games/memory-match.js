// ==========================================
// GAME: MEMORY MATCH
// Ghép cặp English <-> Vietnamese. Nguồn duy nhất: Chuyên mục 2.1.
// ==========================================
let mmTopicId = 'all';
let mmDifficulty = 'easy';
let mmCards = [];
let mmFirstIndex = null;
let mmLocked = false;
let mmMatchedPairs = 0;
let mmMoves = 0;
let mmStartTime = 0;
let mmTimerInterval = null;

const MM_DIFFICULTIES = {
    easy:   { label: 'Dễ', pairs: 6 },
    medium: { label: 'Vừa', pairs: 8 },
    hard:   { label: 'Khó', pairs: 10 }
};

async function startMemoryMatchGame() {
    showLoadingOverlay('Đang chuẩn bị bộ thẻ từ Chuyên mục 2.1...');
    try {
        await ensureMiniGameVocabReady();
        hideLoadingOverlay();
        mmRenderTopicScreen();
    } catch (e) {
        hideLoadingOverlay();
        alert('Không tải được dữ liệu Memory Match: ' + e.message);
    }
}

function mmRenderTopicScreen() {
    clearInterval(mmTimerInterval);
    headerLevel3ClickHandler = null;
    document.getElementById('game-play-container').innerHTML = renderMiniGameTopicMenu({
        gameKey: 'memory-match',
        onChoose: 'mmChooseTopic',
        subtitle: 'Chọn 1 trong 6 Nhóm từ vựng để chơi Memory Match nhé!'
    });
}

function mmChooseTopic(topicId) {
    mmTopicId = topicId;
    const container = document.getElementById('game-play-container');
    container.innerHTML = `
        <div class="pastel-card bg-white p-5 text-center">
            <div class="text-5xl mb-2">🃏</div>
            <h3 class="font-black text-fuchsia-700 text-lg mb-3">Chọn số cặp thẻ</h3>
            <div class="grid grid-cols-3 gap-2.5 max-w-md mx-auto">
                ${Object.entries(MM_DIFFICULTIES).map(([key,d]) => `<button onclick="mmStartWithDifficulty('${key}')" class="pastel-btn p-3 rounded-2xl border-2 border-fuchsia-200 bg-fuchsia-50 hover:bg-fuchsia-100"><div class="font-black text-fuchsia-700">${d.label}</div><div class="text-xs font-bold text-gray-500">${d.pairs} cặp</div></button>`).join('')}
            </div>
            <button onclick="mmRenderTopicScreen()" class="mt-4 text-xs font-black text-pink-600 bg-pink-50 border border-pink-200 px-4 py-2 rounded-xl pastel-btn">← Chọn lại nhóm từ</button>
        </div>`;
}

function mmStartWithDifficulty(diffKey) {
    mmDifficulty = diffKey;
    const diff = MM_DIFFICULTIES[diffKey];
    let pool = getMiniGameVocabPool({ topicId: mmTopicId }).filter(x => x.word && x.vietnamese);
    const unique = new Map();
    pool.forEach(x => { const k=x.word.toLowerCase(); if(!unique.has(k)) unique.set(k,x); });
    pool = shuffleArray([...unique.values()]);
    if (pool.length < diff.pairs) {
        alert('Nhóm từ này chưa đủ số cặp để chơi mức đã chọn.');
        return;
    }

    const chosen = pool.slice(0, diff.pairs);
    mmCards = shuffleArray(chosen.flatMap((item, pairId) => [
        { pairId, type:'en', text:item.word, emoji:item.emoji || '🔤', matched:false, flipped:false },
        { pairId, type:'vi', text:item.vietnamese, emoji:'🇻🇳', matched:false, flipped:false }
    ]));
    mmFirstIndex = null;
    mmLocked = false;
    mmMatchedPairs = 0;
    mmMoves = 0;
    mmStartTime = Date.now();
    clearInterval(mmTimerInterval);
    mmTimerInterval = setInterval(mmUpdateTimer,1000);
    headerLevel3ClickHandler = () => mmChooseTopic(mmTopicId);
    mmRenderBoard();
}

function mmRenderBoard() {
    const diff = MM_DIFFICULTIES[mmDifficulty];
    const cols = diff.pairs <= 6 ? 'grid-cols-3 sm:grid-cols-4' : 'grid-cols-4 sm:grid-cols-5';
    const container = document.getElementById('game-play-container');
    container.innerHTML = `
        <div class="pastel-card bg-white p-3 md:p-4">
            <div class="flex items-center justify-between gap-2 mb-3 flex-wrap">
                <span id="mm-timer" class="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-full text-xs font-black text-slate-600">⏱️ 00:00</span>
                <span id="mm-progress" class="px-2.5 py-1 bg-fuchsia-50 border border-fuchsia-200 rounded-full text-xs font-black text-fuchsia-700">🧩 0/${diff.pairs}</span>
                <span id="mm-moves" class="px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs font-black text-amber-700">👆 0 lượt</span>
                <button onclick="mmStartWithDifficulty('${mmDifficulty}')" class="px-2.5 py-1 bg-indigo-50 border border-indigo-200 rounded-full text-xs font-black text-indigo-700 pastel-btn">🔄 Chơi lại</button>
            </div>
            <p class="text-center text-xs font-bold text-gray-400 mb-2">Ghép <span class="text-indigo-600">English</span> ↔ <span class="text-pink-600">Tiếng Việt</span></p>
            <div id="mm-board" class="grid ${cols} gap-2 max-w-xl mx-auto">
                ${mmCards.map((card,i) => mmCardHtml(card,i)).join('')}
            </div>
            <p id="mm-status" class="text-center min-h-[22px] text-sm font-black mt-3 text-fuchsia-600"></p>
        </div>`;
    mmUpdateTimer();
}

function mmCardHtml(card, i) {
    const shown = card.flipped || card.matched;
    const matchedClass = card.matched ? 'border-emerald-300 bg-emerald-50 text-emerald-700' : shown ? (card.type==='en' ? 'border-indigo-300 bg-indigo-50 text-indigo-700' : 'border-pink-300 bg-pink-50 text-pink-700') : 'border-purple-200 bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white';
    return `<button id="mm-card-${i}" onclick="mmFlipCard(${i})" class="relative min-h-[78px] sm:min-h-[88px] rounded-2xl border-2 p-2 shadow-sm pastel-btn flex flex-col items-center justify-center ${matchedClass} ${card.matched?'opacity-70':''}" ${card.matched?'disabled':''}>
        ${shown ? `<span class="text-xl mb-1">${card.emoji}</span><span class="text-[11px] sm:text-xs font-black leading-tight break-words w-full">${mmEscapeHtml(card.text)}</span>` : `<span class="text-2xl">❓</span><span class="text-[9px] font-black opacity-80 mt-1">LẬT THẺ</span>`}
    </button>`;
}

function mmFlipCard(index) {
    if (mmLocked) return;
    const card = mmCards[index];
    if (!card || card.matched || card.flipped) return;
    card.flipped = true;
    if (card.type === 'en') speakEnglish(card.text);
    mmRefreshCard(index);

    if (mmFirstIndex === null) {
        mmFirstIndex = index;
        return;
    }

    mmMoves++;
    const first = mmCards[mmFirstIndex];
    const second = card;
    const movesEl = document.getElementById('mm-moves');
    if (movesEl) movesEl.textContent = `👆 ${mmMoves} lượt`;

    if (first.pairId === second.pairId && first.type !== second.type) {
        first.matched = true;
        second.matched = true;
        mmMatchedPairs++;
        playAudio('correct');
        const status = document.getElementById('mm-status');
        if (status) status.textContent = '✅ Ghép đúng một cặp!';
        mmRefreshCard(mmFirstIndex);
        mmRefreshCard(index);
        mmFirstIndex = null;
        const progress = document.getElementById('mm-progress');
        if (progress) progress.textContent = `🧩 ${mmMatchedPairs}/${MM_DIFFICULTIES[mmDifficulty].pairs}`;
        if (mmMatchedPairs >= MM_DIFFICULTIES[mmDifficulty].pairs) setTimeout(mmFinish,650);
    } else {
        playAudio('wrong');
        mmLocked = true;
        const firstIndex = mmFirstIndex;
        mmFirstIndex = null;
        setTimeout(() => {
            mmCards[firstIndex].flipped = false;
            mmCards[index].flipped = false;
            mmRefreshCard(firstIndex);
            mmRefreshCard(index);
            mmLocked = false;
        }, 850);
    }
}

function mmRefreshCard(index) {
    const old = document.getElementById(`mm-card-${index}`);
    if (!old) return;
    const wrap = document.createElement('div');
    wrap.innerHTML = mmCardHtml(mmCards[index], index).trim();
    old.replaceWith(wrap.firstChild);
}

function mmUpdateTimer() {
    const el = document.getElementById('mm-timer');
    if (!el || !mmStartTime) return;
    const secs = Math.floor((Date.now()-mmStartTime)/1000);
    el.textContent = `⏱️ ${String(Math.floor(secs/60)).padStart(2,'0')}:${String(secs%60).padStart(2,'0')}`;
}

function mmFinish() {
    clearInterval(mmTimerInterval);
    playAudio('win');
    const secs = Math.floor((Date.now()-mmStartTime)/1000);
    const pairs = MM_DIFFICULTIES[mmDifficulty].pairs;
    const stars = mmMoves <= pairs+2 ? 3 : mmMoves <= pairs*2 ? 2 : 1;
    document.getElementById('game-play-container').innerHTML = `
        <div class="pastel-card bg-white p-6 text-center">
            <div class="text-6xl">${'⭐'.repeat(stars)}</div>
            <h3 class="font-black text-fuchsia-700 text-xl mt-2">Memory Match hoàn thành!</h3>
            <p class="text-sm text-gray-500 font-bold mt-1">Con đã ghép đúng ${pairs}/${pairs} cặp từ.</p>
            <div class="flex justify-center gap-3 my-4">
                <span class="px-4 py-2 bg-amber-50 border border-amber-200 rounded-xl font-black text-amber-700">👆 ${mmMoves} lượt</span>
                <span class="px-4 py-2 bg-cyan-50 border border-cyan-200 rounded-xl font-black text-cyan-700">⏱️ ${Math.floor(secs/60)}:${String(secs%60).padStart(2,'0')}</span>
            </div>
            <div class="flex justify-center gap-2 flex-wrap">
                <button onclick="mmStartWithDifficulty('${mmDifficulty}')" class="px-5 py-2.5 bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white rounded-xl font-black pastel-btn">🔄 Chơi lại</button>
                <button onclick="mmRenderTopicScreen()" class="px-5 py-2.5 bg-pink-50 border border-pink-200 text-pink-700 rounded-xl font-black pastel-btn">📚 Đổi nhóm từ</button>
            </div>
        </div>`;
}

function mmEscapeHtml(value) {
    return String(value ?? '').replace(/[&<>'"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[c]));
}
