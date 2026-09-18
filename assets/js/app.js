// ==========================================
// CẤU HÌNH 11 CHUYÊN ĐỀ KHO HỌC LIỆU & MA TRẬN NĂNG LỰC TV_C1-C6 (TIẾNG VIỆT LỚP 2)
// ==========================================
const TOPICS_CONFIG = [
    { id: 1, title: "1. Ngôi nhà chữ Việt", desc: "Bảng chữ cái Việt Nam và quy ước viết hoa đầu câu, tên người, địa danh", icon: "🏠", color: "pink" },
    { id: 2, title: "2. Hiệp sĩ âm đầu", desc: "ch/tr, s/x, l/n, r/d/gi và quy tắc c/k, g/gh, ng/ngh", icon: "⚔️", color: "rose" },
    { id: 3, title: "3. Vương quốc vần & dấu", desc: "Âm cuối dễ lẫn, vần phức hợp và dấu hỏi/ngã", icon: "🔮", color: "purple" },
    { id: 4, title: "4. Kho báu từ vựng", desc: "Vốn từ và nghĩa từ theo các chủ điểm gần gũi", icon: "💰", color: "amber" },
    { id: 5, title: "5. Khu vườn từ loại", desc: "Từ chỉ sự vật, hoạt động/trạng thái và đặc điểm", icon: "🌳", color: "emerald" },
    { id: 6, title: "6. Kỹ sư ghép câu", desc: "Dấu câu, tạo câu và sắp xếp đoạn ngắn hợp lí", icon: "🖊️", color: "cyan" },
    { id: 7, title: "7. Thế giới câu hay", desc: "Câu giới thiệu, câu nêu hoạt động và câu nêu đặc điểm", icon: "💬", color: "indigo" },
    { id: 8, title: "8. Đại sứ giao tiếp", desc: "Lời nói/lời đáp, tin nhắn, thư ngắn, bưu thiếp và bảng biểu", icon: "🤝", color: "sky" },
    { id: 9, title: "9. Nhà thông thái nhỏ", desc: "Đọc hiểu thơ, truyện, văn bản thông tin và suy luận", icon: "📖", color: "fuchsia" },
    { id: 10, title: "10. Trí tuệ Trạng Nguyên", desc: "Câu đố, suy luận bằng lời và trò chơi ngôn ngữ tăng hứng thú", icon: "🧩", color: "yellow" },
    { id: 11, title: "11. Ôn tập tổng hợp", desc: "Ôn tích lũy Học kỳ I, Học kỳ II và cả năm", icon: "📚", color: "violet" }
];

const SUBTOPIC_PALETTES = [
    { card: "bg-pink-50/80 hover:bg-pink-100 border-pink-300 text-pink-800", num: "text-pink-600", badge: "bg-white text-pink-600 border-pink-200" },
    { card: "bg-emerald-50/80 hover:bg-emerald-100 border-emerald-300 text-emerald-800", num: "text-emerald-600", badge: "bg-white text-emerald-600 border-emerald-200" },
    { card: "bg-purple-50/80 hover:bg-purple-100 border-purple-300 text-purple-800", num: "text-purple-600", badge: "bg-white text-purple-600 border-purple-200" },
    { card: "bg-amber-50/80 hover:bg-amber-100 border-amber-300 text-amber-800", num: "text-amber-600", badge: "bg-white text-amber-600 border-amber-200" },
    { card: "bg-indigo-50/80 hover:bg-indigo-100 border-indigo-300 text-indigo-800", num: "text-indigo-600", badge: "bg-white text-indigo-600 border-indigo-200" },
    { card: "bg-rose-50/80 hover:bg-rose-100 border-rose-300 text-rose-800", num: "text-rose-600", badge: "bg-white text-rose-600 border-rose-200" }
];

// ==========================================
// V7: Roadmap học theo SGK được NHÚNG trong file dữ liệu Bài học.
// Không còn roadmap 24 tuần cứng trong app.js.
// ==========================================
let roadmapConfig = {};
const TOTAL_ROADMAP_WEEKS = 35;

const examFileMap = {
    hocky1: { file: 'de_thi_tieng_viet_2.json', idPrefix: 'TV_2_M12_1', sheet: 'LichSuBaiThiHK1', label: 'Học kỳ 1', color: 'pink' },
    hocky2: { file: 'de_thi_tieng_viet_2.json', idPrefix: 'TV_2_M12_2', sheet: 'LichSuBaiThiHK2', label: 'Học kỳ 2', color: 'purple' },
    hsg:    { file: 'de_thi_tieng_viet_2.json', idPrefix: 'TV_2_M12_3', sheet: 'LichSuBaiThiHSG', label: 'Học sinh giỏi', color: 'amber' }
};

// 6 nhóm năng lực Tiếng Việt lớp 2 (TV_C1 - TV_C6) - chuẩn V6.1
const SKILL_TAXONOMY = {
    C1: { code: 'C1', sheetCol: 'TV_C1_Dung', totalCol: 'TV_C1_Tong', name: 'Chính tả & Âm - Vần', advice: 'Ôn theo ba tầng: chữ/viết hoa → âm đầu → vần, âm cuối và dấu thanh.' },
    C2: { code: 'C2', sheetCol: 'TV_C2_Dung', totalCol: 'TV_C2_Tong', name: 'Từ vựng & Giao tiếp / Nói - nghe', advice: 'Mở rộng vốn từ theo chủ điểm và luyện lời nói, lời đáp, tin nhắn, thư/bưu thiếp, bảng biểu đơn giản.' },
    C3: { code: 'C3', sheetCol: 'TV_C3_Dung', totalCol: 'TV_C3_Tong', name: 'Từ chỉ sự vật - hoạt động - đặc điểm', advice: 'Luyện nhận diện và sử dụng từ chỉ sự vật, hoạt động/trạng thái và đặc điểm theo ngôn ngữ lớp 2.' },
    C4: { code: 'C4', sheetCol: 'TV_C4_Dung', totalCol: 'TV_C4_Tong', name: 'Câu, Dấu câu & Tạo lập văn bản ngắn', advice: 'Luyện dấu câu, câu giới thiệu/câu nêu hoạt động/câu nêu đặc điểm và sắp xếp câu thành đoạn ngắn.' },
    C5: { code: 'C5', sheetCol: 'TV_C5_Dung', totalCol: 'TV_C5_Tong', name: 'Đọc hiểu & Phản hồi văn bản', advice: 'Luyện tìm chi tiết, hiểu nội dung, trình tự, nghĩa từ trong ngữ cảnh và suy luận đơn giản từ văn bản.' },
    C6: { code: 'C6', sheetCol: 'TV_C6_Dung', totalCol: 'TV_C6_Tong', name: 'Tư duy ngôn ngữ', advice: 'Câu đố, từ lạc nhóm, đố chữ và suy luận bằng manh mối ngôn ngữ giúp phát triển tư duy.' }
};

// Chủ đề mẹ dùng làm fallback nếu câu chưa có skill_tag; dữ liệu V6.1 đã tự mang skill_tag ở từng câu.
const TOPIC_TO_SKILL = { 1: 'C1', 2: 'C1', 3: 'C1', 4: 'C2', 5: 'C3', 6: 'C4', 7: 'C4', 8: 'C2', 9: 'C5', 10: 'C6', 11: 'C1' };

// Mẫu số điểm năng lực phụ thuộc loại đề V6.1; HKI/HKII không chấm C6, HSG có C6.
const EXAM_SKILL_MAX_SCORE_BY_SHEET = {
    LichSuBaiThiHK1: { C1: 1.5, C2: 1.5, C3: 1.5, C4: 2.5, C5: 3.0, C6: 0.0 },
    LichSuBaiThiHK2: { C1: 1.5, C2: 1.5, C3: 1.5, C4: 2.5, C5: 3.0, C6: 0.0 },
    LichSuBaiThiHSG: { C1: 1.5, C2: 1.5, C3: 1.5, C4: 1.5, C5: 2.0, C6: 2.0 }
};
function getExamSkillMaxScoreForSheet(sheetName, skillKey) {
    return Number(EXAM_SKILL_MAX_SCORE_BY_SHEET[sheetName]?.[skillKey] ?? 0);
}

const GREETINGS_STUDENT = [
    "Chào {name}, cô Thỏ Ngọc đố con hôm nay mình đọc và viết đúng chính tả đến đâu nhé!",
    "Chào mừng {name} quay lại! Cùng cô Thỏ Ngọc khám phá thêm thật nhiều từ ngữ hay nào!",
    "Cô Thỏ Ngọc chào {name}! Sách đã mở, bút đã cầm, giờ là lúc chinh phục điểm 10 Tiếng Việt!",
    "Chào con yêu {name}, hôm nay chúng mình cùng tìm xem câu chuyện nào đang chờ được khám phá nhé!",
    "Chào mừng {name} đến với giờ học Tiếng Việt! Cô Thỏ Ngọc tin con sẽ đọc thật hay và viết thật đúng!"
];

const GREETINGS_GUEST = [
    "Chào bé yêu, cô Thỏ Ngọc rất vui được cùng con luyện Tiếng Việt hôm nay!",
    "Chào mừng bé đến với lớp Tiếng Việt của cô Thỏ Ngọc! Mình cùng thử sức xem sao nhé!",
    "Cô Thỏ Ngọc chào bé! Mở sách ra là con chữ lên hạng liền, cùng bắt đầu nào!",
    "Chào thiên tài nhí! Cô Thỏ Ngọc đang chờ xem con đọc và viết giỏi cỡ nào đây!",
    "Chào mừng con đến với Đấu trường Tiếng Việt! Chúc con thật minh mẫn và vui vẻ!"
];



// ==========================================
// ĐỊNH DANH MÁY CHỦ APPS SCRIPT & BIẾN TOÀN CỤC
// ==========================================
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwp-5sYrvTkyKq3-x_egCGGwEwtFmsy8q1alWfwNLh0nFGT8ChoFe66SIoE9l00Wyim/exec";
let allTopicsDataCache = null;
let allQuestionsFlatCache = null;
// Bật/tắt đọc câu hỏi TỰ ĐỘNG khi vào câu mới — nút "Nghe câu hỏi" thủ công vẫn luôn hoạt động
// dù tắt tính năng này (đây chỉ tắt phần tự động phát, không tắt hẳn tính năng nghe).
let autoSpeechEnabled = localStorage.getItem('tvl2_autoSpeechEnabled') !== 'false';
const examsCache = {};

// ==========================================
// BÀI HỌC - mô phỏng tiết học theo SGK Kết nối tri thức
// ==========================================
const BAI_HOC_DATA_FILE = 'assets/data/bai_hoc_tieng_viet_2.json';
let baiHocDataCache = null;
let inBaiHocFlow = false;
let activeBaiHocContext = { semester: 1, week: null, unitId: null };

let currentUser = { name: 'Khách (Guest)', isGuest: true, tuanHienTai: 1, hoTen: 'Bé Khách', lop: '', maHS: 'KHACH', vaiTro: 'guest', loaiTaiKhoan: 'guest' };
let currentSessionPin = '';
const PERSISTENT_SESSION_KEY = 'tv2_persistent_session_v1';
let adminAccountsCache = [];
let starGreenCount = 0;
let starRedCount = 0;
let activeTopicId = null;
let activeExamContext = null;
let activeRoadmapContext = null;
let inMiniGameFlow = false;
let activeMiniGameId = null;
let appViewEpoch = 0;
const activeStandaloneAudios = new Set();
let activeQuestionsList = [];
let practiceCycleRawPool = [];
let pendingTopicQuiz = null;
let currentQIndex = 0;
let score = 0;
let userAnswers = {};
let wrongAttemptsByQ = {};
let quizWrongAnswers = [];
let quizAnsweredLog = [];
let quizStartTime = null;
let quizTimerInterval = null;
let quizRemainingSeconds = 40 * 60;

let audioCtx = null;
const banMaiAudio = new Audio();
banMaiAudio.referrerPolicy = 'no-referrer';

let histLineChartInstance = null;
let histBarChartInstance = null;

// ==========================================
// HÀM TIỆN ÍCH DỮ LIỆU
// ==========================================
function getStudentFirstName() {
    if (!currentUser || currentUser.isGuest || !currentUser.hoTen) return "Bé";
    const parts = currentUser.hoTen.trim().split(/\s+/);
    return parts[parts.length - 1] || "Bé";
}

function stripOptionPrefix_(s) {
    // Dữ liệu đôi khi tự nhúng sẵn "A. ", "B) ", "C. "... ngay trong nội dung đáp án — bóc bỏ để
    // sau khi xáo trộn thứ tự, chữ cái hiển thị (A/B/C/D) luôn khớp đúng với vị trí thật trên màn hình.
    return String(s ?? '').replace(/^\s*[A-Da-d]\s*[\.\)]\s*/, '').trim();
}

function normalizeQuestion(q) {
    if (!q) return null;
    const rawOptions = Array.isArray(q.o) ? q.o : (Array.isArray(q.options) ? q.options : []);
    const cleanedOptions = rawOptions.map(stripOptionPrefix_);
    const cleanedAnswer = stripOptionPrefix_(q.a ?? q.answer ?? '');
    // Xáo trộn ngẫu nhiên thứ tự 4 đáp án — tránh tình trạng đáp án đúng luôn cố định ở vị trí A
    // (dù sau này nguồn dữ liệu gốc có tự xáo trộn lại thì 2 lớp xáo trộn chồng nhau vẫn cho kết quả ngẫu nhiên).
    const shuffledOptions = shuffleArray(cleanedOptions);
    return {
        // Kho học liệu dùng "id"; đề thi dùng "id" + "q_num" (số thứ tự câu trong đề).
        question_id: q.id ?? q.question_id ?? q.question_no ?? 0,
        question_number_in_exam: q.q_num ?? null,
        // Kho học liệu V6.1 có cả sub_id và tên sub; Roadmap dùng sub_id để tránh lệch do đổi tên hiển thị.
        sub_id: String(q.sub_id ?? q.subId ?? '').trim(),
        sub_topic: String(q.sub ?? q.sub_topic ?? 'Câu hỏi chung').trim(),
        sub_topic_label: String(q.sub ?? q.sub_topic ?? 'Câu hỏi chung').trim(),
        difficulty: String(q.difficulty ?? q.level ?? 'medium').toLowerCase(),
        week: q.week ?? q.w ?? null,
        question_text: q.q ?? q.question_text ?? '',
        options: shuffledOptions,
        answer: cleanedAnswer,
        hint: q.h ?? q.hint ?? '',
        image_url: q.img ?? q.image_url ?? '',
        audio_text: q.aud ?? q.audio_text ?? '',
        reading_title: q.r_title ?? q.reading_title ?? '',
        reading_passage: q.r_passage ?? q.reading_passage ?? q.passage_text ?? '',
        // Đề thi tự mang "tag" (TV_C1..TV_C6) cho từng câu. Kho học liệu KHÔNG có tag riêng từng câu
        // — sẽ được gán bổ sung theo chủ đề gốc (TOPIC_TO_SKILL) ngay sau bước normalize (xem fetchAllQuestionsFlat).
        skill_tag: q.skill_tag ?? q.tag ?? null,
        secondary_tags: Array.isArray(q.secondary_tags) ? q.secondary_tags : [],
        source_topic_id: q.source_topic_id ?? null,
        // Đề thi dùng field "points"; kho học liệu hằng ngày không có điểm riêng từng câu (mặc định 0.5).
        diem: Number(q.diem ?? q.points ?? q.score ?? 0.5),
        explanation: q.explanation ?? q.h ?? 'Không có giải thích chi tiết.'
    };

}

function normalizeTopic(t) {
    if (!t) return null;
    const topicId = Number(t.id ?? t.topic_id);
    const skillTag = TOPIC_TO_SKILL[topicId] || 'C1';
    const rawQuestions = t.qs || t.questions || [];
    return {
        topic_id: topicId,
        topic_name: t.name ?? t.topic_name ?? '',
        description: t.desc ?? t.description ?? '',
        lecture_title: t.l_title ?? t.lecture_title ?? '',
        lecture_content: t.l_content ?? t.lecture_content ?? '',
        lecture_audio_text: t.l_audio ?? t.lecture_audio_text ?? '',
        questions: rawQuestions.map(normalizeQuestion).filter(Boolean).map(q => ({
            ...q,
            source_topic_id: topicId,
            skill_tag: q.skill_tag || skillTag
        }))
    };
}

