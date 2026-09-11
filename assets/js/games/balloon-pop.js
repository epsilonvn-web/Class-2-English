// ==========================================
// GAME: BALLOON POP
// Nhìn nghĩa tiếng Việt -> bấm quả bóng mang từ tiếng Anh đúng. Nguồn duy nhất: Chuyên mục 2.1.
// ==========================================
let bpTopicId = 'all';
let bpDifficulty = 'easy';
let bpPool = [];
let bpRoundIndex = 0;
let bpScore = 0;
let bpWrongCount = 0;
let bpUsed = new Set();
let bpCurrent = null;
let bpStartTime = 0;
let bpTimerInterval = null;
let bpRoundLocked = false;

const BP_DIFFICULTIES = {
    easy:   { label:'Dễ', rounds:8, choices:3 },
    medium: { label:'Vừa', rounds:10, choices:4 },
    hard:   { label:'Khó', rounds:12, choices:5 }
};

async function startBalloonPopGame() {
    showLoadingOverlay('Đang bơm bóng từ kho từ vựng 2.1...');
    try {
        await ensureMiniGameVocabReady();
        hideLoadingOverlay();
        bpInjectStyleOnce();
        bpRenderTopicScreen();
    } catch (e) {
        hideLoadingOverlay();
        alert('Không tải được dữ liệu Balloon Pop: ' + e.message);
    }
}

function bpInjectStyleOnce() {
    if (document.getElementById('bp-style')) return;
    const style = document.createElement('style');
    style.id = 'bp-style';
    style.textContent = `
        @keyframes bpFloat { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-10px) rotate(1deg)} }
        @keyframes bpPop { 0%{transform:scale(1);opacity:1} 75%{transform:scale(1.28);opacity:.8} 100%{transform:scale(.05);opacity:0} }
        @keyframes bpShake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-7px)} 75%{transform:translateX(7px)} }
        .bp-balloon{animation:bpFloat 2.4s ease-in-out infinite;position:relative;border-radius:50% 50% 46% 46%;min-height:122px;}
        .bp-balloon:after{content:'';position:absolute;left:50%;bottom:-10px;transform:translateX(-50%);width:0;height:0;border-left:7px solid transparent;border-right:7px solid transparent;border-top:12px solid rgba(99,102,241,.55)}
        .bp-pop{animation:bpPop .45s ease-in forwards!important}
        .bp-shake{animation:bpShake .28s ease-in-out 2!important}
    `;
    document.head.appendChild(style);
}

function bpRenderTopicScreen() {
    clearInterval(bpTimerInterval);
    headerLevel3ClickHandler = null;
    document.getElementById('game-play-container').innerHTML = renderMiniGameTopicMenu({
        gameKey: 'balloon-pop',
        onChoose: 'bpChooseTopic',
        subtitle: 'Chọn 1 trong 6 Nhóm từ vựng để bắt đầu chơi Balloon Pop nhé!',
        countFilter: item => item.word && item.vietnamese && item.word.length <= 20
    });
}

function bpChooseTopic(topicId) {
    bpTopicId = topicId;
    document.getElementById('game-play-container').innerHTML = `
        <div class="pastel-card bg-white p-5 text-center">
            <div class="text-5xl mb-2">🎯</div><h3 class="font-black text-rose-600 text-lg mb-3">Chọn độ khó</h3>
            <div class="grid grid-cols-3 gap-2.5 max-w-md mx-auto">${Object.entries(BP_DIFFICULTIES).map(([key,d]) => `<button onclick="bpStartWithDifficulty('${key}')" class="pastel-btn p-3 rounded-2xl border-2 border-rose-200 bg-rose-50 hover:bg-rose-100"><div class="font-black text-rose-700">${d.label}</div><div class="text-[11px] text-gray-500 font-bold">${d.rounds} vòng</div><div class="text-[10px] text-gray-400 font-bold">${d.choices} bóng/vòng</div></button>`).join('')}</div>
            <button onclick="bpRenderTopicScreen()" class="mt-4 text-xs font-black text-pink-600 bg-pink-50 border border-pink-200 px-4 py-2 rounded-xl pastel-btn">← Chọn lại nhóm từ</button>
        </div>`;
}

