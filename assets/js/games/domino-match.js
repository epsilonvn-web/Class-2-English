// ==========================================
// GAME: DOMINO MATCH
// Nguồn dữ liệu duy nhất: Chuyên mục 2.1 - Flashcards Library.
// Nối chuỗi domino: đầu hở là nghĩa tiếng Việt, chọn quân có từ English tương ứng.
// ==========================================
let dmTopicId = 'all';
let dmDifficulty = 'easy';
let dmPool = [];
let dmSequence = [];
let dmStep = 0;
let dmScore = 0;
let dmWrongCount = 0;
let dmChain = [];
let dmChoices = [];
let dmStartTime = 0;
let dmTimerInterval = null;
let dmLocked = false;

const DM_DIFFICULTIES = {
    easy:   { label: 'Dễ', pieces: 6,  choices: 3 },
    medium: { label: 'Vừa', pieces: 8, choices: 4 },
    hard:   { label: 'Khó', pieces: 10, choices: 5 }
};

async function startDominoMatchGame() {
    showLoadingOverlay('Đang xếp domino từ Chuyên mục 2.1...');
    try {
        await ensureMiniGameVocabReady();
        hideLoadingOverlay();
        dmRenderTopicScreen();
    } catch (e) {
        hideLoadingOverlay();
        alert('Không tải được dữ liệu Domino Match: ' + e.message);
    }
}

function dmRenderTopicScreen() {
    clearInterval(dmTimerInterval);
    headerLevel3ClickHandler = null;
    document.getElementById('game-play-container').innerHTML = renderMiniGameTopicMenu({
        gameKey: 'domino-match',
        onChoose: 'dmChooseTopic',
        subtitle: 'Chọn 1 trong 6 Nhóm từ vựng để bắt đầu nối Domino nhé!',
        countFilter: item => item.word && item.vietnamese && item.word.length <= 18 && item.vietnamese.length <= 36
    });
}

function dmChooseTopic(topicId) {
    dmTopicId = topicId;
    document.getElementById('game-play-container').innerHTML = `
        <div class="pastel-card bg-white p-5 text-center">
            <div class="text-5xl mb-2">🁫</div>
            <h3 class="font-black text-slate-700 text-lg mb-3">Chọn độ dài chuỗi</h3>
            <div class="grid grid-cols-3 gap-2.5 max-w-md mx-auto">
                ${Object.entries(DM_DIFFICULTIES).map(([key,d]) => `<button onclick="dmStartWithDifficulty('${key}')" class="pastel-btn p-3 rounded-2xl border-2 border-slate-200 bg-slate-50 hover:bg-slate-100">
                    <div class="font-black text-slate-700">${d.label}</div>
                    <div class="text-xs font-bold text-gray-500 mt-1">${d.pieces} quân</div>
                    <div class="text-[10px] font-bold text-gray-400">${d.choices} lựa chọn</div>
                </button>`).join('')}
            </div>
            <button onclick="dmRenderTopicScreen()" class="mt-4 text-xs font-black text-pink-600 bg-pink-50 border border-pink-200 px-4 py-2 rounded-xl pastel-btn">← Chọn lại nhóm từ</button>
        </div>`;
}

function dmStartWithDifficulty(key) {
    dmDifficulty = key;
    const diff = DM_DIFFICULTIES[key];
    let pool = getMiniGameVocabPool({ topicId: dmTopicId }).filter(x => x.word && x.vietnamese && x.word.length <= 18 && x.vietnamese.length <= 36);
    const unique = new Map();
    pool.forEach(x => { const k = x.word.toLowerCase(); if (!unique.has(k)) unique.set(k, x); });
    dmPool = shuffleArray([...unique.values()]);
    if (dmPool.length < diff.pieces + diff.choices) { alert('Nhóm này chưa đủ từ để tạo chuỗi Domino ở mức đã chọn.'); return; }
    dmSequence = dmPool.slice(0, diff.pieces);
    dmStep = 0;
    dmScore = 0;
    dmWrongCount = 0;
    dmChain = [];
    dmStartTime = Date.now();
    clearInterval(dmTimerInterval);
    dmTimerInterval = setInterval(dmUpdateTimer, 1000);
    headerLevel3ClickHandler = () => dmChooseTopic(dmTopicId);
    dmBuildChoices();
    dmRenderRound();
}