function shuffleArray(arr) {
    if (!arr) return [];
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function buildTrickyChoices(correctAnswer, sameGroupPool, allPool, count = 3) {
    let same = [...new Set(sameGroupPool.filter(x => x !== correctAnswer))];
    same = shuffleArray(same);
    let picks = same.slice(0, count);
    if (picks.length < count) {
        let rest = [...new Set(allPool.filter(x => x !== correctAnswer && !picks.includes(x)))];
        rest = shuffleArray(rest);
        picks = picks.concat(rest.slice(0, count - picks.length));
    }
    return shuffleArray([correctAnswer, ...picks]);
}

function takeUniqueRandom_(pool, count, usedIds) {
    const usable = shuffleArray((pool || []).filter(q => !usedIds.has(String(q.question_id))));
    const picked = usable.slice(0, Math.max(0, count));
    picked.forEach(q => usedIds.add(String(q.question_id)));
    return picked;
}

function getRoadmapScopedPool_(config, kind) {
    if (!allQuestionsFlatCache) return [];
    const subIds = config[`${kind}SubIds`] || [];
    const topicIds = config[`${kind}TopicIds`] || [];
    return allQuestionsFlatCache.filter(q =>
        (subIds.length && subIds.includes(q.sub_id)) ||
        (topicIds.length && topicIds.includes(Number(q.source_topic_id)))
    );
}

function getQuestionsForWeek343(weekNumber) {
    const config = roadmapConfig[weekNumber];
    if (!config || !allQuestionsFlatCache) return [];

    const focusPool = getRoadmapScopedPool_(config, 'focus');
    const reviewPool = getRoadmapScopedPool_(config, 'review');
    const allScoped = [...focusPool, ...reviewPool];
    if (!allScoped.length) return [];

    const difficultyTargets = { easy: 9, medium: 12, hard: 9 };
    const focusTargets = { easy: 6, medium: 8, hard: 6 }; // 20/30 ≈ 67% trọng tâm
    const used = new Set();
    const selected = [];

    for (const difficulty of ['easy', 'medium', 'hard']) {
        const totalNeed = difficultyTargets[difficulty];
        const focusNeed = reviewPool.length ? focusTargets[difficulty] : totalNeed;
        const focusDiff = focusPool.filter(q => q.difficulty === difficulty);
        const reviewDiff = reviewPool.filter(q => q.difficulty === difficulty);

        let picked = takeUniqueRandom_(focusDiff, focusNeed, used);
        selected.push(...picked);

        let remain = totalNeed - picked.length;
        if (remain > 0) {
            picked = takeUniqueRandom_(reviewDiff, remain, used);
            selected.push(...picked);
            remain -= picked.length;
        }
        if (remain > 0) {
            const fallbackSameDifficulty = allScoped.filter(q => q.difficulty === difficulty);
            picked = takeUniqueRandom_(fallbackSameDifficulty, remain, used);
            selected.push(...picked);
            remain -= picked.length;
        }
    }

    // Nếu một mức khó tạm thiếu dữ liệu, bù từ pool hợp lệ nhưng không lặp câu.
    if (selected.length < 30) {
        selected.push(...takeUniqueRandom_(allScoped, 30 - selected.length, used));
    }

    return shuffleArray(selected.slice(0, 30));
}

function capitalizeFirstLetter(val) {
    if (!val) return '';
    const s = String(val).trim();
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function beautifySubtopicName(name) {
    if (!name) return '';
    let s = String(name).trim();
    if (/đa giác quan/i.test(s)) return 'Trải nghiệm đa giác quan';
    if (/trái nghĩa.*đồng nghĩa/i.test(s) || /đồng nghĩa.*trái nghĩa/i.test(s)) return 'Trái nghĩa - đồng nghĩa';
    if (s.length > 40 && s.includes('(')) {
        s = s.replace(/\s*\([^)]*\)/g, '').trim();
    }
    return s;
}

const TOPICS_DATA_FILES = [
    'assets/data/kho_hoc_tieng_viet_2_part1.json',
    'assets/data/kho_hoc_tieng_viet_2_part2.json'
];

// Kho học liệu Tiếng Việt lớp 2 đã BỌC SẴN theo từng Chuyên đề ({ topics: [{ id, name, desc, qs: [...] }] }),
// nên dùng thẳng fetchAllTopicsData() làm nguồn chính rồi gộp phẳng ra từ đó — không cần tự suy luận
// số Chuyên đề từ chuỗi "sub" (vì "sub" ở đây là TÊN đầy đủ tiểu mục, không phải mã "X.Y").
async function fetchAllQuestionsFlat() {
    if (allQuestionsFlatCache) return allQuestionsFlatCache;
    const topics = await fetchAllTopicsData();
    allQuestionsFlatCache = topics.flatMap(t => t.questions);
    return allQuestionsFlatCache;
}

async function fetchAllTopicsData() {
    if (allTopicsDataCache) return allTopicsDataCache;

    const results = await Promise.all(TOPICS_DATA_FILES.map(async (file) => {
        const res = await fetch(file);
        if (!res.ok) throw new Error(`Không thể tải file dữ liệu ${file}`);
        return res.json();
    }));

    const rawTopics = results.flatMap(data => (data && Array.isArray(data.topics)) ? data.topics : []);
    const normalized = rawTopics.map(normalizeTopic).filter(Boolean);

    // Đảm bảo đủ 11 Chuyên đề theo đúng thứ tự TOPICS_CONFIG (kể cả khi 1 Chuyên đề tạm thời chưa có dữ liệu).
    allTopicsDataCache = TOPICS_CONFIG.map(t => {
        const found = normalized.find(item => Number(item.topic_id) === Number(t.id));
        return found || {
            topic_id: t.id, topic_name: t.title, description: t.desc,
            lecture_title: '', lecture_content: '', lecture_audio_text: '', questions: []
        };
    });

    // Điền LUÔN cache phẳng ở đây — tránh phụ thuộc thứ tự gọi hàm (có nơi gọi fetchAllTopicsData()
    // trước, có nơi gọi fetchAllQuestionsFlat() trước; cả 2 phải luôn ra cùng 1 kết quả nhất quán).
    allQuestionsFlatCache = allTopicsDataCache.flatMap(t => t.questions);

    return allTopicsDataCache;
}

// Kho đề thi Tiếng Việt lớp 2 lồng 2 cấp: { exams: [ { sub_id, sub_name, exam_list: [{ exam_id, exam_name, time_limit, questions }] } ] }
// — cần làm phẳng thành 1 mảng đề thi duy nhất, gắn "exam_id" = "<sub_id>.<exam_id gốc>" để examFileMap.idPrefix lọc đúng hạng mục.
async function loadExamDataFile(file) {
    if (examsCache[file]) return examsCache[file];
    const res = await fetch(`assets/data/${file}`);
    if (!res.ok) throw new Error("Không thể tải file đề thi");
    const raw = await res.json();

    const flatExams = [];
    if (raw && Array.isArray(raw.exams)) {
        raw.exams.forEach(cat => {
            const list = cat.exam_list || cat.exams || [];
            list.forEach(ex => {
                flatExams.push({
                    // exam_id gốc trong dữ liệu đã tự mang tiền tố sub_id đầy đủ (VD "TV_2_M12_1_EX1") — dùng thẳng.
                    exam_id: String(ex.exam_id ?? `${cat.sub_id}_EX?`),
                    exam_title: ex.exam_name || ex.exam_title || `${cat.sub_name} - Đề số ${ex.exam_id}`,
                    time_limit: ex.time_limit,
                    exam_category: ex.exam_category || null,
                    matrix_version: ex.matrix_version || null,
                    skill_max_score: ex.skill_max_score || null,
                    questions: (ex.questions || ex.qs || []).map(normalizeQuestion).filter(Boolean)
                });
            });
        });
    }

    const data = { exams: flatExams };
    examsCache[file] = data;
    return data;
}

// ==========================================
// RENDER GIAO DIỆN TRANG CHỦ & ĐẤU TRƯỜNG
// ==========================================
async function renderDashboardGrid() {
    const container = document.getElementById('view-dashboard-grid');
    if (!container) return;
    
    let topicsData = [];
    try { topicsData = await fetchAllTopicsData(); } catch (e) {}

    let html = '';
    TOPICS_CONFIG.filter(t => Number(t.id) <= 10).forEach(t => {
        const topicObj = topicsData.find(item => Number(item.topic_id) === Number(t.id));
        const totalCount = topicObj && topicObj.questions ? topicObj.questions.length : 0;
        const countLabel = totalCount > 0 ? `${totalCount} câu` : 'Đang cập nhật';

        const iconHtml = t.isCustomTextIcon 
            ? `<div class="w-8 h-8 bg-rose-100 rounded-xl flex items-center justify-center text-[11px] font-black text-rose-600 shadow-inner group-hover:scale-110 transition-transform shrink-0 tracking-tight">S/X</div>`
            : `<div class="w-8 h-8 bg-${t.color}-100 rounded-xl flex items-center justify-center text-sm font-extrabold text-${t.color}-600 shadow-inner group-hover:scale-110 transition-transform shrink-0">${t.icon}</div>`;

        const premiumLocked = t.id === 11 && !hasPremiumAccess();
        html += `
            <div onclick="openTopic(${t.id}, '${t.title}', '${t.icon}')" class="pastel-card p-3 flex flex-col justify-between cursor-pointer hover:border-${t.color}-400 transition-all group min-h-[92px] relative">
                ${premiumLocked ? '<span class="absolute top-2 right-2 text-slate-400 text-xs"><i class="fa-solid fa-lock"></i></span>' : ''}
                <div class="flex items-center space-x-2.5">
                    ${iconHtml}
                    <h3 class="font-extrabold text-${t.color}-700 text-sm md:text-base leading-tight">${t.title}</h3>
                </div>
                <div class="flex justify-between items-center mt-1.5 pt-1 border-t border-pink-100 text-[11px] font-bold text-gray-500">
                    <span>${t.desc}</span>
                    <span class="bg-${t.color}-50 text-${t.color}-600 px-2 py-0.5 rounded-full">${countLabel}</span>
                </div>
            </div>
        `;
    });

    // Khám phá chỉ hiển thị 10 chuyên đề học tự do; Ôn tập và Đề thi đã có tab riêng.
    container.innerHTML = html;
}


const BAI_HOC_LESSON_TYPE = {
    reading: { label: 'Đọc', icon: '📖', cls: 'pink' },
    handwriting: { label: 'Tập viết', icon: '✍️', cls: 'sky' },
    speaking_listening: { label: 'Nói & nghe', icon: '🎙️', cls: 'emerald' },
    spelling: { label: 'Chính tả', icon: '📝', cls: 'rose' },
    vocabulary_sentence: { label: 'Luyện từ & câu', icon: '💬', cls: 'indigo' },
    writing: { label: 'Luyện viết đoạn', icon: '🖊️', cls: 'amber' },
    review: { label: 'Ôn tập', icon: '🎯', cls: 'violet' }
};

async function loadBaiHocData() {
    if (baiHocDataCache) return baiHocDataCache;
    const res = await fetch(BAI_HOC_DATA_FILE);
    if (!res.ok) throw new Error('Không thể tải dữ liệu Bài học');
    baiHocDataCache = await res.json();
    hydrateRoadmapConfigV7_(baiHocDataCache);
    return baiHocDataCache;
}

function hydrateRoadmapConfigV7_(data) {
    const cfg = {};
    (data?.roadmap || []).forEach(w => {
        cfg[Number(w.week)] = {
            week: Number(w.week),
            semester: Number(w.semester),
            theme: w.theme || '',
            lessons: w.lessons || [],
            weekly_practice: w.weekly_practice || {},
            name: `Tuần ${w.week}: ${w.theme || 'Luyện tập'}`,
            icon: '🎯'
        };
    });
    roadmapConfig = cfg;
}

function getBaiHocSemester_(data, semesterNumber) {
    const sem = Number(semesterNumber);
    const weeks = (data?.roadmap || []).filter(w => Number(w.semester) === sem);
    if (!weeks.length) return null;
    return { semester: sem, weeks, week_from: weeks[0].week, week_to: weeks[weeks.length - 1].week };
}

function findBaiHocWeek_(data, semesterNumber, weekNumber) {
    return (data?.roadmap || []).find(w => Number(w.semester) === Number(semesterNumber) && Number(w.week) === Number(weekNumber)) || null;
}

function findBaiHocUnit_(data, unitId) {
    for (const w of (data?.roadmap || [])) {
        for (const l of (w.lessons || [])) {
            const contentId = `${l.lesson_id}_content`;
            const practiceId = `${l.lesson_id}_practice`;
            if (unitId === contentId || unitId === practiceId || unitId === l.lesson_id) {
                return { week: w, lesson: l, cardType: unitId === practiceId ? 'practice' : 'content' };
            }
        }
    }
    return null;
}

function getBaiHocProgressKey_() {
    const id = currentUser?.maHS || 'KHACH';
    return `tv2_bai_hoc_completed_${String(id).toUpperCase()}`;
}

function getBaiHocCompletedSet_() {
    try {
        const raw = JSON.parse(localStorage.getItem(getBaiHocProgressKey_()) || '[]');
        return new Set(Array.isArray(raw) ? raw : []);
    } catch (e) {
        return new Set();
    }
}

function saveBaiHocCompletedSet_(setObj) {
    try {
        localStorage.setItem(getBaiHocProgressKey_(), JSON.stringify([...setObj]));
    } catch (e) {
        console.warn('[Bài học] Không thể lưu tiến độ local:', e);
    }
}

async function openBaiHocHub(semesterNumber = 1) {
    stopSpeaking();
    clearInterval(quizTimerInterval);
    if (!hasPremiumAccess()) {
        showPremiumGate('Bài học', '📖');
        return;
    }
    inBaiHocFlow = true;
    inMiniGameFlow = false;
    setMainTabActive_('lessons');
    activeExamContext = null;
    activeRoadmapContext = null;
    activeTopicId = null;
    pendingTopicQuiz = null;
    activeBaiHocContext = { semester: Number(semesterNumber) || 1, week: null, unitId: null };
    applyV7Labels_();
    updateNavTabs('Bài học', '📖', null);
    switchAppView('view-bai-hoc-hub');
    showLoadingOverlay('Đang mở Bài học Tiếng Việt 2...');
    try {
        const data = await loadBaiHocData();
        renderBaiHocHub_(data, activeBaiHocContext.semester);
    } catch (err) {
        alert(`Không thể mở Bài học: ${err.message}`);
    } finally { hideLoadingOverlay(); }
}

function applyV7Labels_() {
    const gaBtn = document.getElementById('btn-bai-hoc-header');
    if (gaBtn) {
        gaBtn.title = 'Bài học';
        const desktop = gaBtn.querySelector('.hidden.md\\:flex');
        if (desktop) desktop.innerHTML = '<span>Bài</span><span>học</span>';
    }
    const pBtn = document.getElementById('btn-progress-header');
    if (pBtn) {
        pBtn.title = 'Bài tập';
        const desktop = pBtn.querySelector('.hidden.md\\:flex');
        if (desktop) desktop.innerHTML = '<span>Luyện</span><span>tuần</span>';
    }
    const hubTitle = document.querySelector('#view-bai-hoc-hub h2');
    if (hubTitle) hubTitle.innerHTML = '<span>📖</span><span>Bài học Tiếng Việt 2</span>';
    const hubSub = document.getElementById('bai-hoc-hub-subtitle');
    if (hubSub) hubSub.textContent = 'Học theo chương trình Kết nối tri thức · gọn, dễ hiểu, có audio và ví dụ mở rộng';
    const weekHint = document.querySelector('#view-bai-hoc-week h2 + p');
    if (weekHint) weekHint.textContent = 'Mỗi bài là một mạch 3 trang: Bài đọc → Câu hỏi → Tổng kết.';
}

function renderBaiHocHub_(data, semesterNumber) {
    const tabs = document.getElementById('bai-hoc-semester-tabs');
    const grid = document.getElementById('bai-hoc-week-grid');
    const subtitle = document.getElementById('bai-hoc-hub-subtitle');
    if (!tabs || !grid) return;
    const semesters = [1,2].filter(sem => (data?.roadmap || []).some(w => Number(w.semester) === sem));
    tabs.innerHTML = semesters.map(sem => {
        const active = Number(sem) === Number(semesterNumber);
        return `<button onclick="openBaiHocHub(${sem})" class="semester-switch-btn ${active ? 'is-active' : 'is-inactive'}">Học kỳ ${sem}</button>`;
    }).join('');
    const sem = getBaiHocSemester_(data, semesterNumber);
    if (!sem) { grid.innerHTML = '<p class="text-slate-400 font-bold">Chưa có dữ liệu học kỳ này.</p>'; return; }
    if (subtitle) subtitle.textContent = `Học kỳ ${sem.semester} · ${sem.weeks.length} tuần thực học · bỏ các tuần ôn tập riêng`;
    const completed = getBaiHocCompletedSet_();
    grid.innerHTML = sem.weeks.map(w => {
        const cards = (w.lessons || []).length;
        const done = (w.lessons || []).reduce((n,l) => n + (completed.has(`${l.lesson_id}_done`) ? 1 : 0), 0);
        const pct = cards ? Math.round(done * 100 / cards) : 0;
        return `<button onclick="openBaiHocWeek(${sem.semester}, ${w.week})" class="text-left bg-gradient-to-br from-white via-pink-50/70 to-purple-50/70 p-3.5 border-2 border-pink-200 hover:border-purple-300 hover:shadow-md transition-colors min-h-[118px] rounded-[24px]">
            <div class="flex items-center gap-2"><span class="text-2xl">📅</span><span class="font-black text-[17px] md:text-lg text-purple-700">Tuần ${w.week}</span></div>
            <p class="text-xs text-slate-600 font-bold mt-2 line-clamp-2">${escapeHtml(w.theme || '')}</p>
            <div class="w-full h-2 bg-pink-100 rounded-full mt-2 overflow-hidden"><div class="h-full bg-gradient-to-r from-pink-400 to-purple-500 rounded-full" style="width:${pct}%"></div></div>
        </button>`;
    }).join('');
}

async function openBaiHocWeek(semesterNumber, weekNumber) {
    stopSpeaking();
    inBaiHocFlow = true;
    activeBaiHocContext = { semester:Number(semesterNumber), week:Number(weekNumber), unitId:null };
    applyV7Labels_();
    updateNavTabs('Bài học','📖',`Tuần ${weekNumber}`);
    switchAppView('view-bai-hoc-week');
    showLoadingOverlay(`Đang mở Bài học Tuần ${weekNumber}...`);
    try {
        const data = await loadBaiHocData();
        const week = findBaiHocWeek_(data, semesterNumber, weekNumber);
        renderBaiHocWeek_(week);
    } catch (err) { alert(`Không thể mở tuần học: ${err.message}`); }
    finally { hideLoadingOverlay(); }
}

function renderBaiHocWeek_(week) {
    const title = document.getElementById('bai-hoc-week-title');
    const list = document.getElementById('bai-hoc-unit-list');
    if (!week || !list) return;
    if (title) {
        title.textContent = `Tuần ${week.week} · ${week.theme || ''}`;
        title.className = 'text-lg md:text-xl font-black text-purple-700';
    }
    const completed = getBaiHocCompletedSet_();
    list.innerHTML = (week.lessons || []).map((l, idx) => {
        const done = completed.has(`${l.lesson_id}_done`);
        const isFirst = Number(l.lesson_no) === 1;
        const tone = isFirst
          ? {bg:'bg-gradient-to-br from-pink-50 via-white to-rose-50', border:'border-pink-200 hover:border-pink-400', icon:'bg-pink-100 border-pink-200', label:'text-pink-600', strip:'from-pink-400 to-rose-400'}
          : {bg:'bg-gradient-to-br from-purple-50 via-white to-violet-50', border:'border-purple-200 hover:border-purple-400', icon:'bg-purple-100 border-purple-200', label:'text-purple-700', strip:'from-purple-400 to-indigo-400'};
        return `<button onclick="openBaiHocCardV8_(${week.week},${l.lesson_no},1)" class="relative overflow-hidden w-full text-left ${tone.bg} border-2 ${done?'border-emerald-300':tone.border} rounded-3xl p-4 shadow-sm hover:shadow-md transition-shadow min-h-[132px]">
          <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${tone.strip}"></div>
          <div class="flex items-start gap-3 mt-1"><div class="w-12 h-12 rounded-2xl ${tone.icon} border flex items-center justify-center text-2xl">${isFirst?'📖':'📚'}</div><div class="min-w-0 flex-1"><div class="text-[11px] font-black ${tone.label}">BÀI ${l.lesson_no} · 3 TRANG</div><div class="font-black text-slate-800 mt-1 text-base">${escapeHtml(l.source_title || `Bài ${idx+1}`)}</div><div class="text-xs text-slate-500 font-semibold mt-1">Bài đọc → Câu hỏi → Tổng kết</div></div><span class="text-lg">${done?'✅':'›'}</span></div>
        </button>`;
    }).join('');
}

async function openBaiHocCardV8_(weekNumber, lessonNo, pageNo = 1) {
    stopSpeaking();
    showLoadingOverlay('Đang mở bài học...');
    try {
        const data = await loadBaiHocData();
        const week = (data.roadmap || []).find(w => Number(w.week) === Number(weekNumber));
        const lesson = (week?.lessons || []).find(l => Number(l.lesson_no) === Number(lessonNo));
        if (!week || !lesson) throw new Error('Không tìm thấy nội dung');
        const safePage = Math.min(3, Math.max(1, Number(pageNo)||1));
        activeBaiHocContext = { semester:Number(week.semester), week:Number(week.week), unitId:`${lesson.lesson_id}_p${safePage}`, lessonId:lesson.lesson_id, lessonNo:Number(lessonNo), pageNo:safePage };
        updateNavTabs('Bài học','📖',`Tuần ${week.week}`,`${lesson.source_title} · Trang ${safePage}/3`);
        renderBaiHocLessonV8_(lesson, week, safePage);
        switchAppView('view-bai-hoc-lesson');
    } catch (err) { alert(`Không thể mở bài học: ${err.message}`); }
    finally { hideLoadingOverlay(); }
}

// Alias cũ để các link/breadcrumb không hỏng.
async function openBaiHocCardV7_(weekNumber, lessonNo, cardType) {
    return openBaiHocCardV8_(weekNumber, lessonNo, cardType === 'practice' ? 2 : 1);
}
async function openBaiHocUnit(unitId) {
    const data = await loadBaiHocData();
    const found = findBaiHocUnit_(data, unitId);
    if (!found) return alert('Không tìm thấy bài học');
    return openBaiHocCardV8_(found.week.week, found.lesson.lesson_no, 1);
}

function renderBaiHocLessonV8_(lesson, week, pageNo) {
    const title = document.getElementById('bai-hoc-lesson-title');
    const metaEl = document.getElementById('bai-hoc-lesson-meta');
    const objectives = document.getElementById('bai-hoc-objectives');
    const sections = document.getElementById('bai-hoc-sections');
    const objectiveBox = objectives?.closest('div');
    if (objectiveBox) objectiveBox.classList.add('hidden');
    const legacy = document.getElementById('bai-hoc-legacy-actions'); if (legacy) legacy.classList.add('hidden');
    if (!sections) return;
    if (title) title.textContent = lesson.source_title || 'Bài học';
    if (metaEl) metaEl.innerHTML = `📖 Bài ${lesson.lesson_no} · Tuần ${week.week} · ${escapeHtml(week.theme || '')}`;
    const pages = lesson.pages || [];
    const page = pages.find(p=>Number(p.page_no)===Number(pageNo)) || pages[pageNo-1] || {};
    const body = page.page_type === 'questions' ? renderBaiHocQuestionsPageV8_(page)
              : page.page_type === 'summary' ? renderBaiHocSummaryPageV8_(page, lesson)
              : renderBaiHocReadingPageV8_(page, lesson);
    sections.innerHTML = `${renderBaiHocPageTabsV8_(week, lesson, pageNo)}${body}${renderBaiHocBottomNavV8_(week, lesson, pageNo)}`;
}

function renderBaiHocPageTabsV8_(week, lesson, pageNo) {
    const labels=[['📖','Bài đọc'],['❓','Câu hỏi'],['🌟','Tổng kết']];
    return `<div class="sticky top-0 z-10 -mx-1 mb-3 px-1 py-1.5 bg-white/95 backdrop-blur rounded-2xl"><div class="grid grid-cols-3 gap-2">${labels.map((x,i)=>{const n=i+1,active=n===Number(pageNo);return `<button onclick="openBaiHocCardV8_(${week.week},${lesson.lesson_no},${n})" class="h-10 rounded-xl border font-black text-xs ${active?'bg-gradient-to-r from-pink-500 to-purple-500 text-white border-purple-400 shadow-md':'bg-pink-50/70 text-purple-700 border-pink-200 hover:bg-purple-50'}">${x[0]} ${x[1]}</button>`}).join('')}</div></div>`;
}

function resolveBaiHocMediaSrc_(src) {
    return normalizeBaiHocImagePath_(src);
}

function renderBaiHocReadingPageV8_(p, lesson) {
    const m = p.material || {};
    const imgSrc = resolveBaiHocMediaSrc_(p.image || m.image || '');

    let material = '';
    if (m.type === 'story') {
      material = `<div class="space-y-3">${(m.paragraphs||[]).map(x =>
        `<p class="text-[17px] md:text-[18px] leading-8 text-slate-800 font-semibold">${escapeHtml(x)}</p>`
      ).join('')}</div>`;
    } else if (m.type === 'poem') {
      material = `<div class="space-y-2">${(m.lines||[]).map(x =>
        `<p class="text-[17px] md:text-[18px] leading-8 text-slate-800 font-bold">${escapeHtml(x)}</p>`
      ).join('')}</div>`;
    } else {
      material = `<p class="text-[17px] md:text-[18px] leading-8 text-slate-800 font-semibold">${escapeHtml(m.text || '')}</p>`;
    }

    const audioText = (m.paragraphs||m.lines||[]).join(' ') || m.text || p.intro || lesson.source_title;

    const words = (p.words||[]).map(x => `
      <button onclick="speakVietnamese('${escapeJsString_(x.word)}',0.9)"
              class="px-3 py-2 rounded-xl bg-purple-50 border border-purple-100 text-purple-700 font-black text-[16px] md:text-[17px] leading-7 text-left">
        🔊 ${escapeHtml(x.word)}
        <span class="font-semibold text-slate-500">· ${escapeHtml(x.meaning||'')}</span>
      </button>`).join('');

    const intro = `
      <div class="w-full text-center mb-3">
        <div class="inline-flex max-w-[920px] items-center justify-center rounded-2xl bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 px-5 py-3">
          <p class="font-black text-slate-800 text-[17px] md:text-[19px] leading-8">
            🐰 ${escapeHtml(p.intro || 'Cùng cô đọc bài nhé!')}
          </p>
        </div>
      </div>`;

    const imagePanel = imgSrc ? `
      <div class="bh8-picture-panel self-stretch flex items-center justify-center">
        <div class="w-full overflow-hidden rounded-[22px] border-2 border-pink-100 bg-white shadow-sm">
          <img src="${escapeHtml(imgSrc)}"
               alt="Tranh minh họa ${escapeHtml(lesson.source_title||'bài học')}"
               class="block w-full h-auto max-h-[560px] object-contain bg-pink-50/20"
               onerror="this.closest('.bh8-picture-panel').style.display='none'">
        </div>
      </div>` : '';

    const readingPanel = `
      <div class="min-w-0">
        <div class="flex items-start justify-between gap-3 mb-3">
          <h3 class="font-black text-[22px] md:text-[24px] text-slate-900 leading-tight">
            ${escapeHtml(lesson.source_title||'')}
          </h3>
          <button onclick="speakVietnamese('${escapeJsString_(audioText)}',0.94)"
                  class="px-4 py-2.5 rounded-xl bg-purple-100 border border-purple-200 text-purple-700 font-black text-[16px] md:text-[17px] shrink-0">
            🔊 Cô đọc
          </button>
        </div>

        <div class="space-y-3">${material}</div>

        ${words ? `
          <div class="flex flex-wrap gap-2 mt-4 pt-3 border-t border-pink-100">
            ${words}
          </div>` : ''}
      </div>`;

    return `
      ${intro}
      <div class="bh8-reading-layout grid grid-cols-1 md:grid-cols-[50%_50%] gap-3 md:gap-4 items-start">
        ${imagePanel}
        ${readingPanel}
      </div>`;
}

function renderBaiHocQuestionsPageV8_(p) {
    const examples=(p.extra_examples||[]).map(x=>`<div class="rounded-xl bg-white border border-purple-100 px-3 py-2 text-[15px] md:text-base font-semibold text-slate-700 leading-7">✨ ${escapeHtml(x)}</div>`).join('');
    const items=(p.items||[]).map((x,i)=>{
      if (x.type==='choice') return `<div class="rounded-2xl bg-pink-50/70 border border-pink-100 p-3"><div class="font-black text-[15px] md:text-base text-slate-700 mb-2 leading-7">${i+1}. ${escapeHtml(x.prompt)}</div>${(x.options||[]).map((op,j)=>`<button onclick="this.parentElement.querySelectorAll('button').forEach(b=>b.classList.remove('bg-emerald-100','border-emerald-300','bg-rose-50','border-rose-200')); if(${j}===${Number(x.answer||0)}){this.classList.add('bg-emerald-100','border-emerald-300')}else{this.classList.add('bg-rose-50','border-rose-200')}" class="w-full text-left px-3 py-2.5 my-1 rounded-xl bg-white border border-pink-100 font-bold text-[15px] md:text-base leading-7">${String.fromCharCode(65+j)}. ${escapeHtml(op)}</button>`).join('')}</div>`;
      return `<div class="rounded-2xl ${i%2?'bg-purple-50':'bg-emerald-50'} border ${i%2?'border-purple-100':'border-emerald-100'} p-3"><div class="font-bold text-[15px] md:text-base text-slate-700 leading-7">${i+1}. ${x.type==='speak'?'🎙️':'💭'} ${escapeHtml(x.prompt||'')}</div></div>`;
    }).join('');
    return `<div class="space-y-3"><section class="rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 p-3"><div class="font-black text-purple-700 mb-1">🐰 Nhớ lại bài đọc trước nhé</div><p class="font-bold text-slate-700 text-[15px] md:text-base leading-7">${escapeHtml(p.recall||'Con có thể quay lại Trang 1 bất cứ lúc nào để tìm chi tiết nhé!')}</p></section><section class="space-y-3">${items}</section>${examples?`<section class="grid gap-2"><div class="font-black text-purple-700 text-[15px] md:text-base">🌈 Mở rộng thêm</div>${examples}</section>`:''}</div>`;
}

function renderBaiHocSummaryPageV8_(p, lesson) {
    const pts=(p.key_points||[]).map(x=>`<li>${escapeHtml(x)}</li>`).join('');
    const words=(p.words||[]).map(x=>`<span class="inline-flex px-3 py-2 rounded-full bg-pink-50 border border-pink-100 text-pink-700 font-black text-[15px] md:text-base">${escapeHtml(x.word)}${x.meaning?` · <span class="ml-1 text-slate-500 font-semibold">${escapeHtml(x.meaning)}</span>`:''}</span>`).join('');
    const conn=(p.connections||[]).map(x=>`<div class="rounded-xl bg-white border border-purple-100 px-3 py-2 text-[15px] md:text-base font-semibold text-slate-700 leading-7">🔗 ${escapeHtml(x)}</div>`).join('');
    return `<div class="space-y-3"><section class="rounded-3xl bg-gradient-to-br from-amber-50 via-pink-50 to-purple-50 border-2 border-amber-200 p-4 md:p-5"><div class="text-[11px] font-black text-amber-600">🌟 TRANG 3 · TỔNG KẾT</div><h3 class="font-black text-xl text-purple-800 mt-1">Con đã học được gì?</h3><ul class="list-disc pl-5 mt-3 space-y-2 text-[15px] md:text-base text-slate-700 font-semibold leading-7">${pts}</ul></section>${words?`<section class="rounded-2xl bg-white border border-pink-100 p-4"><div class="font-black text-pink-700 mb-2">💬 Từ hay cần nhớ</div><div class="flex flex-wrap gap-2">${words}</div></section>`:''}${conn?`<section class="rounded-2xl bg-purple-50/60 border border-purple-100 p-4"><div class="font-black text-purple-700 mb-2">🌈 Liên hệ thêm</div><div class="grid gap-2">${conn}</div></section>`:''}<section class="rounded-2xl bg-emerald-50 border border-emerald-100 p-4"><div class="font-black text-emerald-700">🎙️ Trước khi xong bài</div><p class="text-[15px] md:text-base font-semibold text-slate-700 mt-1 leading-7">${escapeHtml(p.finish_prompt||'Con hãy nói lại một điều con nhớ nhất nhé!')}</p></section><button onclick="markCurrentBaiHocLessonCompleteV8_()" class="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-black shadow-md hover:brightness-105">✅ Hoàn thành bài ${lesson.lesson_no}</button></div>`;
}

function renderBaiHocBottomNavV8_(week, lesson, pageNo) {
    const prev = Number(pageNo)>1 ? `<button onclick="openBaiHocCardV8_(${week.week},${lesson.lesson_no},${Number(pageNo)-1})" class="px-4 py-2.5 rounded-xl bg-white border border-purple-200 text-purple-700 font-black text-xs">← Trang trước</button>` : '<span></span>';
    const next = Number(pageNo)<3 ? `<button onclick="openBaiHocCardV8_(${week.week},${lesson.lesson_no},${Number(pageNo)+1})" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-black text-xs shadow-sm">Trang tiếp →</button>` : `<button onclick="openBaiHocCardV8_(${week.week},${lesson.lesson_no},1)" class="px-4 py-2.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 font-black text-xs">↺ Xem lại bài đọc</button>`;
    return `<div class="flex items-center justify-between gap-3 pt-1">${prev}<div class="text-[11px] font-black text-slate-400">${pageNo}/3</div>${next}</div>`;
}

function markCurrentBaiHocLessonCompleteV8_() {
    const id = activeBaiHocContext?.lessonId;
    if (!id) return;
    const set = getBaiHocCompletedSet_(); set.add(`${id}_done`); saveBaiHocCompletedSet_(set);
    const btn = event?.currentTarget; if (btn) { btn.textContent='✅ Đã hoàn thành bài học'; btn.classList.add('from-emerald-500','to-teal-500'); }
}

function formatPeriodSpan_(span) {
    const arr = Array.isArray(span) ? span : [];
    if (!arr.length) return 'Tiết học';
    return arr.length > 1 && arr[0] !== arr[arr.length - 1] ? `Tiết ${arr[0]}-${arr[arr.length - 1]}` : `Tiết ${arr[0]}`;
}

function renderBaiHocSection_(unit, section, index) {
    const icons = { warmup:'🌟', discovery:'🔎', teacher_guidance:'👩‍🏫', guided_practice:'🤝', independent_practice:'✏️', application:'🌱', summary:'💡' };
    const icon = icons[section.type] || '📘';
    const teacher = section.teacher_text ? `<div class="bg-sky-50/70 border border-sky-100 rounded-xl p-3 text-sm text-slate-700 font-semibold leading-relaxed">${escapeHtml(section.teacher_text)}</div>` : '';
    const activities = (section.activities || []).map(a => renderBaiHocActivity_(unit, a)).join('');
    return `<section class="bg-white border border-sky-100 rounded-2xl p-3.5 md:p-4 shadow-sm space-y-3">
        <div class="flex items-center gap-2"><span class="text-xl">${icon}</span><h3 class="font-black text-slate-800 text-sm md:text-base">${index + 1}. ${escapeHtml(section.title || 'Hoạt động')}</h3></div>
        ${teacher}
        <div class="space-y-2.5">${activities}</div>
    </section>`;
}


function normalizeBaiHocImagePath_(src) {
    const s = String(src || '');
    const m = s.match(/^assets\/bai-hoc\/hk\d+\/w(\d+)\/TV2_GA_HK\d+_W\d+_P([0-9_]+)_IMG(\d+)\.webp$/i);
    if (!m) return s;
    return `images/bai-hoc/GA_W${m[1]}_P${m[2]}_${m[3]}.webp`;
}

function renderBaiHocActivity_(unit, a) {
    const type = a.activity_type || 'activity';
    const prompt = escapeHtml(a.prompt || '');
    const base = 'rounded-xl border p-3';
    if (type === 'tap_word') {
        const chips = (a.items || []).map(item => `<button type="button" onclick="this.classList.toggle('bg-pink-500');this.classList.toggle('text-white');this.classList.toggle('border-pink-500')" class="px-3 py-1.5 rounded-full bg-white border border-pink-200 text-pink-700 font-extrabold text-xs transition-all">${escapeHtml(item)}</button>`).join('');
        return `<div class="${base} bg-pink-50/50 border-pink-100"><p class="font-bold text-[15px] md:text-base text-slate-700 leading-7">👆 ${prompt}</p><div class="flex flex-wrap gap-2 mt-2">${chips}</div></div>`;
    }
    if (type === 'single_choice') {
        const opts = (a.options || []).map((op, idx) => `<button onclick="handleBaiHocChoice('${unit.unit_id}','${a.activity_id}',${idx})" class="ga-choice w-full text-left px-3 py-2 rounded-xl bg-white border border-sky-200 hover:bg-sky-50 text-sm font-bold">${String.fromCharCode(65+idx)}. ${escapeHtml(op)}</button>`).join('');
        return `<div id="ga-act-${safeDomId_(unit.unit_id)}-${safeDomId_(a.activity_id)}" class="${base} bg-sky-50/50 border-sky-100"><p class="font-bold text-[15px] md:text-base text-slate-700 leading-7">❓ ${prompt}</p><div class="grid gap-2 mt-2">${opts}</div><div class="ga-feedback hidden mt-2 text-xs font-extrabold"></div></div>`;
    }
    if (type === 'self_check') {
        const checks = (a.checks || []).map(x => `<label class="flex items-start gap-2 text-xs font-bold text-slate-600"><input type="checkbox" class="mt-0.5 accent-emerald-500"> <span>${escapeHtml(x)}</span></label>`).join('');
        return `<div class="${base} bg-emerald-50/50 border-emerald-100"><p class="font-bold text-[15px] md:text-base text-slate-700 leading-7">✅ ${prompt}</p><div class="grid gap-1.5 mt-2">${checks}</div></div>`;
    }
    if (type === 'listen') {
        const src = a.media?.audio || '';
        const fallback = getBaiHocLearningAudioText_(unit) || a.prompt || '';
        return `<div class="${base} bg-purple-50/50 border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2"><p class="font-bold text-[15px] md:text-base text-slate-700 leading-7">🎧 ${prompt}</p><button onclick="playBaiHocAudio('${escapeJsString_(src)}','${escapeJsString_(fallback)}')" class="px-3 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-xl font-extrabold text-xs shrink-0">🔊 Nghe cô đọc</button></div>`;
    }
    if (type === 'observe') {
        const src = normalizeBaiHocImagePath_(a.media?.image || '');
        const img = src ? `<div class="mt-2 rounded-xl overflow-hidden bg-white border border-sky-100"><img src="${escapeHtml(src)}" alt="Minh họa" class="w-full max-w-[820px] mx-auto max-h-[300px] md:max-h-[500px] object-contain" onerror="this.parentElement.classList.add('hidden')"></div>` : '';
        return `<div class="${base} bg-sky-50/40 border-sky-100"><p class="font-bold text-[15px] md:text-base text-slate-700 leading-7">🖼️ ${prompt}</p>${img}</div>`;
    }
    if (type === 'summary_card') return `<div class="${base} bg-amber-50 border-amber-200"><p class="font-black text-sm text-amber-900">💡 ${prompt}</p></div>`;
    if (type === 'write_offline') return `<div class="${base} bg-amber-50/50 border-amber-100"><p class="font-bold text-[15px] md:text-base text-slate-700 leading-7">✍️ ${prompt}</p><p class="text-[11px] text-amber-700 font-bold mt-1">Con thực hành vào vở/bảng như một tiết học trên lớp nhé.</p></div>`;
    if (type === 'read_aloud') return `<div class="${base} bg-rose-50/50 border-rose-100"><p class="font-bold text-[15px] md:text-base text-slate-700 leading-7">📣 ${prompt}</p></div>`;
    if (type === 'speak') return `<div class="${base} bg-emerald-50/50 border-emerald-100"><p class="font-bold text-[15px] md:text-base text-slate-700 leading-7">🎙️ ${prompt}</p></div>`;
    if (type === 'sequence') {
        const items = (a.items || []).map((x,i) => `<span class="px-2.5 py-1 rounded-lg bg-white border border-indigo-100 text-xs font-extrabold text-indigo-700">${String(x).startsWith('IMG_') ? `Tranh ${i+1}` : escapeHtml(x)}</span>`).join('');
        return `<div class="${base} bg-indigo-50/50 border-indigo-100"><p class="font-bold text-[15px] md:text-base text-slate-700 leading-7">🔢 ${prompt}</p><div class="flex flex-wrap gap-2 mt-2">${items}</div></div>`;
    }
    if (type === 'match') {
        const groups = [...new Set((a.pairs || []).map(p => p.group))];
        const rows = (a.pairs || []).map((p,i) => `<div class="flex items-center gap-2"><span class="flex-1 text-xs font-bold text-slate-700">${escapeHtml(p.item)}</span><select data-correct="${escapeHtml(p.group)}" class="ga-match-select px-2 py-1.5 rounded-lg border border-indigo-200 bg-white text-xs font-bold"><option value="">Chọn nhóm</option>${groups.map(g=>`<option value="${escapeHtml(g)}">${escapeHtml(g)}</option>`).join('')}</select></div>`).join('');
        return `<div id="ga-act-${safeDomId_(unit.unit_id)}-${safeDomId_(a.activity_id)}" class="${base} bg-indigo-50/50 border-indigo-100"><p class="font-bold text-[15px] md:text-base text-slate-700 leading-7">🔗 ${prompt}</p><div class="grid gap-2 mt-2">${rows}</div><button onclick="checkBaiHocMatch('${unit.unit_id}','${a.activity_id}')" class="mt-2 px-3 py-1.5 bg-indigo-500 text-white rounded-lg text-xs font-extrabold">Kiểm tra</button><div class="ga-feedback hidden mt-2 text-xs font-extrabold"></div></div>`;
    }
    return `<div class="${base} bg-slate-50 border-slate-200"><p class="font-bold text-[15px] md:text-base text-slate-700 leading-7">📘 ${prompt}</p></div>`;
}

function safeDomId_(s) { return String(s || '').replace(/[^a-zA-Z0-9_-]/g, '_'); }
function escapeJsString_(s) { return String(s || '').replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/\r?\n/g,' '); }