function bpStartWithDifficulty(diffKey) {
    bpDifficulty = diffKey;
    const diff = BP_DIFFICULTIES[diffKey];
    let pool = getMiniGameVocabPool({ topicId: bpTopicId }).filter(x => x.word && x.vietnamese && x.word.length <= 20);
    const unique = new Map();
    pool.forEach(x => { const k=x.word.toLowerCase(); if(!unique.has(k)) unique.set(k,x); });
    bpPool = shuffleArray([...unique.values()]);
    if (bpPool.length < diff.choices + diff.rounds) {
        if (bpPool.length < diff.choices) { alert('Nhóm từ này chưa đủ từ để tạo các bóng đáp án.'); return; }
    }
    bpRoundIndex = 0;
    bpScore = 0;
    bpWrongCount = 0;
    bpUsed = new Set();
    bpStartTime = Date.now();
    clearInterval(bpTimerInterval);
    bpTimerInterval = setInterval(bpUpdateTimer,1000);
    headerLevel3ClickHandler = () => bpChooseTopic(bpTopicId);
    bpNextRound();
}

function bpPickCurrent() {
    let candidates = bpPool.filter(x => !bpUsed.has(x.id || x.word.toLowerCase()));
    if (!candidates.length) { bpUsed.clear(); candidates = bpPool.slice(); }
    const item = candidates[Math.floor(Math.random()*candidates.length)];
    bpUsed.add(item.id || item.word.toLowerCase());
    return item;
}

function bpNextRound() {
    const diff = BP_DIFFICULTIES[bpDifficulty];
    if (bpRoundIndex >= diff.rounds) return bpFinish();
    bpRoundLocked = false;
    bpCurrent = bpPickCurrent();
    const distractors = shuffleArray(bpPool.filter(x => x.word.toLowerCase() !== bpCurrent.word.toLowerCase())).slice(0, diff.choices-1);
    const choices = shuffleArray([bpCurrent, ...distractors]);
    bpRenderRound(choices);
}

function bpRenderRound(choices) {
    const diff = BP_DIFFICULTIES[bpDifficulty];
    const cols = diff.choices <= 3 ? 'grid-cols-3' : diff.choices === 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2 sm:grid-cols-5';
    document.getElementById('game-play-container').innerHTML = `
        <div class="pastel-card bg-white p-3 md:p-4 overflow-hidden">
            <div class="flex items-center justify-between gap-2 mb-3 flex-wrap">
                <span id="bp-timer" class="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-full text-xs font-black text-slate-600">⏱️ 00:00</span>
                <span class="px-2.5 py-1 bg-rose-50 border border-rose-200 rounded-full text-xs font-black text-rose-700">🎈 ${bpRoundIndex+1}/${diff.rounds}</span>
                <span id="bp-score" class="px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-black text-emerald-700">⭐ ${bpScore}</span>
            </div>
            <div class="text-center rounded-2xl bg-gradient-to-r from-cyan-50 via-sky-50 to-indigo-50 border-2 border-cyan-100 p-4 mb-4">
                <div class="text-5xl mb-1">${bpCurrent.emoji || '✨'}</div>
                <div class="text-[10px] uppercase tracking-wider font-black text-gray-400">Hãy bấm từ có nghĩa là</div>
                <div class="text-xl md:text-2xl font-black text-pink-600 mt-1">${bpEscapeHtml(bpCurrent.vietnamese)}</div>
                <button onclick="speakVietnamese('${bpEscapeJs(bpCurrent.vietnamese)}')" class="mt-2 px-3 py-1 rounded-full bg-white border border-cyan-200 text-cyan-700 text-xs font-black pastel-btn">🔊 Nghe nghĩa</button>
            </div>
            <div class="grid ${cols} gap-3 items-end max-w-2xl mx-auto px-1 py-2">
                ${choices.map((item,i) => `<button id="bp-balloon-${i}" onclick="bpChooseBalloon(${i}, '${bpEscapeJs(item.word)}')" class="bp-balloon pastel-btn px-2 py-4 border-2 border-indigo-200 bg-gradient-to-b ${bpBalloonGradient(i)} text-white shadow-lg flex flex-col items-center justify-center" style="animation-delay:${(i*0.23).toFixed(2)}s">
                    <span class="text-2xl mb-1">${item.emoji || '🎈'}</span>
                    <span class="text-xs sm:text-sm font-black leading-tight break-words">${bpEscapeHtml(item.word)}</span>
                </button>`).join('')}
            </div>
            <p id="bp-status" class="min-h-[24px] text-center text-sm font-black mt-3"></p>
        </div>`;
    bpUpdateTimer();
}