function dmBuildChoices() {
    const diff = DM_DIFFICULTIES[dmDifficulty];
    const correct = dmSequence[dmStep];
    const nextMeaning = dmStep + 1 < dmSequence.length ? dmSequence[dmStep + 1].vietnamese : '🏁 Đích';
    const correctPiece = { word: correct.word, leftMeaning: correct.vietnamese, rightMeaning: nextMeaning, isCorrect: true };
    let distractorItems = shuffleArray(dmPool.filter(x => x.word.toLowerCase() !== correct.word.toLowerCase()));
    if (distractorItems.length < diff.choices - 1) distractorItems = shuffleArray(dmPool.slice());
    const distractors = distractorItems.slice(0, diff.choices - 1).map((x,i) => {
        const right = dmPool[(dmStep + i + 3) % dmPool.length]?.vietnamese || '...';
        return { word: x.word, leftMeaning: x.vietnamese, rightMeaning: right, isCorrect: false };
    });
    dmChoices = shuffleArray([correctPiece, ...distractors]);
    dmLocked = false;
}

function dmRenderRound() {
    const diff = DM_DIFFICULTIES[dmDifficulty];
    const target = dmSequence[dmStep];
    const cols = diff.choices <= 3 ? 'grid-cols-3' : diff.choices === 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2 sm:grid-cols-5';
    document.getElementById('game-play-container').innerHTML = `
        <div class="pastel-card bg-white p-3 md:p-4">
            <div class="flex items-center justify-between gap-2 mb-3 flex-wrap">
                <span id="dm-timer" class="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-full text-xs font-black text-slate-600">⏱️ 00:00</span>
                <span class="px-2.5 py-1 bg-indigo-50 border border-indigo-200 rounded-full text-xs font-black text-indigo-700">🁢 ${dmStep + 1}/${diff.pieces}</span>
                <span id="dm-score" class="px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-black text-emerald-700">⭐ ${dmScore}</span>
            </div>
            <div class="rounded-2xl border-2 border-slate-100 bg-slate-50/60 p-3 mb-4 overflow-x-auto">
                <div class="text-[10px] font-black text-gray-400 uppercase tracking-wide mb-2">Chuỗi đã nối</div>
                <div class="flex items-center gap-2 min-w-max pb-1">
                    <div class="px-3 py-2 rounded-xl border-2 border-pink-200 bg-pink-50 text-pink-700 font-black text-xs">🚩 BẮT ĐẦU</div>
                    ${dmChain.map(p => `<span class="text-gray-300 font-black">→</span>${dmDominoHtml(p, true)}`).join('')}
                    <span class="text-gray-300 font-black">→</span>
                    <div class="px-3 py-2 rounded-xl border-2 border-dashed border-amber-300 bg-amber-50 text-amber-700 font-black text-xs animate-pulse">? ${dmEscapeHtml(target.vietnamese)}</div>
                </div>
            </div>
            <div class="text-center mb-3">
                <div class="text-xs font-black text-gray-400 uppercase tracking-wide">Đầu hở đang cần từ tiếng Anh của</div>
                <div class="text-xl md:text-2xl font-black text-pink-600 mt-1">${dmEscapeHtml(target.vietnamese)}</div>
                <div class="text-4xl mt-1">${target.emoji || '✨'}</div>
            </div>
            <div class="grid ${cols} gap-2 max-w-3xl mx-auto">
                ${dmChoices.map((p,i) => `<button id="dm-choice-${i}" onclick="dmChoosePiece(${i})" class="pastel-btn rounded-2xl border-2 border-slate-200 bg-white hover:bg-indigo-50 hover:border-indigo-300 p-2 shadow-sm">${dmDominoHtml(p, false)}</button>`).join('')}
            </div>
            <p id="dm-status" class="min-h-[24px] text-center text-sm font-black mt-3"></p>
        </div>`;
    dmUpdateTimer();
}