async function playBaiHocAudio(src, fallbackText) {
    stopAllAudio();
    const epoch = appViewEpoch;
    const lessonStillOpen = () => epoch === appViewEpoch && isViewActive('view-bai-hoc-lesson');
    if (!src) {
        if (lessonStillOpen()) speakVietnamese(fallbackText || '', 0.94);
        return;
    }
    const audio = new Audio(src);
    activeStandaloneAudios.add(audio);
    const cleanup = () => activeStandaloneAudios.delete(audio);
    audio.onended = cleanup;
    audio.onerror = () => {
        cleanup();
        if (lessonStillOpen()) speakVietnamese(fallbackText || '', 0.94);
    };
    try {
        await audio.play();
    } catch (e) {
        cleanup();
        if (lessonStillOpen()) speakVietnamese(fallbackText || '', 0.94);
    }
}

async function handleBaiHocChoice(unitId, activityId, selectedIndex) {
    const data = await loadBaiHocData();
    const found = findBaiHocUnit_(data, unitId);
    if (!found) return;
    const activity = (found.unit.sections || []).flatMap(s => s.activities || []).find(a => String(a.activity_id) === String(activityId));
    if (!activity) return;
    const box = document.getElementById(`ga-act-${safeDomId_(unitId)}-${safeDomId_(activityId)}`);
    if (!box) return;
    const buttons = [...box.querySelectorAll('.ga-choice')];
    buttons.forEach((b, i) => {
        b.disabled = true;
        if (i === Number(activity.answer)) b.classList.add('bg-emerald-100','border-emerald-400','text-emerald-800');
        else if (i === Number(selectedIndex)) b.classList.add('bg-rose-100','border-rose-400','text-rose-800');
    });
    const ok = Number(selectedIndex) === Number(activity.answer);
    const fb = box.querySelector('.ga-feedback');
    if (fb) {
        fb.textContent = ok ? (activity.feedback?.correct || 'Đúng rồi!') : (activity.feedback?.retry || 'Con xem lại gợi ý rồi thử nhớ nhé.');
        fb.className = `ga-feedback mt-2 text-xs font-extrabold ${ok ? 'text-emerald-700' : 'text-rose-700'}`;
    }
}

function checkBaiHocMatch(unitId, activityId) {
    const box = document.getElementById(`ga-act-${safeDomId_(unitId)}-${safeDomId_(activityId)}`);
    if (!box) return;
    const selects = [...box.querySelectorAll('.ga-match-select')];
    const ok = selects.length && selects.every(s => s.value && s.value === s.dataset.correct);
    const fb = box.querySelector('.ga-feedback');
    selects.forEach(s => s.classList.toggle('border-emerald-400', s.value === s.dataset.correct));
    if (fb) {
        fb.textContent = ok ? 'Đúng rồi! Các từ đã được nối đúng nhóm.' : 'Con kiểm tra lại những từ chưa đúng nhóm nhé.';
        fb.className = `ga-feedback mt-2 text-xs font-extrabold ${ok ? 'text-emerald-700' : 'text-rose-700'}`;
    }
}

function markCurrentBaiHocComplete() {
    const unitId = activeBaiHocContext.unitId;
    if (!unitId) return;
    const completed = getBaiHocCompletedSet_();
    completed.add(unitId);
    saveBaiHocCompletedSet_(completed);
    updateBaiHocCompleteButton_(unitId);
    const el = document.getElementById('bai-hoc-complete-note');
    if (el) { el.textContent = 'Đã hoàn thành phần này trên thiết bị ✅'; el.classList.remove('hidden'); }
}

function updateBaiHocCompleteButton_(unitId) {
    const btn = document.getElementById('bai-hoc-complete-btn');
    if (!btn) return;
    const done = getBaiHocCompletedSet_().has(unitId);
    btn.textContent = done ? '✅ Đã hoàn thành' : '✓ Hoàn thành phần này';
    btn.classList.toggle('bg-emerald-500', done);
    btn.classList.toggle('bg-sky-500', !done);
}

async function startBaiHocExtraPractice() {
    // V7: Luyện cùng cô đã là ô riêng trong Bài học; Bài tập là module đánh giá riêng.
    if (activeBaiHocContext.week) openBaiHocWeek(activeBaiHocContext.semester, activeBaiHocContext.week);
}

async function startRandomExam(categoryKey) {
    stopSpeaking();
    // Dữ liệu đề thi Tiếng Việt 2 không có field "exam_category" dạng chữ — phân loại HK1/HK2/HSG
    // dựa đúng theo TIỀN TỐ của "exam_id" (12.1.x = HK1, 12.2.x = HK2, 12.3.x = HSG),
    // khớp với ma trận exam_id đã chuẩn hoá trong file dữ liệu.
    const idPrefix = examFileMap[categoryKey]?.idPrefix || '';

    showLoadingOverlay("Đang chuẩn bị đề thi...");
    try {
        const examData = await loadExamDataFile('de_thi_tieng_viet_2.json');
        hideLoadingOverlay();

        const pool = (examData && Array.isArray(examData.exams)) ? examData.exams : [];
        let candidates = pool.filter(e => String(e.exam_id || '').startsWith(idPrefix));
        if (!candidates.length) return alert('Đang cập nhật thêm đề thi cho mục này, bé quay lại sau nhé!');

        const exam = candidates[Math.floor(Math.random() * candidates.length)];
        const examIndex = pool.indexOf(exam);
        const examLabel = examFileMap[categoryKey]?.label || 'Đề thi';
        const examTitle = exam.exam_title || exam.name || exam.title || `${examLabel} - Đề số ${examIndex + 1}`;

        activeExamContext = {
            categoryKey,
            examIndex,
            examTitle,
            examCategory: exam.exam_category || categoryKey,
            matrixVersion: exam.matrix_version || 'TV2_V6_1',
            skillMaxScore: exam.skill_max_score || null
        };
        activeRoadmapContext = null;
        pendingTopicQuiz = null;

        const questions = Array.isArray(exam.questions) && exam.questions.length ? [...exam.questions] : [];
        if (!questions.length) return alert('Đề thi này chưa có câu hỏi, bé chọn đề khác nhé!');
        questions.sort((a, b) => Number(a.question_number_in_exam || 999) - Number(b.question_number_in_exam || 999));

        updateNavTabs("12. Đấu trường đề thi", "🏆", examTitle);
        startTopicQuiz(0, examTitle, questions, null);
    } catch (err) {
        hideLoadingOverlay();
        alert(`Không thể tải đề thi: ${err.message}`);
    }
}

function startExamCountdown() {
    quizRemainingSeconds = 40 * 60;
    updateExamTimerDisplay();
    clearInterval(quizTimerInterval);
    quizTimerInterval = setInterval(() => {
        quizRemainingSeconds--;
        updateExamTimerDisplay();
        if (quizRemainingSeconds <= 0) {
            clearInterval(quizTimerInterval);
            alert('Đã hết giờ làm bài! Bài thi sẽ được nộp lại nhé bé.');
            showResultScreen();
        }
    }, 1000);
}

function updateExamTimerDisplay() {
    const el = document.getElementById('quiz-timer-display');
    if (!el) return;
    const m = Math.floor(Math.max(0, quizRemainingSeconds) / 60);
    const s = Math.max(0, quizRemainingSeconds) % 60;
    el.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function openExamHub() {
    stopSpeaking();
    inMiniGameFlow = false;
    inBaiHocFlow = false;
    if (!hasPremiumAccess()) {
        showPremiumGate('Đấu trường đề thi', '🏆');
        return;
    }
    setMainTabActive_('exams');
    activeExamContext = null;
    activeRoadmapContext = null;
    activeTopicId = null;
    pendingTopicQuiz = null;
    updateNavTabs("12. Đấu trường đề thi", "🏆", null);
    switchAppView('view-exam-hub');
    showLoadingOverlay("Đang tải kho đề thi...");
    renderExamHubGrid().finally(() => hideLoadingOverlay());
}

async function renderExamHubGrid() {
    const container = document.getElementById('exam-categories-grid');
    if (!container) return;

    let examData = null;
    try { examData = await loadExamDataFile('de_thi_tieng_viet_2.json'); } catch (e) {}

    const getCountForPrefix = (idPrefix) => {
        if (!examData || !examData.exams) return 3;
        return examData.exams.filter(e => String(e.exam_id || '').startsWith(idPrefix)).length || 0;
    };

    const countHK1 = getCountForPrefix(examFileMap.hocky1.idPrefix);
    const countHK2 = getCountForPrefix(examFileMap.hocky2.idPrefix);
    const countHSG = getCountForPrefix(examFileMap.hsg.idPrefix);

    let html = `
        <div class="bg-pink-50/70 p-5 rounded-3xl border-2 border-pink-200 flex flex-col justify-between items-center text-center group min-h-[250px] pastel-card">
            <div>
                <div class="text-4xl mb-1.5 group-hover:scale-110 transition-transform">🔢</div>
                <h3 class="font-extrabold text-pink-600 text-lg mb-1">Học kỳ 1</h3>
                <p class="text-xs text-gray-500 font-bold mb-2">Kiểm tra kiến thức HK1</p>
                <span class="inline-block bg-pink-100 text-pink-700 px-3 py-0.5 rounded-full text-xs font-black mb-3">${countHK1} đề thi chuẩn</span>
            </div>
            <div class="w-full space-y-2">
                <button onclick="startRandomExam('hocky1')" class="w-full py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-extrabold rounded-xl text-xs pastel-btn shadow-sm">
                    🚀 Vào thi thử
                </button>
                <button onclick="openHistoryModal('LichSuBaiThiHK1')" class="w-full py-2 bg-white text-pink-700 border border-pink-300 font-extrabold rounded-xl text-xs pastel-btn hover:bg-pink-50">
                    📊 Xem lịch sử thi
                </button>
            </div>
        </div>

        <div class="bg-purple-50/70 p-5 rounded-3xl border-2 border-purple-200 flex flex-col justify-between items-center text-center group min-h-[250px] pastel-card">
            <div>
                <div class="text-4xl mb-1.5 group-hover:scale-110 transition-transform">⭐</div>
                <h3 class="font-extrabold text-purple-600 text-lg mb-1">Học kỳ 2</h3>
                <p class="text-xs text-gray-500 font-bold mb-2">Kiểm tra kiến thức HK2</p>
                <span class="inline-block bg-purple-100 text-purple-700 px-3 py-0.5 rounded-full text-xs font-black mb-3">${countHK2} đề thi chuẩn</span>
            </div>
            <div class="w-full space-y-2">
                <button onclick="startRandomExam('hocky2')" class="w-full py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-extrabold rounded-xl text-xs pastel-btn shadow-sm">
                    🚀 Vào thi thử
                </button>
                <button onclick="openHistoryModal('LichSuBaiThiHK2')" class="w-full py-2 bg-white text-purple-700 border border-purple-300 font-extrabold rounded-xl text-xs pastel-btn hover:bg-purple-50">
                    📊 Xem lịch sử thi
                </button>
            </div>
        </div>

        <div class="bg-amber-50/70 p-5 rounded-3xl border-2 border-amber-200 flex flex-col justify-between items-center text-center group min-h-[250px] pastel-card">
            <div>
                <div class="text-4xl mb-1.5 group-hover:scale-110 transition-transform">🏆</div>
                <h3 class="font-extrabold text-amber-600 text-lg mb-1">Học sinh giỏi</h3>
                <p class="text-xs text-gray-500 font-bold mb-2">Thử thách nâng cao IQ</p>
                <span class="inline-block bg-amber-100 text-amber-700 px-3 py-0.5 rounded-full text-xs font-black mb-3">${countHSG} đề thi tuyển chọn</span>
            </div>
            <div class="w-full space-y-2">
                <button onclick="startRandomExam('hsg')" class="w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold rounded-xl text-xs pastel-btn shadow-sm">
                    🚀 Vào thi thử
                </button>
                <button onclick="openHistoryModal('LichSuBaiThiHSG')" class="w-full py-2 bg-white text-amber-700 border border-amber-300 font-extrabold rounded-xl text-xs pastel-btn hover:bg-amber-50">
                    📊 Xem lịch sử thi
                </button>
            </div>
        </div>
    `;
    container.innerHTML = html;
}

// ==========================================
// ĐIỀU HƯỚNG VIEW & BREADCRUMB
// ==========================================
function updateNavTabs(level2Title, level2Icon, level3Title, level4Title) {
    const tab2 = document.getElementById('header-level2-tab');
    const tab3 = document.getElementById('header-level3-tab');
    const tab4 = document.getElementById('header-level4-tab');
    const homeBtn = document.getElementById('btn-header-home');

    if (level2Title) {
        document.getElementById('header-level2-title').textContent = level2Title;
        document.getElementById('header-level2-icon').textContent = level2Icon || '🔢';
        tab2.classList.remove('hidden');
        tab2.classList.add('flex');
        homeBtn.classList.add('opacity-80', 'hover:opacity-100');
    } else {
        tab2.classList.add('hidden');
        tab2.classList.remove('flex');
        homeBtn.classList.remove('opacity-80');
    }

    if (level3Title) {
        document.getElementById('header-level3-title').textContent = level3Title;
        tab3.classList.remove('hidden');
        tab3.classList.add('flex');

        // Trong luồng Bài học, breadcrumb Tuần là một tab đang active:
        // tô sáng giống tab Bài học và cho phép bấm để quay lại danh sách tiết của tuần.
        const level3Chip = tab3.querySelector('div');
        if (level3Chip) {
            const activeWeek = inBaiHocFlow && activeBaiHocContext && activeBaiHocContext.week;
            level3Chip.classList.remove(
                'bg-purple-50', 'border-purple-200', 'text-purple-700', 'shadow-inner',
                'bg-gradient-to-r', 'from-purple-500', 'to-violet-500', 'text-white',
                'border-purple-400', 'shadow-sm', 'cursor-pointer'
            );

            if (activeWeek) {
                level3Chip.classList.add(
                    'bg-gradient-to-r', 'from-purple-500', 'to-violet-500',
                    'text-white', 'border-purple-400', 'shadow-sm', 'cursor-pointer'
                );
                level3Chip.setAttribute('role', 'button');
                level3Chip.setAttribute('tabindex', '0');
                level3Chip.title = `Quay lại Tuần ${activeBaiHocContext.week}`;
                level3Chip.onclick = () => openBaiHocWeek(
                    activeBaiHocContext.semester || 1,
                    activeBaiHocContext.week
                );
                level3Chip.onkeydown = (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        level3Chip.click();
                    }
                };
            } else {
                level3Chip.classList.add('bg-purple-50', 'border-purple-200', 'text-purple-700', 'shadow-inner');
                level3Chip.removeAttribute('role');
                level3Chip.removeAttribute('tabindex');
                level3Chip.removeAttribute('title');
                level3Chip.onclick = null;
                level3Chip.onkeydown = null;
            }
        }
    } else {
        tab3.classList.add('hidden');
        tab3.classList.remove('flex');
    }

    if (level4Title && tab4) {
        document.getElementById('header-level4-title').textContent = level4Title;
        tab4.classList.remove('hidden');
        tab4.classList.add('flex');
    } else if (tab4) {
        tab4.classList.add('hidden');
        tab4.classList.remove('flex');
    }
}

function returnToTopicLecture() {
    stopSpeaking();
    clearInterval(quizTimerInterval);
    if (inBaiHocFlow) {
        openBaiHocHub(activeBaiHocContext.semester || 1);
    } else if (activeExamContext) {
        openExamHub();
    } else if (activeRoadmapContext) {
        openRoadmap();
    } else if (pendingTopicQuiz) {
        updateNavTabs(pendingTopicQuiz.topicName, TOPICS_CONFIG.find(t => t.id === pendingTopicQuiz.topicNum)?.icon, null);
        switchAppView('view-lecture');
    } else if (inMiniGameFlow) {
        openMiniGameHub();
    }
}

function switchAppView(viewId) {
    appViewEpoch++;
    stopAllAudio();
    if (viewId !== 'view-game-play') activeMiniGameId = null;
    ['view-dashboard-grid', 'view-bai-hoc-hub', 'view-bai-hoc-week', 'view-bai-hoc-lesson', 'view-lecture', 'view-quiz', 'view-roadmap', 'view-minigame-hub', 'view-game-play', 'view-exam-hub', 'view-result'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        if (id === viewId) el.classList.remove('hidden');
        else el.classList.add('hidden');
    });
}

let currentMainTab = 'discover';

function setMainTabActive_(tabName) {
    currentMainTab = tabName || 'discover';
    document.querySelectorAll('.main-module-tab').forEach(btn => {
        btn.classList.toggle('is-active', btn.dataset.tab === currentMainTab);
        btn.setAttribute('aria-selected', btn.dataset.tab === currentMainTab ? 'true' : 'false');
    });
}

function refreshMainTabLocks_() {
    const locked = !hasPremiumAccess();
    ['bai-hoc-lock-icon','roadmap-lock-icon','review-lock-icon','exam-lock-icon','minigame-lock-icon'].forEach(id => {
        document.getElementById(id)?.classList.toggle('hidden', !locked);
    });
}

function openReviewTab() {
    if (!hasPremiumAccess()) { showPremiumGate('Ôn tập', '🧠'); return; }
    setMainTabActive_('review');
    openTopic(11, '11. Ôn tập tổng hợp', '🧠');
}

function openMainTab(tabName) {
    stopSpeaking();
    clearInterval(quizTimerInterval);
    switch (tabName) {
        case 'discover': goHome(); break;
        case 'lessons': openBaiHocHub(1); break;
        case 'exercises': openRoadmap(1); break;
        case 'review': openReviewTab(); break;
        case 'exams': openExamHub(); break;
        case 'games': openMiniGameHub(); break;
        default: goHome();
    }
}

function goHome() {
    stopSpeaking();
    clearInterval(quizTimerInterval);
    inMiniGameFlow = false;
    inBaiHocFlow = false;
    activeExamContext = null;
    activeRoadmapContext = null;
    activeTopicId = null;
    pendingTopicQuiz = null;
    updateNavTabs(null, null, null);
    setMainTabActive_('discover');
    switchAppView('view-dashboard-grid');
}

// ==========================================
// HỆ THỐNG XÁC THỰC TÀI KHOẢN & LỜI CHÀO ĐÓN
// ==========================================
function switchAuthTab(tab) {
    const isLogin = tab === 'login';
    document.getElementById('form-login').classList.toggle('hidden', !isLogin);
    document.getElementById('form-register').classList.toggle('hidden', isLogin);
    document.getElementById('tab-btn-login').className = `py-2.5 rounded-xl font-extrabold text-sm pastel-btn ${isLogin ? 'bg-white text-pink-600 shadow-sm' : 'text-gray-400'}`;
    document.getElementById('tab-btn-register').className = `py-2.5 rounded-xl font-extrabold text-sm pastel-btn ${!isLogin ? 'bg-white text-pink-600 shadow-sm' : 'text-gray-400'}`;
    hideAuthError();
}

function updateMaHSPreview() {
    const lop = document.getElementById('reg-lop').value.trim().toUpperCase();
    const stt = document.getElementById('reg-stt').value.trim();
    document.getElementById('mahs-preview').textContent = (lop && stt) ? `${lop}-${stt.padStart(2, '0')}` : '--';
}

function showAuthError(msg) {
    const el = document.getElementById('auth-error-msg');
    if (!el) return;
    el.textContent = msg;
    el.classList.remove('hidden');
}
function hideAuthError() { 
    const el = document.getElementById('auth-error-msg');
    if (el) el.classList.add('hidden'); 
}