function bpBalloonGradient(i) {
    const gradients = ['from-pink-400 to-rose-500','from-indigo-400 to-purple-500','from-cyan-400 to-sky-500','from-amber-400 to-orange-500','from-emerald-400 to-teal-500'];
    return gradients[i % gradients.length];
}

function bpChooseBalloon(index, word) {
    if (bpRoundLocked || !bpCurrent) return;
    const btn = document.getElementById(`bp-balloon-${index}`);
    const status = document.getElementById('bp-status');
    if (word.toLowerCase() === bpCurrent.word.toLowerCase()) {
        bpRoundLocked = true;
        bpScore += 10;
        playAudio('correct');
        if (btn) btn.classList.add('bp-pop');
        if (status) { status.textContent = `🎉 Đúng rồi! ${bpCurrent.word} = ${bpCurrent.vietnamese}`; status.className='min-h-[24px] text-center text-sm font-black mt-3 text-emerald-600'; }
        const scoreEl = document.getElementById('bp-score'); if(scoreEl) scoreEl.textContent=`⭐ ${bpScore}`;
        speakEnglish(bpCurrent.word);
        bpRoundIndex++;
        setTimeout(bpNextRound,850);
    } else {
        bpWrongCount++;
        playAudio('wrong');
        if (btn) { btn.classList.remove('bp-shake'); void btn.offsetWidth; btn.classList.add('bp-shake'); }
        if (status) { status.textContent = '❌ Chưa đúng, thử quả bóng khác nhé!'; status.className='min-h-[24px] text-center text-sm font-black mt-3 text-rose-500'; }
    }
}

function bpUpdateTimer() {
    const el=document.getElementById('bp-timer'); if(!el||!bpStartTime)return;
    const secs=Math.floor((Date.now()-bpStartTime)/1000);
    el.textContent=`⏱️ ${String(Math.floor(secs/60)).padStart(2,'0')}:${String(secs%60).padStart(2,'0')}`;
}

function bpFinish() {
    clearInterval(bpTimerInterval);
    playAudio('win');
    const diff=BP_DIFFICULTIES[bpDifficulty];
    const secs=Math.floor((Date.now()-bpStartTime)/1000);
    document.getElementById('game-play-container').innerHTML=`
        <div class="pastel-card bg-white p-6 text-center">
            <div class="text-6xl mb-2">🎈🏆</div><h3 class="font-black text-rose-600 text-xl">Balloon Pop hoàn thành!</h3>
            <div class="grid grid-cols-3 gap-2 max-w-md mx-auto my-4">
                <div class="p-3 rounded-2xl bg-emerald-50 border border-emerald-200"><div class="text-xl font-black text-emerald-700">${bpScore}</div><div class="text-[10px] font-bold text-gray-500">Điểm</div></div>
                <div class="p-3 rounded-2xl bg-rose-50 border border-rose-200"><div class="text-xl font-black text-rose-600">${bpWrongCount}</div><div class="text-[10px] font-bold text-gray-500">Lần bấm sai</div></div>
                <div class="p-3 rounded-2xl bg-cyan-50 border border-cyan-200"><div class="text-xl font-black text-cyan-700">${Math.floor(secs/60)}:${String(secs%60).padStart(2,'0')}</div><div class="text-[10px] font-bold text-gray-500">Thời gian</div></div>
            </div>
            <div class="flex justify-center gap-2 flex-wrap"><button onclick="bpStartWithDifficulty('${bpDifficulty}')" class="px-5 py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl font-black pastel-btn">🔄 Chơi lại ${diff.label}</button><button onclick="bpRenderTopicScreen()" class="px-5 py-2.5 bg-pink-50 border border-pink-200 text-pink-700 rounded-xl font-black pastel-btn">📚 Đổi nhóm từ</button></div>
        </div>`;
}

function bpEscapeHtml(value){return String(value??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
function bpEscapeJs(value){return String(value??'').replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/\r?\n/g,' ');}