function dmDominoHtml(piece, compact) {
    const cls = compact ? 'min-w-[150px]' : 'w-full';
    return `<div class="${cls} grid grid-cols-2 rounded-xl overflow-hidden border border-slate-300 bg-white text-center">
        <div class="p-2 bg-indigo-50 text-indigo-700 border-r border-slate-300 flex items-center justify-center font-black text-[10px] sm:text-xs leading-tight break-words">${dmEscapeHtml(piece.word)}</div>
        <div class="p-2 bg-pink-50 text-pink-700 flex items-center justify-center font-black text-[9px] sm:text-[10px] leading-tight break-words">${dmEscapeHtml(piece.rightMeaning)}</div>
    </div>`;
}

function dmChoosePiece(index) {
    if (dmLocked) return;
    const piece = dmChoices[index];
    const status = document.getElementById('dm-status');
    if (piece.isCorrect) {
        dmLocked = true;
        dmScore += 10;
        dmChain.push(piece);
        playAudio('correct');
        speakEnglish(piece.word);
        if (status) { status.textContent = '✅ Khớp rồi! Domino đã nối vào chuỗi.'; status.className = 'min-h-[24px] text-center text-sm font-black mt-3 text-emerald-600'; }
        const score = document.getElementById('dm-score'); if (score) score.textContent = `⭐ ${dmScore}`;
        dmStep++;
        if (dmStep >= DM_DIFFICULTIES[dmDifficulty].pieces) setTimeout(dmFinish, 750);
        else { setTimeout(() => { dmBuildChoices(); dmRenderRound(); }, 750); }
    } else {
        dmWrongCount++;
        playAudio('wrong');
        const btn = document.getElementById(`dm-choice-${index}`);
        if (btn) { btn.classList.add('border-rose-300','bg-rose-50'); setTimeout(() => btn.classList.remove('border-rose-300','bg-rose-50'), 450); }
        if (status) { status.textContent = '❌ Quân này chưa khớp với đầu hở, thử quân khác nhé!'; status.className = 'min-h-[24px] text-center text-sm font-black mt-3 text-rose-500'; }
    }
}

function dmUpdateTimer() {
    const el = document.getElementById('dm-timer');
    if (!el || !dmStartTime) return;
    const secs = Math.floor((Date.now() - dmStartTime) / 1000);
    el.textContent = `⏱️ ${String(Math.floor(secs/60)).padStart(2,'0')}:${String(secs%60).padStart(2,'0')}`;
}

function dmFinish() {
    clearInterval(dmTimerInterval);
    dmLocked = true;
    playAudio('win');
    if (typeof confetti === 'function') confetti({ particleCount: 90, spread: 80, origin: { y: 0.65 } });
    const diff = DM_DIFFICULTIES[dmDifficulty];
    const secs = Math.floor((Date.now() - dmStartTime) / 1000);
    document.getElementById('game-play-container').innerHTML = `
        <div class="pastel-card bg-white p-6 text-center">
            <div class="text-6xl mb-2">🁢🏆</div>
            <h3 class="text-xl font-black text-slate-700">Chuỗi Domino hoàn thành!</h3>
            <div class="grid grid-cols-3 gap-2 max-w-md mx-auto my-4">
                <div class="rounded-2xl bg-emerald-50 border border-emerald-200 p-3"><div class="text-xl font-black text-emerald-700">${dmScore}</div><div class="text-[10px] font-bold text-gray-500">Điểm</div></div>
                <div class="rounded-2xl bg-rose-50 border border-rose-200 p-3"><div class="text-xl font-black text-rose-600">${dmWrongCount}</div><div class="text-[10px] font-bold text-gray-500">Lần sai</div></div>
                <div class="rounded-2xl bg-cyan-50 border border-cyan-200 p-3"><div class="text-xl font-black text-cyan-700">${Math.floor(secs/60)}:${String(secs%60).padStart(2,'0')}</div><div class="text-[10px] font-bold text-gray-500">Thời gian</div></div>
            </div>
            <div class="flex justify-center gap-2 flex-wrap">
                <button onclick="dmStartWithDifficulty('${dmDifficulty}')" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-slate-600 to-indigo-600 text-white font-black text-sm pastel-btn">🔄 Chơi lại ${diff.label}</button>
                <button onclick="dmRenderTopicScreen()" class="px-5 py-2.5 rounded-xl bg-pink-50 border border-pink-200 text-pink-700 font-black text-sm pastel-btn">📚 Đổi nhóm từ</button>
            </div>
        </div>`;
}

function dmEscapeHtml(v) { return String(v ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