async function callAppsScript(action, payload) {
    const res = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action, payload })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const rawText = await res.text();
    try {
        return JSON.parse(rawText);
    } catch (e) {
        throw new Error('Google Apps Script trả về dữ liệu không hợp lệ (không phải JSON) — thường do link Apps Script chưa được Deploy đúng cách (cần đặt quyền truy cập là "Anyone"/"Bất kỳ ai") hoặc đã hết hạn uỷ quyền. Anh vui lòng kiểm tra lại bước Deploy > Manage deployments trên Apps Script nhé.');
    }
}

function savePersistentSession_() {
    if (!currentUser || currentUser.isGuest || !currentUser.token) return;
    const student = { ...currentUser };
    delete student.isGuest;
    try {
        localStorage.setItem(PERSISTENT_SESSION_KEY, JSON.stringify({
            token: currentUser.token,
            maHS: currentUser.maHS,
            student
        }));
    } catch (e) {
        console.warn('Không thể lưu phiên đăng nhập:', e);
    }
}

function clearPersistentSession_() {
    try { localStorage.removeItem(PERSISTENT_SESSION_KEY); } catch (e) {}
}

function readPersistentSession_() {
    try {
        const raw = localStorage.getItem(PERSISTENT_SESSION_KEY);
        if (!raw) return null;
        const data = JSON.parse(raw);
        if (!data || !data.token || !data.maHS) return null;
        return data;
    } catch (e) {
        clearPersistentSession_();
        return null;
    }
}

async function doLogin() {
    hideAuthError();
    const maHSInput = document.getElementById('login-mahs');
    const maPinInput = document.getElementById('login-mapin');
    const maHS = (maHSInput?.value || '').trim().toUpperCase();
    const maPin = (maPinInput?.value || '').trim();

    if (!maHS || !maPin) {
        const msg = 'Bé nhập đủ mã ID và mã PIN nhé!';
        showAuthError(msg);
        alert(msg);
        return;
    }
    if (!/^\d{6}$/.test(maPin)) {
        const msg = 'Mã PIN phải gồm đúng 6 chữ số!';
        showAuthError(msg);
        alert(msg);
        return;
    }

    const btn = document.getElementById('btn-do-login');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i> Đang đăng nhập...';

    try {
        const result = await callAppsScript('login', { maHS, maPin });
        if (!result.ok) {
            const errMsg = result.error || 'Mã ID thẻ học sinh hoặc mã PIN không đúng!';
            showAuthError(errMsg);
            alert(errMsg);
            return;
        }
        currentUser = { ...result.student, isGuest: false, token: result.token };
        currentSessionPin = maPin;
        savePersistentSession_();
        enterDashboard();
    } catch (err) {
        const connErr = 'Lỗi kết nối máy chủ: ' + err.message;
        showAuthError(connErr);
        alert(connErr);
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-right-to-bracket mr-1"></i> Đăng nhập';
    }
}

async function doRegister() {
    hideAuthError();
    const hoTen = document.getElementById('reg-hoten').value.trim();
    const ngaySinhRaw = document.getElementById('reg-ngaysinh').value;
    const lop = document.getElementById('reg-lop').value.trim().toUpperCase();
    const soThuTu = document.getElementById('reg-stt').value.trim();
    const maPin = document.getElementById('reg-mapin').value.trim();

    if (!hoTen || !ngaySinhRaw || !lop || !soThuTu || !maPin) {
        const msg = 'Bé điền đủ tất cả các ô có dấu * nhé!';
        showAuthError(msg);
        alert(msg);
        return;
    }
    if (!/^\d{6}$/.test(maPin)) {
        const msg = 'Mã PIN phải gồm đúng 6 chữ số!';
        showAuthError(msg);
        alert(msg);
        return;
    }

    const [y, m, d] = ngaySinhRaw.split('-');
    const ngaySinh = `${d}-${m}-${y.slice(2)}`;
    const btn = document.getElementById('btn-do-register');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i> Đang đăng ký...';

    try {
        const result = await callAppsScript('register', { hoTen, ngaySinh, lop, soThuTu, maPin });
        if (!result.ok) {
            showAuthError(result.error);
            alert(result.error);
            return;
        }
        if (result.wasAutoAdjusted) {
            alert(`Mã ID ${result.baseMaHS} đã có người sử dụng. Hệ thống đã tự tạo mã ID mới cho bé là: ${result.student.maHS}\n\nBé hãy ghi nhớ mã ID này để đăng nhập nhé!`);
        } else {
            alert(`Đăng ký thành công! Tài khoản ${result.student.maHS} đã được tạo ở hạng Regular và có thể đăng nhập ngay.`);
        }
        document.getElementById('login-mahs').value = result.student.maHS;
        switchAuthTab('login');
    } catch (err) {
        const connErr = 'Lỗi kết nối: ' + err.message;
        showAuthError(connErr);
        alert(connErr);
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-user-plus mr-1"></i> Đăng ký ngay';
    }
}

async function tryAutoLogin() {
    const saved = readPersistentSession_();
    if (!saved) return false;

    // Khôi phục ngay từ dữ liệu đã lưu để tránh cảm giác bị "văng" về Khách khi trang/PWA reload.
    if (saved.student) {
        currentUser = { ...saved.student, maHS: saved.maHS, isGuest: false, token: saved.token };
        currentSessionPin = '';
        enterDashboard(true);
    }

    // Sau đó xác thực lại với máy chủ và lấy thông tin tài khoản mới nhất.
    try {
        const result = await callAppsScript('restoreSession', { token: saved.token });
        if (!result || !result.ok) {
            clearPersistentSession_();
            currentUser = { name: 'Khách (Guest)', isGuest: true, tuanHienTai: 1, hoTen: 'Bé Khách', lop: '', maHS: 'KHACH', vaiTro: 'guest', loaiTaiKhoan: 'guest' };
            currentSessionPin = '';
            enterDashboard(true);
            return false;
        }
        currentUser = { ...result.student, isGuest: false, token: result.token || saved.token };
        currentSessionPin = '';
        savePersistentSession_();

        // Chỉ đồng bộ lại thông tin tài khoản/quyền sau khi restoreSession thành công.
        // TUYỆT ĐỐI không gọi enterDashboard() ở đây, vì phản hồi mạng có thể về muộn
        // sau khi bé đã mở một bài học; enterDashboard() sẽ gọi goHome() và làm bé
        // bị văng khỏi bài đang học về trang chủ.
        updateUserInfoBox();
        renderDashboardGrid();
        renderExamHubGrid();
        return true;
    } catch (err) {
        // Mất mạng tạm thời không làm bé bị đăng xuất. Phiên đã lưu vẫn được giữ lại.
        console.warn('Chưa xác thực lại được phiên đăng nhập; tiếp tục dùng phiên đã lưu.', err);
        return !!saved.student;
    }
}

function showAuthScreen(tab = 'login') {
    stopSpeaking();
    document.getElementById('screen-dashboard')?.classList.add('hidden');
    document.getElementById('screen-login')?.classList.remove('hidden');
    switchAuthTab(tab);
    setTimeout(() => {
        if (tab === 'login') document.getElementById('login-mahs')?.focus();
        else document.getElementById('reg-hoten')?.focus();
    }, 50);
}

function logout() {
    const tokenToRevoke = currentUser?.token || '';
    clearPersistentSession_();
    currentSessionPin = '';
    currentUser = { name: 'Khách (Guest)', isGuest: true, tuanHienTai: 1, hoTen: 'Bé Khách', lop: '', maHS: 'KHACH', vaiTro: 'guest', loaiTaiKhoan: 'guest' };
    const mahsInput = document.getElementById('login-mahs');
    const mapinInput = document.getElementById('login-mapin');
    if (mahsInput) mahsInput.value = '';
    if (mapinInput) mapinInput.value = '';
    hideAuthError();
    enterDashboard(true);
    if (tokenToRevoke) callAppsScript('logout', { token: tokenToRevoke }).catch(() => {});
}

function handleGuestMode() {
    currentSessionPin = '';
    currentUser = { name: 'Khách (Guest)', isGuest: true, tuanHienTai: 1, hoTen: 'Bé Khách', lop: '', maHS: 'KHACH', vaiTro: 'guest', loaiTaiKhoan: 'guest' };
    enterDashboard(true);
}

function enterDashboard(isSilent = false) {
    document.getElementById('screen-login')?.classList.add('hidden');
    document.getElementById('screen-dashboard')?.classList.remove('hidden');
    updateUserInfoBox();
    refreshMainTabLocks_();
    resetStars();
    renderDashboardGrid();
    renderExamHubGrid();
    goHome();

    if (!isSilent && currentUser && !currentUser.isGuest) {
        setTimeout(() => {
            const template = GREETINGS_STUDENT[Math.floor(Math.random() * GREETINGS_STUDENT.length)];
            const msg = template.replace('{name}', currentUser.hoTen);
            speakVietnamese(msg, 0.96);
        }, 450);
    }
}

function hasPremiumAccess() {
    if (!currentUser || currentUser.isGuest) return false;
    if (String(currentUser.vaiTro || '').toLowerCase() === 'admin') return true;
    const tier = String(currentUser.loaiTaiKhoan || 'regular').toLowerCase();
    return tier === 'trial' || tier === 'vip';
}

function getTierLabel_() {
    if (!currentUser || currentUser.isGuest) return 'Khách';
    if (String(currentUser.vaiTro || '').toLowerCase() === 'admin') return 'Admin';
    const tier = String(currentUser.loaiTaiKhoan || 'regular').toLowerCase();
    if (tier === 'vip') return 'VIP';
    if (tier === 'trial') return 'Trial';
    return 'Regular';
}


function showAccessGate(options = {}) {
    const modal = document.getElementById('modal-access-gate');
    if (!modal) return;

    const title = options.title || 'Tính năng dành cho tài khoản';
    const message = options.message || 'Con vui lòng đăng nhập để sử dụng tính năng này nhé!';
    const icon = options.icon || '🐰';
    const showAuth = options.showAuth !== false;
    const note = options.note || '🌸 Các chuyên đề cơ bản vẫn học miễn phí bình thường nhé!';

    const titleEl = document.getElementById('access-gate-title');
    const msgEl = document.getElementById('access-gate-message');
    const iconEl = document.getElementById('access-gate-icon');
    const noteEl = document.getElementById('access-gate-note');
    const authActions = document.getElementById('access-gate-auth-actions');

    if (titleEl) titleEl.textContent = title;
    if (msgEl) msgEl.innerHTML = message;
    if (iconEl) iconEl.textContent = icon;
    if (noteEl) noteEl.textContent = note;
    if (authActions) authActions.classList.toggle('hidden', !showAuth);

    modal.classList.remove('hidden');
}

function closeAccessGate() {
    document.getElementById('modal-access-gate')?.classList.add('hidden');
}

function openAuthFromAccessGate(tab) {
    closeAccessGate();
    showAuthScreen(tab || 'login');
}

function showLoginRequiredGate(featureName = 'Tính năng này', icon = '🐰') {
    showAccessGate({
        title: featureName,
        icon,
        showAuth: true,
        message: `${escapeHtml(featureName)} dành cho học sinh đã đăng nhập.<br>Con có thể <strong>Sign in</strong> nếu đã có tài khoản hoặc <strong>Sign up</strong> để đăng ký nhé!`
    });
}

function showPremiumGate(featureName = 'Nội dung Premium', icon = '🔒') {
    const isGuest = !currentUser || currentUser.isGuest;
    const safeFeatureName = escapeHtml(featureName);
    showAccessGate({
        title: featureName,
        icon,
        showAuth: isGuest,
        message: isGuest
            ? `Đây là <strong>${safeFeatureName}</strong> dành cho tài khoản <strong>Trial hoặc VIP</strong>.<br>Con có thể <strong>Sign in</strong> nếu đã có tài khoản hoặc <strong>Sign up</strong> để đăng ký nhé!<br>Các chuyên đề cơ bản vẫn học miễn phí bình thường.`
            : `Đây là <strong>${safeFeatureName}</strong> dành cho tài khoản <strong>Trial hoặc VIP</strong>.<br>Tài khoản hiện tại của con đang là <strong>Regular</strong>.<br>Các chuyên đề cơ bản vẫn học miễn phí bình thường.`
    });
}

function updateUserInfoBox() {
    const box = document.getElementById('user-info-box');
    if (!box) return;

    // Khóa các nội dung Premium chỉ hiện với Khách / Regular;
    // ẩn khi Admin / Trial / VIP đã có quyền Premium.
    const baiHocLock = document.getElementById('bai-hoc-lock-icon');
    if (baiHocLock) baiHocLock.classList.toggle('hidden', hasPremiumAccess());
    const roadmapLock = document.getElementById('roadmap-lock-icon');
    if (roadmapLock) roadmapLock.classList.toggle('hidden', hasPremiumAccess());
    const minigameLock = document.getElementById('minigame-lock-icon');
    if (minigameLock) minigameLock.classList.toggle('hidden', hasPremiumAccess());

    if (!currentUser || currentUser.isGuest) {
        box.innerHTML = `
            <div class="flex items-center gap-1.5">
                <span class="text-amber-600 font-extrabold text-xs px-1.5">Khách</span>
                <button onclick="showAuthScreen('login')" class="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-extrabold text-xs pastel-btn whitespace-nowrap">Sign in/up</button>
            </div>`;
        return;
    }

    const isAdmin = String(currentUser.vaiTro || '').toLowerCase() === 'admin';
    const tier = getTierLabel_();
    const tierClass = isAdmin ? 'text-amber-600' : (tier === 'VIP' ? 'text-amber-600' : (tier === 'Trial' ? 'text-purple-600' : 'text-slate-500'));
    box.innerHTML = `
        <div class="flex items-center space-x-2">
            <div class="text-right">
                <div class="${isAdmin ? 'text-amber-600' : 'text-pink-600'} font-extrabold text-sm md:text-base leading-tight">${escapeHtml(currentUser.hoTen)}</div>
                <div class="${tierClass} font-semibold text-[10px]">${escapeHtml(tier)} · ID ${escapeHtml(currentUser.maHS)}</div>
            </div>
            ${isAdmin ? '<button onclick="openAdminAccounts()" title="Quản lý tài khoản" class="h-9 px-3 flex items-center justify-center bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-xl border border-amber-200 text-xs font-extrabold pastel-btn"><i class="fa-solid fa-users-gear mr-1"></i>Quản lý</button>' : ''}
            <button onclick="logout()" title="Đăng xuất" class="w-8 h-8 flex items-center justify-center bg-rose-100 hover:bg-rose-200 text-rose-500 rounded-xl border border-rose-200 text-xs transition-shadow duration-200 hover:shadow-[0_0_12px_rgba(244,63,94,0.55)]"><i class="fa-solid fa-right-from-bracket"></i></button>
        </div>`;
}

function resetStars() {
    starGreenCount = 0; starRedCount = 0;
    const greenEl = document.getElementById('star-green-count');
    const redEl = document.getElementById('star-red-count');
    if (greenEl) greenEl.textContent = 0;
    if (redEl) redEl.textContent = 0;
}

function clickProgressOrExam(type) {
    // Bản đồ tuần là nội dung Premium giống TA3: chỉ Admin / Trial / VIP được vào.
    // Khách và Regular đều dùng chung popup Premium để thông báo nhất quán.
    if (type === 'progress') {
        if (!hasPremiumAccess()) {
            showPremiumGate('Bài tập', '🎯');
            return;
        }
        openRoadmap();
        return;
    }

    if (!currentUser || currentUser.isGuest) {
        showLoginRequiredGate('Tính năng này', '🐰');
        return;
    }
    if (type === 'exam') openExamHub();
}

// ==========================================
// CHỦ ĐỀ 1: BẢNG CHỮ CÁI TƯƠNG TÁC (1.1 ĐẾN 1.4)
// ==========================================
function openTopic(topicNum, topicName, icon) {
    stopSpeaking();
    inMiniGameFlow = false;
    inBaiHocFlow = false;
    if (Number(topicNum) === 11 && !hasPremiumAccess()) {
        showPremiumGate('11. Ôn tập tổng hợp', '🧠');
        return;
    }
    if (Number(topicNum) === 11) setMainTabActive_('review');
    activeTopicId = topicNum; activeExamContext = null; activeRoadmapContext = null;
    updateNavTabs(topicName, icon || '🐰', null);

    showLoadingOverlay(`Đang tải chủ đề "${topicName}"...`);
    fetchAllTopicsData().then(topics => {
        hideLoadingOverlay();
        const topicObj = topics.find(t => Number(t.topic_id) === Number(topicNum));
        if (!topicObj || !topicObj.questions || !topicObj.questions.length) throw new Error("Chủ đề không có câu hỏi nào");
        showLectureAndSubtopics(topicNum, topicName, topicObj);
    }).catch(err => {
        hideLoadingOverlay();
        // Tải lỗi thì đưa header về đúng trạng thái trang chủ (không để lại tab/gạch breadcrumb thừa)
        activeTopicId = null;
        updateNavTabs(null, null, null);
        alert(`Không thể tải chủ đề: ${err.message}`);
    });
}

function setSubtopicGridColumns(count) {
    const el = document.getElementById('lecture-subtopics-list');
    if (!el) return;
    if (count > 6) {
        el.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full max-w-4xl';
    } else {
        el.className = 'grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-2xl';
    }
}

function showLectureAndSubtopics(topicNum, topicName, topicObj) {
    pendingTopicQuiz = { topicNum, topicName, questions: topicObj.questions };
    
    document.getElementById('lecture-title').textContent = topicObj.lecture_title || topicName;
    document.getElementById('lecture-content').textContent = topicObj.lecture_content || topicObj.description || 'Chào mừng bé yêu! Hãy chọn một mục nhỏ bên dưới để bắt đầu luyện tập nhé.';
    document.getElementById('view-lecture').dataset.audioText = topicObj.lecture_audio_text || topicObj.lecture_content || topicObj.description || '';

    const groups = [], groupMap = {}, groupLabels = {};
    topicObj.questions.forEach(q => {
        const k = (q.sub_topic || 'Câu hỏi chung').trim();
        if (!groupMap[k]) { groupMap[k] = []; groups.push(k); groupLabels[k] = q.sub_topic_label || k; }
        groupMap[k].push(q);
    });
    pendingTopicQuiz.groups = groups; 
    pendingTopicQuiz.groupMap = groupMap;
    pendingTopicQuiz.groupLabels = groupLabels;

    let subHtml = '';
    groups.forEach((subName, idx) => {
        const style = SUBTOPIC_PALETTES[idx % SUBTOPIC_PALETTES.length];
        const displayTitle = beautifySubtopicName(groupLabels[subName]);
        const count = groupMap[subName].length;

        subHtml += `
            <button onclick="selectSubtopic(${idx})" class="p-3 ${style.card} border-2 rounded-xl font-bold text-left transition-all flex items-center justify-between shadow-sm pastel-btn">
                <span class="text-sm md:text-base leading-snug"><strong class="${style.num} mr-1.5">${idx + 1}.</strong> ${escapeHtml(displayTitle)}</span>
                <span class="text-xs font-extrabold ${style.badge} px-2.5 py-0.5 rounded-full border shrink-0 ml-1.5 shadow-inner">${count} câu</span>
            </button>`;
    });
    setSubtopicGridColumns(groups.length);
    document.getElementById('lecture-subtopics-list').innerHTML = subHtml;

    updateNavTabs(topicName, TOPICS_CONFIG.find(t => t.id === topicNum)?.icon || '🔢', null);
    switchAppView('view-lecture');
}

function speakLecture() {
    speakVietnamese(document.getElementById('view-lecture').dataset.audioText || '', 0.96);
}

function selectSubtopic(idx) {
    stopSpeaking();
    if (!pendingTopicQuiz) return;
    const { topicNum, topicName, questions, groups, groupMap, groupLabels } = pendingTopicQuiz;
    const subLabel = idx !== null ? groups[idx] : null;
    const pool = idx !== null ? groupMap[subLabel] : questions;
    const displayLabel = subLabel ? beautifySubtopicName(groupLabels[subLabel]) : null;
    const finalTitle = displayLabel ? `${topicName} - ${displayLabel}` : topicName;

    practiceCycleRawPool = [...pool];
    const firstCycleQuestions = shuffleArray([...pool]);

    updateNavTabs(topicName, TOPICS_CONFIG.find(t => t.id === topicNum)?.icon || '🔢', displayLabel || 'Tất cả các mục');
    startTopicQuiz(topicNum, finalTitle, firstCycleQuestions, subLabel);
}

// ==========================================
// TIẾN TRÌNH TUẦN: BẢN ĐỒ SVG
// ==========================================
function handleNextExamFromReport() {
    stopSpeaking();
    if (activeRoadmapContext) {
        const sem = Number(activeRoadmapContext.week) <= 17 ? 1 : 2;
        activeRoadmapContext = null;
        openRoadmap(sem);
    } else if (activeExamContext) {
        activeExamContext = null;
        openExamHub();
    } else {
        goHome();
    }
}

function getLuyenTuanProgressKey_() {
    const id = currentUser?.maHS || 'KHACH';
    return `tv2_v7_luyen_tuan_unlocked_v2_${String(id).toUpperCase()}`;
}

function getLearningWeekNumbersV7_(data) {
    return (data?.roadmap || []).map(w => Number(w.week)).filter(Number.isFinite).sort((a,b)=>a-b);
}

function getUnlockedLearningWeekV7_(data) {
    const weeks = getLearningWeekNumbersV7_(data);
    if (!weeks.length) return 1;
    const firstWeek = weeks[0];
    let localWeek = firstWeek;
    try {
        const saved = Number(localStorage.getItem(getLuyenTuanProgressKey_()) || firstWeek);
        if (Number.isFinite(saved)) localWeek = saved;
    } catch (e) {}
    // V7: mở khóa CHỈ theo kết quả Bài tập. Không dùng tuanHienTai cũ của tài khoản,
    // vì trường này thuộc cơ chế Tiến trình cũ và có thể làm mở toàn bộ tuần.
    let unlocked = firstWeek;
    for (const w of weeks) {
        if (w <= localWeek) unlocked = w;
        else break;
    }
    return unlocked;
}

function saveUnlockedLearningWeekV7_(week) {
    const n = Number(week);
    if (!Number.isFinite(n)) return;
    try { localStorage.setItem(getLuyenTuanProgressKey_(), String(n)); } catch (e) {}
}

function isLearningWeekUnlockedV7_(data, weekNum) {
    return Number(weekNum) <= Number(getUnlockedLearningWeekV7_(data));
}

function getNextLearningWeekV7_(data, weekNum) {
    return getLearningWeekNumbersV7_(data).find(w => w > Number(weekNum)) || null;
}

async function openRoadmap(semesterNumber = 1) {
    stopSpeaking();
    inMiniGameFlow = false;
    inBaiHocFlow = false;
    applyV7Labels_();
    updateNavTabs('Bài tập','🎯',null);
    switchAppView('view-roadmap');
    showLoadingOverlay('Đang mở Bài tập...');
    try {
        const data = await loadBaiHocData();
        renderLuyenTuanGridV7_(data, semesterNumber);
    } catch (err) { alert(`Không thể mở Bài tập: ${err.message}`); }
    finally { hideLoadingOverlay(); }
}

function renderLuyenTuanGridV7_(data, semesterNumber) {
    const view = document.getElementById('view-roadmap');
    const container = document.getElementById('roadmap-svg-container');
    if (!view || !container) return;
    const h2=view.querySelector('h2'); if(h2) { h2.innerHTML='<span>🎯</span><span>Bài tập</span>'; h2.className='text-base md:text-lg font-extrabold text-purple-700 flex items-center space-x-2'; }
    const p=view.querySelector('h2 + p'); if(p) p.textContent='20 câu mỗi tuần · đạt từ 80% để mở tuần thực học tiếp theo · đánh giá theo 6 năng lực.';
    const history=view.querySelector('button[onclick*="LichSuTienTrinhTuan"] span'); if(history) history.textContent='📊 Lịch sử Bài tập';
    const weeks=(data.roadmap||[]).filter(w=>Number(w.semester)===Number(semesterNumber));
    const unlockedWeek = getUnlockedLearningWeekV7_(data);
    const tabHost=document.getElementById('roadmap-semester-tabs');
    if(tabHost) tabHost.innerHTML=[1,2].map(s=>`<button onclick="openRoadmap(${s})" class="semester-switch-btn ${Number(s)===Number(semesterNumber)?'is-active':'is-inactive'}">Học kỳ ${s}</button>`).join('');
    const grid=`<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">${weeks.map((w,idx)=>{
        const unlocked = Number(w.week) <= Number(unlockedWeek);
        const alt = idx % 2 === 0;
        const stateCls = unlocked
            ? (alt ? 'bg-gradient-to-br from-pink-50 via-white to-fuchsia-50 border-pink-200 hover:border-fuchsia-400' : 'bg-gradient-to-br from-purple-50 via-white to-indigo-50 border-purple-200 hover:border-indigo-400')
            : 'bg-gradient-to-br from-slate-50 to-purple-50/40 border-slate-200 opacity-65 cursor-not-allowed';
        const action = unlocked ? `onclick="selectRoadmapWeek(${w.week})"` : `onclick="showLockedLuyenTuanV7_(${w.week})"`;
        const accent = unlocked ? (alt ? 'text-fuchsia-700' : 'text-purple-700') : 'text-slate-500';
        return `<button ${action} class="relative text-left border-2 ${stateCls} rounded-2xl p-3.5 shadow-sm ${unlocked?'hover:shadow-md cursor-pointer':''} transition-shadow min-h-[138px]">
            <div class="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl ${unlocked ? (alt?'bg-gradient-to-r from-pink-400 to-fuchsia-500':'bg-gradient-to-r from-purple-400 to-indigo-500') : 'bg-slate-300'}"></div>
            ${unlocked ? '' : '<span class="absolute top-3 right-3 text-base">🔒</span>'}
            <div class="flex justify-between items-start gap-2 mt-1"><span class="text-2xl">${unlocked?'🎯':'🔐'}</span><span class="text-[10px] font-black ${unlocked?'bg-white text-purple-700 border-purple-100':'bg-slate-100 text-slate-500 border-slate-200'} border px-2 py-0.5 rounded-full">20 câu</span></div>
            <div class="font-black ${accent} mt-2">Tuần ${w.week}</div>
            <div class="text-xs font-semibold text-slate-600 mt-1 line-clamp-2">${escapeHtml(w.theme||'')}</div>
            <div class="text-[10px] font-extrabold mt-2 ${unlocked?'text-emerald-600':'text-slate-400'}">${unlocked?'✓ Đã mở':'🔒 Cần ≥ 80% tuần trước'}</div>
        </button>`;
    }).join('')}</div>`;
    container.className='w-full bg-gradient-to-br from-pink-50/70 via-white to-purple-50/70 rounded-3xl border-2 border-pink-200 p-3 md:p-4 shadow-sm';
    container.innerHTML=`<div class="w-full">${grid}</div>`;
}
function showLockedLuyenTuanV7_(weekNum) {
    alert(`🔒 Bài tập ${weekNum} chưa mở. Bé cần đạt từ 80% ở Bài tập trước để mở khóa Bài tập tiếp theo nhé!`);
}

function getQuestionsForWeekV7_(weekConfig) {
    if (!weekConfig || !allQuestionsFlatCache) return [];
    const wp=weekConfig.weekly_practice || {};
    const subIds=wp.sub_ids || [];
    const topicIds=(wp.topic_ids || []).map(Number);
    let scoped=allQuestionsFlatCache.filter(q => (subIds.length && subIds.includes(q.sub_id)) || (topicIds.length && topicIds.includes(Number(q.source_topic_id))));
    if (!scoped.length) scoped=[...allQuestionsFlatCache];
    // Candidate pool ~30; then pick 20 with diversity across the 6 skill tags available in that week's pool.
    const candidate=shuffleArray(scoped).slice(0, Math.min(Number(wp.candidate_pool_target||30), scoped.length));
    const bySkill={}; candidate.forEach(q=>{ const m=String(q.skill_tag||'C1').match(/C([1-6])/i); const k=m?'C'+m[1]:'C1'; (bySkill[k] ||= []).push(q); });
    const selected=[], used=new Set();
    const skills=['C1','C2','C3','C4','C5','C6'];
    let progress=true;
    while(selected.length < Number(wp.question_count||20) && progress){
      progress=false;
      for(const k of skills){
        const arr=bySkill[k]||[];
        while(arr.length && used.has(arr[0].question_id)) arr.shift();
        if(arr.length && selected.length < Number(wp.question_count||20)) { const q=arr.shift(); used.add(q.question_id); selected.push(q); progress=true; }
      }
    }
    if(selected.length < Number(wp.question_count||20)) {
      for(const q of candidate){ if(!used.has(q.question_id)){ selected.push(q); used.add(q.question_id); if(selected.length>=Number(wp.question_count||20)) break; } }
    }
    return shuffleArray(selected.slice(0, Number(wp.question_count||20)));
}

async function selectRoadmapWeek(weekNum) {
    stopSpeaking();
    showLoadingOverlay(`Đang chuẩn bị 20 câu Bài tập ${weekNum}...`);
    try {
        const data = await loadBaiHocData();
        const config = (data.roadmap || []).find(w => Number(w.week) === Number(weekNum));
        if (!config) throw new Error('Không tìm thấy tuần học');
        if (!isLearningWeekUnlockedV7_(data, weekNum)) {
            showLockedLuyenTuanV7_(weekNum);
            return;
        }
        await fetchAllTopicsData();
        const weekQuestions = getQuestionsForWeekV7_(config);
        if (!weekQuestions.length) throw new Error('Kho câu hỏi phù hợp tuần này chưa đủ dữ liệu');
        activeRoadmapContext = { week:Number(weekNum), topicId:`W${weekNum}`, chuDe:`Bài tập ${weekNum} · ${config.theme||''}` };
        pendingTopicQuiz = null; activeExamContext = null;
        updateNavTabs('Bài tập','🎯',`Tuần ${weekNum}`,config.theme||'');
        startTopicQuiz(weekNum, activeRoadmapContext.chuDe, weekQuestions, null);
    } catch (err) { alert(`Không thể mở Bài tập: ${err.message}`); }
    finally { hideLoadingOverlay(); }
}

// ==========================================
// LOGIC CHẤM ĐIỂM & ĐIỀU KHIỂN CÂU HỎI
// ==========================================
function startTopicQuiz(topicNum, topicName, questions, subLabel) {
    stopSpeaking();
    clearInterval(quizTimerInterval);
    activeQuestionsList = questions; 
    currentQIndex = 0; 
    score = 0;
    userAnswers = {};
    wrongAttemptsByQ = {};
    quizWrongAnswers = []; 
    quizAnsweredLog = []; 
    quizStartTime = Date.now();

    const topBar = document.getElementById('quiz-top-bar');
    const cardHeader = document.getElementById('quiz-card-header');
    const navPractice = document.getElementById('nav-group-practice');
    const navExam = document.getElementById('nav-group-exam');

    const submitBtn = document.getElementById('btn-submit-quiz');
    if (submitBtn) {
        if (activeRoadmapContext) submitBtn.classList.add('hidden');
        else submitBtn.classList.remove('hidden');
    }

    const roadmapHistoryBtn = document.getElementById('btn-roadmap-history');
    if (roadmapHistoryBtn) {
        if (activeRoadmapContext) { roadmapHistoryBtn.classList.remove('hidden'); roadmapHistoryBtn.classList.add('flex'); }
        else { roadmapHistoryBtn.classList.add('hidden'); roadmapHistoryBtn.classList.remove('flex'); }
    }

    if (activeRoadmapContext || activeExamContext) {
        if (topBar) {
            if (activeExamContext) topBar.classList.remove('hidden');
            else topBar.classList.add('hidden');
        }
        const timerBox = document.getElementById('quiz-timer-container');
        if (activeExamContext) {
            if (timerBox) timerBox.classList.remove('hidden');
            startExamCountdown();
        } else {
            if (timerBox) timerBox.classList.add('hidden');
        }
        if (cardHeader) { cardHeader.classList.remove('hidden'); cardHeader.classList.add('flex'); }
        if (navPractice) navPractice.classList.add('hidden');
        if (navExam) { navExam.classList.remove('hidden'); navExam.classList.add('flex'); }
        initQuizPallet();
    } else {
        if (topBar) topBar.classList.add('hidden');
        if (cardHeader) { cardHeader.classList.add('hidden'); cardHeader.classList.remove('flex'); }
        if (navPractice) { navPractice.classList.remove('hidden'); navPractice.classList.add('flex'); }
        if (navExam) { navExam.classList.add('hidden'); navExam.classList.remove('flex'); }
    }

    switchAppView('view-quiz');
    loadQuestion();
}

function loadQuestion() {
    stopSpeaking();
    const q = activeQuestionsList[currentQIndex];
    if (!q) return;

    const isEvaluationMode = !!activeExamContext || !!activeRoadmapContext;

    if (isEvaluationMode) {
        document.getElementById('q-badge-index').textContent = `CÂU ${currentQIndex + 1} / ${activeQuestionsList.length}`;
        const isRoadmap = !!activeRoadmapContext;
        const skillName = isRoadmap
            ? (beautifySubtopicName(q.sub_topic_label) || 'Kiến thức tổng hợp')
            : (SKILL_TAXONOMY[q.skill_tag]?.name || beautifySubtopicName(q.sub_topic_label) || 'Kiến thức tổng hợp');
        document.getElementById('q-skill-text').textContent = skillName;

        const scoreBadge = document.getElementById('q-badge-score');
        if (scoreBadge) {
            if (isRoadmap) {
                scoreBadge.classList.add('hidden');
            } else {
                scoreBadge.classList.remove('hidden');
                scoreBadge.textContent = `(${q.diem ?? 0.5} điểm)`;
            }
        }
    } else {
        const stepEl = document.getElementById('practice-step-text');
        if (stepEl) stepEl.textContent = `Câu ${currentQIndex + 1} / ${activeQuestionsList.length}`;
    }

    let mediaHtml = '';
    if (q.image_url && !activeExamContext) {
        mediaHtml = `<img src="${q.image_url}" alt="minh họa" class="w-14 h-14 md:w-16 md:h-16 object-contain mb-1 floating" onerror="this.remove()">`;
    }

    const pText = q.reading_passage;
    const pTitle = q.reading_title;
    const passageLines = pText ? pText.split('\n').map(l => l.trim()).filter(Boolean) : [];
    const avgLineLen = passageLines.length ? passageLines.reduce((a, l) => a + l.length, 0) / passageLines.length : 0;
    const isPoemLike = passageLines.length >= 4 && avgLineLen > 0 && avgLineLen < 35;
    const useTwoColumns = isPoemLike;
    const passageHtml = pText ? `
        <div class="w-full max-w-3xl bg-pink-50/70 border-2 border-pink-200 rounded-2xl p-3 mb-1.5 text-left shadow-xs">
            ${pTitle ? `<p class="font-black text-pink-700 text-sm md:text-base mb-1">${escapeHtml(pTitle)}</p>` : ''}
            <p class="text-gray-800 text-sm md:text-base font-bold whitespace-pre-line leading-relaxed ${useTwoColumns ? 'md:columns-2 md:gap-6' : ''}">${escapeHtml(pText)}</p>
        </div>` : '';

    const practiceSpeakerBtnHtml = !isEvaluationMode ? `
        <div class="flex items-center justify-center mt-1 mb-1">
            <button onclick="speakCurrentQuestion()" class="px-4 py-1.5 bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 rounded-2xl text-sm md:text-base font-extrabold flex items-center space-x-1.5 pastel-btn shadow-xs">
                <i class="fa-solid fa-volume-high text-pink-600"></i>
                <span>Nghe câu hỏi</span>
            </button>
        </div>
    ` : '';

    const isLetterListen = q.render_style === 'letter_listen';

    let html;
    if (isLetterListen) {
        html = `
            ${mediaHtml}
            <div class="w-full max-w-3xl border-2 border-dashed border-pink-200 bg-pink-50/40 rounded-3xl px-4 py-4 md:py-5 flex flex-col items-center text-center mb-3">
                <div class="text-3xl md:text-4xl mb-1.5 space-x-2">
                    <span>🎧</span><span>👂</span><span>🔢</span>
                </div>
                <p class="text-sm md:text-base lg:text-lg font-black text-rose-600 leading-snug">${escapeHtml(q.question_text)}</p>
                ${practiceSpeakerBtnHtml}
            </div>

            <div class="w-full max-w-3xl flex flex-wrap items-center justify-center gap-3 mt-1">
        `;
        q.options.forEach(opt => {
            html += `
                <button data-opt="${escapeHtml(opt)}" onclick="checkAnswer('${opt.replace(/'/g, "\\'")}')" class="option-btn min-w-[140px] px-6 py-3 bg-white hover:bg-emerald-50 border-2 border-emerald-400 rounded-full font-black text-emerald-700 text-base md:text-lg transition-all pastel-btn shadow-xs">
                    ${escapeHtml(opt)}
                </button>`;
        });
        html += `</div>`;
        if (q.mascot_text) {
            html += `
                <div class="mt-4 inline-flex items-center space-x-1.5 bg-pink-50 border border-pink-200 rounded-full px-3.5 py-1.5">
                    <span>🐰</span>
                    <span class="text-sm md:text-base font-extrabold text-rose-600">${escapeHtml(q.mascot_text)}</span>
                </div>`;
        }
    } else {
        html = `
        ${mediaHtml}
        ${passageHtml}
        <div class="flex flex-col items-center justify-center max-w-3xl text-center px-2 mb-0.5">
            <h3 class="text-sm md:text-base lg:text-lg font-black text-slate-900 leading-snug">
                ${escapeHtml(q.question_text)}
            </h3>
            ${practiceSpeakerBtnHtml}
        </div>
        
        <div class="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-1">
    `;

    q.options.forEach((opt, idx) => {
        const formattedOpt = capitalizeFirstLetter(opt);
        const letter = String.fromCharCode(65 + idx);

        if (activeExamContext) {
            html += `
                <button data-opt="${escapeHtml(opt)}" onclick="checkAnswer('${opt.replace(/'/g, "\\'")}')" class="option-btn w-full p-2.5 md:p-3 bg-white hover:bg-pink-50/50 border border-pink-200 rounded-2xl font-extrabold text-gray-800 text-left transition-all flex items-center justify-between text-sm md:text-base shadow-xs">
                    <div class="flex items-center space-x-2.5">
                        <span class="opt-badge w-7 h-7 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center font-black text-sm shrink-0">${letter}</span>
                        <span class="opt-text">${escapeHtml(formattedOpt)}</span>
                    </div>
                    <span class="option-icon text-pink-500 text-base md:text-lg"></span>
                </button>`;
        } else {
            html += `
                <button data-opt="${escapeHtml(opt)}" onclick="checkAnswer('${opt.replace(/'/g, "\\'")}')" class="option-btn w-full p-3 md:p-3.5 bg-pink-50/40 hover:bg-pink-100/70 border-2 border-pink-200 rounded-2xl font-extrabold text-gray-800 text-left transition-all flex items-center justify-between text-sm md:text-base shadow-xs pastel-btn">
                    <span><strong class="text-pink-600 mr-2 text-base md:text-lg">${letter}.</strong> ${escapeHtml(formattedOpt)}</span>
                    <span class="option-icon text-pink-500 text-base md:text-lg"></span>
                </button>`;
        }
    });
        html += `</div>`;
    }

    document.getElementById('question-box').innerHTML = html;

    restoreQuestionState(q);
    updateNavButtons();
    updateQuizPalletUI();

    if (autoSpeechEnabled) speakCurrentQuestion();
}

function restoreQuestionState(q) {
    const isExam = !!activeExamContext;
    const completedAnswer = userAnswers[currentQIndex];
    const wrongAttempts = wrongAttemptsByQ[currentQIndex] || [];

    if (isExam) {
        document.querySelectorAll('.option-btn').forEach(b => {
            const bOpt = b.getAttribute('data-opt');
            const badge = b.querySelector('.opt-badge');
            const iconSpan = b.querySelector('.option-icon');

            if (completedAnswer !== undefined && bOpt === completedAnswer) {
                b.className = "option-btn w-full p-2.5 md:p-3 bg-pink-50/30 border-2 border-pink-500 rounded-2xl font-extrabold text-gray-900 text-left transition-all flex items-center justify-between text-sm md:text-base shadow-xs";
                if (badge) badge.className = "opt-badge w-7 h-7 rounded-xl bg-pink-500 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-xs";
                if (iconSpan) iconSpan.innerHTML = '<i class="fa-regular fa-circle-check text-pink-600 text-lg"></i>';
            } else {
                b.className = "option-btn w-full p-2.5 md:p-3 bg-white hover:bg-pink-50/50 border border-pink-200 rounded-2xl font-extrabold text-gray-800 text-left transition-all flex items-center justify-between text-sm md:text-base shadow-xs";
                if (badge) badge.className = "opt-badge w-7 h-7 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center font-black text-sm shrink-0";
                if (iconSpan) iconSpan.innerHTML = '';
            }
        });
        return;
    }

    if (!!activeRoadmapContext) {
        if (completedAnswer === undefined) return;
        const isCorrect = completedAnswer === q.answer;
        document.querySelectorAll('.option-btn').forEach(b => {
            b.disabled = true;
            const bOpt = b.getAttribute('data-opt');
            if (bOpt === q.answer) {
                b.classList.remove('bg-pink-50/40', 'border-pink-200');
                b.classList.add('bg-green-100', 'border-green-400', 'text-green-800');
            } else if (!isCorrect && bOpt === completedAnswer) {
                b.classList.remove('bg-pink-50/40', 'border-pink-200');
                b.classList.add('bg-red-200', 'border-red-500', 'text-red-900');
            }
        });
        return;
    }

    if (wrongAttempts.length > 0) {
        document.querySelectorAll('.option-btn').forEach(b => {
            const bOpt = b.getAttribute('data-opt');
            if (wrongAttempts.includes(bOpt)) {
                b.classList.remove('bg-pink-50/40', 'border-pink-200');
                b.classList.add('bg-red-200', 'border-red-500', 'text-red-900');
                b.disabled = true;
            }
        });
    }

    if (completedAnswer !== undefined) {
        document.querySelectorAll('.option-btn').forEach(b => {
            const bOpt = b.getAttribute('data-opt');
            if (bOpt === completedAnswer) {
                b.classList.remove('bg-pink-50/40', 'border-pink-200');
                b.classList.add('bg-green-100', 'border-green-400', 'text-green-800');
                b.disabled = true;
            }
        });
    }
}

function updateNavButtons() {
    const isEvaluationMode = !!activeExamContext || !!activeRoadmapContext;
    const btnPrev = isEvaluationMode ? document.getElementById('btn-prev-q-exam') : document.getElementById('btn-prev-q-prac');
    const nextText = isEvaluationMode ? document.getElementById('btn-next-text-exam') : document.getElementById('btn-next-text-prac');
    const nextIcon = isEvaluationMode ? document.getElementById('btn-next-icon-exam') : document.getElementById('btn-next-icon-prac');

    if (!btnPrev) return;

    if (currentQIndex === 0) {
        btnPrev.disabled = true;
        btnPrev.classList.add('opacity-40', 'cursor-not-allowed');
    } else {
        btnPrev.disabled = false;
        btnPrev.classList.remove('opacity-40', 'cursor-not-allowed');
    }

    if (currentQIndex === activeQuestionsList.length - 1) {
        if (isEvaluationMode) {
            nextText.textContent = "Hoàn thành";
            nextIcon.className = "fa-solid fa-trophy ml-1.5";
        } else {
            nextText.textContent = "Vòng tiếp theo";
            nextIcon.className = "fa-solid fa-rotate-right ml-1.5";
        }
    } else {
        nextText.textContent = "Câu tiếp theo";
        nextIcon.className = "fa-solid fa-chevron-right ml-1.5";
    }
}

function checkAnswer(selectedOpt) {
    const q = activeQuestionsList[currentQIndex];
    const isExam = !!activeExamContext;
    const isRoadmap = !!activeRoadmapContext;

    // RIÊNG ĐỀ THI: YÊN TĨNH TUYỆT ĐỐI, SÁNG VIỀN HỒNG, KHÔNG PHÁT ÂM THANH
    if (isExam) {
        userAnswers[currentQIndex] = selectedOpt;

        document.querySelectorAll('.option-btn').forEach(b => {
            const bOpt = b.getAttribute('data-opt');
            const badge = b.querySelector('.opt-badge');
            const iconSpan = b.querySelector('.option-icon');

            if (bOpt === selectedOpt) {
                b.className = "option-btn w-full p-2.5 md:p-3 bg-pink-50/30 border-2 border-pink-500 rounded-2xl font-extrabold text-gray-900 text-left transition-all flex items-center justify-between text-sm md:text-base shadow-xs";
                if (badge) badge.className = "opt-badge w-7 h-7 rounded-xl bg-pink-500 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-xs";
                if (iconSpan) iconSpan.innerHTML = '<i class="fa-regular fa-circle-check text-pink-600 text-lg"></i>';
            } else {
                b.className = "option-btn w-full p-2.5 md:p-3 bg-white hover:bg-pink-50/50 border border-pink-200 rounded-2xl font-extrabold text-gray-800 text-left transition-all flex items-center justify-between text-sm md:text-base shadow-xs";
                if (badge) badge.className = "opt-badge w-7 h-7 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center font-black text-sm shrink-0";
                if (iconSpan) iconSpan.innerHTML = '';
            }
        });

        updateQuizPalletUI();
        return;
    }

    // RIÊNG TIẾN TRÌNH TUẦN: CHỈ ĐƯỢC CHỌN 1 LẦN DUY NHẤT ĐỂ GHI NHẬN ĐÚNG/SAI CHÍNH XÁC
    if (isRoadmap) {
        if (userAnswers[currentQIndex] !== undefined) return;

        const isCorrect = selectedOpt === q.answer;
        userAnswers[currentQIndex] = selectedOpt;

        if (isCorrect) {
            score += (q.diem ?? 0.5);
            starGreenCount++;
            document.getElementById('star-green-count').textContent = starGreenCount;
        } else {
            starRedCount++;
            document.getElementById('star-red-count').textContent = starRedCount;
        }

        document.querySelectorAll('.option-btn').forEach(b => {
            b.disabled = true;
            const bOpt = b.getAttribute('data-opt');
            if (bOpt === q.answer) {
                b.classList.remove('bg-pink-50/40', 'border-pink-200');
                b.classList.add('bg-green-100', 'border-green-400', 'text-green-800');
            } else if (bOpt === selectedOpt) {
                b.classList.remove('bg-pink-50/40', 'border-pink-200');
                b.classList.add('bg-red-200', 'border-red-500', 'text-red-900');
            }
        });

        if (isCorrect) {
            playAudio('correct');
            confetti({ particleCount: 30, spread: 55, origin: { y: 0.7 } });
            setTimeout(() => { if (isViewActive('view-quiz')) speakVietnamese(`${q.answer}`); }, 180);
        } else {
            playAudio('wrong');
        }

        updateQuizPalletUI();
        return;
    }

    // CHẾ ĐỘ LUYỆN TẬP TỰ DO
    const isCorrect = selectedOpt === q.answer;
    if (userAnswers[currentQIndex] !== undefined) return;

    if (isCorrect) {
        userAnswers[currentQIndex] = selectedOpt;
        score += (q.diem ?? 0.5);
        starGreenCount++;
        document.getElementById('star-green-count').textContent = starGreenCount;

        document.querySelectorAll('.option-btn').forEach(b => {
            b.disabled = true;
            if (b.getAttribute('data-opt') === q.answer) {
                b.classList.remove('bg-pink-50/40', 'border-pink-200');
                b.classList.add('bg-green-100', 'border-green-400', 'text-green-800');
            }
        });

        playAudio('correct');
        confetti({ particleCount: 30, spread: 55, origin: { y: 0.7 } });
        setTimeout(() => { if (isViewActive('view-quiz')) speakVietnamese(`${q.answer}`); }, 180);
    } else {
        if (!wrongAttemptsByQ[currentQIndex]) wrongAttemptsByQ[currentQIndex] = [];
        if (!wrongAttemptsByQ[currentQIndex].includes(selectedOpt)) {
            wrongAttemptsByQ[currentQIndex].push(selectedOpt);
            starRedCount++;
            document.getElementById('star-red-count').textContent = starRedCount;
        }

        document.querySelectorAll('.option-btn').forEach(b => {
            if (b.getAttribute('data-opt') === selectedOpt) {
                b.classList.remove('bg-pink-50/40', 'border-pink-200');
                b.classList.add('bg-red-200', 'border-red-500', 'text-red-900');
                b.disabled = true;
            }
        });

        playAudio('wrong');
    }

    updateQuizPalletUI();
}

function prevQuestion() {
    stopSpeaking();
    if (currentQIndex > 0) {
        currentQIndex--;
        loadQuestion();
    }
}

function nextQuestion() {
    stopSpeaking();
    const isEvaluationMode = !!activeExamContext || !!activeRoadmapContext;

    if (!isEvaluationMode && userAnswers[currentQIndex] === undefined) {
        alert('Bé hãy tìm đáp án đúng để hoàn thành câu này nhé!');
        return;
    }

    if (currentQIndex < activeQuestionsList.length - 1) {
        currentQIndex++;
        loadQuestion();
    } else {
        if (isEvaluationMode) {
            showResultScreen();
        } else {
            confetti({ particleCount: 75, spread: 75, origin: { y: 0.6 } });
            playAudio('win');
            alert(`🎉 Chúc mừng bé đã hoàn thành trọn vẹn 1 vòng luyện tập (${activeQuestionsList.length} câu)!\nBây giờ cô giáo Thỏ Ngọc sẽ xáo trộn ngẫu nhiên để con bước vào vòng luyện tập tiếp theo nhé!`);

            const basePool = practiceCycleRawPool.length ? practiceCycleRawPool : activeQuestionsList;
            activeQuestionsList = shuffleArray([...basePool]);
            currentQIndex = 0;
            userAnswers = {};
            wrongAttemptsByQ = {};
            loadQuestion();
        }
    }
}

function triggerSubmitQuizPrompt() {
    const answeredCount = Object.keys(userAnswers).length;
    const total = activeQuestionsList.length;
    if (confirm(`Bé đã làm ${answeredCount}/${total} câu. Bé có chắc chắn muốn nộp bài thi ngay không?`)) {
        showResultScreen();
    }
}

async function showResultScreen() {
    stopSpeaking();
    clearInterval(quizTimerInterval);

    let correctCount = 0;
    score = 0;
    quizAnsweredLog = [];
    quizWrongAnswers = [];

    activeQuestionsList.forEach((q, idx) => {
        const studentAns = userAnswers[idx];
        const isCorrect = studentAns === q.answer;
        if (isCorrect) {
            correctCount++;
            score += (q.diem ?? 0.5);
        } else {
            quizWrongAnswers.push({
                question_id: q.question_id,
                question_number: idx + 1,
                question_text: q.question_text,
                sub_topic: q.sub_topic || 'Chủ đề tổng hợp',
                skill_tag: q.skill_tag || 'C1',
                dap_an_chon: studentAns || 'Chưa trả lời',
                dap_an_dung: q.answer,
                explanation: q.explanation || 'Không có giải thích chi tiết.'
            });
        }
        quizAnsweredLog.push({
            question_id: q.question_id,
            question_text: q.question_text,
            skill_tag: q.skill_tag || 'C1',
            source_topic_id: q.source_topic_id,
            diem: q.diem ?? 0.5,
            isCorrect,
            dap_an_chon: studentAns || '',
            dap_an_dung: q.answer
        });
    });

    switchAppView('view-result');
    const totalQ = activeQuestionsList.length;
    const percent = Math.round((correctCount / totalQ) * 100);

    // Bài tập: điểm tính riêng theo công thức 10/tổng số câu (không dùng điểm từng câu để tránh lệch)
    const displayScore = activeRoadmapContext
        ? Math.round((correctCount * 10 / totalQ) * 10) / 10
        : score;

    const examBadgeText = activeExamContext ? activeExamContext.examTitle : (activeRoadmapContext ? activeRoadmapContext.chuDe : 'Bài luyện tập chủ đề');
    document.getElementById('report-exam-badge').textContent = examBadgeText;
    document.getElementById('report-student-display').textContent = `Học sinh: ${currentUser?.hoTen || 'Khách'}`;
    const durationStr = quizStartTime ? formatDuration(Date.now() - quizStartTime) : '35 phút';
    document.getElementById('report-meta-display').textContent = `Lớp: ${currentUser?.lop || '1A'} | Mã số: ${currentUser?.maHS || 'KHACH'} | Thời gian: ${durationStr}`;
    document.getElementById('report-total-score-val').textContent = displayScore.toFixed(1);
    document.getElementById('report-correct-ratio-val').textContent = `${correctCount}/${totalQ}`;

    renderReportTopicsBreakdown();

    const nextActionLabel = document.getElementById('report-next-action-label');
    if (nextActionLabel) {
        nextActionLabel.textContent = activeRoadmapContext ? '🔙 Quay lại Bài tập' : '🚀 Làm đề thi tiếp theo';
    }

    const historyBtn = document.getElementById('report-history-btn');
    if (historyBtn) {
        const targetSheet = activeRoadmapContext
            ? 'LichSuTienTrinhTuan'
            : (examFileMap[activeExamContext?.categoryKey]?.sheet || 'LichSuBaiThiHK1');
        historyBtn.setAttribute('onclick', `openHistoryModal('${targetSheet}')`);
    }

    if (percent >= 80) {
        confetti({ particleCount: 130, spread: 85, origin: { y: 0.6 } });
        playAudio('win');
        if (activeRoadmapContext) {
            try {
                const data = await loadBaiHocData();
                const nextWeek = getNextLearningWeekV7_(data, activeRoadmapContext.week);
                if (nextWeek) saveUnlockedLearningWeekV7_(nextWeek);
            } catch (e) {
                console.warn('[Bài tập] Không thể cập nhật mở khóa local:', e);
            }
        }
    }

    if (currentUser && !currentUser.isGuest) {
        if (activeExamContext) saveExamResultToSheet();
        else if (activeRoadmapContext) saveWeeklyProgressToSheet(percent, starCountFromPercent(percent), displayScore);
    }
}

function starCountFromPercent(percent) {
    if (percent === 100) return 3;
    if (percent >= 85) return 2;
    if (percent >= 80) return 1;
    return 0;
}

function renderReportTopicsBreakdown() {
    const container = document.getElementById('report-topics-list');
    if (!container) return;

    const isRoadmap = !!activeRoadmapContext;
    const skillKeys = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'];
    const skillStats = {};
    skillKeys.forEach(k => {
        skillStats[k] = { total: 0, correct: 0, maxScore: 0, earnedScore: 0 };
    });

    activeQuestionsList.forEach((q, idx) => {
        let rawTag = String(q.skill_tag || 'TV_C1').toUpperCase();
        let m = rawTag.match(/C([1-6])/);
        let tag = m ? 'C' + m[1] : 'C1';

        if (!skillStats[tag]) skillStats[tag] = { total: 0, correct: 0, maxScore: 0, earnedScore: 0 };
        skillStats[tag].total++;
        skillStats[tag].maxScore += (q.diem ?? 0.5);
        if (userAnswers[idx] === q.answer) {
            skillStats[tag].correct++;
            skillStats[tag].earnedScore += (q.diem ?? 0.5);
        }
    });

    let html = '';
    skillKeys.forEach(k => {
        const data = skillStats[k];
        const hasData = isRoadmap ? data.total > 0 : data.maxScore > 0;
        if (!hasData) {
            html += `
                <div class="bg-slate-50/80 border border-slate-200 rounded-2xl p-3 flex flex-col justify-between space-y-2">
                    <div class="flex items-center justify-between gap-2">
                        <span class="font-black text-slate-700 text-xs sm:text-sm">${SKILL_TAXONOMY[k].name}</span>
                        <span class="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-slate-100 text-slate-500 border border-slate-200">Chưa đủ dữ liệu</span>
                    </div>
                    <div class="text-xs font-bold text-slate-400">Bài này chưa có câu hỏi đo nhóm năng lực này.</div>
                    <div class="w-full bg-slate-200 rounded-full h-2 overflow-hidden"></div>
                </div>`;
            return;
        }

        const pct = isRoadmap
            ? Math.round((data.correct / data.total) * 100)
            : Math.round((data.earnedScore / data.maxScore) * 100);
        const isPassed = pct >= 50;
        const badgeClass = isPassed ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-rose-50 text-rose-700 border border-rose-200';
        const badgeText = isPassed ? 'Đạt yêu cầu' : 'Cần luyện tập thêm';
        const barColor = isPassed ? 'bg-gradient-to-r from-amber-400 to-orange-400' : 'bg-gradient-to-r from-pink-400 to-rose-400';
        const scoreLine = isRoadmap
            ? `<span>Số câu đúng: <strong class="text-pink-600">${data.correct}/${data.total} câu</strong></span>`
            : `<span>Điểm đạt: <strong class="text-pink-600">${data.earnedScore.toFixed(1)} / ${data.maxScore.toFixed(1)}đ</strong></span>`;

        html += `
            <div class="bg-pink-50/40 border border-pink-100 rounded-2xl p-3 flex flex-col justify-between space-y-2">
                <div class="flex items-center justify-between">
                    <span class="font-black text-slate-800 text-xs sm:text-sm">${SKILL_TAXONOMY[k].name}</span>
                    <span class="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${badgeClass}">${badgeText}</span>
                </div>
                <div class="flex items-center justify-between text-xs font-bold text-slate-600">
                    ${scoreLine}
                    <span class="font-math font-black">${pct}%</span>
                </div>
                <div class="w-full bg-pink-100 rounded-full h-2 overflow-hidden">
                    <div class="${barColor} h-full rounded-full transition-all duration-500" style="width: ${pct}%"></div>
                </div>
            </div>`;
    });
    container.innerHTML = html;
}

function openReviewWrongModal() {
    const modal = document.getElementById('modal-review-wrong');
    const content = document.getElementById('review-wrong-content');
    if (!modal || !content) return;

    if (!quizWrongAnswers.length) {
        content.innerHTML = `<div class="text-center py-8 text-emerald-600 font-extrabold text-base"><i class="fa-solid fa-circle-check text-3xl mb-2 block"></i>Tuyệt vời! Bé không làm sai câu nào trong bài thi này!</div>`;
    } else {
        let html = '';
        quizWrongAnswers.forEach((item, idx) => {
            html += `
                <div class="bg-rose-50/40 border border-rose-200 rounded-2xl p-3.5 space-y-2">
                    <div class="flex items-center justify-between">
                        <span class="px-2.5 py-0.5 bg-rose-100 text-rose-800 font-black text-xs rounded-lg">CÂU ${item.question_number || (idx + 1)}</span>
                        <span class="text-xs font-bold text-slate-500">${escapeHtml(beautifySubtopicName(item.sub_topic_label) || 'Chủ đề tổng hợp')}</span>
                    </div>
                    <p class="font-extrabold text-slate-800 text-sm">${escapeHtml(item.question_text)}</p>
                    <div class="text-xs space-y-1 font-semibold">
                        <p class="text-rose-600"><i class="fa-solid fa-xmark mr-1"></i> Đáp án con chọn: <strong>${escapeHtml(item.dap_an_chon)}</strong></p>
                        <p class="text-emerald-700"><i class="fa-solid fa-check mr-1"></i> Đáp án đúng chuẩn: <strong>${escapeHtml(item.dap_an_dung)}</strong></p>
                    </div>
                    <div class="p-2.5 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 font-semibold flex items-start gap-2">
                        <i class="fa-solid fa-lightbulb text-amber-600 mt-0.5"></i>
                        <span><strong>Lời giải sư phạm:</strong> ${escapeHtml(item.explanation)}</span>
                    </div>
                </div>
            `;
        });
        content.innerHTML = html;
    }
    modal.classList.remove('hidden');
}

function closeReviewWrongModal() {
    document.getElementById('modal-review-wrong').classList.add('hidden');
}

// ==========================================
// LƯU KẾT QUẢ & ĐỒNG BỘ ĐIỂM C1-C6 LÊN GOOGLE SHEETS
// ==========================================
async function saveExamResultToSheet() {
    const { categoryKey, examIndex } = activeExamContext;
    const thoiGianLamBai = quizStartTime ? formatDuration(Date.now() - quizStartTime) : '';
    
    const skillScores = { C1: 0, C2: 0, C3: 0, C4: 0, C5: 0, C6: 0 };
    quizAnsweredLog.forEach(item => {
        let rawTag = String(item.skill_tag || 'C1').toUpperCase();
        let m = rawTag.match(/C([1-6])/);
        let tag = m ? 'C' + m[1] : 'C1';

        if (item.isCorrect && skillScores[tag] !== undefined) {
            skillScores[tag] += (item.diem || 0.5);
        }
    });

    const payload = {
        maHS: currentUser.maHS,
        token: currentUser.token, // bắt buộc để server xác nhận đúng chủ tài khoản mới cho ghi điểm
        hoTen: currentUser.hoTen,
        lop: currentUser.lop,
        examCategory: categoryKey,
        sheetName: examFileMap[categoryKey]?.sheet || 'LichSuBaiThiHK1',
        deSo: examIndex + 1,
        thoiGianLamBai,
        tongDiem: score.toFixed(1),
        soCauDung: quizAnsweredLog.filter(x => x.isCorrect).length,
        tongCauHoi: activeQuestionsList.length,
        diemC1: skillScores.C1.toFixed(1),
        diemC2: skillScores.C2.toFixed(1),
        diemC3: skillScores.C3.toFixed(1),
        diemC4: skillScores.C4.toFixed(1),
        diemC5: skillScores.C5.toFixed(1),
        diemC6: skillScores.C6.toFixed(1),
        wrongQuestions: quizWrongAnswers
    };
    // Ghi điểm từng nhóm năng lực vào ĐÚNG tên cột khai báo trong SKILL_TAXONOMY (C1_NhanBiet, C2_PhepTinh...)
    // — không hard-code tên cột, tránh lệch dữ liệu nếu sau này đổi lại taxonomy.
    Object.keys(SKILL_TAXONOMY).forEach(k => {
        payload[SKILL_TAXONOMY[k].sheetCol] = skillScores[k].toFixed(1);
    });
    try {
        const res = await callAppsScript('saveExamResult', payload);
        if (!res || res.ok !== true) {
            console.error('[Lưu điểm đề thi THẤT BẠI]', res?.error || res);
        }
    } catch (e) {
        console.error('[Lưu điểm đề thi LỖI KẾT NỐI]', e);
    }
}

async function saveWeeklyProgressToSheet(percent, starCount, scoreVal) {
    const { week, topicId, chuDe } = activeRoadmapContext;
    const thoiGianLamBai = quizStartTime ? formatDuration(Date.now() - quizStartTime) : '';
    const scoreThang10 = (scoreVal ?? ((score / activeQuestionsList.length) * 10)).toFixed(1);

    // Đếm CHÍNH XÁC số câu đúng / tổng số câu của từng nhóm năng lực, dựa theo skill_tag
    // (TV_C1-C6) mà mỗi câu tự mang sẵn — không ước lượng chia đều, không suy luận gián tiếp qua chủ đề Mục lớn.
    const skillCorrect = { C1: 0, C2: 0, C3: 0, C4: 0, C5: 0, C6: 0 };
    const skillTotal = { C1: 0, C2: 0, C3: 0, C4: 0, C5: 0, C6: 0 };
    quizAnsweredLog.forEach(item => {
        let rawTag = String(item.skill_tag || 'TV_C1').toUpperCase();
        let m = rawTag.match(/C([1-6])/);
        const tag = m ? 'C' + m[1] : 'C1';
        if (skillTotal[tag] === undefined) return;
        skillTotal[tag]++;
        if (item.isCorrect) skillCorrect[tag]++;
    });
    const payload = {
        student_id: currentUser.maHS,
        maHS: currentUser.maHS,
        token: currentUser.token, // bắt buộc để server xác nhận đúng chủ tài khoản mới cho ghi điểm
        hoTen: currentUser.hoTen,
        lop: currentUser.lop,
        sheetName: 'LichSuTienTrinhTuan',
        week_completed: week,
        tuan: week,
        chuDe,
        topicId,
        score: scoreThang10,
        stars_earned: starCount,
        tongCauHoi: activeQuestionsList.length,
        soCauDung: quizAnsweredLog.filter(x => x.isCorrect).length,
        percent,
        thoiGianLamBai,
        wrongQuestions: quizWrongAnswers
    };
    Object.keys(SKILL_TAXONOMY).forEach(k => {
        payload[SKILL_TAXONOMY[k].sheetCol] = skillCorrect[k];
        payload[SKILL_TAXONOMY[k].totalCol] = skillTotal[k];
    });

    try {
        const res = await callAppsScript('saveWeeklyProgress', payload);
        if (!res || res.ok !== true) {
            console.error('[Lưu tiến trình tuần THẤT BẠI]', res?.error || res);
        }
        if (percent >= 80) {
            try {
                const data = await loadBaiHocData();
                const nextWeek = getNextLearningWeekV7_(data, week);
                if (nextWeek) {
                    saveUnlockedLearningWeekV7_(nextWeek);
                    setTimeout(() => alert(`🎉 Chúc mừng bé đạt ${percent}%! Bài tập ${nextWeek} đã được mở khóa.`), 500);
                }
            } catch (e) {
                console.warn('[Bài tập] Đã đạt chuẩn nhưng chưa xác định được tuần kế tiếp:', e);
            }
        }
    } catch (e) {
        console.error('[Lưu tiến trình tuần LỖI KẾT NỐI]', e);
    }
}

async function openHistoryModal(sheetName = 'LichSuTienTrinhTuan') {
    if (!currentUser || currentUser.isGuest) {
        showLoginRequiredGate('Lịch sử Bài tập', '📊');
        return;
    }

    const modal = document.getElementById('modal-history-progress');
    modal.classList.remove('hidden');

    document.getElementById('hist-info-name').textContent = currentUser.hoTen || '--';
    document.getElementById('hist-info-class').textContent = currentUser.lop || '--';
    document.getElementById('hist-info-code').textContent = currentUser.maHS || '--';
    document.getElementById('hist-info-dob').textContent = formatDDMMYY_(currentUser.ngaySinh) || '05-09-2019';
    document.getElementById('hist-report-date').textContent = formatDDMMYY_(new Date());

    const titleMap = {
        LichSuTienTrinhTuan: "Báo cáo tiến trình 24 tuần học tập",
        LichSuBaiThiHK1: "Báo cáo kết quả — Học kỳ 1",
        LichSuBaiThiHK2: "Báo cáo kết quả — Học kỳ 2",
        LichSuBaiThiHSG: "Báo cáo kết quả — Học sinh giỏi"
    };
    document.getElementById('hist-modal-title').textContent = titleMap[sheetName] || "Kết quả tiến trình học tập";

    showLoadingOverlay('Đang trích xuất dữ liệu và vẽ biểu đồ năng lực...');
    try {
        const res = await callAppsScript('getHistory', { maHS: currentUser.maHS, sheetName, token: currentUser.token });
        hideLoadingOverlay();
        if (res && res.ok === false) {
            // Token hết hạn/không hợp lệ hoặc không đúng chủ - đóng modal, báo rõ thay vì âm thầm
            // hiện báo cáo trống (dễ gây hiểu lầm là bé chưa học gì).
            closeHistoryModal();
            alert(res.error || 'Không thể tải lịch sử - bé đăng nhập lại nhé!');
            return;
        }
        const rows = (res && res.history) ? res.history : [];
        renderHistoryReport(rows, sheetName);
    } catch (err) {
        hideLoadingOverlay();
        alert('Không thể tải lịch sử: ' + err.message);
    }
}

function closeHistoryModal() {
    document.getElementById('modal-history-progress').classList.add('hidden');
    if (histLineChartInstance) { histLineChartInstance.destroy(); histLineChartInstance = null; }
    if (histBarChartInstance) { histBarChartInstance.destroy(); histBarChartInstance = null; }
}

// ==========================================
// BIỂU ĐỒ THANH NGANG & BẢNG KÈM HÀNG TRUNG BÌNH
// ==========================================
function getSkillCell(row, skillKey) {
    const taxo = SKILL_TAXONOMY[skillKey];
    const correct = Number(row[taxo.sheetCol]);
    const total = Number(row[taxo.totalCol]);
    if (!row[taxo.totalCol] || isNaN(total) || total <= 0) return null;
    return { correct: isNaN(correct) ? 0 : correct, total };
}

// Định dạng DD-MM-YY, bỏ hoàn toàn phần giờ/phút/giây (dùng cho Ngày sinh & Ngày báo cáo trên báo cáo in PDF).
function formatDDMMYY_(value) {
    if (!value) return '';
    const d = new Date(value);
    if (isNaN(d.getTime())) return String(value).split('T')[0] || String(value);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yy = String(d.getFullYear()).slice(-2);
    return `${dd}-${mm}-${yy}`;
}

function formatDateOnly(value) {
    if (!value) return '--';
    const d = new Date(value);
    if (isNaN(d.getTime())) return String(value).split('T')[0] || String(value);
    return d.toLocaleDateString('vi-VN');
}

function formatDateShort(value) {
    const d = value ? new Date(value) : null;
    if (!d || isNaN(d.getTime())) return '';
    return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function renderHistoryReport(rows, sheetName) {
    const isWeekly = sheetName === 'LichSuTienTrinhTuan';
    const labels = rows.map((r, i) => {
        const dm = formatDateShort(r.Timestamp || r.ngayLam);
        const label = isWeekly ? `Tuần ${r.tuan || i + 1}` : (r.deSo ? `Đề ${r.deSo}` : `Tuần ${r.tuan || i + 1}`);
        return dm ? `${dm} ${label}` : label;
    });
    const scores = rows.map(r => Number(r.score || r.tongDiem || ((r.soCauDung / (r.tongCauHoi || 30)) * 10).toFixed(1)));

    const ctxLine = document.getElementById('progressChartCanvas').getContext('2d');
    if (histLineChartInstance) histLineChartInstance.destroy();

    histLineChartInstance = new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: labels.length ? labels : ['Chưa có bài thi'],
            datasets: [{
                label: 'Điểm số (/10)',
                data: scores.length ? scores : [0],
                borderColor: '#e11d48',
                backgroundColor: 'rgba(254, 226, 226, 0.5)',
                borderWidth: 3.5,
                pointBackgroundColor: '#be123c',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    min: 0, max: 10.5,
                    ticks: { stepSize: 2, color: '#000000', font: { family: 'Quicksand', weight: 'bold' } }
                },
                x: {
                    grid: { display: false },
                    ticks: {
                        color: '#000000',
                        font: { family: 'Quicksand', weight: 'bold', size: 11 },
                        maxRotation: 90,
                        minRotation: 90
                    }
                }
            },
            plugins: { legend: { display: false } }
        }
    });

    const skillKeys = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'];
    // Mặc định LUÔN là 0 cho mọi trường hợp — KHÔNG dùng số liệu mẫu/giả định nào cả (đúng quy tắc chống lỗi
    // Mục 8.2: nhóm nào bé chưa làm câu nào thì phải coi là "chưa đủ dữ liệu", không tự vẽ % bất kỳ).
    const skillAverages = { C1: 0, C2: 0, C3: 0, C4: 0, C5: 0, C6: 0 };
    const touchedSkills = [];

    if (rows.length && isWeekly) {
        // Bài tập: % = tổng số câu đúng / tổng số câu đã làm THẬT của nhóm kỹ năng đó
        skillKeys.forEach((k) => {
            let sumCorrect = 0, sumTotal = 0;
            rows.forEach(r => {
                const cell = getSkillCell(r, k);
                if (!cell) return;
                sumCorrect += cell.correct;
                sumTotal += cell.total;
            });
            if (sumTotal > 0) {
                skillAverages[k] = Math.min(100, Math.round((sumCorrect / sumTotal) * 100));
                touchedSkills.push(k);
            }
        });
    } else if (rows.length) {
        // Đề thi: % = tổng điểm đạt được / tổng điểm TỐI ĐA CÓ THỂ của nhóm đó qua các đề đã làm
        // (mỗi nhóm năng lực có mẫu số khác nhau theo đúng Ma trận đề thi V6.1 — xem EXAM_SKILL_MAX_SCORE_BY_SHEET).
        skillKeys.forEach((k) => {
            const colName = SKILL_TAXONOMY[k].sheetCol;
            let sumEarned = 0, examCount = 0;
            rows.forEach(r => {
                const val = r[`diem${k}`] ?? r[colName] ?? r[`diem_${k.toLowerCase()}`] ?? r[k];
                if (val !== undefined && val !== null && val !== '--' && val !== '') {
                    sumEarned += Number(val) || 0;
                    examCount++;
                }
            });
            const maxPerExam = getExamSkillMaxScoreForSheet(sheetName, k);
            if (examCount > 0 && maxPerExam > 0) {
                const maxPossible = examCount * maxPerExam;
                skillAverages[k] = Math.min(100, Math.round((sumEarned / maxPossible) * 100));
                touchedSkills.push(k);
            }
        });
    }

    const ctxBar = document.getElementById('topicRadarChartCanvas').getContext('2d');
    if (histBarChartInstance) histBarChartInstance.destroy();

    const palette = ['#f472b6', '#fb7185', '#f59e0b', '#a855f7', '#ec4899', '#e11d48'];
    const barColors = skillKeys.map((k, i) => touchedSkills.includes(k) ? palette[i] : '#cbd5e1'); // xám nếu chưa đủ dữ liệu

    histBarChartInstance = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: skillKeys.map(k => SKILL_TAXONOMY[k].name),
            datasets: [{
                label: 'Độ thành thạo (%)',
                data: skillKeys.map(k => skillAverages[k]),
                backgroundColor: barColors,
                borderRadius: 8,
                borderSkipped: false,
                barThickness: 16
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    min: 0,
                    max: 100,
                    ticks: { stepSize: 20, callback: (v) => v + '%', color: '#000000', font: { family: 'Quicksand', weight: 'bold' } },
                    grid: { color: 'rgba(251, 207, 232, 0.3)' }
                },
                y: {
                    grid: { display: false },
                    ticks: { font: { family: 'Quicksand', weight: 'bold', size: 14 }, color: '#000000' }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (ctx) => touchedSkills.includes(skillKeys[ctx.dataIndex]) ? ` Độ thành thạo: ${ctx.raw}%` : ' Chưa đủ dữ liệu'
                    }
                }
            }
        },
        plugins: [{
            id: 'barValueLabels',
            afterDatasetsDraw(chart) {
                const { ctx } = chart;
                chart.data.datasets[0].data.forEach((val, i) => {
                    const meta = chart.getDatasetMeta(0).data[i];
                    if (!meta) return;
                    ctx.save();
                    ctx.font = 'bold 12px Quicksand, sans-serif';
                    ctx.fillStyle = touchedSkills.includes(skillKeys[i]) ? '#1e293b' : '#94a3b8';
                    ctx.textAlign = 'left';
                    ctx.textBaseline = 'middle';
                    const label = touchedSkills.includes(skillKeys[i]) ? `${val}%` : 'Chưa đủ dữ liệu';
                    ctx.fillText(label, meta.x + 6, meta.y);
                    ctx.restore();
                });
            }
        }]
    });

    renderPedagogicalEvaluation(rows, skillAverages, touchedSkills);
    renderHistoryTable(rows, sheetName);
}

function renderPedagogicalEvaluation(rows, skillAverages, touchedSkills) {
    const box = document.getElementById('pedagogical-evaluation-box');
    if (!box) return;

    const studentName = getStudentFirstName();
    const count = rows.length;
    const avgScore = count ? (rows.reduce((acc, r) => acc + Number(r.score || r.tongDiem || 0), 0) / count) : 0;
    const avgScoreStr = avgScore.toFixed(1);

    // 1. Đánh giá tổng quan — phải khớp thật với điểm số, không khen chung chung bất kể kết quả
    let overviewText;
    if (avgScore >= 8) {
        overviewText = `Con nắm rất vững kiến thức trọng tâm, làm bài nghiêm túc và đạt kết quả xuất sắc.`;
    } else if (avgScore >= 6.5) {
        overviewText = `Con nắm khá tốt kiến thức trọng tâm, tuy nhiên vẫn còn một vài chỗ cần luyện thêm để đạt kết quả cao hơn.`;
    } else if (avgScore >= 5) {
        overviewText = `Con đã nắm được kiến thức cơ bản nhưng chưa thật chắc, cần ôn luyện thêm để tiến bộ hơn.`;
    } else {
        overviewText = `Con còn gặp khó khăn với nội dung này, ba mẹ nên đồng hành ôn luyện thêm cùng con nhé.`;
    }

    // 2 & 3. Thế mạnh / điểm cần khắc phục — CHỈ lấy từ những nhóm bé đã thực sự luyện tập,
    // tuyệt đối không nhận xét về nhóm bé chưa hề động tới (tránh nói sai với thực tế).
    const validSkills = (touchedSkills && touchedSkills.length) ? touchedSkills : [];
    const sortedValid = [...validSkills].sort((a, b) => skillAverages[b] - skillAverages[a]);

    let strengthHtml, weaknessHtml;
    if (sortedValid.length >= 2) {
        const top1 = SKILL_TAXONOMY[sortedValid[0]].name;
        const top2 = SKILL_TAXONOMY[sortedValid[1]].name;
        strengthHtml = `Con đạt độ thành thạo tốt ở các nhóm: <strong>${escapeHtml(top1)}</strong> (${skillAverages[sortedValid[0]]}%) và <strong>${escapeHtml(top2)}</strong> (${skillAverages[sortedValid[1]]}%).`;

        const weak1 = sortedValid[sortedValid.length - 1];
        weaknessHtml = `Con cần luyện thêm ở mảng: <strong>${escapeHtml(SKILL_TAXONOMY[weak1].name)}</strong> (${skillAverages[weak1]}%). ${escapeHtml(SKILL_TAXONOMY[weak1].advice)}`;
    } else if (sortedValid.length === 1) {
        const only1 = sortedValid[0];
        strengthHtml = `Con đạt ${skillAverages[only1]}% ở nhóm <strong>${escapeHtml(SKILL_TAXONOMY[only1].name)}</strong> — mảng duy nhất bé đã luyện tập tới thời điểm này.`;
        weaknessHtml = `Bé mới luyện tập 1 nhóm kỹ năng, cô chưa đủ dữ liệu để đánh giá toàn diện. Ba mẹ khuyến khích con hoàn thành thêm các tuần khác nhé!`;
    } else {
        strengthHtml = `Bé chưa có đủ dữ liệu luyện tập để đánh giá thế mạnh.`;
        weaknessHtml = `Bé chưa có đủ dữ liệu luyện tập để đánh giá điểm cần khắc phục.`;
    }

    box.innerHTML = `
        <div class="bg-white/80 p-3 rounded-xl border border-amber-200">
            <span class="text-amber-700 font-extrabold block mb-0.5">🌟 1. Đánh giá tổng quan năng lực & xu hướng tiến bộ:</span>
            <p class="text-gray-700">Học sinh <strong>${escapeHtml(currentUser.hoTen)}</strong> đã hoàn thành <strong>${count} bài kiểm tra</strong> với điểm số trung bình tích lũy đạt <strong class="text-pink-600">${avgScoreStr}/10 điểm</strong>. ${overviewText}</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div class="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200">
                <span class="text-emerald-700 font-extrabold block mb-0.5">✅ 2. Khen ngợi & thế mạnh nổi trội:</span>
                <p class="text-gray-700">${strengthHtml}</p>
            </div>

            <div class="bg-rose-50/70 p-3 rounded-xl border border-rose-200">
                <span class="text-rose-700 font-extrabold block mb-0.5">⚠️ 3. Điểm cần lưu ý & khắc phục:</span>
                <p class="text-gray-700">${weaknessHtml}</p>
            </div>
        </div>

        <div class="bg-white/80 p-3 rounded-xl border border-purple-200">
            <span class="text-purple-700 font-extrabold block mb-0.5">💡 4. Kế hoạch bồi dưỡng & hướng dẫn phụ huynh:</span>
            <p class="text-gray-700">Ba mẹ nên dành 15 phút mỗi tối cùng con ôn lại các phép tính, đặt câu hỏi gợi mở và khen ngợi kịp thời để giúp ${studentName} giữ vững niềm yêu thích môn Tiếng Việt nhé!</p>
        </div>
    `;
}

function renderHistoryTable(rows, sheetName) {
    const tbody = document.getElementById('hist-table-body');
    if (!tbody) return;

    if (!rows.length) {
        tbody.innerHTML = `<tr><td colspan="11" class="py-4 text-gray-400">Chưa ghi nhận lịch sử bài làm nào</td></tr>`;
        return;
    }

    const isWeekly = sheetName === 'LichSuTienTrinhTuan';
    const skillKeys = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'];

    const getScoreVal = (r, num, colName) => {
        const val = r[`diemC${num}`] ?? r[colName] ?? r[`diem_c${num}`] ?? r[`C${num}`];
        return (val !== undefined && val !== null && val !== '') ? Number(val) : 0;
    };

    const totalRows = rows.length;
    let sumTongDiem = 0;
    rows.forEach(r => { sumTongDiem += Number(r.tongDiem || r.score || 0); });
    const avgTong = (sumTongDiem / totalRows).toFixed(1);

    let summaryCells = '';
    let bodyRows = '';

    if (isWeekly) {
        // Tổng hợp: % = tổng câu đúng / tổng câu đã làm THẬT của đúng nhóm kỹ năng đó
        const agg = {};
        skillKeys.forEach(k => { agg[k] = { correct: 0, total: 0 }; });
        rows.forEach(r => {
            skillKeys.forEach(k => {
                const cell = getSkillCell(r, k);
                if (!cell) return;
                agg[k].correct += cell.correct;
                agg[k].total += cell.total;
            });
        });
        skillKeys.forEach(k => {
            const a = agg[k];
            summaryCells += `<td class="py-2 px-1">${a.total > 0 ? Math.round((a.correct / a.total) * 100) + '%' : '--'}</td>`;
        });

        rows.forEach((r, idx) => {
            const itemDiem = r.tongDiem || r.score || '--';
            const dateStr = formatDateOnly(r.Timestamp || r.ngayLam);
            const durationStr = r.thoiGianLamBai || '--';

            let skillCells = '';
            skillKeys.forEach(k => {
                const cell = getSkillCell(r, k);
                if (!cell) { skillCells += `<td class="py-2 px-1 text-gray-300">--</td>`; return; }
                const pct = cell.total > 0 ? Math.round((cell.correct / cell.total) * 100) : 0;
                skillCells += `<td class="py-2 px-1">${cell.correct}/${cell.total} <span class="text-gray-400">(${pct}%)</span></td>`;
            });

            bodyRows += `
                <tr class="hover:bg-pink-50/30 transition-colors">
                    <td class="py-2.5 px-2">${idx + 1}</td>
                    <td class="py-2.5 px-2 font-black">Tuần ${r.tuan || (idx + 1)}</td>
                    <td class="py-2.5 px-2 font-black text-rose-600">${itemDiem}</td>
                    ${skillCells}
                    <td class="py-2.5 px-2 text-gray-500">${dateStr}</td>
                    <td class="py-2.5 px-2 text-gray-500">${durationStr}</td>
                </tr>
            `;
        });
    } else {
        skillKeys.forEach((k, i) => {
            const sum = rows.reduce((acc, r) => acc + getScoreVal(r, i + 1, SKILL_TAXONOMY[k].sheetCol), 0);
            summaryCells += `<td class="py-2 px-1">${(sum / totalRows).toFixed(1)}</td>`;
        });

        rows.forEach((r, idx) => {
            const itemDiem = r.tongDiem || r.score || '--';
            const dateStr = formatDateOnly(r.Timestamp || r.ngayLam);
            const durationStr = r.thoiGianLamBai || '--';

            let examSkillCells = '';
            skillKeys.forEach((k, i) => {
                examSkillCells += `<td class="py-2 px-1">${getScoreVal(r, i + 1, SKILL_TAXONOMY[k].sheetCol)}</td>`;
            });

            bodyRows += `
                <tr class="hover:bg-pink-50/30 transition-colors">
                    <td class="py-2.5 px-2">${idx + 1}</td>
                    <td class="py-2.5 px-2 font-black">${r.deSo ? `Đề ${r.deSo}` : `Tuần ${r.tuan || (idx + 1)}`}</td>
                    <td class="py-2.5 px-2 font-black text-rose-600">${itemDiem}</td>
                    ${examSkillCells}
                    <td class="py-2.5 px-2 text-gray-500">${dateStr}</td>
                    <td class="py-2.5 px-2 text-gray-500">${durationStr}</td>
                </tr>
            `;
        });
    }

    const html = `
        <tr class="bg-amber-100/90 text-amber-950 font-black border-b-2 border-amber-200">
            <td class="py-2.5 px-2" colspan="2">Điểm trung bình</td>
            <td class="py-2.5 px-2 text-rose-600">${avgTong}</td>
            ${summaryCells}
            <td class="py-2.5 px-2" colspan="2">--</td>
        </tr>
        ${bodyRows}
    `;
    tbody.innerHTML = html;
}

function exportReportToPDF() {
    const area = document.getElementById('printable-report-area');
    if (!area) return;
    showLoadingOverlay('Đang khởi tạo file PDF chuẩn in ấn...');
    
    const opt = {
        margin: [5, 5, 5, 5],
        filename: `Bao_Cao_Tien_Trinh_${currentUser?.maHS || 'HocSinh'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
        pagebreak: { mode: ['css', 'legacy'] }
    };

    html2pdf().set(opt).from(area).save().then(() => {
        hideLoadingOverlay();
    }).catch(err => {
        hideLoadingOverlay();
        window.print();
    });
}

// ==========================================
// ADMIN - QUAN LY TAI KHOAN
// ==========================================
function formatAccountDate_(value) {
    if (!value) return '--';
    const d = new Date(value);
    if (isNaN(d.getTime())) return String(value);
    return d.toLocaleDateString('vi-VN');
}

function adminAuthPayload_() {
    return { adminMaHS: currentUser?.maHS || '', adminPin: currentSessionPin || '', token: currentUser?.token || '' };
}

async function openAdminAccounts() {
    if (!currentUser || String(currentUser.vaiTro || '').toLowerCase() !== 'admin') return;
    document.getElementById('modal-admin-accounts')?.classList.remove('hidden');
    await loadAdminAccounts();
}

function closeAdminAccounts() {
    document.getElementById('modal-admin-accounts')?.classList.add('hidden');
}

async function loadAdminAccounts() {
    const body = document.getElementById('admin-accounts-body');
    if (body) body.innerHTML = '<tr><td colspan="8" class="p-6 text-center text-slate-400 font-bold"><i class="fa-solid fa-spinner fa-spin mr-2"></i>Đang tải...</td></tr>';
    try {
        const res = await callAppsScript('getAccounts', adminAuthPayload_());
        if (!res?.ok) throw new Error(res?.error || 'Không tải được danh sách tài khoản');
        adminAccountsCache = Array.isArray(res.accounts) ? res.accounts : [];
        renderAdminAccountsTable();
    } catch (err) {
        if (body) body.innerHTML = `<tr><td colspan="8" class="p-6 text-center text-rose-500 font-bold">${escapeHtml(err.message)}</td></tr>`;
    }
}

function renderAdminAccountsTable() {
    const body = document.getElementById('admin-accounts-body');
    if (!body) return;
    const q = (document.getElementById('admin-account-search')?.value || '').trim().toLowerCase();
    // Giao diện quản lý tập trung vào tài khoản học sinh; admin vẫn được giữ nguyên trong dữ liệu/backend.
    const studentAccounts = adminAccountsCache.filter(a => String(a.vaiTro || 'student').toLowerCase() !== 'admin');
    const rows = studentAccounts.filter(a => !q || [a.maHS, a.hoTen, a.lop, a.loaiTaiKhoan].some(v => String(v || '').toLowerCase().includes(q)));
    const countEl = document.getElementById('admin-account-count');
    if (countEl) countEl.textContent = `${studentAccounts.length} tài khoản`;
    if (!rows.length) {
        body.innerHTML = '<tr><td colspan="6" class="p-6 text-center text-slate-400 font-bold">Không có tài khoản phù hợp</td></tr>';
        return;
    }
    body.innerHTML = rows.map(a => {
        const tier = String(a.loaiTaiKhoan || 'regular').toLowerCase();
        const tierStyle = tier === 'vip'
            ? 'border-purple-300 text-purple-700 bg-purple-50'
            : (tier === 'trial' ? 'border-amber-300 text-amber-700 bg-amber-50' : 'border-slate-300 text-slate-600 bg-white');
        return `<tr class="hover:bg-fuchsia-50/30 transition-colors">
            <td class="p-3 font-black text-sm text-slate-700">${escapeHtml(a.maHS || '')}</td>
            <td class="p-3 font-bold text-sm text-slate-700">${escapeHtml(a.hoTen || '')}</td>
            <td class="p-3 text-center font-bold text-sm text-slate-600">${escapeHtml(a.lop || '--')}</td>
            <td class="p-3 text-center">
                <select onchange="adminSetTier('${String(a.maHS).replace(/'/g, "\\'")}', this.value)" class="min-w-[96px] px-3 py-1.5 rounded-xl border font-extrabold text-sm outline-none ${tierStyle}">
                    <option value="regular" ${tier === 'regular' ? 'selected' : ''}>Regular</option>
                    <option value="trial" ${tier === 'trial' ? 'selected' : ''}>Trial</option>
                    <option value="vip" ${tier === 'vip' ? 'selected' : ''}>VIP</option>
                </select>
            </td>
            <td class="p-3 text-center font-bold text-sm text-slate-500">${formatAccountDate_(a.hanDungThu)}</td>
            <td class="p-3 text-center font-black text-sm text-purple-600">${formatAccountDate_(a.hanVIP)}</td>
        </tr>`;
    }).join('');
}

async function adminSetTier(targetMaHS, loaiTaiKhoan) {
    try {
        const res = await callAppsScript('setAccountTier', { ...adminAuthPayload_(), targetMaHS, loaiTaiKhoan });
        if (!res?.ok) throw new Error(res?.error || 'Không cập nhật được hạng tài khoản');
        await loadAdminAccounts();
    } catch (err) {
        alert(err.message);
        await loadAdminAccounts();
    }
}

async function adminResetPin(targetMaHS) {
    const newPin = prompt(`Nhập PIN mới 6 chữ số cho tài khoản ${targetMaHS}:`);
    if (newPin === null) return;
    if (!/^\d{6}$/.test(newPin)) return alert('PIN mới phải gồm đúng 6 chữ số!');
    try {
        const res = await callAppsScript('resetAccountPin', { ...adminAuthPayload_(), targetMaHS, newPin });
        if (!res?.ok) throw new Error(res?.error || 'Không đặt lại được PIN');
        alert(`Đã đặt lại PIN cho ${targetMaHS}.`);
        if (targetMaHS.toLowerCase() === String(currentUser.maHS || '').toLowerCase()) currentSessionPin = newPin;
    } catch (err) {
        alert(err.message);
    }
}

// ==========================================
// ĐỘNG CƠ ÂM THANH: GOOGLE TTS CHỊ BAN MAI
// ==========================================
function stopSpeaking() {
    try {
        if (banMaiAudio) {
            banMaiAudio.pause();
            banMaiAudio.currentTime = 0;
            banMaiAudio.onended = null;
        }
    } catch (e) {}
}


function stopAllAudio() {
    stopSpeaking();

    // Dung ngay cac file audio HTML5 dang phat (vi du audio Bai hoc).
    try {
        activeStandaloneAudios.forEach(audio => {
            try {
                audio.pause();
                audio.currentTime = 0;
                audio.onended = null;
                audio.onerror = null;
            } catch (e) {}
        });
        activeStandaloneAudios.clear();
    } catch (e) {}

    // Dung ngay cac am thanh hieu ung WebAudio dang phat.
    try {
        if (audioCtx) {
            const ctx = audioCtx;
            audioCtx = null;
            if (ctx.state !== 'closed') ctx.close().catch(() => {});
        }
    } catch (e) {
        audioCtx = null;
    }
}

function isViewActive(viewId) {
    const el = document.getElementById(viewId);
    return !!el && !el.classList.contains('hidden');
}

function isMiniGameActive(gameId) {
    return !!gameId && activeMiniGameId === gameId && inMiniGameFlow && isViewActive('view-game-play');
}

function speakMiniGameTextSafe(text, rate = 0.94, gameId = '') {
    if (!isMiniGameActive(gameId)) return;
    speakVietnamese(text, rate);
}

window.isMiniGameActive = isMiniGameActive;
window.speakMiniGameTextSafe = speakMiniGameTextSafe;

function speakPedagogicalEvaluation() {
    const box = document.getElementById('pedagogical-evaluation-box');
    if (!box) return;
    const text = box.innerText || box.textContent || '';
    if (!text.trim()) return;
    speakVietnamese(text);
}

function speakVietnamese(text, rate = 0.96) {
    if (!text) return;
    try {
        stopSpeaking();

        let cleanText = String(text)
            .replace(/<[^>]*>/g, '')
            .replace(/b-a/g, 'bờ a ba')
            .replace(/c\/k/g, 'cờ hoặc ca')
            .replace(/g\/gh/g, 'gờ đơn hoặc gờ kép')
            .replace(/ng\/ngh/g, 'ngờ đơn hoặc ngờ kép')
            .trim();

        if (!cleanText) return;

        if (cleanText.length <= 180) {
            const encoded = encodeURIComponent(cleanText);
            banMaiAudio.src = `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${encoded}`;
            banMaiAudio.playbackRate = rate;
            const playPromise = banMaiAudio.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {});
            }
            return;
        }

        const sentences = cleanText.match(/[^.!?\n]+[.!?\n]*/g) || [cleanText];
        let sIdx = 0;
        function playSentence() {
            if (sIdx >= sentences.length) return;
            const s = sentences[sIdx++].trim();
            if (!s) { playSentence(); return; }
            const encoded = encodeURIComponent(s);
            banMaiAudio.src = `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${encoded}`;
            banMaiAudio.playbackRate = rate;
            banMaiAudio.onended = playSentence;
            const playPromise = banMaiAudio.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {});
            }
        }
        playSentence();
    } catch (err) {}
}

function speakCurrentQuestion() {
    const q = activeQuestionsList[currentQIndex];
    if (!q) return;
    const textToRead = q.audio_text || q.reading_passage || q.question_text;
    speakVietnamese(textToRead, 0.96);
}

function playAudio(type) {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!audioCtx && AudioContext) audioCtx = new AudioContext();
        if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
        if (!audioCtx) return;

        const now = audioCtx.currentTime;

        if (type === 'correct') {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(523.25, now);
            osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.12);
            osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.25);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.linearRampToValueAtTime(0.01, now + 0.35);
            osc.start(now);
            osc.stop(now + 0.35);
        } else if (type === 'wrong') {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.type = 'square';
            osc.frequency.setValueAtTime(300, now);
            gain.gain.setValueAtTime(0.001, now);
            gain.gain.linearRampToValueAtTime(0.22, now + 0.01);
            gain.gain.setValueAtTime(0.22, now + 0.09);
            gain.gain.linearRampToValueAtTime(0.001, now + 0.1);
            gain.gain.setValueAtTime(0.001, now + 0.14);
            gain.gain.linearRampToValueAtTime(0.22, now + 0.15);
            gain.gain.setValueAtTime(0.22, now + 0.23);
            gain.gain.linearRampToValueAtTime(0.001, now + 0.24);
            osc.start(now);
            osc.stop(now + 0.25);
        } else if (type === 'win') {
            const ctx = audioCtx;
            [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
                setTimeout(() => {
                    if (!ctx || audioCtx !== ctx || ctx.state === 'closed') return;
                    const o = ctx.createOscillator(), g = ctx.createGain();
                    o.connect(g); g.connect(ctx.destination);
                    o.frequency.value = freq; g.gain.setValueAtTime(0.2, ctx.currentTime);
                    g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
                    o.start(); o.stop(ctx.currentTime + 0.3);
                }, i * 150);
            });
        }
    } catch (e) {}
}

function initQuizPallet() {
    updateQuizPalletUI();
}

function updateQuizPalletUI() {
    const container = document.getElementById('quiz-pallet-container');
    if (!container) return;
    if (!activeQuestionsList || !activeQuestionsList.length) { container.innerHTML = ''; return; }

    const isRoadmap = !!activeRoadmapContext;
    const isExam = !!activeExamContext;
    const total = activeQuestionsList.length;

    if (isExam) {
        container.className = `grid gap-1 max-w-xl mx-2`;
        container.style.gridTemplateColumns = `repeat(${total}, minmax(0, 1fr))`;
    } else {
        container.className = 'grid grid-cols-10 gap-1.5 max-w-xl mx-2';
        container.style.gridTemplateColumns = '';
    }

    const btnSize = isExam ? 'w-6 h-6 md:w-7 md:h-7 text-[10px] md:text-xs' : 'w-8 h-8 text-xs';

    let html = '';
    activeQuestionsList.forEach((q, idx) => {
        const answer = userAnswers[idx];
        const isAnswered = answer !== undefined;
        const isCurrent = idx === currentQIndex;
        let cls = 'bg-white text-pink-400 border-pink-200 hover:bg-pink-50';

        if (isAnswered) {
            if (isRoadmap) {
                const isCorrect = answer === q.answer;
                cls = isCorrect
                    ? 'bg-emerald-400 text-white border-emerald-500 hover:bg-emerald-500'
                    : 'bg-red-200 text-red-800 border-red-400 hover:bg-red-300';
            } else {
                // Chế độ thi: không lộ đúng/sai, nhưng câu ĐÃ TRẢ LỜI phải đổi màu KHÁC HẲN
                // với câu ĐANG LÀM (đang dùng gradient pink->purple) để không bị lẫn khi nhìn nhanh.
                cls = 'bg-emerald-500 text-white border-emerald-600 hover:bg-emerald-600';
            }
        }
        if (isCurrent) cls = 'bg-gradient-to-br from-pink-500 to-purple-500 text-white border-pink-500 shadow-md';
        html += `<button onclick="jumpToQuestion(${idx})" class="${btnSize} shrink-0 rounded-xl border-2 font-black flex items-center justify-center transition-colors duration-150 ${cls}">${idx + 1}</button>`;
    });
    container.innerHTML = html;
}

function jumpToQuestion(idx) {
    stopSpeaking();
    if (idx < 0 || idx >= activeQuestionsList.length) return;
    currentQIndex = idx;
    loadQuestion();
}

function formatDuration(ms) {
    const s = Math.round(ms / 1000);
    return `${Math.floor(s / 60)} phút ${s % 60} giây`;
}

function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function showLoadingOverlay(msg) {
    let el = document.getElementById('loading-overlay');
    if (!el) {
        el = document.createElement('div');
        el.id = 'loading-overlay';
        el.className = 'fixed inset-0 bg-black/30 flex items-center justify-center z-50';
        el.innerHTML = `<div class="bg-white px-6 py-4 rounded-2xl shadow-xl font-extrabold text-pink-600 flex items-center space-x-3"><i class="fa-solid fa-spinner fa-spin"></i><span id="loading-overlay-text"></span></div>`;
        document.body.appendChild(el);
    }
    document.getElementById('loading-overlay-text').textContent = msg;
    el.classList.remove('hidden');
}
function hideLoadingOverlay() { document.getElementById('loading-overlay')?.classList.add('hidden'); }

function toggleAutoSpeech() {
    autoSpeechEnabled = !autoSpeechEnabled;
    localStorage.setItem('tvl2_autoSpeechEnabled', autoSpeechEnabled ? 'true' : 'false');
    if (!autoSpeechEnabled) stopSpeaking();
    updateAutoSpeechButtonUI();
}

function updateAutoSpeechButtonUI() {
    const btn = document.getElementById('btn-toggle-autospeech');
    if (!btn) return;
    const icon = btn.querySelector('i');
    if (autoSpeechEnabled) {
        icon.className = 'fa-solid fa-volume-high';
        btn.title = 'Đang BẬT tự động đọc câu hỏi — bấm để tắt';
        btn.classList.remove('bg-gray-100', 'text-gray-400', 'border-gray-200');
        btn.classList.add('bg-pink-50', 'text-pink-600', 'border-pink-200');
    } else {
        icon.className = 'fa-solid fa-volume-xmark';
        btn.title = 'Đang TẮT tự động đọc câu hỏi — bấm để bật';
        btn.classList.remove('bg-pink-50', 'text-pink-600', 'border-pink-200');
        btn.classList.add('bg-gray-100', 'text-gray-400', 'border-gray-200');
    }
}


// ==========================================
// TRUNG TÂM MINI GAME - TIẾNG VIỆT 2
// Kiến trúc giống TA2: Hub -> lazy-load file JS riêng -> game tự quản lý state.
// ==========================================
const MINIGAME_TOPIC_PALETTES = SUBTOPIC_PALETTES;

function miniGameHash(text = '') {
    return [...String(text)].reduce((acc, ch) => ((acc * 31) + ch.charCodeAt(0)) >>> 0, 7);
}

function getMiniGamePaletteOrder(seed = 'tv2-minigame') {
    const order = MINIGAME_TOPIC_PALETTES.map((_, i) => i);
    let state = miniGameHash(seed) || 1;
    for (let i = order.length - 1; i > 0; i--) {
        state = (state * 1664525 + 1013904223) >>> 0;
        const j = state % (i + 1);
        [order[i], order[j]] = [order[j], order[i]];
    }
    return order.map(i => MINIGAME_TOPIC_PALETTES[i]);
}

function ensureMiniGameThemeStyles() {
    if (document.getElementById('tv2-minigame-theme-v1')) return;
    const style = document.createElement('style');
    style.id = 'tv2-minigame-theme-v1';
    style.textContent = `
        #view-game-play > div { max-width: 56rem !important; }
        #game-play-title { font-size: 1.2rem !important; }
        #game-play-container { font-size: 16px; }
        @media (max-width: 640px) {
            #view-game-play > div { max-width: 100% !important; }
            #game-play-title { font-size: 1.05rem !important; }
        }
    `;
    document.head.appendChild(style);
}


// Loa nghe lai cau hoi dung chung cho TOAN BO mini game.
// Quy uoc khuyen nghi cho file game: gan data-minigame-question vao phan tu chua cau hoi
// hoac goi setMiniGameQuestionAudio(text) moi khi doi cau.
let miniGameReplayText = '';
let miniGameReplayRate = 0.94;

function setMiniGameQuestionAudio(text, rate = 0.94) {
    miniGameReplayText = String(text || '').replace(/\s+/g, ' ').trim();
    miniGameReplayRate = Number.isFinite(Number(rate)) ? Number(rate) : 0.94;
}

function detectMiniGameQuestionText() {
    const box = document.getElementById('game-play-container');
    if (!box) return '';

    const directSelectors = [
        '[data-minigame-question]',
        '#game-question', '#game-current-question', '#sk-question', '#fa-question',
        '.game-question', '.mg-question', '.question-text'
    ];
    for (const selector of directSelectors) {
        const el = box.querySelector(selector);
        const text = String(el?.innerText || el?.textContent || '').replace(/\s+/g, ' ').trim();
        if (text) return text;
    }

    // Fallback cho cac game cu chua gan marker: tim dong co dang cau hoi/nhiem vu.
    const candidates = [...box.querySelectorAll('div,p,h2,h3,h4,span')]
        .map(el => String(el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim())
        .filter(text => text.length >= 12 && text.length <= 260)
        .filter(text => !/^(⭐|🔥|🏆|Lượt\s*\d+|Chính xác|Chưa đúng|Điểm|Sắp ra mắt)/i.test(text));

    const questionLike = candidates.find(text =>
        /[?？]$/.test(text) ||
        /^(Vì sao|Tại sao|Nếu |Câu nào|Từ nào|Tiếng nào|Chọn |Tìm |Điền |Ghép |Sắp xếp |Bé |Em |Hãy )/i.test(text)
    );
    return questionLike || candidates[0] || '';
}

function speakMiniGameQuestion() {
    const liveText = detectMiniGameQuestionText();
    const text = liveText || miniGameReplayText;
    if (!text) return;
    setMiniGameQuestionAudio(text, miniGameReplayRate);
    if (typeof speakVietnamese === 'function') speakVietnamese(text, miniGameReplayRate);
}

function ensureMiniGameReplayButton() {
    const title = document.getElementById('game-play-title');
    const header = title?.parentElement;
    if (!header || document.getElementById('btn-minigame-replay')) return;

    const backBtn = header.querySelector('button');
    const btn = document.createElement('button');
    btn.id = 'btn-minigame-replay';
    btn.type = 'button';
    btn.title = 'Nghe lại câu hỏi';
    btn.setAttribute('aria-label', 'Nghe lại câu hỏi');
    btn.onclick = speakMiniGameQuestion;
    btn.className = 'w-9 h-9 md:w-10 md:h-10 rounded-full bg-sky-50 hover:bg-sky-100 text-sky-600 border-2 border-sky-200 shadow-sm pastel-btn shrink-0 flex items-center justify-center';
    btn.innerHTML = '<i class="fa-solid fa-volume-high text-sm md:text-base"></i>';

    if (backBtn) header.insertBefore(btn, backBtn);
    else header.appendChild(btn);
}

window.setMiniGameQuestionAudio = setMiniGameQuestionAudio;
window.speakMiniGameQuestion = speakMiniGameQuestion;

const MINIGAME_LIST = [
    { id: 'family-activity', title: '1. Hoạt động gia đình', desc: 'Quan sát tranh - đọc hiểu - suy luận tình huống gia đình', icon: '🏡', ready: true },
    { id: 'why-family', title: '2. Vì sao thế nhỉ?', desc: 'Suy luận nguyên nhân - kết quả - nếu thì - xử lí logic', icon: '🤔', ready: true },
    { id: 'use-it-right', title: '3. Dùng sao cho đúng?', desc: 'Công năng - chất liệu - cách dùng - an toàn với đồ vật quanh nhà', icon: '🧰', ready: true },
    { id: 'say-it-nicely', title: '4. Nói sao cho hay?', desc: 'Chào hỏi - cảm ơn - xin lỗi - nhờ giúp - đáp lời thật phù hợp', icon: '🗣️', ready: true },
    { id: 'traffic-safe', title: '5. Đi sao cho đúng?', desc: 'Chọn hành động đúng luật và an toàn trong từng tình huống giao thông', icon: '🚦', ready: true },
    { id: 'traffic-why', title: '6. Vì sao phải thế?', desc: 'Tìm nguyên nhân - hậu quả phía sau các quy tắc an toàn giao thông', icon: '🧠', ready: true },
    { id: 'traffic-vehicle', title: '7. Chọn phương tiện nào?', desc: 'Cân nhắc quãng đường - số người - mục đích để chọn cách di chuyển phù hợp', icon: '🚌', ready: true },
    { id: 'traffic-handle', title: '8. Xử lý thế nào?', desc: 'Phản xạ với tình huống bất ngờ: nếu - thì - việc nào nên làm trước', icon: '⚡', ready: true },
    { id: 'mall-where', title: '9. Đi đâu – mua gì?', desc: 'Nhận nhiệm vụ - đọc không gian - tìm đúng khu vực trong trung tâm thương mại', icon: '🗺️', ready: true },
    { id: 'mall-choice', title: '10. Chọn sao cho hợp lý?', desc: 'Cân nhắc nhu cầu - công dụng - an toàn - tránh lãng phí khi mua sắm', icon: '🛒', ready: true },
    { id: 'mall-talk', title: '11. Nói sao ở nơi công cộng?', desc: 'Hỏi đường - nhờ giúp - xếp hàng - giao tiếp lịch sự với nhân viên và mọi người', icon: '💬', ready: true },
    { id: 'mall-handle', title: '12. Bé xử lý thế nào?', desc: 'Phản xạ với tình huống bị lạc - sàn ướt - thang cuốn - lối thoát hiểm và an toàn nơi công cộng', icon: '🚨', ready: true }
];

function openMiniGameHub() {
    activeMiniGameId = null;
    stopAllAudio();
    inBaiHocFlow = false;
    if (!hasPremiumAccess()) {
        showPremiumGate('Mini Game', '🎮');
        return;
    }
    inMiniGameFlow = true;
    setMainTabActive_('games');
    activeExamContext = null;
    activeRoadmapContext = null;
    activeTopicId = null;
    pendingTopicQuiz = null;
    updateNavTabs('Mini Game', '🎮', null);
    ensureMiniGameThemeStyles();

    const grid = document.getElementById('minigame-grid');
    if (!grid) return;
    const palettes = getMiniGamePaletteOrder('tv2-hub');
    grid.innerHTML = MINIGAME_LIST.map((g, idx) => {
        const style = palettes[idx % palettes.length];
        return `
        <div onclick="openGamePlay('${g.id}')" class="p-3.5 md:p-4 flex flex-col items-center text-center cursor-pointer transition-all group ${style.card} border-2 rounded-[26px] min-h-[132px] justify-between relative shadow-sm pastel-btn">
            ${!g.ready ? `<span class="absolute top-2 right-2 bg-amber-100 text-amber-700 text-[10px] font-black px-2 py-0.5 rounded-full border border-amber-200">Sắp ra mắt</span>` : ''}
            <div class="text-4xl group-hover:scale-110 transition-transform mt-1">${g.icon}</div>
            <div class="w-full">
                <h3 class="font-extrabold ${style.num} text-base leading-tight">${g.title}</h3>
                <p class="text-sm text-gray-700 font-bold mt-1 w-full leading-snug">${g.desc}</p>
            </div>
        </div>`;
    }).join('');
    switchAppView('view-minigame-hub');
}

const GAME_SCRIPT_MAP = {
    'family-activity': 'assets/js/games/hoat-dong-gia-dinh.js?v=tv2mg1c',
    'why-family': 'assets/js/games/vi-sao-the-nhi.js?v=tv2mg2c',
    'use-it-right': 'assets/js/games/dung-sao-cho-dung.js?v=tv2mg3c',
    'say-it-nicely': 'assets/js/games/noi-sao-cho-hay.js?v=tv2mg4c',
    'traffic-safe': 'assets/js/games/di-sao-cho-dung.js?v=tv2mg5c',
    'traffic-why': 'assets/js/games/vi-sao-phai-the.js?v=tv2mg6c',
    'traffic-vehicle': 'assets/js/games/chon-phuong-tien-nao.js?v=tv2mg7c',
    'traffic-handle': 'assets/js/games/xu-ly-the-nao.js?v=tv2mg8c',
    'mall-where': 'assets/js/games/di-dau-mua-gi.js?v=tv2mg9c',
    'mall-choice': 'assets/js/games/chon-sao-cho-hop-ly.js?v=tv2mg10c',
    'mall-talk': 'assets/js/games/noi-sao-noi-cong-cong.js?v=tv2mg11c',
    'mall-handle': 'assets/js/games/be-xu-ly-the-nao.js?v=tv2mg12c'
};
const loadedGameScripts = {};

function loadGameScript(src) {
    if (loadedGameScripts[src]) return Promise.resolve();
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => { loadedGameScripts[src] = true; resolve(); };
        script.onerror = () => reject(new Error(`Không tải được file game: ${src}`));
        document.body.appendChild(script);
    });
}

async function openGamePlay(gameId) {
    stopAllAudio();
    ensureMiniGameThemeStyles();
    inMiniGameFlow = true;
    const game = MINIGAME_LIST.find(g => g.id === gameId);
    if (!game) return;

    if (!game.ready) {
        showAccessGate({
            title: 'Sắp ra mắt',
            icon: game.icon,
            showAuth: false,
            message: `<strong>${escapeHtml(game.title)}</strong> đang được cô Thỏ Ngọc chuẩn bị.<br>Con quay lại sau nhé!`,
            note: '🎮 Cả 12 Mini Game đã sẵn sàng!'
        });
        return;
    }

    const title = document.getElementById('game-play-title');
    if (title) title.innerHTML = `<span>${game.icon}</span><span>${game.title}</span>`;
    updateNavTabs('Mini Game', '🎮', game.title);
    activeMiniGameId = gameId;
    switchAppView('view-game-play');
    miniGameReplayText = '';
    miniGameReplayRate = 0.94;
    ensureMiniGameReplayButton();

    const scriptSrc = GAME_SCRIPT_MAP[gameId];
    if (scriptSrc) {
        const box = document.getElementById('game-play-container');
        if (box) box.innerHTML = '<p class="text-center text-gray-400 font-bold py-8">Đang mở cổng thành...</p>';
        try {
            await loadGameScript(scriptSrc);
        } catch (e) {
            if (box) box.innerHTML = '<p class="text-center text-rose-500 font-bold py-8">Không tải được game. Bé thử lại nhé!</p>';
            return;
        }
    }

    if (!isMiniGameActive(gameId)) return;

    if (gameId === 'family-activity' && typeof startFamilyActivityGame === 'function') {
        startFamilyActivityGame();
    } else if (gameId === 'why-family' && typeof startWhyFamilyGame === 'function') {
        startWhyFamilyGame();
    } else if (gameId === 'use-it-right' && typeof startUseItRightGame === 'function') {
        startUseItRightGame();
    } else if (gameId === 'say-it-nicely' && typeof startSayItNicelyGame === 'function') {
        startSayItNicelyGame();
    } else if (gameId === 'traffic-safe' && typeof startTrafficSafeGame === 'function') {
        startTrafficSafeGame();
    } else if (gameId === 'traffic-why' && typeof startTrafficWhyGame === 'function') {
        startTrafficWhyGame();
    } else if (gameId === 'traffic-vehicle' && typeof startTrafficVehicleGame === 'function') {
        startTrafficVehicleGame();
    } else if (gameId === 'traffic-handle' && typeof startTrafficHandleGame === 'function') {
        startTrafficHandleGame();
    } else if (gameId === 'mall-where' && typeof startMallWhereGame === 'function') {
        startMallWhereGame();
    } else if (gameId === 'mall-choice' && typeof startMallChoiceGame === 'function') {
        startMallChoiceGame();
    } else if (gameId === 'mall-talk' && typeof startMallTalkGame === 'function') {
        startMallTalkGame();
    } else if (gameId === 'mall-handle' && typeof startMallHandleGame === 'function') {
        startMallHandleGame();
    }

}

document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAllAudio();
});
window.addEventListener('pagehide', stopAllAudio);

document.addEventListener('DOMContentLoaded', () => {
    applyV7Labels_();
    updateUserInfoBox();
    renderDashboardGrid();
    refreshMainTabLocks_();
    goHome();
    document.getElementById('login-mapin')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') doLogin();
    });
    document.getElementById('login-mahs')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') doLogin();
    });

    window.addEventListener('click', () => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!audioCtx && AudioContext) audioCtx = new AudioContext();
        if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    }, { once: true });

    updateAutoSpeechButtonUI();
    tryAutoLogin();
});
// ============================================================
// TV2 V9 - BAI HOC <-> BAI TAP, KHONG CON TANG TUAN
// SGK interactive: card bai -> 3 trang. Bai tap: card bai -> 20 cau.
// ============================================================
function hydrateRoadmapConfigV7_(data) {
    const cfg = {};
    (data?.bai_tap || []).forEach(bt => {
        cfg[Number(bt.bai)] = {
            week: Number(bt.bai),
            bai: Number(bt.bai),
            semester: Number(bt.semester),
            theme: bt.title || '',
            weekly_practice: bt,
            name: `Bài tập ${bt.bai}: ${bt.title || ''}`,
            icon: '✏️'
        };
    });
    roadmapConfig = cfg;
}

function applyV7Labels_() {
    const gaBtn = document.getElementById('btn-bai-hoc-header');
    if (gaBtn) {
        gaBtn.title = 'Bài học';
        const desktop = gaBtn.querySelector('.hidden.md\\:flex');
        if (desktop) desktop.innerHTML = '<span>Bài</span><span>học</span>';
    }
    const pBtn = document.getElementById('btn-progress-header');
    if (pBtn) {
        pBtn.title = 'Bài tập';
        const desktop = pBtn.querySelector('.hidden.md\\:flex');
        if (desktop) desktop.innerHTML = '<span>Bài</span><span>tập</span>';
    }
    const hubTitle = document.querySelector('#view-bai-hoc-hub h2');
    if (hubTitle) hubTitle.innerHTML = '<span>📖</span><span>Bài học Tiếng Việt 2</span>';
    const hubSub = document.getElementById('bai-hoc-hub-subtitle');
    if (hubSub) hubSub.textContent = 'Chọn bài và học ngay · mỗi bài 3 trang · khoảng 12–18 phút';
}

async function openBaiHocHub(semesterNumber = 1) {
    stopSpeaking(); clearInterval(quizTimerInterval);
    if (!hasPremiumAccess()) { showPremiumGate('Bài học','📖'); return; }
    setMainTabActive_('lessons');
    inBaiHocFlow = true; inMiniGameFlow = false; activeExamContext = null; activeRoadmapContext = null; activeTopicId = null; pendingTopicQuiz = null;
    activeBaiHocContext = { semester:Number(semesterNumber)||1, bai:null, lessonId:null, pageNo:1 };
    applyV7Labels_(); updateNavTabs('Bài học','📖',null); switchAppView('view-bai-hoc-hub');
    showLoadingOverlay('Đang mở Bài học Tiếng Việt 2...');
    try { const data=await loadBaiHocData(); renderBaiHocHubV9_(data, activeBaiHocContext.semester); }
    catch(err){ alert(`Không thể mở Bài học: ${err.message}`); }
    finally { hideLoadingOverlay(); }
}

function renderBaiHocHubV9_(data, semesterNumber) {
    const tabs=document.getElementById('bai-hoc-semester-tabs');
    const grid=document.getElementById('bai-hoc-week-grid');
    const subtitle=document.getElementById('bai-hoc-hub-subtitle');
    if(!tabs||!grid)return;
    const lessons=(data.bai_hoc||[]).filter(x=>Number(x.semester)===Number(semesterNumber));
    tabs.innerHTML=[1,2].map(s=>`<button onclick="openBaiHocHub(${s})" class="semester-switch-btn ${Number(s)===Number(semesterNumber)?'is-active':'is-inactive'}">Học kỳ ${s}</button>`).join('');
    if(subtitle) subtitle.textContent=`Học kỳ ${semesterNumber} · ${lessons.length} bài · chọn bài và học ngay`;
    const done=getBaiHocCompletedSet_();
    grid.className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2';
    grid.innerHTML=lessons.map((l,idx)=>{
        const ok=done.has(`${l.lesson_id}_done`); const alt=idx%2===0;
        return `<button onclick="openBaiHocByNumberV9_(${l.bai},1)" class="text-left min-h-[88px] rounded-2xl border-2 ${ok?'border-emerald-300 bg-emerald-50/50':(alt?'border-pink-200 bg-gradient-to-br from-white to-pink-50':'border-purple-200 bg-gradient-to-br from-white to-purple-50')} px-3 py-2.5 hover:border-fuchsia-400 hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between gap-2"><span class="font-black text-purple-700 text-base">Bài ${l.bai}</span><span>${ok?'✅':'›'}</span></div>
          <div class="mt-1 text-[12px] md:text-[13px] leading-5 font-bold text-slate-700 line-clamp-2">${escapeHtml(l.source_title||'')}</div>
        </button>`;
    }).join('');
}

async function openBaiHocByNumberV9_(bai, pageNo=1) {
    stopSpeaking(); inBaiHocFlow=true;
    const data=await loadBaiHocData();
    const lesson=(data.bai_hoc||[]).find(x=>Number(x.bai)===Number(bai));
    if(!lesson){ alert('Không tìm thấy bài học'); return; }
    const safePage=Math.max(1,Math.min(3,Number(pageNo)||1));
    activeBaiHocContext={semester:Number(lesson.semester),bai:Number(bai),lessonId:lesson.lesson_id,pageNo:safePage};
    updateNavTabs('Bài học','📖',`Bài ${bai}`,lesson.source_title||'');
    switchAppView('view-bai-hoc-lesson');
    renderBaiHocLessonV9_(lesson,safePage);
}

function renderBaiHocLessonV9_(lesson,pageNo){
    const meta=document.getElementById('bai-hoc-lesson-meta');
    const title=document.getElementById('bai-hoc-lesson-title');
    const objBox=document.getElementById('bai-hoc-objectives')?.closest('div.bg-sky-50\\/60');
    const sections=document.getElementById('bai-hoc-sections');
    const complete=document.getElementById('bai-hoc-complete-btn');
    const extra=document.getElementById('bai-hoc-extra-practice-btn');
    if(meta){meta.textContent=`📖 Bài ${lesson.bai} · ${lesson.theme||''}`;meta.className='text-base md:text-lg font-extrabold text-purple-600 mb-1';}
    if(title){title.textContent='';title.className='hidden';}
    if(objBox)objBox.classList.add('hidden'); if(complete)complete.classList.add('hidden'); if(extra)extra.classList.add('hidden');
    const back=document.querySelector('#view-bai-hoc-lesson button[onclick*="openBaiHocWeek"]');
    if(back){back.textContent='← Danh sách bài';back.onclick=()=>openBaiHocHub(lesson.semester);}
    const page=(lesson.pages||[]).find(p=>Number(p.page_no)===Number(pageNo))||lesson.pages?.[0];
    if(!page||!sections)return;
    const body=page.page_type==='questions'?renderBaiHocQuestionsPageV8_(page):page.page_type==='summary'?renderBaiHocSummaryPageV9_(page,lesson):renderBaiHocReadingPageV8_(page,lesson);
    sections.innerHTML=`${renderBaiHocPageTabsV9_(lesson,pageNo)}${body}${renderBaiHocBottomNavV9_(lesson,pageNo)}`;
}

function renderBaiHocPageTabsV9_(lesson,pageNo){
    const tabs=[['📖','Bài đọc'],['❓','Câu hỏi'],['🌟','Tổng kết']];
    return `<div class="grid grid-cols-3 gap-2 mb-3">${tabs.map((t,i)=>{const p=i+1,a=Number(pageNo)===p;return `<button onclick="openBaiHocByNumberV9_(${lesson.bai},${p})" class="py-2.5 rounded-xl border ${a?'bg-gradient-to-r from-pink-500 to-purple-500 text-white border-purple-400 shadow-md':'bg-pink-50/60 text-purple-700 border-pink-200'} font-black text-sm md:text-base">${t[0]} ${t[1]}</button>`}).join('')}</div>`;
}
function renderBaiHocBottomNavV9_(lesson,pageNo){
    const prev=pageNo>1?`<button onclick="openBaiHocByNumberV9_(${lesson.bai},${pageNo-1})" class="px-4 py-2.5 rounded-xl bg-white border border-purple-200 text-purple-700 font-black text-sm">← Trang trước</button>`:'<span></span>';
    const next=pageNo<3?`<button onclick="openBaiHocByNumberV9_(${lesson.bai},${pageNo+1})" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-black text-sm shadow-sm">Trang tiếp →</button>`:`<button onclick="openBaiHocByNumberV9_(${lesson.bai},1)" class="px-4 py-2.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 font-black text-sm">↺ Xem lại bài đọc</button>`;
    return `<div class="flex items-center justify-between gap-3 pt-2">${prev}<div class="text-sm font-black text-slate-400">${pageNo}/3</div>${next}</div>`;
}
function renderBaiHocSummaryPageV9_(p,lesson){
    const base=renderBaiHocSummaryPageV8_(p,lesson);
    return base.replace(`markCurrentBaiHocLessonCompleteV8_()`,`markCurrentBaiHocLessonCompleteV8_()`).replace(`Hoàn thành bài ${lesson.lesson_no}`,`Hoàn thành Bài ${lesson.bai}`);
}
function markCurrentBaiHocLessonCompleteV8_(){
    const id=activeBaiHocContext?.lessonId;if(!id)return;const set=getBaiHocCompletedSet_();set.add(`${id}_done`);saveBaiHocCompletedSet_(set);
    const btn=event?.currentTarget;if(btn){btn.textContent='✅ Đã hoàn thành bài học';btn.classList.add('from-emerald-500','to-teal-500');}
}

function getBaiTapUnlockKeyV9_(){const id=currentUser?.maHS||'KHACH';return `tv2_bai_tap_unlocked_v9_${String(id).toUpperCase()}`;}
function getUnlockedLearningWeekV7_(){try{return Math.max(1,Number(localStorage.getItem(getBaiTapUnlockKeyV9_())||1));}catch(e){return 1;}}
function saveUnlockedLearningWeekV7_(n){try{localStorage.setItem(getBaiTapUnlockKeyV9_(),String(Math.max(1,Number(n)||1)));}catch(e){}}
function getNextLearningWeekV7_(data,bai){return (data?.bai_tap||[]).map(x=>Number(x.bai)).sort((a,b)=>a-b).find(x=>x>Number(bai))||null;}
function isLearningWeekUnlockedV7_(data,bai){return Number(bai)<=getUnlockedLearningWeekV7_();}

async function openRoadmap(semesterNumber=1){
    stopSpeaking();
    if(!hasPremiumAccess()){showPremiumGate('Bài tập','✏️');return;}
    setMainTabActive_('exercises');
    inMiniGameFlow=false;inBaiHocFlow=false;applyV7Labels_();updateNavTabs('Bài tập','✏️',null);switchAppView('view-roadmap');showLoadingOverlay('Đang mở Bài tập...');
    try{const data=await loadBaiHocData();renderBaiTapGridV9_(data,semesterNumber);}catch(err){alert(`Không thể mở Bài tập: ${err.message}`);}finally{hideLoadingOverlay();}
}
function renderBaiTapGridV9_(data,semesterNumber){
    const view=document.getElementById('view-roadmap'),container=document.getElementById('roadmap-svg-container');if(!view||!container)return;
    const h2=view.querySelector('h2');if(h2)h2.innerHTML='<span>✏️</span><span>Bài tập</span>';
    const p=view.querySelector('h2 + p');if(p)p.textContent='20 câu mỗi bài · đạt từ 80% để mở Bài tập tiếp theo · đánh giá theo 6 năng lực.';
    const history=view.querySelector('button[onclick*="LichSuTienTrinhTuan"] span');if(history)history.textContent='📊 Lịch sử Bài tập';
    const arr=(data.bai_tap||[]).filter(x=>Number(x.semester)===Number(semesterNumber));const unlocked=getUnlockedLearningWeekV7_();
    const tabHost=document.getElementById('roadmap-semester-tabs');if(tabHost)tabHost.innerHTML=[1,2].map(s=>`<button onclick="openRoadmap(${s})" class="semester-switch-btn ${Number(s)===Number(semesterNumber)?'is-active':'is-inactive'}">Học kỳ ${s}</button>`).join('');
    container.className='w-full bg-gradient-to-br from-pink-50/70 via-white to-purple-50/70 rounded-3xl border-2 border-pink-200 p-3 shadow-sm';
    container.innerHTML=`<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">${arr.map((bt,idx)=>{const open=Number(bt.bai)<=unlocked;return `<button onclick="${open?`selectBaiTapV9_(${bt.bai})`:`showLockedBaiTapV9_(${bt.bai})`}" class="relative text-left min-h-[98px] rounded-2xl border-2 p-3 ${open?(idx%2?'bg-purple-50 border-purple-200 hover:border-purple-400':'bg-pink-50 border-pink-200 hover:border-pink-400'):'bg-slate-50 border-slate-200 opacity-60'} hover:shadow-md transition-shadow"><div class="flex justify-between"><span class="font-black ${open?'text-purple-700':'text-slate-500'}">Bài ${bt.bai}</span><span>${open?'':'🔒'}</span></div><div class="text-[12px] md:text-[13px] font-bold text-slate-600 mt-1 line-clamp-2">${escapeHtml(bt.title||'')}</div><div class="text-[10px] mt-1 ${open?'text-emerald-600':'text-slate-400'} font-black">${open?'20 câu':'Cần ≥80% bài trước'}</div></button>`}).join('')}</div>`;
}
function showLockedBaiTapV9_(bai){alert(`🔒 Bài tập ${bai} chưa mở. Bé cần đạt từ 80% ở Bài tập trước để mở khóa nhé!`);}
function getQuestionsForBaiTapV9_(bt){
    if(!bt||!allQuestionsFlatCache)return[];const subIds=bt.sub_ids||[];let scoped=allQuestionsFlatCache.filter(q=>subIds.length&&subIds.includes(q.sub_id));if(!scoped.length)scoped=[...allQuestionsFlatCache];
    const candidate=shuffleArray(scoped).slice(0,Math.min(Number(bt.candidate_pool_target||30),scoped.length));const by={};candidate.forEach(q=>{const m=String(q.skill_tag||q.tag||'C1').match(/C([1-6])/i);const k=m?'C'+m[1]:'C1';(by[k]||=[]).push(q)});const out=[],used=new Set();let go=true;while(out.length<20&&go){go=false;for(const k of ['C1','C2','C3','C4','C5','C6']){const a=by[k]||[];while(a.length&&used.has(a[0].question_id))a.shift();if(a.length&&out.length<20){const q=a.shift();used.add(q.question_id);out.push(q);go=true}}}for(const q of candidate){if(out.length>=20)break;if(!used.has(q.question_id)){used.add(q.question_id);out.push(q)}}return shuffleArray(out.slice(0,20));
}
async function selectBaiTapV9_(bai){
    stopSpeaking();showLoadingOverlay(`Đang chuẩn bị Bài tập ${bai}...`);try{const data=await loadBaiHocData();const bt=(data.bai_tap||[]).find(x=>Number(x.bai)===Number(bai));if(!bt)throw new Error('Không tìm thấy Bài tập');if(!isLearningWeekUnlockedV7_(data,bai)){showLockedBaiTapV9_(bai);return;}await fetchAllTopicsData();const qs=getQuestionsForBaiTapV9_(bt);if(!qs.length)throw new Error('Kho câu hỏi phù hợp bài này chưa đủ dữ liệu');activeRoadmapContext={week:Number(bai),bai:Number(bai),topicId:`BT${bai}`,chuDe:`Bài tập ${bai} · ${bt.title||''}`};pendingTopicQuiz=null;activeExamContext=null;updateNavTabs('Bài tập','✏️',`Bài ${bai}`,bt.title||'');startTopicQuiz(bai,activeRoadmapContext.chuDe,qs,null);}catch(err){alert(`Không thể mở Bài tập: ${err.message}`);}finally{hideLoadingOverlay();}
}
