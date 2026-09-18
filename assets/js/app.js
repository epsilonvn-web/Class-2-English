// ==========================================
// KHUNG THÔNG BÁO ĐẸP — GHI ĐÈ alert() GỐC CỦA TRÌNH DUYỆT
// Toàn bộ 27+ chỗ đang gọi alert(...) trong file này tự động dùng khung đẹp này luôn,
// không cần sửa từng chỗ gọi — chỉ cần định nghĩa lại đúng tên hàm "alert" 1 lần duy nhất.
// ==========================================
function alert(message) {
    const box = document.getElementById('modal-friendly-alert');
    if (!box) { window.confirm(message); return; } // dự phòng nếu HTML chưa kịp tải xong
    const isWarning = /lỗi|sai|khoá|không tìm thấy|không tải|thiếu|chưa|không thể/i.test(String(message));
    document.getElementById('friendly-alert-icon').textContent = isWarning ? '😿' : '🐰';
    document.getElementById('friendly-alert-message').textContent = message;
    box.classList.remove('hidden');
    box.classList.add('flex');
    speakVietnamese(message, 1.0);
}
function closeFriendlyAlert() {
    stopSpeaking();
    const box = document.getElementById('modal-friendly-alert');
    if (box) { box.classList.add('hidden'); box.classList.remove('flex'); }
}

// ==========================================
// CẤU HÌNH 12 CHỦ ĐỀ KHO HỌC LIỆU & MA TRẬN 6 NHÓM NĂNG LỰC ENG_PHO-READ (TIẾNG ANH LỚP 2)
// ==========================================
// Trang chủ "Học tự do" tổ chức theo đúng 12 CHUYÊN MỤC hoạt động (Mục I khung V6) —
// KHÁC với 12 Chủ Đề nội dung (Mục III, dùng riêng cho Lộ trình 24 tuần bên dưới).
// Chuyên mục 1 (Alphabet & IPA phần A-Z + 44 IPA tĩnh) và 12 (Exam Arena) có màn hình riêng,
// nên TOPICS_CONFIG chỉ liệt kê 2-11 + mục 1 dành riêng cho Phonics Matcher (1.3, dạng trắc nghiệm).
const TOPICS_CONFIG = [
    { id: 2, title: "2. Vocabulary", titleVi: "Từ vựng", descEn: "Flashcards, picture matching & word play", descVi: "Thẻ từ, nghe tranh, kéo thả chữ", icon: "📚", color: "pink" },
    { id: 3, title: "3. Remove Letter", titleVi: "Xóa chữ cái thừa", descEn: "Remove the extra letter", descVi: "Chạm xóa chữ cái thừa", icon: "✂️", color: "rose" },
    { id: 4, title: "4. Fill Missing", titleVi: "Điền chữ còn thiếu", descEn: "Complete the word", descVi: "Điền chữ cái còn thiếu", icon: "✏️", color: "fuchsia" },
    { id: 5, title: "5. Odd One Out", titleVi: "Tìm từ khác loại", descEn: "Find the odd word", descVi: "Tìm từ khác nhóm/khác loại", icon: "🧩", color: "fuchsia" },
    { id: 6, title: "6. Reading Comprehension", titleVi: "Đọc hiểu", descEn: "Read and answer", descVi: "Đọc hiểu và trả lời", icon: "📖", color: "violet" },
    { id: 7, title: "7. Sentence Builder", titleVi: "Sắp xếp câu", descEn: "Put the words in order", descVi: "Sắp xếp từ thành câu", icon: "🧱", color: "purple" },
    { id: 8, title: "8. Fill Sentence", titleVi: "Điền câu", descEn: "Complete the sentence", descVi: "Điền câu theo ngữ cảnh", icon: "📝", color: "fuchsia" },
    { id: 9, title: "9. Q&A Dialogues", titleVi: "Hỏi & đáp", descEn: "Ask and answer", descVi: "Hội thoại hỏi và đáp", icon: "💬", color: "rose" },
    { id: 10, title: "10. Grammar Point", titleVi: "Ngữ pháp", descEn: "Learn simple grammar", descVi: "Mạo từ, giới từ, động từ, tính từ", icon: "🅰️", color: "violet" }
];

const SUBTOPIC_PALETTES = [
    { card: "bg-pink-50/80 hover:bg-pink-100 border-pink-300 text-pink-800", num: "text-pink-600", badge: "bg-white text-pink-600 border-pink-200" },
    { card: "bg-fuchsia-50/80 hover:bg-fuchsia-100 border-fuchsia-300 text-fuchsia-800", num: "text-fuchsia-600", badge: "bg-white text-fuchsia-600 border-fuchsia-200" },
    { card: "bg-purple-50/80 hover:bg-purple-100 border-purple-300 text-purple-800", num: "text-purple-600", badge: "bg-white text-purple-600 border-purple-200" },
    { card: "bg-violet-50/80 hover:bg-violet-100 border-violet-300 text-violet-800", num: "text-violet-600", badge: "bg-white text-violet-600 border-violet-200" },
    { card: "bg-purple-50/80 hover:bg-purple-100 border-purple-300 text-purple-800", num: "text-purple-600", badge: "bg-white text-purple-600 border-purple-200" },
    { card: "bg-rose-50/80 hover:bg-rose-100 border-rose-300 text-rose-800", num: "text-rose-600", badge: "bg-white text-rose-600 border-rose-200" }
];

// Lộ trình 24 tuần (V4) — mỗi chủ đề lớn (Mục X) tách 2 tuần Part1 (X.1: Từ vựng/Nghe/Ngữ âm)
// và Part2 (X.2: Ngữ pháp/Cú pháp/Đọc hiểu). Tuần 12 = chốt chặn HK1 (đề ôn 15 câu),
// Tuần 17 = ôn tập giữa kỳ (đề ôn 15 câu), Tuần 24 = Đấu trường chung kết.
const roadmapConfig = {
    1:  { name: "Tuần 1: Feelings & Emotions (Part 1)", subIds: ["1.1"], desc: "Từ vựng cảm xúc cơ bản & hỏi thăm sức khoẻ, tuổi tác.", icon: "😊" },
    2:  { name: "Tuần 2: Feelings & Emotions (Part 2)", subIds: ["1.2"], desc: "Mô tả cảm xúc người khác & đọc truyện Level 1.", icon: "😊" },
    3:  { name: "Tuần 3: My Family & Home (Part 1)", subIds: ["2.1"], desc: "Từ vựng thành viên gia đình & giới thiệu.", icon: "🏠" },
    4:  { name: "Tuần 4: My Family & Home (Part 2)", subIds: ["2.2"], desc: "Từ vựng phòng ở & hỏi vị trí người thân.", icon: "🏠" },
    5:  { name: "Tuần 5: Review & Play 1", subIds: ["1.1", "1.2", "2.1", "2.2"], desc: "Ôn tập ngắt quãng Tuần 1-4: Feelings & Family.", icon: "🔁" },
    6:  { name: "Tuần 6: Shapes & Numbers (Part 1)", subIds: ["3.1"], desc: "Từ vựng hình khối & số đếm 11-15.", icon: "🔷" },
    7:  { name: "Tuần 7: Shapes & Numbers (Part 2)", subIds: ["3.2"], desc: "Số đếm 16-20 & hỏi số lượng.", icon: "🔷" },
    8:  { name: "Tuần 8: My Toys & Space (Part 1)", subIds: ["4.1"], desc: "Từ vựng đồ chơi & diễn tả sở hữu.", icon: "🧸" },
    9:  { name: "Tuần 9: My Toys & Space (Part 2)", subIds: ["4.2"], desc: "Giới từ chỉ vị trí đồ vật.", icon: "🧸" },
    10: { name: "Tuần 10: World of Animals (Part 1)", subIds: ["5.1"], desc: "Thú nông trại & hỏi vật ở xa.", icon: "🦁" },
    11: { name: "Tuần 11: World of Animals (Part 2)", subIds: ["5.2"], desc: "Thú hoang dã & bày tỏ sở thích.", icon: "🦁" },
    12: { name: "Tuần 12: Semester 1 Grand Review", subIds: ["1.1","1.2","2.1","2.2","3.1","3.2","4.1","4.2","5.1","5.2"], isGrandReview: true, desc: "Chốt chặn Học kỳ I — đề ôn tổng hợp 15 câu, đạt ≥80% để mở khoá Học kỳ II.", icon: "🏅" },
    13: { name: "Tuần 13: Clothes & Outfits (Part 1)", subIds: ["6.1"], desc: "Từ vựng trang phục & hỏi sở hữu.", icon: "👗" },
    14: { name: "Tuần 14: Clothes & Outfits (Part 2)", subIds: ["6.2"], desc: "Số nhiều & mô tả trang phục đang mặc.", icon: "👗" },
    15: { name: "Tuần 15: Yummy Food & Drinks (Part 1)", subIds: ["7.1"], desc: "Từ vựng món ăn & bày tỏ sở thích.", icon: "🍕" },
    16: { name: "Tuần 16: Yummy Food & Drinks (Part 2)", subIds: ["7.2"], desc: "Thức uống & mời ăn lịch sự.", icon: "🍕" },
    17: { name: "Tuần 17: Review & Play 2", subIds: ["6.1", "6.2", "7.1", "7.2"], isReview15: true, desc: "Ôn tập tổng hợp 15 câu Tuần 13-16: Clothes & Food.", icon: "🔁" },
    18: { name: "Tuần 18: On the Road (Transportation)", subIds: ["8.1", "8.2"], desc: "Từ vựng phương tiện giao thông & cách di chuyển.", icon: "🚌" },
    19: { name: "Tuần 19: Go Places (Places in Town)", subIds: ["9.1", "9.2"], desc: "Từ vựng địa điểm & hỏi điểm đến.", icon: "🏙️" },
    20: { name: "Tuần 20: Creative Classroom (Part 1 - Tools)", subIds: ["10.1", "10.2"], desc: "Đồ dùng học tập cá nhân & mượn đồ lịch sự.", icon: "🎒" },
    21: { name: "Tuần 21: Creative Classroom (Part 2 - Commands)", subIds: ["11.1", "11.2"], desc: "Mệnh lệnh lớp học & giao tiếp trong lớp.", icon: "📐" },
    22: { name: "Tuần 22: Weather & Nature (Part 1)", subIds: ["12.1"], desc: "Từ vựng thiên nhiên.", icon: "🌈" },
    23: { name: "Tuần 23: Weather & Nature (Part 2)", subIds: ["12.2"], desc: "Từ vựng thời tiết & cấu trúc hỏi đáp.", icon: "🌈" },
    24: { name: "Tuần 24: Grand Exam Arena", isExam: true, desc: "Đề thi chuẩn 13 câu ma trận tích hợp, hiển thị biểu đồ năng lực cuối khoá.", icon: "🏆" }
};

const TOTAL_ROADMAP_WEEKS = 24;

// Toạ độ 35 mốc tuần dạng zigzag rắn bò (serpentine), 7 cột x 5 hàng, tự tính không cần khai báo tay từng điểm
function getRoadmapCoord(weekNum) {
    const cols = 6;
    const colWidth = 105, rowHeight = 95;
    const startX = 70, startY = 58;
    const idx = weekNum - 1;
    const row = Math.floor(idx / cols);
    const posInRow = idx % cols;
    const col = (row % 2 === 0) ? posInRow : (cols - 1 - posInRow);
    return { x: startX + col * colWidth, y: startY + row * rowHeight };
}

function buildRoadmapPathD(totalWeeks) {
    const pts = [];
    for (let w = 1; w <= totalWeeks; w++) pts.push(getRoadmapCoord(w));
    let d = `M ${pts[0].x},${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
        const p0 = pts[i - 1], p1 = pts[i];
        const midX = (p0.x + p1.x) / 2, midY = (p0.y + p1.y) / 2;
        const dx = p1.x - p0.x, dy = p1.y - p0.y;
        const len = Math.hypot(dx, dy) || 1;
        const nx = -dy / len, ny = dx / len;
        // Sóng uốn lượn xuống-lên LIÊN TỤC xuyên suốt toàn bộ đường đi (kể cả đoạn chuyển hàng),
        // không để đoạn nào thẳng đơ xen giữa — giống hệt kiểu bản đồ lộ trình game (Duolingo-style).
        const bend = (i % 2 === 0 ? 1 : -1) * 32;
        const cx = midX + nx * bend, cy = midY + ny * bend;
        d += ` Q ${cx},${cy} ${p1.x},${p1.y}`;
    }
    return d;
}

const examFileMap = {
    hocky1: { file: 'de_thi_english_2.json', arrayKey: 'semester_1_exams', sheet: 'LichSuBaiThiHK1', label: 'Học kỳ 1', color: 'pink' },
    hocky2: { file: 'de_thi_english_2.json', arrayKey: 'semester_2_exams', sheet: 'LichSuBaiThiHK2', label: 'Học kỳ 2', color: 'purple' },
    hsg:    { file: 'de_thi_english_2.json', arrayKey: 'hsg_exams', sheet: 'LichSuBaiThiHSG', label: 'Học sinh giỏi', color: 'amber' }
};

// 6 nhóm năng lực ngôn ngữ Tiếng Anh lớp 2 (ENG_PHO, ENG_VOC, ENG_LIS, ENG_GRA, ENG_SYN, ENG_READ).
const SKILL_TAXONOMY = {
    ENG_PHO: { code: 'ENG_PHO', sheetCol: 'ENG_PHO_DungSo', totalCol: 'ENG_PHO_TongSo', name: 'Ngữ âm & Chính tả', advice: 'Con cần luyện thêm cách đánh vần, nhận diện chữ cái và âm đầu/âm cuối của từ vựng.' },
    ENG_VOC: { code: 'ENG_VOC', sheetCol: 'ENG_VOC_DungSo', totalCol: 'ENG_VOC_TongSo', name: 'Từ vựng & Ý nghĩa', advice: 'Con nên ôn lại vốn từ vựng theo từng chủ đề, ghi nhớ nghĩa và cách dùng của từ.' },
    ENG_LIS: { code: 'ENG_LIS', sheetCol: 'ENG_LIS_DungSo', totalCol: 'ENG_LIS_TongSo', name: 'Nghe hiểu', advice: 'Con cần luyện nghe nhiều hơn, tập trung nghe kỹ giọng đọc trước khi chọn đáp án.' },
    ENG_GRA: { code: 'ENG_GRA', sheetCol: 'ENG_GRA_DungSo', totalCol: 'ENG_GRA_TongSo', name: 'Ngữ pháp bối cảnh', advice: 'Con nên ôn lại các mẫu câu, mạo từ, giới từ để dùng đúng ngữ pháp hơn.' },
    ENG_SYN: { code: 'ENG_SYN', sheetCol: 'ENG_SYN_DungSo', totalCol: 'ENG_SYN_TongSo', name: 'Cú pháp & Lập câu', advice: 'Con cần luyện thêm cách sắp xếp từ thành câu đúng trật tự tiếng Anh.' },
    ENG_READ: { code: 'ENG_READ', sheetCol: 'ENG_READ_DungSo', totalCol: 'ENG_READ_TongSo', name: 'Đọc hiểu', advice: 'Con nên luyện đọc đoạn văn kỹ hơn, tìm đúng thông tin trước khi trả lời.' }
};
const SKILL_KEYS = Object.keys(SKILL_TAXONOMY);

const GREETINGS_STUDENT = [
    "Chào {name}, cô Thỏ Ngọc rất vui được học tiếng Anh cùng con hôm nay!",
    "Chào mừng {name} quay lại! Sẵn sàng chinh phục thêm thật nhiều từ vựng mới chưa nào?",
    "Cô Thỏ Ngọc chào {name}! Cùng nhau nói tiếng Anh thật giỏi hôm nay nhé!",
    "Chào con yêu {name}, hôm nay chúng mình cùng khám phá thế giới tiếng Anh nhé!",
    "Chào mừng {name} đến với giờ học tiếng Anh! Cô Thỏ Ngọc tin con sẽ học rất giỏi!"
];

const GREETINGS_GUEST = [
    "Chào bé yêu, cô Thỏ Ngọc rất vui được cùng con luyện tiếng Anh hôm nay!",
    "Chào mừng bé đến với lớp tiếng Anh của cô Thỏ Ngọc! Mình cùng thử sức xem sao nhé!",
    "Cô Thỏ Ngọc chào bé! Cùng khám phá từ vựng mới thật vui nào!",
    "Chào thiên tài nhí! Cô Thỏ Ngọc đang chờ xem con nói tiếng Anh giỏi cỡ nào đây!",
    "Chào mừng con đến với Đấu trường Tiếng Anh! Chúc con học thật vui vẻ!"
];


// ==========================================
// ĐỊNH DANH MÁY CHỦ APPS SCRIPT & BIẾN TOÀN CỤC
// ==========================================
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyV_nVkEz9FsGTDs5UNs-bseExqLkIAo-HxGipPlW42vNir8tlhJ2opAB7-f-ly8OGe/exec";
let allTopicsDataCache = null;
let ALPHABET_DATA = [];
let IPA_DATA = [];
let currentAlphaTab = 'alpha';
let allQuestionsFlatCache = null;
// Bật/tắt đọc câu hỏi TỰ ĐỘNG khi vào câu mới — nút "Nghe câu hỏi" thủ công vẫn luôn hoạt động
// dù tắt tính năng này (đây chỉ tắt phần tự động phát, không tắt hẳn tính năng nghe).
let autoSpeechEnabled = localStorage.getItem('autoSpeechEnabled') !== 'false';
const examsCache = {};

let currentUser = null;
const SESSION_TOKEN_STORAGE_KEY = 'ta2_session_token';
const LEGACY_SESSION_TOKEN_KEYS = ['tv1_token'];
let starGreenCount = 0;
let starRedCount = 0;
let activeTopicId = null;
let activeExamContext = null;
let activeRoadmapContext = null;
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

function normalizeQuestion(q) {
    if (!q) return null;
    return {
        question_id: q.id ?? q.question_id ?? q.question_no ?? 0,
        // "sub_topic"/"sub_code" = MÃ Chuyên Mục.Hoạt-động-con THẬT (VD "2.1") — dùng để nhóm
        // câu hỏi cho TRANG CHỦ "Học tự do" theo đúng 12 Chuyên Mục (Mục I khung V6).
        // "week" = MÃ Chủ Đề nội dung.Part (VD "1.1") — dùng RIÊNG để lọc câu hỏi theo
        // Lộ trình 24 tuần (Mục III khung V6). Hai trục KHÔNG được gộp chung với nhau.
        sub_topic: String(q.sub_code ?? q.sub ?? q.sub_topic ?? 'Câu hỏi chung').trim(),
        sub_topic_label: String(q.sub ?? q.sub_code ?? q.sub_topic ?? 'Câu hỏi chung').trim(),
        week: q.week ?? q.w ?? null,
        paired_group: q.pg ?? q.paired_group ?? '',
        options_ipa: q.oipa ?? q.options_ipa ?? null,
        question_text: q.q ?? q.question_text ?? '',
        options: Array.isArray(q.o) ? q.o : (Array.isArray(q.options) ? q.options : []),
        answer: q.a ?? q.answer ?? '',
        hint: q.h ?? q.hint ?? '',
        image_url: q.img ?? q.image_url ?? '',
        emoji: q.emo ?? q.emoji ?? '',
        audio_text: q.aud ?? q.audio_text ?? '',
        reading_title: q.r_title ?? q.reading_title ?? '',
        reading_passage: q.r_passage ?? q.reading_passage ?? q.passage_text ?? '',
        skill_tag: q.skill_tag ?? q.tag ?? 'ENG_VOC',
        diem: Number(q.diem ?? q.score ?? 0.5),
        explanation: q.explanation ?? q.h ?? 'Không có giải thích chi tiết.',
        question_text_vi: q.question_text_vi ?? q.q_vi ?? '',
        render_style: q.render_style ?? '',
        word: q.word ?? '',
        vietnamese: q.vietnamese ?? '',
        meaning_vi: q.meaning_vi ?? '',
        ipa: q.ipa ?? '',
        examples: Array.isArray(q.examples) ? q.examples : [],
        image_id: q.image_id ?? '',
        target_tag: q.target_tag ?? '',
        focus_hint: q.focus_hint ?? '',
        completed_sentence: q.completed_sentence ?? '',
        completed_sentence_vi: q.completed_sentence_vi ?? '',
        instruction_en: q.instruction_en ?? '',
        instruction_vi: q.instruction_vi ?? '',
        answer_vi: q.answer_vi ?? '',
        // Preserve curriculum metadata used by the 4-level Explore vocabulary flow.
        // rawItemToFlatQuestion() already carries these fields; normalizeQuestion() must not drop them.
        curriculum_level: Number(q.curriculum_level ?? 0),
        unit_anchor: Number(q.unit_anchor ?? 0),
        unit_group: q.unit_group ?? '',
        curriculum_role: q.curriculum_role ?? '',
        semantic_group: q.semantic_group ?? ''
    };
}

function normalizeTopic(t) {
    if (!t) return null;
    const rawQuestions = t.qs || t.questions || [];
    return {
        topic_id: Number(t.id ?? t.topic_id),
        topic_name: t.name ?? t.topic_name ?? '',
        description: t.desc ?? t.description ?? '',
        lecture_title: t.l_title ?? t.lecture_title ?? '',
        lecture_content: t.l_content ?? t.lecture_content ?? '',
        lecture_audio_text: t.l_audio ?? t.lecture_audio_text ?? '',
        questions: rawQuestions.map(normalizeQuestion).filter(Boolean)
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

// Đề ôn tập tổng hợp 15 câu (Tuần 12 chốt chặn HK1 & Tuần 17 ôn giữa kỳ) — đúng ma trận V4:
// 3 ENG_PHO@0.5 + 2 ENG_VOC@0.5 + 2 ENG_LIS@0.5 + 3 ENG_GRA(2x1.0+1x0.5) + 3 ENG_SYN(2x1.0+1x0.5) + 2 ENG_READ@0.75 = 10.0đ
const REVIEW15_SPEC = [
    { tag: 'ENG_PHO', pts: [0.5, 0.5, 0.5] },
    { tag: 'ENG_VOC', pts: [0.5, 0.5] },
    { tag: 'ENG_LIS', pts: [0.5, 0.5] },
    { tag: 'ENG_GRA', pts: [1.0, 1.0, 0.5] },
    { tag: 'ENG_SYN', pts: [1.0, 1.0, 0.5] },
    { tag: 'ENG_READ', pts: [0.75, 0.75] }
];

function generateReview15(weekNumber) {
    const config = roadmapConfig[weekNumber];
    if (!config || !allQuestionsFlatCache) return [];
    const pool = allQuestionsFlatCache.filter(q => config.subIds.includes(q.week));

    const bySkill = {};
    SKILL_KEYS.forEach(k => bySkill[k] = shuffleArray(pool.filter(q => q.skill_tag === k)));

    let out = [];
    REVIEW15_SPEC.forEach(spec => {
        const items = bySkill[spec.tag].length ? bySkill[spec.tag] : shuffleArray(pool);
        if (!items.length) return;
        spec.pts.forEach((pts, i) => {
            const src = items[i % items.length];
            out.push({ ...src, diem: pts, id: src.question_id + '_r' + i, question_id: src.question_id + '_r' + i });
        });
    });
    return shuffleArray(out);
}

function getQuestionsForWeek343(weekNumber) {
    const config = roadmapConfig[weekNumber];
    if (!config || !allQuestionsFlatCache) return [];

    // Gom toàn bộ câu hỏi thuộc đúng các chủ đề con (sub_id dạng "X.Y") của tuần này —
    // mỗi câu đã tự mang theo skill_tag riêng (ENG_PHO-READ), không cần bảng TOPIC_TO_SKILL suy luận gián tiếp.
    let pool = allQuestionsFlatCache.filter(q => config.subIds.includes(q.week));

    if (pool.length < 30) return shuffleArray([...pool]);
    
    const size = pool.length;
    const basket1 = pool.slice(0, Math.floor(size * 0.35));
    const basket2 = pool.slice(Math.floor(size * 0.35), Math.floor(size * 0.75));
    const basket3 = pool.slice(Math.floor(size * 0.75));
    
    const easy = shuffleArray([...basket1]).slice(0, 9);
    const medium = shuffleArray([...basket2]).slice(0, 12);
    const hard = shuffleArray([...basket3]).slice(0, 9);
    
    return shuffleArray([...easy, ...medium, ...hard]);
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

const EXPLORE_LEVEL_GROUPS = [
    { level: 1, name: 'Starter', name_vi: 'Khởi đầu', units: [1,2,3,4], icon: '🌱' },
    { level: 2, name: 'Growing', name_vi: 'Tiến bộ', units: [5,6,7,8], icon: '🌼' },
    { level: 3, name: 'Smart', name_vi: 'Tự tin', units: [9,10,11,12], icon: '🌟' },
    { level: 4, name: 'Super', name_vi: 'Thử thách', units: [13,14,15,16], icon: '🏆' }
];
const EXPLORE_LEVEL_BANKS = {
    7: { bankKey: '7', title: 'Sentence Builder', vi: 'Sắp xếp câu', icon: '🧱' },
    8: { bankKey: '8', title: 'Fill Sentence', vi: 'Điền câu', icon: '📝' },
    9: { bankKey: '9', title: 'Q&A Dialogues', vi: 'Hỏi & đáp', icon: '💬' }
};
const exploreLevelBankCache_ = {};
let readingComprehensionCache = null;
let sharedVisualMapCache_ = null;
let exploreDataFilesCache_ = null;
let activeReadingGroup = null;
let readingPairState = {};

const TOPICS_DATA_FILES = [
    'assets/data/kho_hoc_english_part1.json',
    'assets/data/kho_hoc_english_part2.json'
];

// Kỹ năng nào thuộc "Part 1" (Từ vựng/Nghe/Ngữ âm) hay "Part 2" (Ngữ pháp/Cú pháp/Đọc hiểu)
// của roadmap 24 tuần — dùng để tự suy ra sub_topic "X.1"/"X.2" từ topic_id + skill_tag có sẵn.
const PART1_SKILLS = ['ENG_VOC', 'ENG_LIS', 'ENG_PHO'];

let allWordsPoolCache = null;
let wordIpaMapCache = null;
let wordMeaningMapCache = null;
// Nguồn dữ liệu chuẩn cho toàn bộ Mini Game: CHỈ lấy từ Chuyên mục 2.1 - Flashcards Library.
// Giữ nguyên object giàu dữ liệu (word, vietnamese, emoji, image_url, sentence, topic_id, topic_name)
// để các game dùng chung mà không phải tự đọc/biến đổi JSON theo cách riêng.
let miniGameVocabCache = null;
function pickDistractorWords(correct, pool, n = 3) {
    const cand = shuffleArray(pool.filter(w => w !== correct));
    const out = []; const seen = new Set([correct]);
    for (const w of cand) { if (!seen.has(w)) { out.push(w); seen.add(w); } if (out.length >= n) break; }
    return out;
}

/** Chuẩn hoá 1 câu hỏi thô từ kho_hoc_english_part1/2.json (theo Chuyên Mục hoạt động, ví dụ "section_2.1")
 * về đúng schema q/o/a/h mà normalizeQuestion() hiểu, đồng thời gắn sub_code "topic_id.part" để
 * bốc đề theo tuần (Mục 5) và gom nhóm trang chủ (fetchAllTopicsData) hoạt động chính xác. */
const SECTION_LABELS = {
    "1.3": "Phonics Matcher", "2.1": "Flashcards", "2.2": "Word-picture Puzzle", "2.3": "Listen and Choose",
    "3.1": "Spelling Warm-up", "3.2": "Spelling Runner", "3.3": "Spelling Master",
    "4.1": "Starting Sound Fill", "4.2": "Vowel Fill", "4.3": "Word Finisher",
    "5.1": "Semantic Category", "5.2": "Grammar Category", "5.3": "Sound Odd",
    "6.1": "Sentence Reader", "6.2": "Fun Tales", "6.3": "Comprehensive Reading",
    "7.1": "Sentence Builder (Simple)", "7.2": "Sentence Builder (Q&A Mixer)", "7.3": "Sentence Builder (Classroom Command)",
    "8.1": "Fill Sentence (Picture)", "8.2": "Fill Sentence (Grammar Choice)", "8.3": "Fill Sentence (Conversation)",
    "9.1": "Q&A Dialogues (Welcome Chat)", "9.2": "Q&A Dialogues (Wardrobe & Dining)", "9.3": "Q&A Dialogues (Spatial Query)",
    "10.1": "Grammar Point (Articles)", "10.2": "Grammar Point (Prepositions)", "10.3": "Grammar Point (Verbs)", "10.4": "Grammar Point (Adjectives)",
    "11.1": "Practice & Play (Semester 1 Review)", "11.2": "Practice & Play (Semester 2 Review)"
};

/** Câu dạng "Remove Letter" (xoá chữ cái thừa) chỉ có "faulty_word" + "answer" (1 chữ cái),
 * KHÔNG có sẵn mảng "options" — phải tự sinh 4 lựa chọn (đáp án đúng + 3 chữ cái nhiễu).
 * Dùng chung cho cả kho học liệu (rawItemToFlatQuestion) lẫn đề thi (loadExamDataFile). */
function buildFaultyWordOptions(letter) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('').filter(c => c !== String(letter).toLowerCase());
    return shuffleArray([letter, ...shuffleArray(alphabet).slice(0, 3)]);
}

function rawItemToFlatQuestion(sk, it, allWordsPool, sectionLabel) {
    const skill = it.skill_tag;
    const part = PART1_SKILLS.includes(skill) ? 1 : 2;
    const topicId = Number(it.topic_id) || 1;
    // sub_code (=sk, VD "2.1") = Chuyên Mục.Hoạt-động-con THẬT — dùng để nhóm câu hỏi cho
    // TRANG CHỦ "Học tự do" (Mục I khung V6). weekCode ("topicId.part") = Chủ Đề nội dung + Part —
    // dùng RIÊNG để lọc câu hỏi theo Lộ trình 24 tuần (Mục III khung V6). Hai trục KHÔNG được gộp chung.
    const weekCode = `${topicId}.${part}`;
    // Ưu tiên đọc tên hiển thị THẲNG TỪ JSON: bảng "section_names" cấp cao nhất của file trước,
    // sau đó field "section_name" gắn trong từng câu, cuối cùng mới dùng bảng dự phòng tự map.
    // KHÔNG tự thêm số "2.1 " vào trước tên — dữ liệu thật của anh không có tiền tố này.
    // file dữ liệu, app tự động đổi theo, không cần sửa code. Chỉ dùng bảng SECTION_LABELS tự map
    // làm dự phòng cho những câu CHƯA kịp có field này.
    const label = sectionLabel || it.section_name || SECTION_LABELS[sk] || sk;
    const base = { id: it.question_id, sub: label, sub_code: sk, w: weekCode, tag: skill, img: it.image_url || '', emo: it.emoji || '', aud: it.audio_text || '', pg: it._paired_group || '', oipa: it.options_ipa || null, curriculum_level: Number(it.curriculum_level || 0), unit_anchor: Number(it.unit_anchor || 0), unit_group: it.unit_group || '', curriculum_role: it.curriculum_role || '', semantic_group: it.semantic_group || '' };

    if ('faulty_word' in it) {
        const letter = it.answer;
        const opts = buildFaultyWordOptions(letter);
        return { ...base, q: it.question_text, o: opts, a: letter, h: it.hint || '' };
    }
    if ('word' in it && !('question_text' in it)) {
        // Vocabulary 2.1 là FLASHCARD thật, không phải câu hỏi trắc nghiệm.
        // Giữ nguyên dữ liệu giàu ngữ nghĩa để renderer riêng hiển thị ảnh + word + IPA + 3 ví dụ
        // và chỉ mở nghĩa tiếng Việt khi bé bấm nút.
        return {
            ...base,
            render_style: 'vocab_flashcard',
            word: it.word || '',
            vietnamese: it.vietnamese || '',
            ipa: it.ipa || '',
            examples: Array.isArray(it.examples) ? it.examples.slice(0, 3) : [],
            image_id: it.image_id || '',
            target_tag: it.target_tag || '',
            focus_hint: it.focus_hint || '',
            q: '', o: [], a: '', h: ''
        };
    }
    const out = { ...base, q: it.question_text, o: it.options || [], a: it.answer, h: it.hint || '' };
    if ('passage_text' in it) { out.r_title = it.passage_title || ''; out.r_passage = it.passage_text || ''; }
    return out;
}

// Kho học liệu Tiếng Anh 2 tổ chức theo Chuyên Mục hoạt động (section_X.Y), mỗi câu tự mang "topic_id" (1-12)
// và "skill_tag" (ENG_xxx) — cần chuẩn hoá về mảng phẳng rồi tự suy ra sub_code "X.1"/"X.2" theo Part.
/** Kho học liệu có 2 dạng section khác nhau tùy Chuyên Mục:
 *  1) Mảng phẳng: "section_3.1": [ {...câu hỏi...}, ... ]  (đa số các mục)
 *  2) Mảng lồng theo 6 Nhóm Kép: "section_2.1": { section_id, section_name, topics: [ { topic_id, topic_name, questions: [...] } ] }
 *     (riêng mục Vocabulary 2.1/2.2/2.3) — cần bóc tách "topics[].questions" thành 1 mảng phẳng duy nhất.
 * Không được giả định cứng 1 trong 2 dạng, phải tự nhận diện để không vỡ khi cấu trúc đổi. */
function buildVocabularyRuntimeSections_(data) {
    // TA2 V4: Vocabulary 2.1/2.2/2.3 dùng CHUNG một vocabulary_library nằm ngay trong
    // kho_hoc_english_part1.json. Không phụ thuộc vocabulary_english_2.json ở runtime.
    const library = Array.isArray(data?.vocabulary_library) ? data.vocabulary_library : [];
    if (!library.length || !data?.sections) return;

    const byTopic = new Map();
    library.forEach(v => {
        const ids = Array.isArray(v.topic_ids) && v.topic_ids.length ? v.topic_ids : [1];
        ids.forEach(id => {
            const n = Number(id) || 1;
            if (!byTopic.has(n)) byTopic.set(n, []);
            byTopic.get(n).push(v);
        });
    });

    const allWords = library.map(v => String(v.word || '').trim()).filter(Boolean);
    const makeOpts = (word) => shuffleArray([word, ...pickDistractorWords(word, allWords, 3)]);

    ['section_2.1','section_2.2','section_2.3'].forEach(sectionKey => {
        const section = data.sections[sectionKey];
        if (!section || !Array.isArray(section.topics)) return;

        section.topics.forEach(topic => {
            const topicId = Number(topic.topic_id) || 1;
            const source = byTopic.get(topicId) || [];
            topic.questions = source.map((v, idx) => {
                const word = String(v.word || '').trim();
                const vi = String(v.vietnamese || '').trim();
                const visual = v.visual || {};
                const common = {
                    question_id: `${sectionKey.replace('section_','s')}_${topicId}_${idx+1}`,
                    word, vietnamese: vi, ipa: v.ipa || '',
                    emoji: v.emoji || visual.fallback_emoji || '✨',
                    topic_id: topicId, skill_tag: 'ENG_VOC',
                    section_name: section.section_name || '',
                    image_url: visual.image_url || '',
                    image_id: visual.image_id || '',
                    target_tag: visual.target_tag || word.toLowerCase(),
                    focus_hint: visual.focus_hint || '',
                    examples: Array.isArray(v.examples) ? v.examples.slice(0,3) : [],
                    sentence: Array.isArray(v.examples) && v.examples.length ? v.examples[0] : '',
                    curriculum_level: Number(v.curriculum_level || 0),
                    unit_anchor: Number(v.unit_anchor || 0),
                    unit_group: v.unit_group || '',
                    curriculum_role: v.curriculum_role || '',
                    semantic_group: v.semantic_group || '',
                    tts_locale: 'en-US'
                };

                if (sectionKey === 'section_2.1') {
                    // Giữ object từ vựng giàu dữ liệu. rawItemToFlatQuestion sẽ adapter sang UI hiện tại.
                    return common;
                }
                const options = makeOpts(word);
                if (sectionKey === 'section_2.2') {
                    return {
                        ...common,
                        render_style: 'vocab_picture_choice',
                        question_text: 'Look and choose.',
                        question_text_vi: 'Nhìn tranh và chọn từ đúng.',
                        options, answer: word,
                        audio_text: 'Look and choose.',
                        hint: `Answer: ${word}.`,
                        hint_vi: `Đáp án: ${word} – ${vi}.`
                    };
                }
                return {
                    ...common,
                    image_url: '',
                    render_style: 'vocab_listen_choice',
                    question_text: 'Listen and choose.',
                    question_text_vi: 'Nghe và chọn từ đúng.',
                    options, answer: word,
                    audio_text: word, tts_text: word,
                    hint: `You heard: ${word}.`,
                    hint_vi: `Em vừa nghe từ: ${word} – ${vi}.`
                };
            });
        });
    });
}

function extractItemsFromSection(sectionValue) {
    if (Array.isArray(sectionValue)) return sectionValue;
    if (sectionValue && Array.isArray(sectionValue.topics)) {
        // Gắn thêm "_paired_group" (tên 1 trong 6 Nhóm Kép) vào từng câu — cần để dựng
        // thêm 1 cấp menu chọn nhóm trước khi vào bài (VD Flashcards Library có 6 Nhóm Kép con).
        return sectionValue.topics.flatMap(t =>
            (Array.isArray(t.questions) ? t.questions : []).map(q => ({ ...q, _paired_group: t.topic_name || '' }))
        );
    }
    if (sectionValue && Array.isArray(sectionValue.questions)) return sectionValue.questions;
    return [];
}

async function loadExploreDataFiles_() {
    if (exploreDataFilesCache_) return exploreDataFilesCache_;
    exploreDataFilesCache_ = await Promise.all(TOPICS_DATA_FILES.map(async (file) => {
        const res = await fetch(file);
        if (!res.ok) throw new Error(`Không thể tải file dữ liệu ${file}`);
        return res.json();
    }));
    return exploreDataFilesCache_;
}

async function fetchAllQuestionsFlat() {
    if (allQuestionsFlatCache) return allQuestionsFlatCache;

    const results = await loadExploreDataFiles_();

    // Hydrate Vocabulary 2.1/2.2/2.3 từ một vocabulary_library dùng chung trong Part 1.
    // Nhờ vậy 3 hoạt động không duplicate dữ liệu và cũng không cần fetch master JSON riêng.
    results.forEach(buildVocabularyRuntimeSections_);

    // Adapter dữ liệu Mini Game: đọc ĐÚNG Chuyên mục 2.1 (Flashcards Library), không quét
    // các chuyên mục khác. Hiện kho 2.1 chia theo các topic con; mỗi từ vẫn giữ topic_name
    // để game có thể cho học sinh chọn nhóm trước khi chơi.
    if (!miniGameVocabCache) {
        miniGameVocabCache = [];
        results.forEach(data => {
            const section = data?.sections?.['section_2.1'];
            if (!section) return;

            if (Array.isArray(section.topics)) {
                section.topics.forEach(topic => {
                    (Array.isArray(topic.questions) ? topic.questions : []).forEach(it => {
                        if (!it || !it.word) return;
                        miniGameVocabCache.push({
                            id: it.question_id || '',
                            word: String(it.word).trim(),
                            vietnamese: String(it.vietnamese || '').trim(),
                            emoji: it.emoji || '✨',
                            image_url: it.image_url || '',
                            sentence: it.sentence || '',
                            hint: it.hint || '',
                            topic_id: Number(topic.topic_id ?? it.topic_id ?? 0),
                            topic_name: topic.topic_name || ''
                        });
                    });
                });
            } else {
                extractItemsFromSection(section).forEach(it => {
                    if (!it || !it.word) return;
                    miniGameVocabCache.push({
                        id: it.question_id || '',
                        word: String(it.word).trim(),
                        vietnamese: String(it.vietnamese || '').trim(),
                        emoji: it.emoji || '✨',
                        image_url: it.image_url || '',
                        sentence: it.sentence || '',
                        hint: it.hint || '',
                        topic_id: Number(it.topic_id || 0),
                        topic_name: it._paired_group || ''
                    });
                });
            }
        });
    }

    if (!allWordsPoolCache) {
        allWordsPoolCache = [];
        wordIpaMapCache = {};
        wordMeaningMapCache = {};
        results.forEach(d => Object.values(d.sections || {}).forEach(sectionValue => {
            extractItemsFromSection(sectionValue).forEach(it => {
                if ('word' in it && !('question_text' in it)) {
                    allWordsPoolCache.push(it.word);
                    // Kho tra cứu nghĩa tiếng Việt: lấy ĐÚNG cặp word/vietnamese có sẵn trong thẻ
                    // Flashcards Library (mục 2.1) — không tự suy diễn/bịa nghĩa cho từ nào cả.
                    if (it.vietnamese && !wordMeaningMapCache[it.word.toLowerCase()]) {
                        wordMeaningMapCache[it.word.toLowerCase()] = it.vietnamese;
                    }
                }
                // Kho tra cứu phiên âm chung: gom mọi cặp (từ, IPA) từ TẤT CẢ câu trắc nghiệm
                // NotebookLM đã gắn sẵn "options_ipa" — dùng để tự suy ra phiên âm cho câu Flashcards
                // Library (dạng thẻ lật vốn không có mảng "options" nên NotebookLM không gắn được trực tiếp).
                if (Array.isArray(it.options) && Array.isArray(it.options_ipa)) {
                    it.options.forEach((w, i) => {
                        const ipa = it.options_ipa[i];
                        if (w && ipa && !wordIpaMapCache[w.toLowerCase()]) wordIpaMapCache[w.toLowerCase()] = ipa;
                    });
                }
            });
        }));
    }

    const rawQuestions = [];
    results.forEach(data => {
        Object.entries(data.sections || {}).forEach(([rawKey, sectionValue]) => {
            const sk = rawKey.replace(/^section_/, '');
            // Ưu tiên tên từ bảng "section_names" cấp cao nhất của file (không có tiền tố số,
            // đúng như dữ liệu thật NotebookLM xuất ra) — không tự thêm số 2.1/3.1 vào tên nữa.
            const sectionLabel = (data.section_names && data.section_names[rawKey]) || null;
            const items = extractItemsFromSection(sectionValue);
            items.forEach(it => rawQuestions.push(rawItemToFlatQuestion(sk, it, allWordsPoolCache, sectionLabel)));
        });
    });

    allQuestionsFlatCache = rawQuestions.map(normalizeQuestion).filter(Boolean);
    return allQuestionsFlatCache;
}

/**
 * Nguồn từ vựng dùng chung cho Mini Game.
 * - Chỉ trả dữ liệu từ Chuyên mục 2.1.
 * - Có thể lọc theo topic_id, từ đơn, độ dài... tùy từng game.
 * - Trả bản sao để game shuffle/filter không làm bẩn cache gốc.
 */
function getMiniGameVocabPool(options = {}) {
    const { topicId = null, singleWordOnly = false, maxLength = null, minLength = null } = options;
    let pool = Array.isArray(miniGameVocabCache) ? miniGameVocabCache : [];
    if (topicId !== null && topicId !== undefined && topicId !== 'all') {
        pool = pool.filter(item => Number(item.topic_id) === Number(topicId));
    }
    if (singleWordOnly) pool = pool.filter(item => /^[A-Za-z]+$/.test(item.word));
    if (Number.isFinite(minLength)) pool = pool.filter(item => item.word.replace(/[^A-Za-z]/g, '').length >= minLength);
    if (Number.isFinite(maxLength)) pool = pool.filter(item => item.word.replace(/[^A-Za-z]/g, '').length <= maxLength);
    return pool.map(item => ({ ...item }));
}

function getMiniGameTopicGroups() {
    const map = new Map();
    (miniGameVocabCache || []).forEach(item => {
        const id = Number(item.topic_id || 0);
        if (!id || map.has(id)) return;
        map.set(id, { id, name: item.topic_name || `Nhóm ${id}` });
    });
    return [...map.values()].sort((a, b) => a.id - b.id);
}

async function ensureMiniGameVocabReady() {
    await fetchAllQuestionsFlat();
    if (!miniGameVocabCache || !miniGameVocabCache.length) {
        throw new Error('Không tìm thấy dữ liệu từ Chuyên mục 2.1 - Flashcards Library.');
    }
    return miniGameVocabCache;
}

/**
 * Nguồn học liệu dùng chung cho Mini Game ngữ pháp / câu / hội thoại.
 * Game chỉ đọc dữ liệu đã chuẩn hoá từ fetchAllQuestionsFlat(), không tự fetch JSON riêng.
 */
function getMiniGameSectionPool(sectionCodes = []) {
    const codes = new Set((Array.isArray(sectionCodes) ? sectionCodes : [sectionCodes]).map(String));
    const pool = Array.isArray(allQuestionsFlatCache) ? allQuestionsFlatCache : [];
    return pool
        .filter(q => codes.has(String(q.sub_topic || '')))
        .map(q => ({
            ...q,
            options: Array.isArray(q.options) ? q.options.slice() : [],
            options_ipa: Array.isArray(q.options_ipa) ? q.options_ipa.slice() : q.options_ipa
        }));
}

async function ensureMiniGameLearningReady(sectionCodes = []) {
    await fetchAllQuestionsFlat();
    const pool = getMiniGameSectionPool(sectionCodes);
    if (!pool.length) {
        throw new Error(`Không tìm thấy học liệu cho Chuyên mục ${[].concat(sectionCodes).join(', ')}.`);
    }
    return pool;
}

async function fetchAllTopicsData() {
    if (allTopicsDataCache) return allTopicsDataCache;

    const flat = await fetchAllQuestionsFlat();
    const byMuc = {};
    flat.forEach(q => {
        const mucNum = parseInt(String(q.sub_topic).split('.')[0], 10);
        if (!byMuc[mucNum]) byMuc[mucNum] = [];
        byMuc[mucNum].push(q);
    });

    allTopicsDataCache = TOPICS_CONFIG.map(t => ({
        topic_id: t.id,
        topic_name: t.title,
        description: t.desc,
        lecture_title: '',
        lecture_content: '',
        lecture_audio_text: '',
        questions: byMuc[t.id] || []
    }));
    return allTopicsDataCache;
}

// File đề thi Tiếng Anh 2 phân theo 3 mảng riêng biệt (semester_1_exams/semester_2_exams/hsg_exams),
// không dùng mảng "exams" phẳng có tiền tố id như bản Toán — nạp 1 lần rồi cache theo arrayKey.
async function loadExamDataFile(file) {
    if (examsCache[file]) return examsCache[file];
    const res = await fetch(`assets/data/${file}`);
    if (!res.ok) throw new Error("Không thể tải file đề thi");
    const data = await res.json();
    ['semester_1_exams', 'semester_2_exams', 'hsg_exams'].forEach(key => {
        if (Array.isArray(data[key])) {
            data[key] = data[key].map(ex => ({
                ...ex,
                exam_title: ex.exam_name,
                questions: (ex.questions || []).map(q => {
                    // Câu "Remove Letter" trong đề thi chỉ có faulty_word+answer, không có sẵn "options" —
                    // phải tự sinh 4 lựa chọn giống hệt cách xử lý ở kho học liệu, nếu không câu này
                    // sẽ hiện ra KHÔNG CÓ đáp án nào để chọn (đúng lỗi đã phát hiện khi rà soát dữ liệu).
                    if ('faulty_word' in q && !q.options) {
                        return normalizeQuestion({ ...q, diem: q.points, options: buildFaultyWordOptions(q.answer) });
                    }
                    return normalizeQuestion({ ...q, diem: q.points });
                }).filter(Boolean)
            }));
        }
    });
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

    let totalExamsCount = 3;
    try {
        const examData = await loadExamDataFile('de_thi_english_2.json');
        if (examData) {
            totalExamsCount = ['semester_1_exams', 'semester_2_exams', 'hsg_exams']
                .reduce((sum, k) => sum + (Array.isArray(examData[k]) ? examData[k].length : 0), 0);
        }
    } catch (e) {}

    // Thẻ "1. Alphabet & IPA" luôn đứng ĐẦU TIÊN (đúng đúng thứ tự Chuyên Mục 1 trong khung V6)
    let html = `
        <div onclick="openAlphabetIPA()" class="pastel-card p-3 flex flex-col justify-between cursor-pointer hover:border-violet-400 transition-all group bg-gradient-to-br from-white to-violet-50/50 min-h-[92px]">
            <div class="flex items-center space-x-2.5">
                <div class="w-8 h-8 bg-violet-100 rounded-xl flex items-center justify-center text-sm font-extrabold text-violet-600 shadow-inner group-hover:scale-110 transition-transform shrink-0">🔤</div>
                <div class="min-w-0">
                    <h3 class="font-extrabold text-violet-700 text-sm md:text-base leading-tight">1. Alphabet & IPA</h3>
                    <div class="text-[11px] md:text-xs font-bold text-violet-500 mt-0.5 leading-tight">Bảng chữ cái & phiên âm</div>
                </div>
            </div>
            <div class="flex justify-between items-end gap-2 mt-1.5 pt-1 border-t border-violet-100">
                <div class="min-w-0 leading-tight">
                    <div class="text-[11px] font-bold text-gray-600">Letters & sounds</div>
                    <div class="text-[10px] md:text-[11px] font-bold text-gray-400 mt-0.5">Chữ cái & âm</div>
                </div>
                <span class="bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full text-[11px] font-bold shrink-0">26 chữ + 44 âm</span>
            </div>
        </div>
    `;

    TOPICS_CONFIG.forEach(t => {
        const topicObj = topicsData.find(item => Number(item.topic_id) === Number(t.id));
        const totalCount = topicObj && topicObj.questions ? topicObj.questions.length : 0;
        let countLabel = totalCount > 0 ? `${totalCount} câu` : 'Đang cập nhật';
        if (Number(t.id) === 6) countLabel = '80 bài';
        if ([7,8,9].includes(Number(t.id))) countLabel = '80 câu';
        if ([2,3,4,5].includes(Number(t.id))) {
            const vocabObj = topicsData.find(item => Number(item.topic_id) === 2);
            const vocabCount = new Set((vocabObj?.questions || []).filter(q => q.sub_topic === '2.1').map(q => String(q.word || '').toLowerCase()).filter(Boolean)).size;
            if (vocabCount) countLabel = `${vocabCount} từ`;
        }

        const iconHtml = t.isCustomTextIcon 
            ? `<div class="w-8 h-8 bg-rose-100 rounded-xl flex items-center justify-center text-[11px] font-black text-rose-600 shadow-inner group-hover:scale-110 transition-transform shrink-0 tracking-tight">S/X</div>`
            : `<div class="w-8 h-8 bg-${t.color}-100 rounded-xl flex items-center justify-center text-sm font-extrabold text-${t.color}-600 shadow-inner group-hover:scale-110 transition-transform shrink-0">${t.icon}</div>`;

        html += `
            <div onclick="openTopic(${t.id}, '${t.title}', '${t.icon}')" class="pastel-card p-3 flex flex-col justify-between cursor-pointer hover:border-${t.color}-400 transition-all group min-h-[92px] relative">
                ${Number(t.id) === 11 ? `<span class="absolute top-2 right-2 text-slate-400 text-[9px]" title="Cần đăng nhập"><i class="fa-solid fa-lock"></i></span>` : ''}
                <div class="flex items-center space-x-2.5">
                    ${iconHtml}
                    <div class="min-w-0">
                        <h3 class="font-extrabold text-${t.color}-700 text-sm md:text-base leading-tight">${t.title}</h3>
                        <div class="text-[11px] md:text-xs font-bold text-${t.color}-500 mt-0.5 leading-tight">${t.titleVi || ''}</div>
                    </div>
                </div>
                <div class="flex justify-between items-end gap-2 mt-1.5 pt-1 border-t border-pink-100">
                    <div class="min-w-0 leading-tight">
                        <div class="text-[11px] font-bold text-gray-600">${t.descEn || ''}</div>
                        <div class="text-[10px] md:text-[11px] font-bold text-gray-400 mt-0.5">${t.descVi || ''}</div>
                    </div>
                    <span class="bg-${t.color}-50 text-${t.color}-600 px-2 py-0.5 rounded-full text-[11px] font-bold shrink-0">${countLabel}</span>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

async function startRandomExam(categoryKey) {
    stopSpeaking();
    const arrayKey = examFileMap[categoryKey]?.arrayKey || 'semester_1_exams';

    showLoadingOverlay("Đang chuẩn bị đề thi...");
    try {
        const examData = await loadExamDataFile('de_thi_english_2.json');
        hideLoadingOverlay();

        const pool = (examData && Array.isArray(examData[arrayKey])) ? examData[arrayKey] : [];
        if (!pool.length) return alert('Đang cập nhật thêm đề thi cho mục này, bé quay lại sau nhé!');

        const examIndex = Math.floor(Math.random() * pool.length);
        const exam = pool[examIndex];
        const examLabel = examFileMap[categoryKey]?.label || 'Đề thi';
        const examTitle = exam.exam_title || `${examLabel} - Đề số ${examIndex + 1}`;

        activeExamContext = { categoryKey, examIndex, examTitle };
        activeRoadmapContext = null;
        pendingTopicQuiz = null;

        const questions = Array.isArray(exam.questions) && exam.questions.length ? exam.questions : [];
        if (!questions.length) return alert('Đề thi này chưa có câu hỏi, bé chọn đề khác nhé!');

        updateNavTabs("12. Đấu trường đề thi", "🏆", examTitle);
        startTopicQuiz(0, examTitle, shuffleArray(questions), null);
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
    setMainTabActive_('exams');
    inMiniGameFlow = false;
    if (!requirePremiumAccess('Đấu trường đề thi')) return;
    inAlphaIpaFlow = false;
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
    try { examData = await loadExamDataFile('de_thi_english_2.json'); } catch (e) {}

    const getCount = (categoryKey) => {
        const arrayKey = examFileMap[categoryKey]?.arrayKey;
        if (!examData || !Array.isArray(examData[arrayKey])) return 0;
        return examData[arrayKey].length;
    };

    const countHK1 = getCount('hocky1');
    const countHK2 = getCount('hocky2');
    const countHSG = getCount('hsg');

    let html = `
        <div class="bg-pink-50/70 p-5 rounded-3xl border-2 border-pink-200 flex flex-col justify-between items-center text-center group min-h-[250px] pastel-card">
            <div>
                <div class="text-4xl mb-1.5 group-hover:scale-110 transition-transform">📘</div>
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
                <div class="text-4xl mb-1.5 group-hover:scale-110 transition-transform">📗</div>
                <h3 class="font-extrabold text-purple-600 text-lg mb-1">Học kỳ 2</h3>
                <p class="text-xs text-gray-500 font-bold mb-2">Kiểm tra kiến thức HK2</p>
                <span class="inline-block bg-purple-100 text-purple-700 px-3 py-0.5 rounded-full text-xs font-black mb-3">${countHK2} đề thi chuẩn</span>
            </div>
            <div class="w-full space-y-2">
                <button onclick="startRandomExam('hocky2')" class="w-full py-2.5 bg-gradient-to-r from-purple-500 to-violet-500 text-white font-extrabold rounded-xl text-xs pastel-btn shadow-sm">
                    🚀 Vào thi thử
                </button>
                <button onclick="openHistoryModal('LichSuBaiThiHK2')" class="w-full py-2 bg-white text-purple-700 border border-purple-300 font-extrabold rounded-xl text-xs pastel-btn hover:bg-purple-50">
                    📊 Xem lịch sử thi
                </button>
            </div>
        </div>

        <div class="bg-gradient-to-br from-pink-50/70 to-violet-50/70 p-5 rounded-3xl border-2 border-violet-200 flex flex-col justify-between items-center text-center group min-h-[250px] pastel-card">
            <div>
                <div class="text-4xl mb-1.5 group-hover:scale-110 transition-transform">👑</div>
                <h3 class="font-extrabold text-violet-600 text-lg mb-1">Học sinh giỏi</h3>
                <p class="text-xs text-gray-500 font-bold mb-2">Thử thách nâng cao</p>
                <span class="inline-block bg-violet-100 text-violet-700 px-3 py-0.5 rounded-full text-xs font-black mb-3">${countHSG} đề thi tuyển chọn</span>
            </div>
            <div class="w-full space-y-2">
                <button onclick="startRandomExam('hsg')" class="w-full py-2.5 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-extrabold rounded-xl text-xs pastel-btn shadow-sm">
                    🚀 Vào thi thử
                </button>
                <button onclick="openHistoryModal('LichSuBaiThiHSG')" class="w-full py-2 bg-white text-violet-700 border border-violet-300 font-extrabold rounded-xl text-xs pastel-btn hover:bg-violet-50">
                    📊 Xem lịch sử thi
                </button>
            </div>
        </div>
    `;
    container.innerHTML = html;
}

// ==========================================
// CHUYÊN MỤC 1: ALPHABET & IPA (bê nguyên nội dung từ chương trình cũ)
// ==========================================
let alphabetIpaLoaded = false;
let currentAlphabetIndex = 0;
let currentIPAIndex = 0;
let inAlphaIpaFlow = false;
let inMiniGameFlow = false;

function getSharedVisualMap_(part1) {
    if (sharedVisualMapCache_) return sharedVisualMapCache_;
    const map = part1?.shared_visual_map;
    if (!map || !Array.isArray(map.images)) {
        sharedVisualMapCache_ = { images: [], rules: {}, base_path: 'assets/images/vocabulary/' };
        return sharedVisualMapCache_;
    }
    sharedVisualMapCache_ = map;
    return sharedVisualMapCache_;
}

async function loadSharedVisualMap_() {
    if (sharedVisualMapCache_) return sharedVisualMapCache_;
    const [part1] = await loadExploreDataFiles_();
    return getSharedVisualMap_(part1);
}

async function loadAlphabetIPAData() {
    if (alphabetIpaLoaded) return;
    const [part1] = await loadExploreDataFiles_();
    const assets = part1?.explore_assets || {};
    if (!Array.isArray(assets.alphabet) || !Array.isArray(assets.ipa)) {
        throw new Error('Part 1 chưa có dữ liệu Alphabet/IPA tích hợp.');
    }
    ALPHABET_DATA = assets.alphabet;
    IPA_DATA = assets.ipa;
    alphabetIpaLoaded = true;
}

async function openAlphabetIPA() {
    stopSpeaking();
    activeTopicId = null; activeExamContext = null; activeRoadmapContext = null; pendingTopicQuiz = null;
    inAlphaIpaFlow = true;
    inMiniGameFlow = false;
    updateNavTabs("1. Alphabet & IPA", "🔤", null);
    showLoadingOverlay("Đang tải bảng chữ cái & ngữ âm...");
    try {
        await loadAlphabetIPAData();
        let phonicsCount = 0;
        try {
            const flat = await fetchAllQuestionsFlat();
            phonicsCount = flat.filter(q => Math.floor(Number(q.sub_topic)) === 1).length;
        } catch (e) {}
        hideLoadingOverlay();
        renderAlphaIPAMenu(phonicsCount);
    } catch (err) {
        hideLoadingOverlay();
        alert('Không tải được dữ liệu Alphabet & IPA: ' + err.message);
    }
}

// Màn hình chọn 1 trong 3 mục nhỏ — dùng ĐÚNG khung "view-lecture" chuẩn (đồng bộ với mọi chuyên mục khác),
// chỉ khác ở chỗ 3 nút bấm dẫn sang 3 màn hình riêng (Alphabet, IPA, Phonics Matcher) thay vì bốc câu hỏi.
function renderAlphaIPAMenu(phonicsCount = 0) {
    document.getElementById('lecture-title').textContent = '1. Alphabet & IPA';
    document.getElementById('lecture-content').textContent = 'Chào con, đây là góc làm quen với bảng chữ cái và ngữ âm tiếng Anh! Con hãy chọn 1 mục nhỏ bên dưới để bắt đầu nhé.';
    document.getElementById('view-lecture').dataset.audioText = 'Chào con, đây là góc làm quen với bảng chữ cái và ngữ âm tiếng Anh! Con hãy chọn 1 mục nhỏ bên dưới để bắt đầu nhé.';

    const items = [
        { label: 'Alphabet (A-Z)', count: '26 chữ', action: "openAlphabetMenu(0)", style: SUBTOPIC_PALETTES[0] },
        { label: 'Bảng ngữ âm IPA', count: '44 âm', action: "openIPAMenu(0)", style: SUBTOPIC_PALETTES[1] },
        { label: 'Phonics Matcher', count: `${phonicsCount} câu`, action: "openPhonicsMatcher()", style: SUBTOPIC_PALETTES[2] }
    ];
    document.getElementById('lecture-subtopics-list').innerHTML = items.map((it, idx) => `
        <button onclick="${it.action}" class="p-3 ${it.style.card} border-2 rounded-xl font-bold text-left transition-all flex items-center justify-between shadow-sm pastel-btn">
            <span class="text-sm md:text-base leading-snug"><strong class="${it.style.num} mr-1.5">${idx + 1}.</strong> ${escapeHtml(it.label)}</span>
            <span class="text-xs font-extrabold ${it.style.badge} px-2.5 py-0.5 rounded-full border shrink-0 ml-1.5 shadow-inner">${it.count}</span>
        </button>`).join('');
    setSubtopicGridColumns(items.length);

    // Không có khái niệm "học trộn tất cả" ở đây vì 1.1/1.2 là bảng tra cứu tĩnh, 1.3 mới là luyện tập thật
    document.getElementById('wrap-mix-all-subtopics').classList.add('hidden');

    updateNavTabs("1. Alphabet & IPA", "🔤", null);
    switchAppView('view-lecture');
}

// ---------- 1.1 ALPHABET A-Z ----------
function openAlphabetMenu(index = 0) {
    stopSpeaking();
    inAlphaIpaFlow = true;
    if (index < 0) index = 0;
    if (index >= ALPHABET_DATA.length) index = ALPHABET_DATA.length - 1;
    currentAlphabetIndex = index;
    updateNavTabs("1. Alphabet & IPA", "🔤", "Alphabet A-Z");
    switchAppView('view-alphabet');

    const item = ALPHABET_DATA[index];
    const keyboardHtml = ALPHABET_DATA.map((alpha, idx) => {
        const isActive = idx === currentAlphabetIndex;
        return `<button onclick="openAlphabetMenu(${idx})" class="pastel-btn flex flex-col items-center justify-center rounded-xl p-1.5 shadow-sm cursor-pointer ${isActive ? 'bg-pink-500 text-white border-2 border-pink-600 scale-105 ring-2 ring-pink-200' : 'bg-white text-gray-700 border border-gray-200 hover:bg-pink-50 hover:border-pink-300'} min-w-[52px] min-h-[52px]">
            <span class="text-base font-black">${alpha.letter}</span>
            <span class="font-bold ${isActive ? 'text-white' : 'text-pink-600'} text-xs md:text-sm">${alpha.ipaName}</span>
        </button>`;
    }).join('');

    const wordCard = (w, idx) => `
        <div onclick="speakAlphaWord(${index},${idx})" class="card-hover bg-white border-2 border-fuchsia-300 hover:border-fuchsia-500 rounded-xl p-2.5 flex flex-col items-center justify-center cursor-pointer shadow-sm">
            <div class="text-3xl mb-1">${w.emoji}</div>
            <div class="flex items-center gap-1"><span class="text-sm font-black text-violet-800">${escapeHtml(w.en)}</span><span class="text-[9px] px-1.5 py-0.2 rounded bg-fuchsia-100 text-fuchsia-700 font-bold">${w.pos || ''}</span></div>
            <div class="text-fuchsia-600 text-base mt-0.5">${w.ipa}</div>
            <div class="text-xs font-extrabold text-gray-600 my-0.5">${escapeHtml(w.vi)}</div>
            <div class="text-[10px] font-bold text-gray-400 mb-1.5">"${escapeHtml(w.ex || '')}"</div>
            <span class="bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-200 text-[9px] font-black px-2 py-0.5 rounded-lg">🔊 Listen</span>
        </div>`;

    document.getElementById('alphaipa-content').innerHTML = `
        <div class="w-full max-w-4xl flex flex-col items-center">
            <div class="mb-2 text-center">
                <h2 class="text-lg md:text-xl font-black text-pink-600 mb-0.5">🔤 ENGLISH ALPHABET & PHONICS (A-Z)</h2>
                <p class="text-xs font-bold text-gray-500">Bấm vào chữ cái hoặc từ mẫu để nghe phát âm:</p>
                <button onclick="speakAlphabetLetter(${index})" class="pastel-btn mt-1.5 bg-pink-100 hover:bg-pink-200 text-pink-700 border border-pink-300 font-extrabold px-3.5 py-1 rounded-xl text-xs flex items-center justify-center gap-1 mx-auto shadow-sm cursor-pointer">
                    <i class="fa-solid fa-volume-high"></i><span>Listen to Letter ${item.letter}</span>
                </button>
            </div>
            <div class="bg-pink-50/60 border-2 border-dashed border-pink-300 rounded-2xl p-3 md:p-3.5 w-full mb-3 shadow-sm">
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 items-stretch">
                    <div onclick="speakAlphabetLetter(${index})" class="card-hover bg-white border-2 border-pink-400 rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer shadow-sm bg-gradient-to-b from-white to-pink-50">
                        <div class="text-5xl md:text-6xl font-black text-pink-600 mb-1">${item.name}</div>
                        <div class="text-xs font-extrabold text-gray-600 mb-2">Cách đọc: <b class="text-purple-600 text-lg">${item.ipaName}</b></div>
                        <span class="bg-pink-100 text-pink-700 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-pink-200">👆 Tap to Listen</span>
                    </div>
                    ${wordCard(item.word1, 1)}${wordCard(item.word2, 2)}${wordCard(item.word3, 3)}
                </div>
            </div>
            <div class="bg-white border border-gray-200 rounded-2xl p-2.5 w-full shadow-inner mb-2.5">
                <div class="flex flex-wrap items-center justify-center gap-1">${keyboardHtml}</div>
            </div>
            <div class="flex items-center justify-center space-x-3 mt-1">
                <button onclick="openAlphabetMenu(${index - 1})" class="pastel-btn bg-sky-50 hover:bg-sky-100 text-sky-600 border-2 border-sky-300 font-black text-xs md:text-sm px-4 py-2 rounded-xl shadow-sm flex items-center space-x-1 cursor-pointer ${index <= 0 ? 'opacity-40 pointer-events-none' : ''}"><i class="fa-solid fa-arrow-left"></i><span>Previous</span></button>
                <button onclick="openPhonicsMatcher()" class="pastel-btn bg-violet-200 hover:bg-violet-300 text-violet-800 border-2 border-violet-300 font-black text-xs md:text-sm px-5 py-2 rounded-xl shadow-sm flex items-center gap-1.5 cursor-pointer"><span>🎯 Phonics Quiz</span></button>
                <button onclick="openAlphabetMenu(${index + 1})" class="pastel-btn bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white font-black text-xs md:text-sm px-5 py-2 rounded-xl shadow-sm flex items-center space-x-1 cursor-pointer ${index >= ALPHABET_DATA.length - 1 ? 'opacity-40 pointer-events-none' : ''}"><span>Next</span><i class="fa-solid fa-arrow-right"></i></button>
            </div>
        </div>`;
    speakAlphabetLetter(index);
}
function speakAlphabetLetter(index) { const item = ALPHABET_DATA[index]; if (item) speakEnglish(item.letter); }
function speakAlphaWord(index, wordNum) { const item = ALPHABET_DATA[index]; const w = item['word' + wordNum]; if (w) speakEnglish(w.en); }

// ---------- 1.2 IPA 44 SOUNDS ----------
function openIPAMenu(index = 0) {
    stopSpeaking();
    inAlphaIpaFlow = true;
    if (index < 0) index = 0;
    if (index >= IPA_DATA.length) index = IPA_DATA.length - 1;
    currentIPAIndex = index;
    updateNavTabs("1. Alphabet & IPA", "🔤", "Bảng ngữ âm IPA (44 âm)");
    switchAppView('view-alphabet');

    const item = IPA_DATA[currentIPAIndex];
    const soundButtonsHtml = IPA_DATA.map((snd, idx) => {
        const isActive = idx === currentIPAIndex;
        let badgeColor = isActive ? 'bg-pink-600 text-white border-pink-700' : 'bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100';
        if (snd.type === 'vowel_di') badgeColor = isActive ? 'bg-purple-600 text-white border-purple-700' : 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100';
        else if (snd.type && snd.type.startsWith('consonant')) badgeColor = isActive ? 'bg-fuchsia-600 text-white border-fuchsia-700' : 'bg-fuchsia-50 text-violet-700 border-fuchsia-200 hover:bg-fuchsia-100';
        return `<button onclick="openIPAMenu(${idx})" class="pastel-btn flex flex-col items-center justify-center rounded-xl p-1 shadow-sm border ${badgeColor} min-w-[50px] min-h-[46px] cursor-pointer ${isActive ? 'scale-105 ring-2 ring-pink-300 font-black' : ''}">
            <span class="text-base md:text-lg font-black">${snd.ipa}</span>
            <span class="text-[8px] font-bold opacity-80 line-clamp-1">${(snd.name || '').split(' ')[0]}</span>
        </button>`;
    }).join('');

    const examplesHtml = (item.words || []).map((w, wIdx) => `
        <div onclick="speakIPAExampleWord(${currentIPAIndex},${wIdx})" class="card-hover bg-white border-2 border-fuchsia-300 hover:border-fuchsia-500 rounded-xl p-2.5 flex flex-col items-center justify-center cursor-pointer shadow-sm text-center">
            <div class="text-3xl mb-1">${w.emoji}</div>
            <div class="flex items-center gap-1"><span class="text-sm md:text-base font-black text-violet-800">${escapeHtml(w.word)}</span><span class="text-[9px] px-1.5 py-0.2 rounded bg-fuchsia-100 text-fuchsia-700 font-bold">${w.pos || ''}</span></div>
            <div class="text-fuchsia-600 text-sm md:text-base font-bold my-0.5">${w.ipa}</div>
            <div class="text-xs font-extrabold text-gray-700">${escapeHtml(w.vi)}</div>
            <div class="text-[10px] font-bold text-gray-400 mt-1 italic">"${escapeHtml(w.ex || '')}"</div>
            <span class="mt-1.5 bg-fuchsia-50 hover:bg-fuchsia-100 text-fuchsia-700 border border-fuchsia-200 text-[9px] font-black px-2.5 py-0.5 rounded-lg">🔊 Listen Word</span>
        </div>`).join('');

    let typeTag = 'Nguyên âm đơn (Monophthong)', typeBg = 'bg-pink-100 text-pink-700 border-pink-300';
    if (item.type === 'vowel_di') { typeTag = 'Nguyên âm đôi (Diphthong)'; typeBg = 'bg-purple-100 text-purple-700 border-purple-300'; }
    else if (item.type === 'consonant_unvoiced') { typeTag = 'Phụ âm vô thanh (Voiceless)'; typeBg = 'bg-violet-100 text-violet-700 border-violet-300'; }
    else if (item.type === 'consonant_voiced') { typeTag = 'Phụ âm hữu thanh (Voiced)'; typeBg = 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-300'; }

    document.getElementById('alphaipa-content').innerHTML = `
        <div class="w-full max-w-5xl flex flex-col items-center">
            <div class="mb-2 text-center w-full">
                <div class="flex items-center justify-between flex-wrap gap-1 mb-1">
                    <span class="text-xs font-black bg-pink-100 text-pink-700 px-3 py-1 rounded-xl shadow-sm">Âm ${currentIPAIndex + 1} / ${IPA_DATA.length} IPA</span>
                    <h2 class="text-base md:text-xl font-black text-pink-600 flex items-center justify-center gap-1.5"><span>🗣️</span><span>BẢNG PHIÊN ÂM QUỐC TẾ IPA</span><span>🎙️</span></h2>
                    <button onclick="openPhonicsMatcher()" class="pastel-btn bg-violet-200 hover:bg-violet-300 text-violet-800 border-2 border-violet-300 text-xs font-black px-3.5 py-1 rounded-xl shadow-sm flex items-center gap-1 cursor-pointer"><span>🎯 IPA Quiz</span></button>
                </div>
                <p class="text-xs font-bold text-gray-500">Bấm vào bất kỳ âm IPA nào để nghe phát âm chuẩn và xem hướng dẫn chi tiết:</p>
            </div>
            <div class="bg-gradient-to-r from-pink-50/80 via-fuchsia-50/80 to-violet-50/80 border-2 border-dashed border-pink-300 rounded-2xl p-3 md:p-4 w-full mb-3 shadow-sm">
                <div class="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
                    <div class="md:col-span-5 bg-white/95 rounded-2xl p-3 border border-pink-200 shadow-sm flex flex-col items-center justify-between text-center">
                        <div>
                            <span class="text-[10px] md:text-xs font-black uppercase px-2.5 py-0.5 rounded-full border ${typeBg} inline-block mb-1.5">${typeTag}</span>
                            <div onclick="speakIPASound(${currentIPAIndex})" class="cursor-pointer group">
                                <div class="text-5xl md:text-6xl font-black text-pink-600 drop-shadow-sm group-hover:scale-105 transition transform">${item.ipa}</div>
                                <div class="text-xs md:text-sm font-black text-purple-700 mt-1">${escapeHtml(item.name)}</div>
                            </div>
                        </div>
                        <div class="my-2.5 bg-gradient-to-br from-pink-50/80 to-violet-50/80 border border-violet-200 rounded-xl p-2.5 text-left w-full shadow-inner">
                            <div class="text-[11px] font-black text-violet-700 uppercase tracking-wide flex items-center gap-1 mb-1"><i class="fa-solid fa-lightbulb text-fuchsia-500"></i><span>Hướng dẫn phát âm chuẩn:</span></div>
                            <p class="text-xs font-bold text-gray-700 leading-relaxed">${escapeHtml(item.guide || '')}</p>
                        </div>
                        <div class="flex items-center justify-center gap-2 w-full mt-auto">
                            <button onclick="speakIPASound(${currentIPAIndex})" class="pastel-btn flex-1 bg-pink-500 hover:bg-pink-600 text-white font-black text-xs py-2 px-3 rounded-xl shadow-md flex items-center justify-center gap-1.5 cursor-pointer"><i class="fa-solid fa-volume-high"></i><span>Nghe âm ${item.ipa}</span></button>
                            <button onclick="speakIPAGuideVietnamese(${currentIPAIndex})" class="pastel-btn bg-purple-100 hover:bg-purple-200 text-purple-700 border border-purple-300 font-black text-xs py-2 px-2.5 rounded-xl shadow-sm flex items-center justify-center gap-1 cursor-pointer"><i class="fa-solid fa-language"></i><span>Đọc hướng dẫn</span></button>
                        </div>
                    </div>
                    <div class="md:col-span-7 flex flex-col justify-between">
                        <div class="text-left mb-1.5 flex items-center justify-between">
                            <span class="text-xs font-black text-violet-800 uppercase tracking-wider flex items-center gap-1"><i class="fa-solid fa-star text-fuchsia-400"></i><span>3 VÍ DỤ TỪ VỰNG CHUẨN CỦA ÂM ${item.ipa}:</span></span>
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1 items-stretch">${examplesHtml}</div>
                        <div class="mt-2 text-center text-[11px] font-bold text-gray-400">👆 Chạm vào từng thẻ để nghe phát âm từ vựng và câu ví dụ sinh động!</div>
                    </div>
                </div>
            </div>
            <div class="bg-white border border-gray-200 rounded-2xl p-2.5 w-full shadow-inner mb-2.5">
                <div class="flex flex-wrap items-center justify-center gap-1">${soundButtonsHtml}</div>
            </div>
            <div class="flex items-center justify-center space-x-3">
                <button onclick="openIPAMenu(${currentIPAIndex - 1})" class="pastel-btn bg-sky-50 hover:bg-sky-100 text-sky-600 border-2 border-sky-300 font-black text-sm px-5 py-2 rounded-xl shadow-sm flex items-center space-x-1.5 cursor-pointer ${currentIPAIndex <= 0 ? 'opacity-40 pointer-events-none' : ''}"><i class="fa-solid fa-arrow-left"></i><span>Previous Sound</span></button>
                <button onclick="openIPAMenu(${currentIPAIndex + 1})" class="pastel-btn bg-violet-200 hover:bg-violet-300 text-violet-800 border-2 border-violet-300 font-black text-sm px-6 py-2 rounded-xl shadow-md flex items-center space-x-1.5 cursor-pointer ${currentIPAIndex >= IPA_DATA.length - 1 ? 'opacity-40 pointer-events-none' : ''}"><span>Next Sound</span><i class="fa-solid fa-arrow-right"></i></button>
            </div>
        </div>`;
    speakIPASound(currentIPAIndex);
}
function speakIPASound(index) { const item = IPA_DATA[index]; if (item) speakEnglish(item.soundWord || item.ipa); }
function speakIPAGuideVietnamese(index) { const item = IPA_DATA[index]; if (item) speakVietnamese(item.guide || ''); }
function speakIPAExampleWord(index, wordIdx) { const item = IPA_DATA[index]; const w = item.words && item.words[wordIdx]; if (w) speakEnglish(w.word); }

// ---------- 1.3 PHONICS MATCHER (dùng đúng ngân hàng câu hỏi thật, chuyên mục 1) ----------
function openPhonicsMatcher() {
    stopSpeaking();
    showLoadingOverlay("Đang tải Phonics Matcher...");
    fetchAllQuestionsFlat().then(flat => {
        hideLoadingOverlay();
        const questions = shuffleArray(flat.filter(q => Math.floor(Number(q.sub_topic)) === 1));
        if (!questions.length) return alert('Đang cập nhật thêm câu hỏi cho Phonics Matcher, bé quay lại sau nhé!');
        activeTopicId = 1;
        pendingTopicQuiz = null; activeExamContext = null; activeRoadmapContext = null;
        practiceCycleRawPool = [...questions];
        updateNavTabs("1. Alphabet & IPA", "🔤", "1.3 Phonics Matcher");
        startTopicQuiz(1, '1.3 Phonics Matcher', questions, '1.3 Phonics Matcher');
    }).catch(err => { hideLoadingOverlay(); alert('Lỗi tải Phonics Matcher: ' + err.message); });
}

// ==========================================
// ĐIỀU HƯỚNG VIEW & BREADCRUMB
// ==========================================
let currentMainTab = 'discover';
let headerLevel2ClickHandler = null;
let headerLevel3ClickHandler = null;
let headerLevel4ClickHandler = null;

const MAIN_HEADER_PATH_ = {
    discover:  { title: 'Explore',    icon: '🧭' },
    lessons:   { title: 'Lessons',    icon: '📖' },
    exercises: { title: 'Exercises',  icon: '✏️' },
    review:    { title: 'Review',     icon: '🧠' },
    exams:     { title: 'Exams',      icon: '🏆' },
    games:     { title: 'Mini Games', icon: '🎮' }
};

function onHeaderLevel2Click() {
    if (typeof headerLevel2ClickHandler === 'function') headerLevel2ClickHandler();
}
function onHeaderLevel3Click() {
    if (typeof headerLevel3ClickHandler === 'function') headerLevel3ClickHandler();
}
function onHeaderLevel4Click() {
    if (typeof headerLevel4ClickHandler === 'function') headerLevel4ClickHandler();
}

function normalizeHeaderLabel_(value) {
    return String(value || '')
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, ' ')
        .trim();
}

function isSameAsMainHeader_(tabName, value) {
    const n = normalizeHeaderLabel_(value);
    const aliases = {
        discover:  ['explore', 'kham pha'],
        lessons:   ['lessons', 'bai hoc'],
        exercises: ['exercises', 'bai tap', 'ban do tien trinh tuan', 'tien trinh tuan'],
        review:    ['review', 'on tap', '11 practice play', 'practice play'],
        exams:     ['exams', 'tests', 'de thi', '12 dau truong de thi', 'dau truong de thi'],
        games:     ['mini games', 'mini game', 'tro choi', 'trung tam mini game']
    };
    return (aliases[tabName] || []).some(a => n === a || n.endsWith(' ' + a));
}

/**
 * Header path chuẩn:
 * Home -> Main tab -> Module/section -> Item/detail.
 * Giữ API cũ updateNavTabs(...) để không phải sửa hàng loạt engine hiện tại.
 */
function updateNavTabs(level2Title, level2Icon, level3Title, level4Title, level3ClickHandler) {
    const tab2 = document.getElementById('header-level2-tab');
    const tab3 = document.getElementById('header-level3-tab');
    const tab4 = document.getElementById('header-level4-tab');
    const homeBtn = document.getElementById('btn-header-home');
    if (!tab2 || !tab3 || !homeBtn) return;

    const main = MAIN_HEADER_PATH_[currentMainTab] || MAIN_HEADER_PATH_.discover;
    const nested = [];
    const originalLevel2Kept = !!level2Title && !isSameAsMainHeader_(currentMainTab, level2Title);
    if (originalLevel2Kept) nested.push({ title: level2Title, source: 'level2' });
    if (level3Title) nested.push({ title: level3Title, source: 'level3' });
    if (level4Title) nested.push({ title: level4Title, source: 'level4' });

    // Tối đa 2 cấp con vì header hiện có 3 ô sau Home.
    // Nếu engine truyền sâu hơn, gộp phần sâu nhất vào ô cuối để vẫn giữ đúng lưu đồ.
    if (nested.length > 2) {
        const tail = nested.slice(1).map(x => x.title).join(' · ');
        nested.splice(1, nested.length - 1, { title: tail, source: 'combined' });
    }

    document.getElementById('header-level2-title').textContent = main.title;
    document.getElementById('header-level2-icon').textContent = main.icon;
    tab2.classList.remove('hidden');
    tab2.classList.add('flex');
    homeBtn.classList.add('opacity-80', 'hover:opacity-100');

    const mainBtn = tab2.querySelector('button');
    headerLevel2ClickHandler = () => openMainTab(currentMainTab);
    if (mainBtn) {
        mainBtn.onclick = onHeaderLevel2Click;
        mainBtn.title = main.title;
    }

    headerLevel3ClickHandler = null;
    headerLevel4ClickHandler = null;

    if (nested[0]) {
        document.getElementById('header-level3-title').textContent = nested[0].title;
        tab3.classList.remove('hidden');
        tab3.classList.add('flex');

        // Breadcrumb cấp chuyên mục phải có đích quay về CỐ ĐỊNH theo chính tên module.
        // Không phụ thuộc activeTopicId vì state này có thể bị reset khi đổi view / quiz.
        const moduleTitle = String(nested[0].title || '').trim();
        const resolveModuleHub = () => {
            if (/^1\.\s*Alphabet\s*&\s*IPA/i.test(moduleTitle)) return openAlphabetIPA;
            if (/^2\.\s*Vocabulary/i.test(moduleTitle)) return openVocabularyHub;
            if (/^3\.\s*Remove Letter/i.test(moduleTitle)) return () => openSharedVocabActivityHub_(3);
            if (/^4\.\s*Fill Missing/i.test(moduleTitle)) return () => openSharedVocabActivityHub_(4);
            if (/^5\.\s*Odd One Out/i.test(moduleTitle)) return openOddOneOutLevelHub_;
            if (/^(6\.\s*)?Reading Comprehension/i.test(moduleTitle)) return openReadingComprehensionHub_;
            if (/^7\.\s*Sentence Builder/i.test(moduleTitle)) return () => openExploreLevelHub_(7);
            if (/^8\.\s*Fill Sentence/i.test(moduleTitle)) return () => openExploreLevelHub_(8);
            if (/^9\.\s*Q&A Dialogues/i.test(moduleTitle)) return () => openExploreLevelHub_(9);
            return null;
        };
        const explicitModuleHub = nested[0].source === 'level2' ? resolveModuleHub() : null;
        headerLevel3ClickHandler = explicitModuleHub || (
            nested[0].source === 'level3' && typeof level3ClickHandler === 'function'
                ? level3ClickHandler
                : returnToTopicLecture
        );
    } else {
        tab3.classList.add('hidden');
        tab3.classList.remove('flex');
    }

    const level3Btn = document.getElementById('header-level3-btn');
    if (level3Btn) {
        const clickable = typeof headerLevel3ClickHandler === 'function';
        level3Btn.classList.toggle('cursor-pointer', clickable);
        level3Btn.classList.toggle('hover:bg-purple-100', clickable);
        level3Btn.classList.toggle('cursor-default', !clickable);
    }

    if (tab4 && nested[1]) {
        document.getElementById('header-level4-title').textContent = nested[1].title;
        tab4.classList.remove('hidden');
        tab4.classList.add('flex');
        // Handler cũ của level3 phải đi theo đúng breadcrumb level3 gốc sau khi đã chèn Main tab.
        if ((nested[1].source === 'level3' || nested[1].source === 'combined') && typeof level3ClickHandler === 'function') {
            headerLevel4ClickHandler = level3ClickHandler;
        }
        const level4Box = tab4.querySelector('div');
        if (level4Box) {
            level4Box.onclick = onHeaderLevel4Click;
            level4Box.classList.toggle('cursor-pointer', !!headerLevel4ClickHandler);
            level4Box.classList.toggle('hover:bg-amber-100', !!headerLevel4ClickHandler);
        }
    } else if (tab4) {
        tab4.classList.add('hidden');
        tab4.classList.remove('flex');
    }
}

function returnToTopicLecture() {
    stopSpeaking();
    clearInterval(quizTimerInterval);

    // Các module Explore có hub riêng phải quay lại đúng hub của chính nó.
    // Không dùng fallback chung vì các module 2-9 không chia sẻ cùng một lecture state.
    const topicId = Number(activeTopicId);
    if (topicId === 1) return openAlphabetIPA();
    if (topicId === 2) return openVocabularyHub();
    if (topicId === 3 || topicId === 4) return openSharedVocabActivityHub_(topicId);
    if (topicId === 5) return openOddOneOutLevelHub_();
    if (topicId === 6) return openReadingComprehensionHub_();
    if (topicId === 7 || topicId === 8 || topicId === 9) return openExploreLevelHub_(topicId);

    if (activeExamContext) {
        openExamHub();
    } else if (activeRoadmapContext) {
        openRoadmap();
    } else if (pendingTopicQuiz) {
        // Render lại đúng danh sách mục nhỏ CẤP 1 (không phải màn chọn Nhóm Kép cấp 3 vừa hiện trước đó)
        showLectureAndSubtopics(pendingTopicQuiz.topicNum, pendingTopicQuiz.topicName, { questions: pendingTopicQuiz.questions });
    } else if (inAlphaIpaFlow) {
        // Đang duyệt Alphabet A-Z hoặc Bảng IPA (không phải quiz) -> quay về đúng menu 3 lựa chọn
        openAlphabetIPA();
    } else if (inMiniGameFlow) {
        // Đang ở Trung tâm Mini Game hoặc đang chơi 1 game cụ thể -> quay về lưới 12 game
        openMiniGameHub();
    }
}

function switchAppView(viewId) {
    stopSpeaking();
    ['view-dashboard-grid', 'view-alphabet', 'view-lecture', 'view-quiz', 'view-roadmap', 'view-minigame-hub', 'view-game-play', 'view-exam-hub', 'view-result'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        if (id === viewId) el.classList.remove('hidden');
        else el.classList.add('hidden');
    });
}

function goHome() {
    stopSpeaking();
    clearInterval(quizTimerInterval);
    inAlphaIpaFlow = false;
    inMiniGameFlow = false;
    activeVocabularyHubTopic = null;
    activeVocabularyStudyMode = 'flashcard';
    updateNavTabs(null, null, null);
    switchAppView('view-dashboard-grid');
}

// ==========================================
// PHÂN QUYỀN TÀI KHOẢN / PREMIUM
// ==========================================
function normalizeAccountValue(value) {
    return String(value ?? '').trim().toLowerCase();
}

function getUserField(user, names, fallback = '') {
    if (!user) return fallback;
    for (const name of names) {
        if (user[name] !== undefined && user[name] !== null && user[name] !== '') return user[name];
    }
    return fallback;
}

function parseTrialExpiryDate(value) {
    if (!value) return null;
    if (value instanceof Date && !isNaN(value)) return value;
    const raw = String(value).trim();
    if (!raw) return null;
    // Ưu tiên định dạng Việt Nam dd-mm-yy / dd-mm-yyyy để tránh JS hiểu nhầm thành mm-dd-yy.
    const m = raw.match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{2}|\d{4})$/);
    if (m) {
        let year = Number(m[3]);
        if (year < 100) year += 2000;
        const d = new Date(year, Number(m[2]) - 1, Number(m[1]), 23, 59, 59, 999);
        return isNaN(d) ? null : d;
    }
    const direct = new Date(raw);
    return isNaN(direct) ? null : direct;
}

function getPremiumAccessState() {
    const user = currentUser;
    if (user && user.sessionPending) return { allowed: false, reason: 'session_pending' };
    if (!user || user.isGuest) return { allowed: false, reason: 'guest' };
    const role = normalizeAccountValue(getUserField(user, ['vaiTro', 'VaiTro', 'role'], 'student'));
    let accountType = normalizeAccountValue(getUserField(user, ['loaiTaiKhoan', 'LoaiTaiKhoan', 'accountType'], 'regular'));
    if (role === 'admin') return { allowed: true, reason: 'admin' };

    // Chỉ LoaiTaiKhoan quyết định quyền Premium: regular / trial / vip.
    if (accountType === 'vip') {
        const expiry = parseTrialExpiryDate(getUserField(user, ['hanVIP', 'HanVIP', 'vipExpiry', 'vipEnd'], ''));
        if (expiry && Date.now() <= expiry.getTime()) return { allowed: true, reason: 'vip', expiry };
    }
    if (accountType === 'trial') {
        const expiry = parseTrialExpiryDate(getUserField(user, ['hanDungThu', 'HanDungThu', 'trialExpiry', 'trialEnd'], ''));
        if (expiry && Date.now() <= expiry.getTime()) return { allowed: true, reason: 'trial', expiry };
    }
    // Backend sẽ tự hạ trial/vip hết hạn về regular khi login/listAccounts.
    return { allowed: false, reason: 'regular' };
}

function ensurePremiumAccessModal() {
    let modal = document.getElementById('modal-premium-access');
    if (modal) return modal;
    modal = document.createElement('div');
    modal.id = 'modal-premium-access';
    modal.className = 'hidden fixed inset-0 z-[120] bg-slate-900/45 backdrop-blur-sm flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="w-full max-w-sm bg-white rounded-[30px] border-4 border-pink-200 shadow-2xl overflow-hidden animate-[fadeInUp_0.2s_ease-out]">
            <div class="bg-gradient-to-br from-pink-50 via-fuchsia-50 to-purple-50 px-5 pt-5 pb-4 text-center">
                <div class="text-6xl mb-1 swaying">🐰</div>
                <h3 id="premium-popup-title" class="text-lg font-black text-purple-700">Khu vực đặc biệt</h3>
                <p id="premium-popup-message" class="mt-2 text-sm font-bold text-gray-600 leading-relaxed"></p>
                <div class="mt-3 rounded-2xl bg-white/80 border border-pink-200 px-3 py-2 text-[11px] font-extrabold text-pink-600">🌸 Các chuyên đề cơ bản vẫn học miễn phí bình thường nhé!</div>
            </div>
            <div id="premium-popup-actions" class="p-4 flex flex-col gap-2"></div>
        </div>`;
    document.body.appendChild(modal);
    return modal;
}

function closePremiumAccessPopup() {
    document.getElementById('modal-premium-access')?.classList.add('hidden');
}

function showPremiumAccessPopup(featureName = 'khu vực này', accessState = getPremiumAccessState()) {
    const modal = ensurePremiumAccessModal();
    const title = document.getElementById('premium-popup-title');
    const message = document.getElementById('premium-popup-message');
    const actions = document.getElementById('premium-popup-actions');

    title.textContent = featureName;
    if (accessState.reason === 'session_pending') {
        message.innerHTML = `Phiên đăng nhập của con vẫn được giữ trên thiết bị, nhưng hiện chưa xác thực lại được với máy chủ.<br>
            Hãy kiểm tra kết nối mạng rồi thử lại. Ứng dụng <strong>không tự đăng xuất</strong> và cũng <strong>không hạ về tài khoản Khách</strong>.`;
        actions.innerHTML = `
            <button onclick="closePremiumAccessPopup(); tryAutoLogin()" class="py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-black text-sm pastel-btn">Thử kết nối lại</button>
            <button onclick="closePremiumAccessPopup()" class="py-2 text-xs font-extrabold text-gray-400 hover:text-gray-600">Để sau nhé</button>`;
    } else {
        message.innerHTML = `Đây là <strong>${escapeHtml(featureName)}</strong> dành cho tài khoản <strong>Trial hoặc VIP</strong>.<br>
            Con có thể <strong>Sign in</strong> nếu đã có tài khoản hoặc <strong>Sign up</strong> để đăng ký nhé!<br>
            Các chuyên đề cơ bản vẫn học miễn phí bình thường.`;
        actions.innerHTML = `
            <div class="grid grid-cols-2 gap-2">
                <button onclick="closePremiumAccessPopup(); openAuthScreen('login')" class="py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black text-sm pastel-btn">Sign in</button>
                <button onclick="closePremiumAccessPopup(); openAuthScreen('register')" class="py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-violet-500 text-white font-black text-sm pastel-btn">Sign up</button>
            </div>
            <button onclick="closePremiumAccessPopup()" class="py-2 text-xs font-extrabold text-gray-400 hover:text-gray-600">Để sau nhé</button>`;
    }

    modal.classList.remove('hidden');
}
function requirePremiumAccess(featureName) {
    const state = getPremiumAccessState();
    if (state.allowed) return true;
    showPremiumAccessPopup(featureName, state);
    return false;
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
        currentUser = { ...result.student, isGuest: false, sessionPending: false, token: result.token };
        localStorage.setItem(SESSION_TOKEN_STORAGE_KEY, result.token);
        LEGACY_SESSION_TOKEN_KEYS.forEach(key => localStorage.removeItem(key));
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
        alert(`Đăng ký thành công! Mã ID của bé là: ${result.student.maHS}. Tài khoản Regular có thể học ngay các nội dung miễn phí nhé!`);
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

function createGuestUser() {
    return { name: 'Khách (Guest)', isGuest: true, sessionPending: false, tuanHienTai: 1, hoTen: 'Bé Khách', lop: '', maHS: 'KHACH', vaiTro: 'student', loaiTaiKhoan: 'regular', trangThai: 'Guest', hanDungThu: '' };
}

function getStoredSessionToken() {
    // Dọn dữ liệu định danh cũ: auth storage từ phiên bản này chỉ còn session token.
    localStorage.removeItem('tv1_mahs');
    const current = localStorage.getItem(SESSION_TOKEN_STORAGE_KEY);
    if (current) return current;
    for (const key of LEGACY_SESSION_TOKEN_KEYS) {
        const legacy = localStorage.getItem(key);
        if (legacy) {
            localStorage.setItem(SESSION_TOKEN_STORAGE_KEY, legacy);
            localStorage.removeItem(key);
            return legacy;
        }
    }
    return '';
}

function createPendingSessionUser(token) {
    return {
        isGuest: false,
        sessionPending: true,
        token: token || '',
        hoTen: 'Đang khôi phục phiên...',
        maHS: '',
        lop: '',
        vaiTro: 'student',
        role: 'student',
        loaiTaiKhoan: 'regular',
        tuanHienTai: 1
    };
}

function openAuthScreen(tab = 'login') {
    stopSpeaking();
    document.getElementById('screen-dashboard')?.classList.add('hidden');
    document.getElementById('screen-login')?.classList.remove('hidden');
    switchAuthTab(tab);
}

function closeAuthScreen() {
    if (!currentUser) currentUser = createGuestUser();
    document.getElementById('screen-login')?.classList.add('hidden');
    document.getElementById('screen-dashboard')?.classList.remove('hidden');
    updateUserInfoBox();
    goHome();
}

async function tryAutoLogin() {
    const token = getStoredSessionToken();

    // Không có token thì đây mới thật sự là khách.
    if (!token) {
        currentUser = createGuestUser();
        enterDashboard(true);
        return;
    }

    // Có token: tuyệt đối không hạ về Guest chỉ vì app vừa reload hoặc mạng đang lỗi.
    // Trong lúc chờ backend xác thực, quyền Admin/Premium đều bị khóa an toàn.
    currentUser = createPendingSessionUser(token);
    enterDashboard(true);
    showLoadingOverlay('Đang khôi phục phiên đăng nhập...');

    try {
        const res = await callAppsScript('restoreSession', { token });
        if (res.ok && res.student) {
            currentUser = { ...res.student, isGuest: false, sessionPending: false, token };
            enterDashboard(true);
            return;
        }

        // Backend đã trả lời được nhưng token không còn hợp lệ. Không xóa token tự động:
        // chỉ người dùng bấm Đăng xuất hoặc đăng nhập lại mới thay đổi phiên trên client.
        currentUser = createPendingSessionUser(token);
        currentUser.sessionInvalid = true;
        enterDashboard(true);
    } catch (e) {
        // Lỗi mạng/tạm thời: giữ nguyên token và trạng thái phiên chờ xác thực.
        currentUser = createPendingSessionUser(token);
        enterDashboard(true);
    } finally {
        hideLoadingOverlay();
    }
}

function logout() {
    const tokenToRevoke = currentUser && currentUser.token;
    currentUser = createGuestUser();
    localStorage.removeItem(SESSION_TOKEN_STORAGE_KEY);
    LEGACY_SESSION_TOKEN_KEYS.forEach(key => localStorage.removeItem(key));
    const mahsInput = document.getElementById('login-mahs');
    const mapinInput = document.getElementById('login-mapin');
    if (mahsInput) mahsInput.value = '';
    if (mapinInput) mapinInput.value = '';
    hideAuthError();
    enterDashboard(true);
    // Hủy token thật trên server (best-effort). Token persistent chỉ bị thu hồi khi người dùng chủ động đăng xuất.
    if (tokenToRevoke) {
        callAppsScript('logout', { token: tokenToRevoke }).catch(() => {});
    }
}

function handleGuestMode() {
    // Nếu thiết bị đã có persistent session thì không tự hạ phiên đó về Guest.
    // Muốn rời tài khoản thật sự phải bấm Đăng xuất.
    if (getStoredSessionToken()) {
        tryAutoLogin();
        return;
    }
    currentUser = createGuestUser();
    enterDashboard();
}

function enterDashboard(isSilent = false) {
    document.getElementById('screen-login')?.classList.add('hidden');
    document.getElementById('screen-dashboard')?.classList.remove('hidden');
    updateUserInfoBox();
    resetStars();
    renderDashboardGrid();
    renderExamHubGrid();
    goHome();
    if (!isSilent) {
        setTimeout(() => {
            if (currentUser && !currentUser.isGuest) {
                const template = GREETINGS_STUDENT[Math.floor(Math.random() * GREETINGS_STUDENT.length)];
                speakVietnamese(template.replace('{name}', currentUser.hoTen || 'Bé'), 0.96);
            } else {
                speakVietnamese(GREETINGS_GUEST[Math.floor(Math.random() * GREETINGS_GUEST.length)], 0.96);
            }
        }, 450);
    }
}

function updateUserInfoBox() {
    const box = document.getElementById('user-info-box');
    if (!box) return;
    if (currentUser && currentUser.sessionPending) {
        box.innerHTML = `
            <div class="flex items-center space-x-2">
                <div class="text-right">
                    <div class="text-purple-600 font-extrabold text-xs md:text-sm leading-tight">Phiên đăng nhập đang được giữ</div>
                    <div class="text-gray-400 font-bold text-[10px] leading-tight mt-0.5">Chờ xác thực lại với máy chủ</div>
                </div>
                <button onclick="tryAutoLogin()" title="Thử khôi phục phiên" class="w-8 h-8 flex items-center justify-center bg-purple-50 hover:bg-purple-100 text-purple-500 rounded-xl border border-purple-200 text-xs"><i class="fa-solid fa-rotate"></i></button>
                <button onclick="logout()" title="Đăng xuất" class="w-8 h-8 flex items-center justify-center bg-rose-100 hover:bg-rose-200 text-rose-500 rounded-xl border border-rose-200 text-xs"><i class="fa-solid fa-right-from-bracket"></i></button>
            </div>`;
        return;
    }
    if (currentUser && !currentUser.isGuest) {
        const role = normalizeAccountValue(getUserField(currentUser, ['vaiTro', 'VaiTro', 'role'], 'student'));
        const type = normalizeAccountValue(getUserField(currentUser, ['loaiTaiKhoan', 'LoaiTaiKhoan', 'accountType'], 'regular'));
        const badge = role === 'admin' ? 'ADMIN' : type.toUpperCase();
        const badgeClass = role === 'admin' ? 'bg-amber-100 text-amber-700 border-amber-200' : (type === 'vip' ? 'bg-purple-100 text-purple-700 border-purple-200' : (type === 'trial' ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-sky-50 text-sky-600 border-sky-200'));
        box.innerHTML = `
            <div class="flex items-center space-x-2">
                <div class="text-right">
                    ${role === 'admin' ? `
                    <div class="text-pink-600 font-extrabold text-sm md:text-base leading-tight">${escapeHtml(currentUser.hoTen || '')}</div>
                    <div class="text-purple-500 font-bold text-[10px]">ADMIN | Quản trị viên</div>
                    ` : `
                    <div class="text-pink-600 font-extrabold text-xs md:text-sm leading-tight">${escapeHtml(currentUser.hoTen || '')}</div>
                    <div class="text-gray-500 font-bold text-[10px] leading-tight mt-0.5">${badge} · ID: ${escapeHtml(currentUser.maHS || '')}</div>
                    `}
                </div>
                ${role === 'admin' ? `<button onclick="openAccountManager()" title="Quản lý tài khoản" class="relative h-9 px-3 flex items-center gap-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl border border-purple-200 text-xs font-black shadow-sm pastel-btn whitespace-nowrap"><i class="fa-solid fa-users-gear"></i><span>Quản lý</span></button>` : ''}
                <button onclick="logout()" title="Đăng xuất" class="w-8 h-8 flex items-center justify-center bg-rose-100 hover:bg-rose-200 text-rose-500 rounded-xl border border-rose-200 text-xs transition-shadow duration-200 hover:shadow-[0_0_12px_rgba(244,63,94,0.55)]"><i class="fa-solid fa-right-from-bracket"></i></button>
            </div>`;
    } else {
        box.innerHTML = `
            <div class="flex items-center gap-1.5">
                <span class="text-amber-600 font-extrabold text-[11px] mr-0.5">Khách</span>
                <button onclick="openAuthScreen('login')" class="h-9 px-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[11px] font-black shadow-sm pastel-btn">Sign in</button>
                <button onclick="openAuthScreen('register')" class="h-9 px-3 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 text-[11px] font-black shadow-sm pastel-btn">Sign up</button>
            </div>`;
    }
}


// ==========================================
// QUẢN LÝ TÀI KHOẢN — chỉ Admin
// ==========================================
// Trước đây hàm này gửi lại nguyên PIN gốc (đọc từ localStorage) mỗi lần thao tác admin - nay chỉ gửi
// token đã có sẵn khi đăng nhập, server tự tra lại quyền admin từ token (xem requireAdmin bên Code.gs).
function getAdminAuthPayload(extra = {}) {
    return {
        token: (currentUser && currentUser.token) || getStoredSessionToken() || '',
        ...extra
    };
}

function ensureAccountManagerModal() {
    let modal = document.getElementById('modal-account-manager');
    if (modal) return modal;
    modal = document.createElement('div');
    modal.id = 'modal-account-manager';
    modal.className = 'hidden fixed inset-0 z-[120] bg-slate-900/55 backdrop-blur-sm flex items-center justify-center p-3';
    modal.innerHTML = `
        <div class="w-full max-w-5xl max-h-[92vh] bg-white rounded-[28px] border-2 border-pink-200 shadow-2xl overflow-hidden flex flex-col">
            <div class="px-4 md:px-5 py-3 bg-gradient-to-r from-pink-50 via-purple-50 to-pink-50 border-b border-pink-100 flex items-center justify-between gap-3">
                <div>
                    <div class="flex flex-wrap items-center gap-2 text-purple-700 font-black text-base md:text-lg">
                        <span>👥</span><span>Quản lý tài khoản</span>
                        <span id="account-manager-total" class="px-2.5 py-1 rounded-full bg-white border border-purple-200 text-purple-600 text-[10px] md:text-[11px] font-black shadow-sm">0 tài khoản</span>
                    </div>
                    <div class="text-[11px] text-gray-500 font-bold mt-0.5">Chuyển hạng tài khoản Regular / Trial / VIP. Trial có hạn 1 tháng, VIP có hạn 1 năm.</div>
                </div>
                <button onclick="closeAccountManager()" class="w-9 h-9 shrink-0 rounded-xl bg-white border border-pink-200 text-pink-500 hover:bg-pink-50 shadow-sm"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div id="account-manager-body" class="p-3 md:p-4 overflow-y-auto flex-1">
                <div class="py-10 text-center text-purple-500 font-black"><i class="fa-solid fa-spinner fa-spin mr-2"></i>Đang tải danh sách tài khoản...</div>
            </div>
            <div class="px-4 py-3 bg-pink-50/50 border-t border-pink-100 flex items-center justify-between gap-2">
                <span id="account-manager-status" class="text-[11px] font-bold text-gray-500"></span>
                <button onclick="loadAccountManager()" class="px-4 py-2 rounded-xl bg-white border border-purple-200 text-purple-700 font-black text-xs pastel-btn"><i class="fa-solid fa-rotate mr-1"></i>Làm mới</button>
            </div>
        </div>`;
    document.body.appendChild(modal);
    return modal;
}

function openAccountManager() {
    const role = normalizeAccountValue(getUserField(currentUser, ['vaiTro', 'VaiTro', 'role'], 'student'));
    if (role !== 'admin') return;
    const modal = ensureAccountManagerModal();
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    loadAccountManager();
}

function closeAccountManager() {
    const modal = document.getElementById('modal-account-manager');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function formatAccountDate(value) {
    if (!value) return '—';
    if (value instanceof Date) return value.toLocaleDateString('vi-VN');
    const s = String(value).trim();
    const m = s.match(/^(\d{1,2})[-\/]([0-9]{1,2})[-\/](\d{2,4})$/);
    if (m) return `${m[1].padStart(2,'0')}/${m[2].padStart(2,'0')}/${m[3]}`;
    const d = new Date(s);
    return isNaN(d.getTime()) ? s : d.toLocaleDateString('vi-VN');
}

async function loadAccountManager() {
    const body = document.getElementById('account-manager-body');
    const status = document.getElementById('account-manager-status');
    if (!body) return;
    body.innerHTML = '<div class="py-10 text-center text-purple-500 font-black"><i class="fa-solid fa-spinner fa-spin mr-2"></i>Đang tải danh sách tài khoản...</div>';
    if (status) status.textContent = '';
    try {
        const result = await callAppsScript('listAccounts', getAdminAuthPayload());
        if (!result.ok) throw new Error(result.error || 'Không tải được danh sách tài khoản.');
        const accounts = result.accounts || [];
        renderAccountManagerTable(accounts);
        const totalEl = document.getElementById('account-manager-total');
        if (totalEl) totalEl.textContent = `${accounts.length} tài khoản`;
        if (status) status.textContent = 'Regular: miễn phí • Trial: Premium 1 tháng • VIP: Premium 1 năm.';
    } catch (err) {
        body.innerHTML = `<div class="py-10 text-center text-rose-500 font-black">😿 ${escapeHtml(err.message || 'Không tải được danh sách tài khoản.')}</div>`;
    }
}

function getAccountTypeSelectClass(typeValue) {
    const type = String(typeValue || '').trim().toLowerCase();
    if (type === 'vip') return 'border-purple-300 bg-purple-50 text-purple-700';
    if (type === 'trial') return 'border-amber-300 bg-amber-50 text-amber-700';
    return 'border-sky-300 bg-sky-50 text-sky-700';
}

function paintAccountSelect(selectEl, kind) {
    if (!selectEl) return;
    const removable = [
        'border-emerald-300','bg-emerald-50','text-violet-700',
        'border-amber-300','bg-amber-50','text-amber-700',
        'border-rose-300','bg-rose-50','text-rose-700',
        'border-slate-200','bg-white','text-slate-700',
        'border-purple-300','bg-purple-50','text-purple-700',
        'border-sky-300','bg-sky-50','text-sky-700'
    ];
    selectEl.classList.remove(...removable);
    const classes = getAccountTypeSelectClass(selectEl.value).split(' ');
    selectEl.classList.add(...classes);
}


let accountManagerSort = { key: 'maHS', direction: 'asc' };
let accountManagerLastAccounts = [];

function normalizeSortText(value) {
    return String(value ?? '').trim().toLocaleLowerCase('vi');
}

function parseAccountSortDate(value) {
    if (!value) return 0;
    if (value instanceof Date && !isNaN(value.getTime())) return value.getTime();
    const s = String(value).trim();
    const m = s.match(/^(\d{1,2})[-\/](\d{1,2})[-\/](\d{2}|\d{4})$/);
    if (m) {
        let year = Number(m[3]);
        if (year < 100) year += 2000;
        const d = new Date(year, Number(m[2]) - 1, Number(m[1]));
        return isNaN(d.getTime()) ? 0 : d.getTime();
    }
    const d = new Date(s);
    return isNaN(d.getTime()) ? 0 : d.getTime();
}

function getAccountSortValue(acc, key) {
    switch (key) {
        case 'maHS': return normalizeSortText(acc.maHS);
        case 'hoTen': return normalizeSortText(acc.hoTen);
        case 'lop': return normalizeSortText(acc.lop);
        case 'loaiTaiKhoan': return normalizeSortText(acc.loaiTaiKhoan || 'regular');
        case 'hanDungThu': return parseAccountSortDate(acc.hanDungThu);
        case 'hanVIP': return parseAccountSortDate(acc.hanVIP);
        default: return '';
    }
}

function sortAccountManagerAccounts(accounts) {
    const { key, direction } = accountManagerSort;
    const factor = direction === 'desc' ? -1 : 1;
    return [...accounts].sort((a, b) => {
        const av = getAccountSortValue(a, key);
        const bv = getAccountSortValue(b, key);
        if (typeof av === 'number' && typeof bv === 'number') {
            if (av === bv) return 0;
            return (av < bv ? -1 : 1) * factor;
        }
        return String(av).localeCompare(String(bv), 'vi', { numeric: true, sensitivity: 'base' }) * factor;
    });
}

function accountSortIcon(key) {
    if (accountManagerSort.key !== key) return '<i class="fa-solid fa-sort text-purple-300 ml-1"></i>';
    return accountManagerSort.direction === 'asc'
        ? '<i class="fa-solid fa-sort-up text-purple-600 ml-1"></i>'
        : '<i class="fa-solid fa-sort-down text-purple-600 ml-1"></i>';
}

function sortAccountManagerBy(key) {
    if (accountManagerSort.key === key) {
        accountManagerSort.direction = accountManagerSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
        accountManagerSort.key = key;
        accountManagerSort.direction = 'asc';
    }
    renderAccountManagerTable(accountManagerLastAccounts);
}

function renderAccountManagerTable(accounts) {
    const body = document.getElementById('account-manager-body');
    if (!body) return;
    accountManagerLastAccounts = Array.isArray(accounts) ? [...accounts] : [];
    if (!accountManagerLastAccounts.length) {
        body.innerHTML = '<div class="py-10 text-center text-gray-400 font-bold">Chưa có tài khoản học sinh nào.</div>';
        return;
    }
    const sortedAccounts = sortAccountManagerAccounts(accountManagerLastAccounts);
    const rows = sortedAccounts.map(acc => {
        const id = escapeHtml(acc.maHS || '');
        const name = escapeHtml(acc.hoTen || '');
        const lop = escapeHtml(acc.lop || '—');
        const type = String(acc.loaiTaiKhoan || 'regular').toLowerCase();
        const trial = formatAccountDate(acc.hanDungThu);
        const vipExpiry = formatAccountDate(acc.hanVIP);
        return `
            <tr class="border-b border-pink-50 bg-white">
                <td class="px-3 py-2.5 font-black text-slate-700 whitespace-nowrap">${id}</td>
                <td class="px-3 py-2.5 font-bold text-slate-700">${name}</td>
                <td class="px-3 py-2.5 font-bold text-slate-500 text-center">${lop}</td>
                <td class="px-3 py-2.5 text-center">
                    <select onchange="paintAccountSelect(this, 'type'); adminChangeAccountType('${id.replace(/'/g,"\\'")}', this.value)" class="px-2 py-1.5 rounded-xl border font-black text-xs focus:outline-none ${getAccountTypeSelectClass(type)}">
                        <option value="regular" ${type==='regular'?'selected':''}>Regular</option>
                        <option value="trial" ${type==='trial'?'selected':''}>Trial</option>
                        <option value="vip" ${type==='vip'?'selected':''}>VIP</option>
                    </select>
                </td>
                <td class="px-3 py-2.5 text-center font-bold text-xs text-slate-500 whitespace-nowrap">${escapeHtml(trial)}</td>
                <td class="px-3 py-2.5 text-center font-bold text-xs text-purple-600 whitespace-nowrap">${escapeHtml(vipExpiry)}</td>
            </tr>`;
    }).join('');
    body.innerHTML = `
        <div class="overflow-x-auto rounded-2xl border border-pink-100">
            <table class="w-full min-w-[760px] text-xs">
                <thead class="bg-gradient-to-r from-pink-50 to-purple-50 text-purple-700 font-black">
                    <tr>
                        <th class="px-3 py-2.5 text-left">
                            <button onclick="sortAccountManagerBy('maHS')" class="inline-flex items-center font-black hover:text-purple-900">Mã HS ${accountSortIcon('maHS')}</button>
                        </th>
                        <th class="px-3 py-2.5 text-left">
                            <button onclick="sortAccountManagerBy('hoTen')" class="inline-flex items-center font-black hover:text-purple-900">Họ tên ${accountSortIcon('hoTen')}</button>
                        </th>
                        <th class="px-3 py-2.5 text-center">
                            <button onclick="sortAccountManagerBy('lop')" class="inline-flex items-center justify-center font-black hover:text-purple-900">Lớp ${accountSortIcon('lop')}</button>
                        </th>
                        <th class="px-3 py-2.5 text-center">
                            <button onclick="sortAccountManagerBy('loaiTaiKhoan')" class="inline-flex items-center justify-center font-black hover:text-purple-900">Loại tài khoản ${accountSortIcon('loaiTaiKhoan')}</button>
                        </th>
                        <th class="px-3 py-2.5 text-center">
                            <button onclick="sortAccountManagerBy('hanDungThu')" class="inline-flex items-center justify-center font-black hover:text-purple-900">Hạn dùng thử ${accountSortIcon('hanDungThu')}</button>
                        </th>
                        <th class="px-3 py-2.5 text-center">
                            <button onclick="sortAccountManagerBy('hanVIP')" class="inline-flex items-center justify-center font-black hover:text-purple-900">Hạn VIP ${accountSortIcon('hanVIP')}</button>
                        </th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        </div>`;
}

async function adminChangeAccountType(targetMaHS, typeValue) {
    const statusEl = document.getElementById('account-manager-status');
    if (statusEl) statusEl.textContent = `Đang cập nhật ${targetMaHS}...`;
    try {
        const result = await callAppsScript('updateAccountType', getAdminAuthPayload({ targetMaHS, accountType: typeValue }));
        if (!result.ok) throw new Error(result.error || 'Không cập nhật được loại tài khoản.');
        if (statusEl) statusEl.textContent = `${targetMaHS}: đã chuyển sang ${String(result.loaiTaiKhoan || typeValue).toUpperCase()}.`;
        await loadAccountManager();
    } catch (err) {
        if (statusEl) statusEl.textContent = 'Lỗi: ' + (err.message || err);
        alert(err.message || String(err));
        await loadAccountManager();
    }
}

function resetStars() {
    starGreenCount = 0; starRedCount = 0;
    const greenEl = document.getElementById('star-green-count');
    const redEl = document.getElementById('star-red-count');
    if (greenEl) greenEl.textContent = 0;
    if (redEl) redEl.textContent = 0;
}

function clickProgressOrExam(type) {
    if (type === 'progress') openRoadmap();
    else if (type === 'exam') openExamHub();
}


// ==========================================
// VOCABULARY HUB 4 LEVEL THEO 16 UNIT -> 3 CHẾ ĐỘ HỌC
// ==========================================
const VOCABULARY_18_TOPICS = [
    { id: 1,  icon: '🦁', title: 'Land Animals', vi: 'Động vật trên cạn' },
    { id: 2,  icon: '🐬', title: 'Water Animals', vi: 'Động vật dưới nước' },
    { id: 3,  icon: '🐝', title: 'Insects', vi: 'Côn trùng' },
    { id: 4,  icon: '🎨', title: 'Colors', vi: 'Màu sắc' },
    { id: 5,  icon: '🎒', title: 'School Objects', vi: 'Đồ vật lớp học' },
    { id: 6,  icon: '👀', title: 'Body Parts', vi: 'Bộ phận cơ thể' },
    { id: 7,  icon: '🍎', title: 'Fruits', vi: 'Trái cây' },
    { id: 8,  icon: '🥕', title: 'Vegetables', vi: 'Rau củ' },
    { id: 9,  icon: '👨‍👩‍👧‍👦', title: 'Family', vi: 'Gia đình' },
    { id: 10, icon: '🧑‍🏫', title: 'Occupations', vi: 'Nghề nghiệp' },
    { id: 11, icon: '🚍', title: 'Transportation', vi: 'Phương tiện giao thông' },
    { id: 12, icon: '😊', title: 'Emotions', vi: 'Cảm xúc' },
    { id: 13, icon: '🏃', title: 'Daily Actions', vi: 'Hành động thường ngày' },
    { id: 14, icon: '☀️', title: 'Weather', vi: 'Thời tiết' },
    { id: 15, icon: '🏫', title: 'School & Stationery', vi: 'Nhà trường & Đồ dùng' },
    { id: 16, icon: '🗓️', title: 'Time & Calendar', vi: 'Thời gian & Lịch' },
    { id: 17, icon: '👗', title: 'Clothes & Accessories', vi: 'Quần áo & Phụ kiện' },
    { id: 18, icon: '🔢', title: 'Numbers & Measurement', vi: 'Số đếm & Đo lường' }
];

const VOCAB_18_WORDS = {
    1: new Set(["cat", "dog", "lion", "elephant", "monkey", "bear", "tiger", "cow", "pig", "chicken", "duck", "horse", "sheep", "rabbit", "fox", "wolf", "giraffe", "zebra", "kangaroo", "panda", "camel", "deer", "donkey", "goat", "hen", "hippo", "kitten", "mouse", "ox", "parrot", "puppy", "rooster", "squirrel", "zebu"]),
    2: new Set(["fish", "dolphin", "whale", "shark", "octopus", "crab", "shrimp", "jellyfish", "sea turtle", "seahorse", "crocodile", "penguin", "starfish", "turtle"]),
    3: new Set(["spider", "ant", "bee", "butterfly", "ladybug", "mosquito", "fly", "grasshopper", "worm", "snail"]),
    4: new Set(["red", "blue", "yellow", "green", "black", "white", "orange", "purple", "pink", "brown", "gray", "gold", "silver", "light blue", "dark green", "grey"]),
    5: new Set(["book", "pencil", "pen", "eraser", "ruler", "bag", "desk", "chair", "board", "chalk", "crayon", "scissors", "glue", "notebook", "backpack", "globe", "map", "computer", "marker", "sharpener", "ball", "balloon", "bell", "blocks", "box", "camera", "card", "classroom", "desk chair", "doll", "goal", "kite", "phone", "pool", "puzzle", "question", "quiz", "robot", "school", "seesaw", "slide", "swing", "teddy bear", "toy train", "whiteboard", "yo-yo", "yo-yos"]),
    6: new Set(["head", "hair", "face", "eye", "ear", "nose", "mouth", "tooth", "tongue", "neck", "shoulder", "arm", "hand", "finger", "leg", "foot", "toe", "knee", "elbow", "stomach", "eyes", "ears", "hands", "arms", "legs", "feet", "body", "fingers", "teeth"]),
    7: new Set(["apple", "banana", "bananas", "orange", "grape", "grapes", "strawberry", "watermelon", "pineapple", "mango", "pear", "cherry", "peach", "kiwi", "lemon", "coconut", "avocado", "plum", "pomegranate", "raspberry", "blueberry", "lime"]),
    8: new Set(["carrot", "potato", "tomato", "onion", "garlic", "broccoli", "cabbage", "cucumber", "lettuce", "spinach", "corn", "mushroom", "pepper", "pumpkin", "eggplant", "zucchini", "green bean", "radish", "cauliflower", "sweet potato", "vegetables", "yams"]),
    9: new Set(["mother", "mom", "father", "dad", "sister", "brother", "grandmother", "grandfather", "parents", "grandparents", "uncle", "aunt", "cousin", "son", "daughter", "baby", "family"]),
    10: new Set(["teacher", "doctor", "nurse", "police officer", "firefighter", "chef", "pilot", "driver", "farmer", "singer", "dancer", "artist", "engineer", "scientist", "student", "baker", "dentist", "vet", "hairdresser", "builder", "astronaut", "postman", "soldier"]),
    11: new Set(["car", "bus", "bicycle", "motorcycle", "motorbike", "train", "airplane", "plane", "boat", "ship", "truck", "taxi", "subway", "helicopter", "ambulance", "fire truck", "fire engine", "police car", "bike", "tractor", "van"]),
    12: new Set(["happy", "sad", "angry", "surprised", "scared", "excited", "tired", "hungry", "thirsty", "bored", "confused", "shy", "proud", "worried", "grateful", "fine", "good", "great", "sleepy"]),
    13: new Set(["eat", "drink", "sleep", "wake up", "go to bed", "play", "read", "write", "draw", "sing", "dance", "run", "walk", "jump", "talk", "listen", "watch", "cook", "clean", "brush", "riding", "sliding", "driving", "sail", "running", "jumping", "walking", "reading", "writing", "singing", "dancing", "playing", "eating", "drinking", "swim", "swimming", "fly", "flying", "ride", "drive"]),
    14: new Set(["sunny", "rainy", "cloudy", "windy", "snowy", "hot", "cold", "warm", "cool", "stormy", "foggy", "thunder", "lightning", "rainbow", "breeze", "cloud", "cold weather", "hot weather", "rain", "sky", "sun"]),
    15: new Set(["school", "classroom", "teacher", "student", "desk", "chair", "blackboard", "chalk", "notebook", "pencil", "eraser", "ruler", "pen", "crayon", "book", "backpack", "calculator", "glue", "scissors", "map", "paper", "pencil case", "sharpener"]),
    16: new Set(["today", "tomorrow", "yesterday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday", "january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december", "clock", "day", "week", "month", "year", "morning", "afternoon", "evening", "night"]),
    17: new Set(["shirt", "shirts", "pants", "dress", "skirt", "jacket", "coat", "sweater", "t-shirt", "shorts", "shoes", "socks", "hat", "scarf", "gloves", "belt", "tie", "sunglasses", "watch", "bag", "jewelry", "boots", "trousers"]),
    18: new Set(["one", "two", "three", "four", "five", "six", "seven", "seven number", "eight", "nine", "ten", "dozen", "hundred", "thousand", "meter", "centimeter", "kilometer", "gram", "kilogram", "liter", "circle", "eighteen", "eleven", "fifteen", "fourteen", "heart", "nineteen", "oval", "rectangle", "seventeen", "sixteen", "square", "star", "thirteen", "triangle", "twelve", "twenty"]),
};

let activeVocabularyHubTopic = null;
let activeVocabularyHubQuestions = [];
let activeVocabularyStudyMode = 'flashcard';
let vocabularyModeState = {
    flashcard: { answers: {}, wrongs: {} },
    picture: { answers: {}, wrongs: {} },
    listen: { answers: {}, wrongs: {} }
};

function getVocabulary18TopicIds_(q) {
    const word = String(q?.word || q?.answer || '').trim().toLowerCase();
    if (!word) return [];
    const ids = [];
    for (const topic of VOCABULARY_18_TOPICS) {
        if (VOCAB_18_WORDS[topic.id]?.has(word)) ids.push(topic.id);
    }
    return ids;
}
function getVocabulary18TopicId_(q) {
    return getVocabulary18TopicIds_(q)[0] || 0;
}

function getVocabularyCurriculumLevel_(q) {
    const explicit = Number(q?.curriculum_level || 0);
    if (explicit >= 1 && explicit <= 4) return explicit;
    const unit = Number(q?.unit_anchor || 0);
    return unit >= 1 && unit <= 16 ? Math.ceil(unit / 4) : 0;
}

function getVocabularySemanticGroup_(q) {
    const explicit = String(q?.semantic_group || '').trim();
    if (explicit) return explicit;
    const legacy = getVocabulary18TopicIds_(q)[0] || 0;
    return legacy ? `legacy_${legacy}` : '';
}

function getVocabularyLevelGroup_(level) {
    return EXPLORE_LEVEL_GROUPS.find(g => g.level === Number(level)) || null;
}

function resetLectureChrome_() {
    const view = document.getElementById('view-lecture');
    const content = document.getElementById('lecture-content');
    const contentWrap = content?.parentElement;
    const speakBtn = document.querySelector('#view-lecture button[onclick="speakLecture()"]');
    const lectureInner = document.querySelector('#view-lecture > div:first-child');
    const list = document.getElementById('lecture-subtopics-list');
    const listWrap = list?.parentElement;
    if (view) view.classList.remove('ta2-compact-vocab-hub');
    if (listWrap) {
        listWrap.classList.add('pt-2', 'border-t', 'border-pink-100');
        listWrap.classList.remove('ta2-vocab-list-wrap');
    }
    if (contentWrap) contentWrap.classList.remove('hidden');
    if (speakBtn) speakBtn.classList.remove('hidden');
    if (lectureInner) {
        lectureInner.classList.remove('max-w-6xl');
        lectureInner.classList.add('max-w-4xl');
    }
}

function applyCompactVocabularyHubLayout_() {
    const view = document.getElementById('view-lecture');
    const list = document.getElementById('lecture-subtopics-list');
    const listWrap = list?.parentElement;
    if (view) view.classList.add('ta2-compact-vocab-hub');
    if (listWrap) {
        listWrap.classList.remove('pt-2', 'border-t', 'border-pink-100');
        listWrap.classList.add('ta2-vocab-list-wrap');
    }
}

function setLectureSpeakVisible_(visible) {
    const speakBtn = document.querySelector('#view-lecture button[onclick="speakLecture()"]');
    if (!speakBtn) return;
    speakBtn.classList.toggle('hidden', !visible);
}

async function openVocabularyHub() {
    resetLectureChrome_();
    stopSpeaking();
    inMiniGameFlow = false;
    inAlphaIpaFlow = false;
    setMainTabActive_('discover');
    activeTopicId = 2; activeExamContext = null; activeRoadmapContext = null;
    pendingTopicQuiz = null;
    updateNavTabs('2. Vocabulary', '📚', null);
    showLoadingOverlay('Loading vocabulary topics...');
    try {
        const topics = await fetchAllTopicsData();
        const topicObj = topics.find(t => Number(t.topic_id) === 2);
        if (!topicObj?.questions?.length) throw new Error('Vocabulary data is empty.');
        activeVocabularyHubQuestions = topicObj.questions;
        renderVocabulary18Topics_();
    } catch (err) {
        alert(`Không thể tải Vocabulary: ${err.message || err}`);
    } finally {
        hideLoadingOverlay();
    }
}

function renderVocabulary18Topics_() {
    // Tên hàm legacy được giữ để không phá các nơi đang gọi. UI thực tế là 4 level theo 16 Unit.
    activeVocabularyHubTopic = null;
    activeVocabularyStudyMode = 'flashcard';
    const content = document.getElementById('lecture-content');
    const contentWrap = content?.parentElement;
    const speakBtn = document.querySelector('#view-lecture button[onclick="speakLecture()"]');
    const list = document.getElementById('lecture-subtopics-list');
    const mix = document.getElementById('wrap-mix-all-subtopics');
    if (!list) return;
    applyCompactVocabularyHubLayout_();
    if (contentWrap) contentWrap.classList.add('hidden');
    if (speakBtn) speakBtn.classList.add('hidden');
    if (mix) mix.classList.add('hidden');

    const flashcards = activeVocabularyHubQuestions.filter(q => q.sub_topic === '2.1');
    const counts = {};
    flashcards.forEach(q => {
        const lv = getVocabularyCurriculumLevel_(q);
        if (lv) counts[lv] = (counts[lv] || 0) + 1;
    });

    document.getElementById('lecture-title').textContent = '';
    const lectureInner = document.querySelector('#view-lecture > div:first-child');
    if (lectureInner) {
        lectureInner.classList.remove('max-w-4xl');
        lectureInner.classList.add('max-w-6xl');
    }
    list.className = 'w-full max-w-5xl';
    list.innerHTML = `
        <div class="mb-3 text-center">
            <div class="text-base md:text-lg font-black text-violet-700">Vocabulary by 16 Units</div>
            <div class="text-xs md:text-sm font-bold text-slate-500 mt-1">4 levels · 40 words each · from the beginning to the end of Grade 2</div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 max-w-4xl mx-auto">
            ${EXPLORE_LEVEL_GROUPS.map((g,i) => {
                const style = SUBTOPIC_PALETTES[i % SUBTOPIC_PALETTES.length];
                return `<button onclick="openVocabularyLevel_(${g.level})" class="p-4 ${style.card} border-2 rounded-2xl font-bold text-left transition-all shadow-sm pastel-btn min-h-[88px]">
                    <div class="flex items-center justify-between gap-3">
                        <div>
                            <div class="text-lg md:text-xl font-black ${style.num}">${g.icon} Level ${g.level} · ${g.name}</div>
                            <div class="text-xs md:text-sm text-slate-500 font-extrabold mt-1">${g.name_vi} · Unit ${g.units[0]}–${g.units[g.units.length-1]}</div>
                        </div>
                        <span class="text-xs font-black ${style.badge} px-3 py-1 rounded-full border shrink-0">${counts[g.level] || 0} words</span>
                    </div>
                </button>`;
            }).join('')}
        </div>`;

    updateNavTabs('2. Vocabulary', '📚', null);
    switchAppView('view-lecture');
}

function openVocabularyLevel_(level) {
    const g = getVocabularyLevelGroup_(level);
    if (!g) return;
    const pool = activeVocabularyHubQuestions.filter(q => q.sub_topic === '2.1' && getVocabularyCurriculumLevel_(q) === g.level);
    if (!pool.length) {
        showFriendlyAlert?.(`Level ${g.level} đang được cập nhật từ vựng.`, '📚');
        return;
    }
    activeVocabularyHubTopic = { ...g, id: g.level, title: `Level ${g.level} · ${g.name}`, vi: g.name_vi };
    activeVocabularyStudyMode = 'flashcard';
    vocabularyModeState = {
        flashcard: { answers: {}, wrongs: {} },
        picture: { answers: {}, wrongs: {} },
        listen: { answers: {}, wrongs: {} }
    };
    practiceCycleRawPool = [...pool];
    const label = `Level ${g.level} · ${g.name} / ${g.name_vi} · Unit ${g.units[0]}–${g.units[g.units.length-1]}`;
    updateNavTabs('2. Vocabulary', '📚', label, null, () => openVocabularyLevel_(g.level));
    startTopicQuiz(2, `Vocabulary - Level ${g.level}`, shuffleArray([...pool]), '2.1');
}

function openVocabularyAll18() {
    const pool = activeVocabularyHubQuestions.filter(q => q.sub_topic === '2.1');
    if (!pool.length) {
        showFriendlyAlert?.('Kho từ vựng tổng hợp đang được cập nhật.', '📚');
        return;
    }
    activeVocabularyHubTopic = { id: 0, title: 'All Vocabulary', vi: 'Tất cả từ vựng', icon: '📚' };
    activeVocabularyStudyMode = 'flashcard';
    vocabularyModeState = {
        flashcard: { answers: {}, wrongs: {} },
        picture: { answers: {}, wrongs: {} },
        listen: { answers: {}, wrongs: {} }
    };
    practiceCycleRawPool = [...pool];
    updateNavTabs('2. Vocabulary', '📚', 'All Vocabulary / Tất cả từ vựng', null, () => openVocabularyAll18());
    startTopicQuiz(2, 'All Vocabulary', shuffleArray([...pool]), '2.1');
}

function openVocabularyTopic18(topicId) {
    const topic = VOCABULARY_18_TOPICS.find(t => t.id === Number(topicId));
    if (!topic) return;
    activeVocabularyHubTopic = topic;

    // Một pool từ duy nhất cho cả 3 cách học. Giữ nguyên thứ tự ngẫu nhiên của vòng hiện tại;
    // đổi tab chỉ đổi cách hỏi, KHÔNG đổi từ đang học.
    const pool = activeVocabularyHubQuestions.filter(q => q.sub_topic === '2.1' && getVocabulary18TopicIds_(q).includes(topic.id));
    if (!pool.length) {
        showFriendlyAlert?.(`Chủ đề ${topic.title} đang được bổ sung từ vựng.`, '📚');
        return;
    }

    activeVocabularyStudyMode = 'flashcard';
    vocabularyModeState = {
        flashcard: { answers: {}, wrongs: {} },
        picture: { answers: {}, wrongs: {} },
        listen: { answers: {}, wrongs: {} }
    };
    practiceCycleRawPool = [...pool];
    updateNavTabs('2. Vocabulary', '📚', `${topic.title} / ${topic.vi}`, null, () => openVocabularyTopic18(topic.id));
    startTopicQuiz(2, `${topic.title} - Vocabulary`, shuffleArray([...pool]), '2.1');
}

function getVocabularyModeKey_(mode = activeVocabularyStudyMode) {
    if (mode === 'picture') return 'picture';
    if (mode === 'listen') return 'listen';
    return 'flashcard';
}

function saveVocabularyModeState_() {
    const key = getVocabularyModeKey_();
    vocabularyModeState[key] = {
        answers: { ...userAnswers },
        wrongs: Object.fromEntries(Object.entries(wrongAttemptsByQ).map(([k,v]) => [k, Array.isArray(v) ? [...v] : v]))
    };
}

function restoreVocabularyModeState_() {
    const key = getVocabularyModeKey_();
    const state = vocabularyModeState[key] || { answers: {}, wrongs: {} };
    userAnswers = { ...state.answers };
    wrongAttemptsByQ = Object.fromEntries(Object.entries(state.wrongs || {}).map(([k,v]) => [k, Array.isArray(v) ? [...v] : v]));
}

function setVocabularyStudyMode(mode) {
    if (!activeVocabularyHubTopic || !['flashcard','picture','listen'].includes(mode)) return;
    saveVocabularyModeState_();
    activeVocabularyStudyMode = mode;
    restoreVocabularyModeState_();
    loadQuestion();
}

function getVocabularyChoiceOptions_(q) {
    if (!q) return [];
    if (Array.isArray(q._vocabChoiceOptions) && q._vocabChoiceOptions.length === 4) return q._vocabChoiceOptions;
    const words = practiceCycleRawPool.map(x => String(x.word || '').trim()).filter(Boolean);
    q._vocabChoiceOptions = shuffleArray([q.word, ...pickDistractorWords(q.word, words, 3)]);
    return q._vocabChoiceOptions;
}

function getVocabularyIpaForWord_(word) {
    const key = String(word || '').trim().toLowerCase();
    if (!key) return '';
    const pools = [practiceCycleRawPool, activeQuestionsList, activeVocabularyHubQuestions];
    for (const pool of pools) {
        const item = Array.isArray(pool) ? pool.find(x => String(x?.word || '').trim().toLowerCase() === key) : null;
        if (item?.ipa) return String(item.ipa).replace(/^\/|\/$/g, '');
    }
    // Fallback to the shared IPA lookup already built from every options/options_ipa pair
    // in the learning banks. This keeps IPA consistent even when a vocabulary master row
    // itself does not carry an ipa field.
    const cached = wordIpaMapCache && wordIpaMapCache[key];
    return cached ? String(cached).replace(/^\/|\/$/g, '') : '';
}

function vocabularyTabsHtml_() {
    const tabs = [
        { key:'flashcard', icon:'🃏', en:'Flashcards', vi:'' },
        { key:'picture', icon:'🖼️', en:'Word-picture Puzzle', vi:'Nhìn tranh chọn từ' },
        { key:'listen', icon:'🎧', en:'Listen and Choose', vi:'Nghe và chọn từ' }
    ];
    return `<div class="grid grid-cols-3 gap-2 md:gap-3 mb-3">
        ${tabs.map(t => {
            const active = activeVocabularyStudyMode === t.key;
            return `<button onclick="setVocabularyStudyMode('${t.key}')" class="h-[46px] md:h-[50px] rounded-[14px] border-[1.5px] px-2 md:px-3 py-1 transition-all flex items-center justify-center gap-1.5 md:gap-2 ${active ? 'bg-gradient-to-r from-pink-500 to-violet-500 text-white border-pink-300 shadow-md' : 'bg-white text-slate-600 border-pink-200 hover:bg-pink-50'}">
                <span class="text-[15px] md:text-base leading-none shrink-0">${t.icon}</span>
                <span class="min-w-0 flex flex-col items-start leading-tight">
                    <span class="font-black text-[10px] sm:text-[11px] md:text-sm truncate max-w-full">${t.en}</span>
                    ${t.vi ? `<span class="text-[7px] md:text-[9px] font-bold ${active ? 'text-white/90' : 'text-slate-400'} truncate max-w-full">${t.vi}</span>` : ''}
                </span>
            </button>`;
        }).join('')}
    </div>`;
}

function speakVocabularyPrompt_() {
    if (activeVocabularyStudyMode === 'listen') return speakVocabularyTarget_();
    speakEnglish('Choose the correct English word.', 0.92);
}

function speakVocabularyTarget_() {
    const q = activeQuestionsList[currentQIndex];
    if (q?.word) speakEnglish(q.word, 0.9);
}

function maskedVocabularyExamples_(q) {
    const word = String(q.word || '').trim();
    const rx = word ? new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'ig') : null;
    return (Array.isArray(q.examples) ? q.examples : []).slice(0,3).map(ex => rx ? String(ex).replace(rx, '_____') : String(ex));
}

function getVocabularyRecordByWord_(word) {
    const key = String(word || '').trim().toLowerCase();
    if (!key) return null;
    const pools = [practiceCycleRawPool, activeQuestionsList, activeVocabularyHubQuestions];
    for (const pool of pools) {
        const item = Array.isArray(pool) ? pool.find(x => String(x?.word || '').trim().toLowerCase() === key) : null;
        if (item) return item;
    }
    return null;
}

function highlightVocabularyTarget_(text, word) {
    const raw = String(text || '');
    const target = String(word || '').trim();
    if (!target) return escapeHtml(raw);
    const esc = target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const rx = new RegExp(`(${esc})`, 'ig');
    return raw.split(rx).map(part => part.toLowerCase() === target.toLowerCase()
        ? `<span class="text-fuchsia-600 font-black bg-fuchsia-50 px-1 rounded">${escapeHtml(part)}</span>`
        : escapeHtml(part)).join('');
}

function vocabularyPictureExamplesHtml_(q) {
    const examples = (Array.isArray(q?.examples) ? q.examples : []).slice(0,3);
    if (!examples.length) return '';
    const solved = userAnswers[currentQIndex] === q.answer;
    if (!solved) return '<div class="h-full min-h-[150px]"></div>';
    return `<div class="font-black text-fuchsia-600 text-sm mb-2">⭐ 3 EXAMPLE SENTENCES:</div><div class="space-y-2">${examples.map(ex => `<div class="bg-white rounded-xl px-3 py-2 text-left font-bold text-slate-700">${highlightVocabularyTarget_(ex, q.word)}</div>`).join('')}</div>`;
}

function revealVocabularyPictureExamples_() {
    if (activeVocabularyStudyMode !== 'picture') return;
    const q = activeQuestionsList[currentQIndex];
    const box = document.getElementById('vocab-picture-examples');
    if (q && box) box.innerHTML = vocabularyPictureExamplesHtml_(q);
}

function revealVocabularyVietnameseAfterCorrect_() {
    if (!['picture','listen'].includes(activeVocabularyStudyMode)) return;
    document.getElementById('vocab-prompt-meaning')?.classList.remove('hidden');
    document.querySelectorAll('.vocab-option-meaning').forEach(el => el.classList.remove('hidden'));
}

function getVocabularyExampleVi_(q, ex) {
    const vi = String(q?.vietnamese || '').trim();
    const word = String(q?.word || '').trim();
    const text = String(ex || '').trim();
    const custom = Array.isArray(q?.examples_vi) ? q.examples_vi : [];
    const idx = Array.isArray(q?.examples) ? q.examples.indexOf(ex) : -1;
    if (idx >= 0 && custom[idx]) return custom[idx];
    if (!text) return '';

    const esc = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const rx = esc ? new RegExp(esc, 'i') : null;
    const pairs = [
        [new RegExp(`^Look at the ${esc}\\.$`, 'i'), `Hãy nhìn ${vi}.`],
        [new RegExp(`^I can see the ${esc}\\.$`, 'i'), `Em có thể nhìn thấy ${vi}.`],
        [new RegExp(`^I can see a ${esc}\\.$`, 'i'), `Em có thể nhìn thấy một ${vi}.`],
        [new RegExp(`^This is a ${esc}\\.$`, 'i'), `Đây là một ${vi}.`],
        [new RegExp(`^This is my ${esc}\\.$`, 'i'), `Đây là ${vi} của em.`],
        [new RegExp(`^I have a ${esc}\\.$`, 'i'), `Em có một ${vi}.`],
        [new RegExp(`^I like ${esc}\\.$`, 'i'), `Em thích ${vi}.`],
        [new RegExp(`^I feel ${esc}\\.$`, 'i'), `Em cảm thấy ${vi}.`],
        [new RegExp(`^The ${esc} lives in the sea\\.$`, 'i'), `${vi} sống ở biển.`],
        [new RegExp(`^The ${esc} is swimming\\.$`, 'i'), `${vi} đang bơi.`],
        [new RegExp(`^The ${esc} is running fast\\.$`, 'i'), `${vi} đang chạy nhanh.`],
        [new RegExp(`^The ${esc} is small\\.$`, 'i'), `${vi} nhỏ.`],
        [new RegExp(`^The ${esc} is fast\\.$`, 'i'), `${vi} rất nhanh.`],
        [new RegExp(`^The ${esc} is slow\\.$`, 'i'), `${vi} rất chậm.`],
        [new RegExp(`^The ${esc} is red\\.$`, 'i'), `${vi} màu đỏ.`],
        [new RegExp(`^The ${esc} is yellow\\.$`, 'i'), `${vi} màu vàng.`],
        [new RegExp(`^The ${esc} is grey\\.$`, 'i'), `${vi} màu xám.`],
        [new RegExp(`^The ${esc} is sweet\\.$`, 'i'), `${vi} có vị ngọt.`],
        [new RegExp(`^The ${esc} is sour\\.$`, 'i'), `${vi} có vị chua.`],
        [new RegExp(`^The ${esc} helps people\\.$`, 'i'), `${vi} giúp đỡ mọi người.`],
        [new RegExp(`^The ${esc} is working\\.$`, 'i'), `${vi} đang làm việc.`],
        [new RegExp(`^The ${esc} is on the desk\\.$`, 'i'), `${vi} ở trên bàn học.`],
        [new RegExp(`^The ${esc} is nice\\.$`, 'i'), `${vi} rất đẹp.`],
        [new RegExp(`^The ${esc} is here\\.$`, 'i'), `${vi} ở đây.`],
        [new RegExp(`^My ${esc} is here\\.$`, 'i'), `${vi} của em ở đây.`],
        [new RegExp(`^The weather is ${esc}\\.$`, 'i'), `Thời tiết ${vi}.`],
        [new RegExp(`^I can ${esc}\\.$`, 'i'), `Em có thể ${vi}.`],
        [new RegExp(`^Let's ${esc}\\.$`, 'i'), `Chúng ta hãy ${vi}.`],
        [new RegExp(`^Let’s ${esc}\\.$`, 'i'), `Chúng ta hãy ${vi}.`],
        [new RegExp(`^We ${esc} every day\\.$`, 'i'), `Chúng ta ${vi} mỗi ngày.`],
        [new RegExp(`^I love my ${esc}\\.$`, 'i'), `Em yêu ${vi} của em.`],
        [new RegExp(`^My ${esc} is kind\\.$`, 'i'), `${vi} của em rất tốt bụng.`],
        [new RegExp(`^She looks ${esc}\\.$`, 'i'), `Bạn ấy trông ${vi}.`],
        [new RegExp(`^I am ${esc}\\.$`, 'i'), `Em ${vi}.`],
        [new RegExp(`^He is ${esc}\\.$`, 'i'), `Bạn ấy ${vi}.`]
    ];
    for (const [r, t] of pairs) if (r.test(text)) return t;
    if (rx && rx.test(text)) return text.replace(rx, vi);
    return `Nghĩa gợi ý: ${vi}.`;
}

function renderVocabularySharedStudy_(q) {
    if (!q || !activeVocabularyHubTopic) return;
    const tabs = vocabularyTabsHtml_();
    const topic = activeVocabularyHubTopic;
    const imageOrEmoji = q.image_url
        ? `<img src="${escapeHtml(q.image_url)}" alt="${escapeHtml(q.word)}" class="w-full h-full object-contain object-center rounded-3xl" onerror="this.style.display='none'; const f=this.nextElementSibling; if(f) f.style.display='flex';"><div style="display:none" class="w-full h-full items-center justify-center text-7xl md:text-8xl">${q.emoji || '✨'}</div>`
        : `<div class="w-full h-full flex items-center justify-center text-7xl md:text-8xl">${q.emoji || '✨'}</div>`;

    const optionButtonHtml = (opt, i, accent = 'pink') => {
        const record = getVocabularyRecordByWord_(opt);
        const ipa = record?.ipa ? String(record.ipa).replace(/^\/|\/$/g, '') : getVocabularyIpaForWord_(opt);
        const meaning = String(record?.vietnamese || '').trim();
        const accentClass = accent === 'cyan' ? 'text-violet-600' : 'text-pink-600';
        const borderClass = accent === 'cyan' ? 'border-violet-200 hover:bg-violet-50' : 'border-pink-200 hover:bg-pink-50';
        return `<button data-opt="${escapeHtml(opt)}" onclick="checkAnswer('${String(opt).replace(/'/g,"\'")}')" class="option-btn w-full px-3 py-2.5 bg-white ${borderClass} border-2 rounded-2xl font-black text-slate-800 text-left transition-all">
            <span class="opt-text flex items-center gap-2 min-w-0">
                <strong class="${accentClass} shrink-0">${String.fromCharCode(65+i)}.</strong>
                <span class="font-black leading-tight shrink-0">${escapeHtml(opt)}</span>
                ${ipa ? `<span class="text-sm md:text-base font-bold text-slate-500 shrink-0">/${escapeHtml(ipa)}/</span>` : ''}
                ${meaning ? `<span class="vocab-option-meaning hidden text-sm md:text-base font-bold text-violet-600 truncate">(${escapeHtml(meaning)})</span>` : ''}
            </span>
        </button>`;
    };

    let body = '';
    if (activeVocabularyStudyMode === 'flashcard') {
        const examples = (Array.isArray(q.examples) ? q.examples : []).slice(0,3);
        body = `<div class="grid grid-cols-1 md:grid-cols-2 gap-3 items-stretch">
            <section class="rounded-3xl border-2 border-pink-200 bg-pink-50/40 p-2.5 shadow-sm flex flex-col">
                <div class="w-full aspect-[4/3] bg-white rounded-3xl overflow-hidden flex items-center justify-center mb-1" style="max-height:188px">${imageOrEmoji}</div>
                <div class="relative w-full flex flex-col items-center justify-center px-12 text-center" style="min-height:68px">
                    <div class="flex items-center justify-center gap-2 flex-wrap">
                        <div class="text-2xl md:text-3xl font-black text-slate-900 leading-tight">${escapeHtml(q.word || '')}</div>
                        <span class="px-2 py-1 rounded-full bg-violet-100 text-violet-700 text-[10px] font-black">${escapeHtml((q.part_of_speech || '').toUpperCase())}</span>
                    </div>
                    ${getVocabularyIpaForWord_(q.word) ? `<div class="mt-1 text-sm md:text-base font-black text-sky-700">/${escapeHtml(getVocabularyIpaForWord_(q.word))}/</div>` : ''}
                    <div class="mt-1 text-base md:text-lg font-black text-violet-700">${escapeHtml(q.vietnamese || '')}</div>
                    <button onclick="speakVocabularyTarget_()" class="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-sky-100 text-sky-600 hover:bg-sky-200"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </section>
            <section class="rounded-3xl border-2 border-fuchsia-200 bg-gradient-to-br from-pink-50/60 via-white to-violet-50/60 p-2.5 shadow-sm">
                <div class="font-black text-fuchsia-600 text-sm md:text-base mb-1.5">⭐ 3 EXAMPLE SENTENCES:</div>
                <div class="space-y-1">${examples.map((ex,i)=>`<div class="bg-white rounded-2xl border border-fuchsia-100 px-3 py-1.5"><div class="flex items-center gap-2"><div class="flex-1 text-left font-bold text-slate-700">${escapeHtml(ex)}</div><button onclick="speakFlashcardExample(${i})" class="w-9 h-9 rounded-xl bg-sky-100 text-sky-600 shrink-0"><i class="fa-solid fa-volume-high text-xs"></i></button></div><div class="mt-0.5 text-left text-xs md:text-sm font-semibold text-slate-400">${escapeHtml(getVocabularyExampleVi_(q, ex))}</div></div>`).join('')}</div>
            </section>
        </div>`;
    } else if (activeVocabularyStudyMode === 'picture') {
        const options = getVocabularyChoiceOptions_(q);
        q.answer = q.word;
        q.options = options;
        body = `<div class="text-center mb-2"><div class="flex items-center justify-center gap-2 flex-wrap"><span class="px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-700 font-black text-xs">${topic.icon} ${topic.id ? `${topic.id}. ` : ''}${escapeHtml(topic.title)}</span><span class="text-lg md:text-xl font-black text-slate-900">Choose the correct English word:</span><button onclick="speakVocabularyPrompt_()" class="w-8 h-8 rounded-full bg-sky-100 text-sky-600"><i class="fa-solid fa-volume-high text-xs"></i></button></div></div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
            <section class="rounded-3xl border-2 border-dashed border-pink-300 bg-pink-50/30 p-2.5 flex flex-col">
                <div class="w-full aspect-[4/3] max-h-[188px] flex items-center justify-center overflow-hidden rounded-2xl bg-white">${imageOrEmoji}</div>
                <div id="vocab-prompt-meaning" class="mt-1.5 text-center text-xl md:text-2xl font-black text-violet-700 leading-tight">Nghĩa: ${escapeHtml(q.vietnamese || '')}</div>
            </section>
            <section id="vocab-picture-examples" class="rounded-3xl border-2 border-fuchsia-200 bg-gradient-to-br from-pink-50/50 via-white to-violet-50/50 p-2.5">${vocabularyPictureExamplesHtml_(q)}</section>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">${options.map((opt,i)=>optionButtonHtml(opt,i,'pink')).join('')}</div>`;
    } else {
        const options = getVocabularyChoiceOptions_(q);
        q.answer = q.word;
        q.options = options;
        body = `<div class="min-h-[255px] flex flex-col items-center justify-center">
            <div class="text-xl md:text-2xl font-black text-slate-900 mb-1">Listen and choose.</div>
            <div class="text-xs md:text-sm font-bold text-slate-400 mb-2">Nghe và chọn từ đúng</div>
            <button onclick="speakVocabularyTarget_()" class="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-pink-500 to-violet-500 text-white shadow-lg hover:scale-105 transition-transform flex items-center justify-center mb-3"><i class="fa-solid fa-volume-high text-3xl"></i></button>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-3xl">${options.map((opt,i)=>optionButtonHtml(opt,i,'cyan')).join('')}</div>
        </div>`;
    }

    document.getElementById('question-box').innerHTML = `<div class="w-full max-w-5xl mx-auto px-1 md:px-2 -mt-3 md:-mt-4">${tabs}${body}</div>`;
    restoreQuestionState(q);
    if (userAnswers[currentQIndex] === q.answer) {
        revealVocabularyVietnameseAfterCorrect_();
        revealVocabularyPictureExamples_();
    }
    updateNavButtons();
    if (activeVocabularyStudyMode === 'listen' && autoSpeechEnabled) setTimeout(() => speakVocabularyTarget_(), 120);
}

// Giữ tên hàm cũ để không phá các nơi đang gọi, nhưng màn chọn 3 card cũ không còn dùng.
function renderVocabularyModeTabs_() {
    if (activeVocabularyHubTopic?.level) openVocabularyLevel_(activeVocabularyHubTopic.level);
    else if (activeVocabularyHubTopic?.id) openVocabularyLevel_(activeVocabularyHubTopic.id);
}
function startVocabularyMode18(sectionCode) {
    const map = { '2.1':'flashcard', '2.2':'picture', '2.3':'listen' };
    setVocabularyStudyMode(map[sectionCode] || 'flashcard');
}


// ==========================================
// CHUYÊN MỤC 3–5 DÙNG CHUNG VOCABULARY MASTER CỦA MỤC 2
// 3. Remove Letter | 4. Fill Missing | 5. Odd One Out
// Cùng 4 level theo 16 Unit, không duy trì kho từ riêng.
// ==========================================
const SHARED_VOCAB_ACTIVITY_CONFIG = {
    3: { icon: '✂️', title: '3. Remove Letter', vi: 'Xóa chữ cái thừa', color: 'fuchsia' },
    4: { icon: '✏️', title: '4. Fill Missing', vi: 'Điền chữ còn thiếu', color: 'violet' },
    5: { icon: '🧩', title: '5. Odd One Out', vi: 'Tìm từ khác loại', color: 'pink' }
};
let activeSharedVocabActivity = null;
let removeLetterSelections_ = {};

async function getSharedVocabularyBasePool_() {
    const topics = await fetchAllTopicsData();
    const topicObj = topics.find(t => Number(t.topic_id) === 2);
    return (topicObj?.questions || []).filter(q => q.sub_topic === '2.1' && q.word);
}

async function openSharedVocabActivityHub_(activityId) {
    const cfg = SHARED_VOCAB_ACTIVITY_CONFIG[activityId];
    if (!cfg) return;
    stopSpeaking();
    inMiniGameFlow = false;
    inAlphaIpaFlow = false;
    activeTopicId = activityId;
    activeExamContext = null;
    activeRoadmapContext = null;
    activeVocabularyHubTopic = null;
    activeSharedVocabActivity = { activityId, topic: null };
    updateNavTabs(cfg.title, cfg.icon, null);
    showLoadingOverlay('Loading vocabulary topics...');
    try {
        const pool = await getSharedVocabularyBasePool_();
        if (!pool.length) throw new Error('Vocabulary data is empty.');
        renderSharedVocab18Topics_(activityId, pool);
    } catch (err) {
        alert(`Không thể tải dữ liệu: ${err.message || err}`);
    } finally {
        hideLoadingOverlay();
    }
}

function renderSharedVocab18Topics_(activityId, pool) {
    // Tên hàm legacy được giữ; mục 3-4 nay dùng cùng 4 level của Vocabulary Master.
    const cfg = SHARED_VOCAB_ACTIVITY_CONFIG[activityId];
    const content = document.getElementById('lecture-content');
    const contentWrap = content?.parentElement;
    const speakBtn = document.querySelector('#view-lecture button[onclick="speakLecture()"]');
    const list = document.getElementById('lecture-subtopics-list');
    const mix = document.getElementById('wrap-mix-all-subtopics');
    if (!cfg || !list) return;
    applyCompactVocabularyHubLayout_();
    if (contentWrap) contentWrap.classList.add('hidden');
    if (speakBtn) speakBtn.classList.add('hidden');
    if (mix) mix.classList.add('hidden');

    const counts = {};
    pool.forEach(q => {
        const lv = getVocabularyCurriculumLevel_(q);
        if (lv) counts[lv] = (counts[lv] || 0) + 1;
    });
    document.getElementById('lecture-title').textContent = '';
    list.className = 'w-full max-w-5xl';
    list.innerHTML = `
        <div class="mb-3 text-center">
            <div class="text-base md:text-lg font-black text-violet-700">${escapeHtml(cfg.title.replace(/^\d+\.\s*/,''))} by 16 Units</div>
            <div class="text-xs md:text-sm font-bold text-slate-500 mt-1">Use the same Vocabulary Master · 4 progressive levels</div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 max-w-4xl mx-auto">
            ${EXPLORE_LEVEL_GROUPS.map((g,i) => {
                const style = SUBTOPIC_PALETTES[i % SUBTOPIC_PALETTES.length];
                return `<button onclick="openSharedVocabLevel_(${activityId},${g.level})" class="p-4 ${style.card} border-2 rounded-2xl font-bold text-left transition-all shadow-sm pastel-btn min-h-[88px]">
                    <div class="flex items-center justify-between gap-3">
                        <div><div class="text-lg md:text-xl font-black ${style.num}">${g.icon} Level ${g.level} · ${g.name}</div><div class="text-xs md:text-sm text-slate-500 font-extrabold mt-1">${g.name_vi} · Unit ${g.units[0]}–${g.units[g.units.length-1]}</div></div>
                        <span class="text-xs font-black ${style.badge} px-3 py-1 rounded-full border shrink-0">${counts[g.level] || 0} words</span>
                    </div>
                </button>`;
            }).join('')}
        </div>`;
    updateNavTabs(cfg.title, cfg.icon, null);
    switchAppView('view-lecture');
}

async function openSharedVocabLevel_(activityId, level) {
    const cfg = SHARED_VOCAB_ACTIVITY_CONFIG[activityId];
    const g = getVocabularyLevelGroup_(level);
    if (!cfg || !g) return;
    const all = await getSharedVocabularyBasePool_();
    const pool = all.filter(q => getVocabularyCurriculumLevel_(q) === g.level);
    if (!pool.length) return alert(`Level ${g.level} chưa có từ vựng.`);
    activeSharedVocabActivity = { activityId, topic: { ...g, id: g.level, level: g.level } };
    launchSharedVocabActivity_(activityId, pool, `Level ${g.level} · ${g.name} / ${g.name_vi} · Unit ${g.units[0]}–${g.units[g.units.length-1]}`);
}

async function openSharedVocabAll18_(activityId) {
    const cfg = SHARED_VOCAB_ACTIVITY_CONFIG[activityId];
    const pool = await getSharedVocabularyBasePool_();
    activeSharedVocabActivity = { activityId, topic: { id: 0, title: 'All Vocabulary', vi: 'Tất cả từ vựng', icon: '📚' } };
    launchSharedVocabActivity_(activityId, pool, 'All Vocabulary / Tất cả từ vựng');
}

async function openSharedVocabTopic18_(activityId, topicId) {
    const cfg = SHARED_VOCAB_ACTIVITY_CONFIG[activityId];
    const topic = VOCABULARY_18_TOPICS.find(t => t.id === Number(topicId));
    if (!cfg || !topic) return;
    const all = await getSharedVocabularyBasePool_();
    const pool = all.filter(q => getVocabulary18TopicIds_(q).includes(topic.id));
    if (!pool.length) return alert(`Chủ đề ${topic.title} đang được bổ sung từ vựng.`);
    activeSharedVocabActivity = { activityId, topic };
    launchSharedVocabActivity_(activityId, pool, `${topic.title} / ${topic.vi}`);
}

function launchSharedVocabActivity_(activityId, vocabPool, label) {
    const cfg = SHARED_VOCAB_ACTIVITY_CONFIG[activityId];
    if (!cfg || !vocabPool?.length) return;
    let questions = [];
    if (activityId === 3) questions = vocabPool.map((v, i) => makeRemoveLetterQuestion_(v, i));
    else if (activityId === 4) questions = vocabPool.map((v, i) => makeFillMissingQuestion_(v, vocabPool, i));
    else questions = vocabPool.map((v, i) => makeOddOneOutQuestion_(v, vocabPool, i));
    questions = questions.filter(Boolean);
    practiceCycleRawPool = [...questions];
    removeLetterSelections_ = {};
    updateNavTabs(cfg.title, cfg.icon, label, null, () => {
        const t = activeSharedVocabActivity?.topic;
        if (t?.level) openSharedVocabLevel_(activityId, t.level);
        else openSharedVocabActivityHub_(activityId);
    });
    startTopicQuiz(activityId, `${cfg.title} - ${label}`, shuffleArray([...questions]), `${activityId}.shared`);
}

function randomLetterDifferent_(avoid = '') {
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('').filter(c => !String(avoid).toLowerCase().includes(c));
    return letters[Math.floor(Math.random() * letters.length)] || 'x';
}

function makeRemoveLetterQuestion_(v, idx) {
    const word = String(v.word || '').trim();
    if (!word || word.length < 2) return null;
    const chars = [...word];
    const extrasCount = Math.min(3, Math.max(1, word.replace(/[^A-Za-z]/g,'').length >= 8 ? 3 : word.length >= 5 ? 2 : 1));
    const extras = Array.from({length: extrasCount}, () => randomLetterDifferent_(word));
    const tokens = chars.map((ch, i) => ({ ch, original: true, order: i }));
    extras.forEach((ch, j) => {
        const pos = Math.floor(Math.random() * (tokens.length + 1));
        tokens.splice(pos, 0, { ch, original: false, extraNo: j });
    });
    return {
        id: `shared_remove_${v.id || idx}`,
        question_id: `shared_remove_${v.id || idx}`,
        render_style: 'remove_letter_shared',
        sub_topic: '3.shared',
        word, vietnamese: v.vietnamese || '', ipa: v.ipa || '', emoji: v.emoji || '🔤', image_url: v.image_url || '',
        tokens, answer_word: word, extra_count: extrasCount,
        skill_tag: 'ENG_PHO', question_text: 'Remove the extra letter(s).', question_text_vi: 'Chạm vào chữ cái thừa.'
    };
}

function makeFillMissingQuestion_(v, vocabPool, idx) {
    const word = String(v.word || '').trim();
    const letters = [...word];
    const candidates = letters.map((c,i)=>({c,i})).filter(x=>/[A-Za-z]/.test(x.c));
    if (!candidates.length) return null;
    const pick = candidates[Math.floor(Math.random()*candidates.length)];
    const shown = letters.map((c,i)=>i===pick.i?'_':c).join('');
    const correct = pick.c.toLowerCase();
    const distractors = [];
    let guard = 0;
    while (distractors.length < 3 && guard++ < 100) {
        const c = randomLetterDifferent_(word).toLowerCase();
        if (c !== correct && !distractors.includes(c)) distractors.push(c);
    }
    const fallbackLetters = 'abcdefghijklmnopqrstuvwxyz'.split('').filter(c => c !== correct && !word.toLowerCase().includes(c));
    for (const c of fallbackLetters) {
        if (distractors.length >= 3) break;
        if (!distractors.includes(c)) distractors.push(c);
    }
    const options = shuffleArray([correct, ...distractors.slice(0,3)]);
    return {
        id:`shared_fill_${v.id||idx}`, sub_topic:'4.shared', skill_tag:'ENG_PHO',
        render_style:'fill_missing_shared',
        question_text:'Choose 1 correct letter to fill the blank:', question_text_vi:'Điền chữ cái còn thiếu.',
        options, answer:pick.c.toLowerCase(), emoji:v.emoji||'✏️', image_url:v.image_url||'', word, vietnamese:v.vietnamese||'', ipa:v.ipa||'',
        missing_index: pick.i,
        masked_word: shown
    };
}



function speakFillMissingWord_() {
    const q = activeQuestionsList[currentQIndex];
    if (q?.word) speakEnglish(q.word, 0.92);
}

function renderFillMissingShared_(q) {
    const chars = [...String(q.word || '')];
    const missingIndex = Number.isInteger(q.missing_index) ? q.missing_index : -1;
    const imageOrEmoji = q.image_url
        ? `<img src="${escapeHtml(q.image_url)}" alt="${escapeHtml(q.word || '')}" class="max-w-full max-h-full object-contain" onerror="this.style.display='none'; const f=this.nextElementSibling; if(f) f.classList.remove('hidden');"><div class="hidden text-6xl md:text-7xl">${q.emoji || '✏️'}</div>`
        : `<div class="text-6xl md:text-7xl">${q.emoji || '✏️'}</div>`;

    const letterHtml = chars.map((ch, i) => {
        if (i === missingIndex) {
            const solved = userAnswers[currentQIndex] === q.answer;
            return `<span id="fill-missing-slot" class="inline-flex min-w-[34px] md:min-w-[40px] h-[42px] md:h-[46px] items-center justify-center rounded-lg ${solved ? 'bg-rose-50 text-rose-600 border-2 border-rose-300' : 'text-violet-700 border-b-[4px] border-fuchsia-500'} font-black text-xl md:text-2xl leading-none">${solved ? escapeHtml(String(q.answer || '').toUpperCase()) : '＿'}</span>`;
        }
        if (ch === ' ') return `<span class="inline-block w-3 md:w-4"></span>`;
        return `<span class="inline-flex min-w-[30px] md:min-w-[34px] h-[42px] md:h-[46px] items-center justify-center text-violet-700 font-black text-xl md:text-2xl leading-none">${escapeHtml(ch.toUpperCase())}</span>`;
    }).join('');

    const optionsHtml = (q.options || []).map((opt, idx) => {
        const letter = String(opt || '').toUpperCase();
        return `<button data-opt="${escapeHtml(opt)}" onclick="checkAnswer('${String(opt).replace(/'/g, "\\'")}')" class="option-btn w-full min-h-[54px] md:min-h-[58px] rounded-2xl border-2 border-fuchsia-200 bg-gradient-to-br from-white to-pink-50 hover:from-pink-50 hover:to-violet-50 hover:border-fuchsia-300 shadow-sm font-black text-xl md:text-2xl text-violet-700 leading-none transition-all pastel-btn"><span class="opt-text">${escapeHtml(letter)}</span><span class="option-icon ml-1"></span></button>`;
    }).join('');

    document.getElementById('question-box').innerHTML = `
        <div class="w-full max-w-4xl mx-auto px-2">
            <div class="flex items-center justify-center gap-2 mb-2 text-center flex-wrap">
                <div class="font-black text-base md:text-lg text-slate-900">Choose 1 correct letter to fill the blank:</div>
                <button onclick="speakFillMissingWord_()" class="px-3 py-1.5 rounded-full border border-fuchsia-200 bg-gradient-to-r from-pink-50 to-violet-50 text-violet-700 font-black text-xs md:text-sm hover:from-pink-100 hover:to-violet-100 shadow-sm"><i class="fa-solid fa-volume-high mr-1"></i>Listen</button>
            </div>

            <div class="rounded-3xl border-2 border-dashed border-fuchsia-200 bg-gradient-to-br from-pink-50/80 via-white to-violet-50/80 p-4 md:p-5">
                <div class="w-24 h-24 md:w-28 md:h-28 mx-auto flex items-center justify-center mb-1">${imageOrEmoji}</div>
                <div class="text-center font-black text-slate-700 text-base md:text-lg">Meaning: <span class="text-fuchsia-600">${escapeHtml(q.vietnamese || '')}</span></div>
                ${q.ipa ? `<div class="text-center mt-2"><span class="inline-block rounded-xl border border-fuchsia-200 bg-gradient-to-r from-pink-50 to-violet-50 px-3 py-1 text-base md:text-lg font-bold text-violet-700">/${escapeHtml(String(q.ipa).replace(/^\/|\/$/g,''))}/</span></div>` : ''}
                <div class="mt-3 flex flex-wrap items-center justify-center gap-0.5 md:gap-1 rounded-2xl border-2 border-fuchsia-200 bg-white/90 px-4 py-2 shadow-sm w-fit max-w-full mx-auto text-violet-700">${letterHtml}</div>
                <div class="mt-3 text-center text-[10px] md:text-xs font-bold text-slate-400"><i class="fa-solid fa-lightbulb text-fuchsia-400 mr-1"></i>Tap Listen anytime to hear the word.</div>
            </div>

            <div class="grid grid-cols-4 gap-2.5 md:gap-3 mt-3">${optionsHtml}</div>
        </div>`;

    restoreQuestionState(q);
    updateNavButtons();
    updateQuizPalletUI();
}

function makeOddOneOutQuestion_(v, vocabPool, idx) {
    const mainGroup = getVocabularySemanticGroup_(v);
    if (!mainGroup) return null;
    const same = shuffleArray(vocabPool.filter(x => x.word && x.word !== v.word && getVocabularySemanticGroup_(x) === mainGroup)).slice(0,3);
    const other = shuffleArray(vocabPool.filter(x => x.word && getVocabularySemanticGroup_(x) && getVocabularySemanticGroup_(x) !== mainGroup))[0];
    if (same.length < 3 || !other) return null;
    const picked = [same[0], same[1], same[2], other];
    const options = shuffleArray(picked.map(x => x.word));
    const option_meta = {};
    picked.forEach(x => { option_meta[String(x.word)] = { ipa: x.ipa || '', vietnamese: x.vietnamese || '' }; });
    return {
        id:`shared_odd_${v.id||idx}`, sub_topic:'5.shared', skill_tag:'ENG_VOC',
        render_style:'odd_one_out_shared',
        question_text:'Choose the odd word.', question_text_vi:'Chọn từ khác nhóm.',
        options, answer:other.word, option_meta, emoji:'🧩', image_url:'', word:v.word, vietnamese:v.vietnamese||''
    };
}

function speakOddOneOutOption_(word) {
    if (word) speakEnglish(String(word), 0.92);
}

function answerOddOneOut_(word) {
    const q = activeQuestionsList[currentQIndex];
    if (!q || q.render_style !== 'odd_one_out_shared') return;
    if (userAnswers[currentQIndex] !== undefined) { speakOddOneOutOption_(word); return; }
    if (String(word) === String(q.answer)) {
        userAnswers[currentQIndex] = word;
        score += (q.diem ?? 0.5);
        starGreenCount++;
        const el=document.getElementById('star-green-count'); if(el) el.textContent=starGreenCount;
        playAudio('correct');
        confetti({ particleCount: 30, spread: 55, origin: { y: 0.7 } });
    } else {
        if (!wrongAttemptsByQ[currentQIndex]) wrongAttemptsByQ[currentQIndex] = [];
        if (!wrongAttemptsByQ[currentQIndex].includes(word)) {
            wrongAttemptsByQ[currentQIndex].push(word);
            starRedCount++;
            const el=document.getElementById('star-red-count'); if(el) el.textContent=starRedCount;
        }
        playAudio('wrong');
    }
    renderOddOneOutShared_(q);
}

function renderOddOneOutShared_(q) {
    const solved = userAnswers[currentQIndex] !== undefined;
    const wrong = new Set(wrongAttemptsByQ[currentQIndex] || []);
    const opts = (q.options || []).map((word, i) => {
        const meta = q.option_meta?.[word] || {};
        const isAnswer = String(word) === String(q.answer);
        const isWrong = wrong.has(word);
        const cls = solved && isAnswer ? 'border-emerald-400 bg-emerald-50 text-emerald-700' : (isWrong ? 'border-rose-400 bg-rose-50 text-rose-700' : 'border-fuchsia-200 bg-white hover:bg-fuchsia-50 text-violet-700');
        return `<button onclick="answerOddOneOut_(${JSON.stringify(word).replace(/"/g,'&quot;')})" class="w-full min-h-[82px] rounded-2xl border-2 ${cls} px-3 py-2 shadow-sm text-center transition-all pastel-btn">
            <div class="font-black text-lg md:text-xl">${escapeHtml(word)}</div>
            ${meta.ipa ? `<div class="mt-1 text-xs md:text-sm font-bold text-slate-500">/${escapeHtml(String(meta.ipa).replace(/^\/|\/$/g,''))}/</div>` : ''}
            ${solved ? `<div class="mt-1 text-xs md:text-sm font-extrabold text-fuchsia-600">${escapeHtml(meta.vietnamese || '')}</div>` : ''}
            <div class="mt-1 text-[10px] font-bold text-slate-400"><i class="fa-solid fa-volume-high mr-1"></i>Tap to listen</div>
        </button>`;
    }).join('');
    document.getElementById('question-box').innerHTML = `<div class="w-full max-w-4xl mx-auto px-2">
        <div class="text-center mb-4"><div class="font-black text-lg md:text-xl text-slate-900">Choose the odd word.</div><div class="text-xs md:text-sm font-bold text-slate-400">Chọn từ khác nhóm. Nghĩa tiếng Việt sẽ hiện sau khi trả lời đúng.</div></div>
        <div class="grid grid-cols-2 gap-3 md:gap-4">${opts}</div>
    </div>`;
    updateNavButtons();
}

function oddWordDifficultyScore_(v) {
    const w = String(v?.word || '').trim();
    const letters = w.replace(/[^A-Za-z]/g,'').length;
    const words = w.split(/\s+/).filter(Boolean).length;
    return letters + Math.max(0, words - 1) * 5 + (w.includes('-') ? 2 : 0);
}

function splitOddOneOutLevels_(pool) {
    const buckets = [[], [], [], []];
    pool.forEach(v => {
        const level = getVocabularyCurriculumLevel_(v);
        if (level >= 1 && level <= 4) buckets[level - 1].push(v);
    });
    return buckets;
}

async function openOddOneOutLevelHub_() {
    resetLectureChrome_(); stopSpeaking(); inMiniGameFlow=false; inAlphaIpaFlow=false;
    activeTopicId=5; activeExamContext=null; activeRoadmapContext=null;
    updateNavTabs('5. Odd One Out','🧩',null);
    showLoadingOverlay('Đang chia 4 level từ vựng...');
    try {
        const pool = await getSharedVocabularyBasePool_();
        const buckets = splitOddOneOutLevels_(pool);
        hideLoadingOverlay();
        document.getElementById('lecture-title').textContent = 'Odd One Out / Tìm từ khác loại';
        document.getElementById('lecture-content').textContent = 'Chọn level từ dễ đến khó. Mỗi level trộn từ vựng của toàn bộ Vocabulary Master và tự tạo câu phân nhóm.';
        document.getElementById('view-lecture').dataset.audioText='';
        setLectureSpeakVisible_(false);
        const html = EXPLORE_LEVEL_GROUPS.map((g,i) => {
            const style=SUBTOPIC_PALETTES[i%SUBTOPIC_PALETTES.length];
            return `<button onclick="openOddOneOutLevel_(${g.level})" class="p-4 ${style.card} border-2 rounded-2xl font-bold text-left transition-all shadow-sm pastel-btn min-h-[88px]">
                <div class="flex items-center justify-between gap-3"><div><div class="text-lg md:text-xl font-black ${style.num}">${g.icon} Level ${g.level} · ${g.name}</div><div class="text-xs md:text-sm text-slate-500 font-extrabold mt-1">${g.name_vi}</div></div><span class="text-xs font-black ${style.badge} px-3 py-1 rounded-full border shrink-0">${buckets[i].length} từ</span></div>
            </button>`;
        }).join('');
        document.getElementById('lecture-subtopics-list').innerHTML=html;
        setSubtopicGridColumns(4);
        document.getElementById('wrap-mix-all-subtopics').classList.add('hidden');
        switchAppView('view-lecture');
    } catch(e) { hideLoadingOverlay(); alert(`Không thể mở Odd One Out: ${e.message}`); }
}

async function openOddOneOutLevel_(level) {
    const pool = await getSharedVocabularyBasePool_();
    const buckets = splitOddOneOutLevels_(pool);
    const g = EXPLORE_LEVEL_GROUPS.find(x=>x.level===Number(level));
    const levelPool = buckets[Number(level)-1] || [];
    let questions = levelPool.map((v,i)=>makeOddOneOutQuestion_(v,levelPool,i)).filter(Boolean);
    if (!questions.length) return alert('Level này chưa đủ từ vựng để tạo câu hỏi.');
    practiceCycleRawPool=[...questions];
    updateNavTabs('5. Odd One Out','🧩',`Level ${g.level} · ${g.name} / ${g.name_vi}`,null,()=>openOddOneOutLevelHub_());
    startTopicQuiz(5,`Odd One Out - Level ${g.level}`,shuffleArray(questions),'5.shared');
}

function renderRemoveLetterShared_(q) {
    const selected = new Set(removeLetterSelections_[currentQIndex] || []);
    const imageOrEmoji = q.image_url
        ? `<img src="${escapeHtml(q.image_url)}" class="max-w-full max-h-full object-contain" onerror="this.style.display='none';this.nextElementSibling.classList.remove('hidden')"><div class="hidden text-6xl">${q.emoji || '🔤'}</div>`
        : `<div class="text-6xl">${q.emoji || '🔤'}</div>`;
    const top = q.tokens.map((t,i) => selected.has(i) ? '' : `<button onclick="toggleRemoveLetterToken_(${i})" class="w-12 h-12 md:w-14 md:h-14 rounded-2xl border-2 border-fuchsia-300 bg-gradient-to-br from-pink-50 to-violet-50 hover:from-pink-100 hover:to-violet-100 text-violet-700 font-black text-xl md:text-2xl shadow-sm">${escapeHtml(t.ch)}</button>`).join('');
    const bottom = [...selected].sort((a,b)=>a-b).map(i => `<button onclick="toggleRemoveLetterToken_(${i})" class="w-12 h-12 md:w-14 md:h-14 rounded-2xl border-2 border-violet-200 bg-gradient-to-br from-pink-50 to-violet-50 hover:from-pink-100 hover:to-violet-100 text-violet-600 font-black text-xl md:text-2xl shadow-sm">${escapeHtml(q.tokens[i].ch)}</button>`).join('');
    const solved = userAnswers[currentQIndex] === q.answer_word;
    document.getElementById('question-box').innerHTML = `
        <div class="w-full max-w-5xl mx-auto px-2">
            <div class="text-center mb-1"><div class="font-black text-base md:text-lg text-slate-900">Remove the extra letter(s).</div><div class="text-[11px] md:text-xs font-bold text-slate-400">Chạm chữ thừa để đưa xuống dưới. Chạm lại để đưa lên.</div></div>
            <div class="rounded-3xl border-2 border-dashed border-fuchsia-200 bg-gradient-to-br from-pink-50/80 via-white to-violet-50/80 p-3 md:p-3.5">
                <div class="w-20 h-20 md:w-20 md:h-20 mx-auto flex items-center justify-center mb-1">${imageOrEmoji}</div>
                <div class="text-center font-black text-slate-700 text-sm md:text-base leading-tight">Meaning: <span class="text-fuchsia-600">${escapeHtml(q.vietnamese || '')}</span></div>
                ${q.ipa ? `<div class="text-center font-black text-violet-600 text-sm md:text-base mt-0.5 mb-1.5">/${escapeHtml(String(q.ipa).replace(/^\/|\/$/g,''))}/</div>` : ''}
                <div class="flex flex-wrap justify-center gap-1.5 min-h-[48px]">${top}</div>
                <div class="mt-2 pt-2 border-t border-dashed border-fuchsia-200 min-h-[58px]">
                    <div class="text-[10px] font-black text-slate-400 text-center mb-1">REMOVED LETTERS</div>
                    <div class="flex flex-wrap justify-center gap-1.5">${bottom || '<span class="text-[11px] font-bold text-violet-300">Tap extra letters above</span>'}</div>
                </div>
                ${solved ? `<div class="mt-1.5 text-center text-sm md:text-base font-black text-fuchsia-600">✓ ${escapeHtml(q.answer_word)}</div>` : ''}
            </div>
        </div>`;
    updateNavButtons();
}

function toggleRemoveLetterToken_(idx) {
    const q = activeQuestionsList[currentQIndex];
    if (!q || q.render_style !== 'remove_letter_shared' || userAnswers[currentQIndex] !== undefined) return;
    const arr = removeLetterSelections_[currentQIndex] || [];
    const p = arr.indexOf(idx);
    if (p >= 0) arr.splice(p,1); else arr.push(idx);
    removeLetterSelections_[currentQIndex] = arr;
    const remaining = q.tokens.filter((_,i)=>!arr.includes(i)).map(t=>t.ch).join('');
    if (remaining.toLowerCase() === String(q.answer_word).toLowerCase()) {
        userAnswers[currentQIndex] = q.answer_word;
        starGreenCount++;
        const el=document.getElementById('star-green-count'); if(el) el.textContent=starGreenCount;
        playAudio('correct');
        confetti({ particleCount: 30, spread: 55, origin: { y: 0.7 } });
    }
    renderRemoveLetterShared_(q);
}

// ==========================================
// CHỦ ĐỀ 1: BẢNG CHỮ CÁI TƯƠNG TÁC (1.1 ĐẾN 1.4)
// ==========================================
function openTopic(topicNum, topicName, icon) {
    if (Number(topicNum) === 2) return openVocabularyHub();
    if ([3, 4].includes(Number(topicNum))) return openSharedVocabActivityHub_(Number(topicNum));
    if (Number(topicNum) === 5) return openOddOneOutLevelHub_();
    if (Number(topicNum) === 6) return openReadingComprehensionHub_();
    if ([7, 8, 9].includes(Number(topicNum))) return openExploreLevelHub_(Number(topicNum));
    resetLectureChrome_();
    stopSpeaking();
    inMiniGameFlow = false;
    // Chỉ mục 11 là nội dung Premium; các mục 1-10 luôn mở cho mọi trạng thái tài khoản.
    if (Number(topicNum) === 11 && !requirePremiumAccess('Practice & Play')) return;
    inAlphaIpaFlow = false;
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

async function loadExploreLevelBank_(topicId) {
    const cfg = EXPLORE_LEVEL_BANKS[Number(topicId)];
    if (!cfg) throw new Error('Không có cấu hình ngân hàng câu hỏi.');
    if (exploreLevelBankCache_[topicId]) return exploreLevelBankCache_[topicId];
    const dataFiles = await loadExploreDataFiles_();
    const part2 = dataFiles[1] || {};
    const data = part2?.explore_level_banks?.[cfg.bankKey];
    if (!data || !Array.isArray(data.questions) || data.questions.length !== 80) throw new Error(`${cfg.title} chưa đủ 80 câu trong Part 2`);
    exploreLevelBankCache_[topicId] = data;
    return data;
}

async function openExploreLevelHub_(topicId) {
    const cfg = EXPLORE_LEVEL_BANKS[Number(topicId)];
    if (!cfg) return;
    resetLectureChrome_(); stopSpeaking(); inMiniGameFlow=false; inAlphaIpaFlow=false;
    activeTopicId=Number(topicId); activeExamContext=null; activeRoadmapContext=null;
    updateNavTabs(`${topicId}. ${cfg.title}`,cfg.icon,null);
    showLoadingOverlay(`Đang chuẩn bị 80 câu ${cfg.vi}...`);
    try {
        const data=await loadExploreLevelBank_(topicId);
        hideLoadingOverlay();
        document.getElementById('lecture-title').textContent=`${cfg.title} / ${cfg.vi}`;
        document.getElementById('lecture-content').textContent='Chọn level theo tiến trình 16 Unit. Mỗi level gồm 20 câu, tương ứng 4 Unit liên tiếp.';
        document.getElementById('view-lecture').dataset.audioText='';
        setLectureSpeakVisible_(false);
        const html=EXPLORE_LEVEL_GROUPS.map((g,i)=>{
            const style=SUBTOPIC_PALETTES[i%SUBTOPIC_PALETTES.length];
            const count=data.questions.filter(q=>Number(q.level)===g.level).length;
            return `<button onclick="openExploreLevelGroup_(${topicId},${g.level})" class="p-4 ${style.card} border-2 rounded-2xl font-bold text-left transition-all shadow-sm pastel-btn min-h-[88px]">
                <div class="flex items-center justify-between gap-3"><div><div class="text-lg md:text-xl font-black ${style.num}">${g.icon} Level ${g.level} · ${g.name}</div><div class="text-xs md:text-sm text-slate-500 font-extrabold mt-1">${g.name_vi} · Unit ${g.units[0]}–${g.units[g.units.length-1]}</div></div><span class="text-xs font-black ${style.badge} px-3 py-1 rounded-full border shrink-0">${count} câu</span></div>
            </button>`;
        }).join('');
        document.getElementById('lecture-subtopics-list').innerHTML=html;
        setSubtopicGridColumns(4);
        document.getElementById('wrap-mix-all-subtopics').classList.add('hidden');
        switchAppView('view-lecture');
    } catch(e) { hideLoadingOverlay(); alert(`Không thể mở ${cfg.vi}: ${e.message}`); }
}

async function openExploreLevelGroup_(topicId, level) {
    stopSpeaking();
    const cfg=EXPLORE_LEVEL_BANKS[Number(topicId)];
    const data=await loadExploreLevelBank_(topicId);
    const g=EXPLORE_LEVEL_GROUPS.find(x=>x.level===Number(level));
    const pool=data.questions.filter(q=>Number(q.level)===Number(level)).map(normalizeQuestion).filter(Boolean);
    if (Number(topicId) === 7) {
        // Sentence Builder state belongs to this exact level/session, never to a numeric question index.
        // This prevents a partial sentence from leaking when switching Level 1/2/3/4.
        Object.keys(sentenceBuilderSelections_).forEach(k => delete sentenceBuilderSelections_[k]);
        sentenceBuilderSessionKey_ = `topic7-level${Number(level)}-${Date.now()}`;
        pool.forEach(q => { q.render_style = 'sentence_builder_tap'; });
    }
    if (Number(topicId) === 8) pool.forEach(q => { q.render_style = 'fill_sentence_interactive'; });
    if (!g || pool.length!==20) return alert('Level này chưa đủ 20 câu.');
    updateNavTabs(`${topicId}. ${cfg.title}`,cfg.icon,`Level ${g.level} · ${g.name} / ${g.name_vi}`,null,()=>openExploreLevelHub_(topicId));
    let shuffledPool = shuffleArray(pool);
    const repeatKey = `${Number(topicId)}-level${Number(level)}`;
    const firstId = q => String(q?.question_id || q?.id || '');
    if (shuffledPool.length > 1 && lastExploreLevelFirstQuestion_[repeatKey] && firstId(shuffledPool[0]) === lastExploreLevelFirstQuestion_[repeatKey]) {
        const swapIndex = 1 + Math.floor(Math.random() * (shuffledPool.length - 1));
        [shuffledPool[0], shuffledPool[swapIndex]] = [shuffledPool[swapIndex], shuffledPool[0]];
    }
    lastExploreLevelFirstQuestion_[repeatKey] = firstId(shuffledPool[0]);
    startTopicQuiz(Number(topicId),`${cfg.title} - Level ${g.level}`,shuffledPool,`${topicId}.level${g.level}`);
}

async function loadReadingComprehensionData_() {
    if (readingComprehensionCache) return readingComprehensionCache;
    const [part1] = await loadExploreDataFiles_();
    const data = part1?.reading_comprehension;
    if (!data || !Array.isArray(data.readings) || data.readings.length !== 80) throw new Error('Kho Đọc hiểu trong Part 1 chưa đủ 80 bài');
    readingComprehensionCache = data;
    return data;
}

async function openReadingComprehensionHub_() {
    resetLectureChrome_(); stopSpeaking(); inMiniGameFlow = false; inAlphaIpaFlow = false;
    activeTopicId = 6; activeExamContext = null; activeRoadmapContext = null; activeReadingGroup = null;
    updateNavTabs('6. Reading Comprehension', '📖', null);
    showLoadingOverlay('Đang chuẩn bị 80 bài Đọc hiểu...');
    try {
        const data = await loadReadingComprehensionData_();
        hideLoadingOverlay();
        document.getElementById('lecture-title').textContent = 'Reading Comprehension / Đọc hiểu';
        document.getElementById('lecture-content').textContent = 'Chọn một nhóm để đọc từ Unit đầu đến Unit sau. Mỗi nhóm có 20 bài, mỗi bài có 2 câu hỏi.';
        document.getElementById('view-lecture').dataset.audioText = '';
        setLectureSpeakVisible_(false);
        const icons = ['🌱','🌼','🌟','🏆'];
        const html = data.groups.map((g,i) => {
            const style = SUBTOPIC_PALETTES[i % SUBTOPIC_PALETTES.length];
            const count = data.readings.filter(r => Number(r.group) === Number(g.group)).length;
            return `<button onclick="openReadingGroup_(${g.group})" class="p-4 ${style.card} border-2 rounded-2xl font-bold text-left transition-all shadow-sm pastel-btn min-h-[88px]">
                <div class="flex items-center justify-between gap-3"><div><div class="text-lg md:text-xl font-black ${style.num}">${icons[i]} ${escapeHtml(g.name)}</div><div class="text-xs md:text-sm text-slate-500 font-extrabold mt-1">${escapeHtml(g.name_vi)} · Unit ${g.units[0]}–${g.units[g.units.length-1]}</div></div><span class="text-xs font-black ${style.badge} px-3 py-1 rounded-full border shrink-0">${count} bài</span></div>
            </button>`;
        }).join('');
        document.getElementById('lecture-subtopics-list').innerHTML = html;
        setSubtopicGridColumns(4);
        document.getElementById('wrap-mix-all-subtopics').classList.add('hidden');
        switchAppView('view-lecture');
    } catch (e) { hideLoadingOverlay(); alert(`Không thể mở Đọc hiểu: ${e.message}`); }
}

async function openReadingGroup_(groupId) {
    stopSpeaking();
    const data = await loadReadingComprehensionData_();
    const g = data.groups.find(x => Number(x.group) === Number(groupId));
    const pool = data.readings.filter(r => Number(r.group) === Number(groupId)).map(r => ({...r, render_style:'reading_pair'}));
    if (!g || !pool.length) return;
    activeReadingGroup = g;
    readingPairState = {};
    updateNavTabs('6. Reading Comprehension', '📖', `${g.name} / ${g.name_vi}`);
    startTopicQuiz(6, `${g.name} / ${g.name_vi}`, pool, `reading-group-${groupId}`);
}

function speakReadingPassage_() {
    const q = activeQuestionsList[currentQIndex];
    if (q && q.render_style === 'reading_pair') speakEnglish(q.tts_text || q.passage || '', 0.92);
}

function renderReadingPair_(q) {
    const key = q.reading_id || String(currentQIndex);
    if (!readingPairState[key]) readingPairState[key] = {correct:[false,false], chosen:[null,null]};
    const state = readingPairState[key];
    const isDialogue = q.passage_type === 'dialogue';
    const passage = isDialogue ? String(q.passage||'').split('\n').map(line => {
        const m=line.match(/^([AB]):\s*(.*)$/); if(!m) return `<p class="mb-2">${escapeHtml(line)}</p>`;
        return `<div class="flex gap-2 mb-2"><span class="w-7 h-7 shrink-0 rounded-full bg-fuchsia-100 text-fuchsia-700 flex items-center justify-center font-black text-xs">${m[1]}</span><div class="flex-1 bg-white border border-pink-100 rounded-2xl px-3 py-2 font-bold">${escapeHtml(m[2])}</div></div>`;
    }).join('') : `<p class="text-sm md:text-base font-bold text-slate-800 leading-7 whitespace-pre-line">${escapeHtml(q.passage||'')}</p>`;
    const questionsHtml=(q.questions||[]).map((item,qi)=>{
        const opts=(item.options||[]).map((opt,oi)=>{
            const chosen=state.chosen[qi]===oi, correct=state.correct[qi] && opt===item.answer;
            const cls=correct?'border-emerald-400 bg-emerald-50 text-emerald-700':(chosen&&!state.correct[qi]?'border-rose-400 bg-rose-50 text-rose-700':'border-pink-200 bg-white hover:bg-pink-50 text-slate-800');
            return `<button onclick="answerReadingQuestion_(${qi},${oi})" class="w-full text-left px-3 py-2.5 rounded-xl border-2 ${cls} font-extrabold text-sm transition-all"><span class="text-pink-500 mr-2">${String.fromCharCode(65+oi)}.</span>${escapeHtml(opt)}</button>`;
        }).join('');
        return `<section class="rounded-2xl border border-pink-100 bg-white p-3 shadow-sm"><div class="flex gap-2 items-start mb-2"><span class="w-7 h-7 rounded-full bg-pink-500 text-white flex items-center justify-center font-black text-xs shrink-0">${qi+1}</span><h3 class="font-black text-slate-900 text-sm md:text-base leading-snug">${escapeHtml(item.question)}</h3></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-2">${opts}</div>${state.correct[qi]?'<div class="mt-2 text-xs font-black text-emerald-600">✓ Correct / Chính xác</div>':''}</section>`;
    }).join('');
    const allDone=state.correct.every(Boolean);
    document.getElementById('question-box').innerHTML=`<div class="w-full max-w-6xl mx-auto"><div class="flex items-center justify-between gap-2 mb-3"><div class="text-xs md:text-sm font-black text-pink-600 bg-pink-50 border border-pink-100 rounded-full px-3 py-1">Passage ${currentQIndex+1} / ${activeQuestionsList.length} · Unit ${q.unit}</div><button onclick="speakReadingPassage_()" class="px-3 py-2 rounded-full bg-violet-50 border border-violet-200 text-violet-700 font-black text-xs md:text-sm pastel-btn"><i class="fa-solid fa-volume-high mr-1"></i>Listen Passage</button></div><div class="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-3 items-start"><section class="rounded-3xl border-2 border-dashed border-pink-300 bg-gradient-to-br from-pink-50 to-violet-50 p-4 text-left"><div class="text-xs font-black text-fuchsia-500 uppercase tracking-wide mb-1">${escapeHtml(q.unit_title||'')}</div><h2 class="text-lg md:text-xl font-black text-pink-700 mb-3">${escapeHtml(q.title||'')}</h2>${passage}</section><div class="grid grid-cols-1 gap-3">${questionsHtml}</div></div>${allDone?'<div class="mt-3 text-center text-sm font-black text-emerald-600">🌟 Great job! Cả 2 câu đều đúng.</div>':''}</div>`;
    const next=document.getElementById('btn-next-q-prac'); if(next){next.onclick=nextReadingPair_; next.disabled=!allDone; next.classList.toggle('opacity-40',!allDone); next.classList.toggle('cursor-not-allowed',!allDone);}
}

function answerReadingQuestion_(qi, oi) {
    const q=activeQuestionsList[currentQIndex]; if(!q || q.render_style!=='reading_pair') return;
    const key=q.reading_id||String(currentQIndex), state=readingPairState[key]||(readingPairState[key]={correct:[false,false],chosen:[null,null]});
    if(state.correct[qi]) return;
    const item=q.questions[qi], opt=item.options[oi]; state.chosen[qi]=oi;
    if(opt===item.answer){state.correct[qi]=true; playSound(true);} else playSound(false);
    renderReadingPair_(q);
}

function nextReadingPair_() {
    const q=activeQuestionsList[currentQIndex], state=q && readingPairState[q.reading_id||String(currentQIndex)];
    if(!state || !state.correct.every(Boolean)) return;
    if(currentQIndex < activeQuestionsList.length-1){currentQIndex++; loadQuestion();}
    else { alert('🎉 Bé đã hoàn thành 20 bài Đọc hiểu trong nhóm này!'); openReadingComprehensionHub_(); }
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
    resetLectureChrome_();
    document.getElementById('wrap-mix-all-subtopics').classList.remove('hidden');
    document.getElementById('btn-mix-all-subtopics').setAttribute('onclick', 'selectSubtopic(null)');
    pendingTopicQuiz = { topicNum, topicName, questions: topicObj.questions };
    
    document.getElementById('lecture-title').textContent = topicObj.lecture_title || topicName;
    document.getElementById('lecture-content').textContent = topicObj.lecture_content || topicObj.description || 'Chào mừng bé yêu! Hãy chọn một mục nhỏ bên dưới để bắt đầu luyện tập nhé.';
    document.getElementById('view-lecture').dataset.audioText = topicObj.lecture_audio_text || topicObj.lecture_content || topicObj.description || '';
    setLectureSpeakVisible_(![5,6,7,8,9,10].includes(Number(topicNum)));

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

    updateNavTabs(topicName, topicNum === 11 ? '🧠' : (TOPICS_CONFIG.find(t => t.id === topicNum)?.icon || '🔢'), null);
    switchAppView('view-lecture');
}

function speakLecture() {
    speakVietnamese(document.getElementById('view-lecture').dataset.audioText || '', 0.96);
}

let pendingPairedGroupContext = null;

function selectSubtopic(idx) {
    stopSpeaking();
    if (!pendingTopicQuiz) return;
    const { topicNum, topicName, questions, groups, groupMap, groupLabels } = pendingTopicQuiz;

    if (idx === null) {
        return launchSubtopicQuiz(topicNum, topicName, questions, null, null);
    }

    const subLabel = groups[idx];
    const pool = groupMap[subLabel];
    const displayLabel = beautifySubtopicName(groupLabels[subLabel]);

    // Dữ liệu 3 cấp (VD Vocabulary: Flashcards Library lại chia tiếp thành 6 Nhóm Kép) —
    // phải hiện thêm màn chọn Nhóm Kép trước khi vào bài, KHÔNG được gộp thẳng thành 1 pool lớn.
    const pairedGroups = [...new Set(pool.map(q => q.paired_group).filter(Boolean))];
    if (pairedGroups.length > 1) {
        return showPairedGroupMenu(topicNum, topicName, subLabel, displayLabel, pool, pairedGroups);
    }
    launchSubtopicQuiz(topicNum, topicName, pool, subLabel, displayLabel);
}

function showPairedGroupMenu(topicNum, topicName, subLabel, displayLabel, pool, pairedGroups) {
    pendingPairedGroupContext = { topicNum, topicName, subLabel, displayLabel, pool, pairedGroups };

    document.getElementById('lecture-title').textContent = displayLabel;
    const introText = `Chọn 1 trong ${pairedGroups.length} Nhóm Kép để bắt đầu luyện "${displayLabel}" nhé!`;
    document.getElementById('lecture-content').textContent = introText;
    document.getElementById('view-lecture').dataset.audioText = introText;

    let html = '';
    pairedGroups.forEach((pg, i) => {
        const style = SUBTOPIC_PALETTES[i % SUBTOPIC_PALETTES.length];
        const count = pool.filter(q => q.paired_group === pg).length;
        html += `
            <button onclick="selectPairedGroup(${i})" class="p-3 ${style.card} border-2 rounded-xl font-bold text-left transition-all flex items-center justify-between shadow-sm pastel-btn">
                <span class="text-sm md:text-base leading-snug"><strong class="${style.num} mr-1.5">${i + 1}.</strong> ${escapeHtml(pg)}</span>
                <span class="text-xs font-extrabold ${style.badge} px-2.5 py-0.5 rounded-full border shrink-0 ml-1.5 shadow-inner">${count} câu</span>
            </button>`;
    });
    document.getElementById('lecture-subtopics-list').innerHTML = html;
    setSubtopicGridColumns(pairedGroups.length);

    // Nút "Học trộn tất cả" ở đây nghĩa là trộn tất cả 6 Nhóm Kép của RIÊNG mục nhỏ này
    document.getElementById('wrap-mix-all-subtopics').classList.remove('hidden');
    document.getElementById('btn-mix-all-subtopics').setAttribute('onclick', 'selectPairedGroup(null)');

    updateNavTabs(topicName, topicNum === 11 ? '🧠' : (TOPICS_CONFIG.find(t => t.id === topicNum)?.icon || '🔢'), displayLabel);
    switchAppView('view-lecture');
}

function selectPairedGroup(i) {
    stopSpeaking();
    if (!pendingPairedGroupContext) return;
    const { topicNum, topicName, subLabel, displayLabel, pool, pairedGroups } = pendingPairedGroupContext;
    const chosenPool = (i === null) ? pool : pool.filter(q => q.paired_group === pairedGroups[i]);
    const finalLabel = (i === null) ? displayLabel : `${displayLabel} - ${pairedGroups[i]}`;
    launchSubtopicQuiz(topicNum, topicName, chosenPool, subLabel, finalLabel);
}

function launchSubtopicQuiz(topicNum, topicName, pool, subLabel, displayLabel) {
    const finalTitle = displayLabel ? `${topicName} - ${displayLabel}` : topicName;
    practiceCycleRawPool = [...pool];
    const firstCycleQuestions = shuffleArray([...pool]);

    updateNavTabs(topicName, topicNum === 11 ? '🧠' : (TOPICS_CONFIG.find(t => t.id === topicNum)?.icon || '🔢'), displayLabel || 'Tất cả các mục');
    startTopicQuiz(topicNum, finalTitle, firstCycleQuestions, subLabel);
}

// ==========================================
// TIẾN TRÌNH TUẦN: BẢN ĐỒ SVG
// ==========================================
function handleNextExamFromReport() {
    stopSpeaking();
    if (activeRoadmapContext) {
        activeRoadmapContext = null;
        openRoadmap();
    } else if (activeExamContext) {
        activeExamContext = null;
        openExamHub();
    } else {
        goHome();
    }
}

function openRoadmap() {
    stopSpeaking();
    inMiniGameFlow = false;
    if (!requirePremiumAccess('Bản đồ tuần / Tiến trình tuần')) return;
    inAlphaIpaFlow = false;
    updateNavTabs("Bản đồ tiến trình tuần", "🗺️", null);
    renderRoadmapSVG();
    switchAppView('view-roadmap');
}

function wrapCaptionLines(text, maxLen = 24, maxLines = 3) {
    const words = String(text || '').split(' ');
    const lines = [''];
    for (const w of words) {
        const cur = lines[lines.length - 1];
        const candidate = (cur + ' ' + w).trim();
        if (candidate.length <= maxLen) {
            lines[lines.length - 1] = candidate;
        } else if (lines.length < maxLines) {
            lines.push(w);
        } else {
            lines[lines.length - 1] = candidate;
        }
    }
    while (lines.length < maxLines) lines.push('');
    if (lines[maxLines - 1].length > maxLen) {
        lines[maxLines - 1] = lines[maxLines - 1].slice(0, maxLen - 1) + '…';
    }
    return lines.slice(0, maxLines);
}

function renderRoadmapSVG() {
    const container = document.getElementById('roadmap-svg-container');
    if (!container) return;
    const tuanHienTai = Number(currentUser?.tuanHienTai) || 1;

    let nodesHtml = '';
    for (let w = 1; w <= TOTAL_ROADMAP_WEEKS; w++) {
        const item = roadmapConfig[w];
        const coord = getRoadmapCoord(w);
        const isDone = w < tuanHienTai;
        const isCurrent = w === tuanHienTai;
        const isLocked = w > tuanHienTai;

        let nodeColor = isDone ? "#10b981" : (isCurrent ? "#ec4899" : "#cbd5e1");
        let strokeColor = isDone ? "#34d399" : (isCurrent ? "#f43f5e" : "#94a3b8");
        let badgeHtml = '';

        if (isDone) {
            badgeHtml = `<text x="${coord.x}" y="${coord.y + 32}" text-anchor="middle" font-size="12" fill="#f59e0b">⭐⭐⭐</text>`;
        } else if (isCurrent) {
            badgeHtml = `<text x="${coord.x}" y="${coord.y + 32}" text-anchor="middle" font-size="10" font-weight="900" fill="#ec4899">Đang học</text>`;
        } else {
            badgeHtml = `<text x="${coord.x}" y="${coord.y + 30}" text-anchor="middle" font-size="11" fill="#94a3b8">🔒 Khóa</text>`;
        }

        const cursorCls = isLocked ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:scale-105 transition-transform";
        const animCls = isCurrent ? "node-current" : "";

        nodesHtml += `
            <g class="${cursorCls} ${animCls}" onclick="selectRoadmapWeek(${w})" id="svg-node-week-${w}">
                <circle cx="${coord.x}" cy="${coord.y}" r="32" fill="#ffffff" stroke="${strokeColor}" stroke-width="3" filter="drop-shadow(0 3px 4px rgba(0,0,0,0.08))"/>
                <circle cx="${coord.x}" cy="${coord.y}" r="26" fill="${nodeColor}" opacity="${isLocked ? '0.25' : '0.15'}"/>
                <text x="${coord.x}" y="${coord.y - 3}" text-anchor="middle" font-size="18">${item.icon || '🔢'}</text>
                <text x="${coord.x}" y="${coord.y + 13}" text-anchor="middle" font-size="10" font-weight="800" fill="${isLocked ? '#64748b' : '#1e293b'}">Tuần ${w}</text>
                ${badgeHtml}
            </g>
        `;
    }

    const pathD = buildRoadmapPathD(TOTAL_ROADMAP_WEEKS);
    const svgHtml = `
        <svg viewBox="0 0 650 400" preserveAspectRatio="xMidYMid meet" class="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
            <path d="${pathD}" fill="none" stroke="#fbcfe8" stroke-width="9" stroke-dasharray="11,11" stroke-linecap="round"/>
            <path d="${pathD}" fill="none" stroke="#f472b6" stroke-width="3" stroke-dasharray="11,11" stroke-linecap="round"/>
            ${nodesHtml}
        </svg>
    `;
    container.innerHTML = svgHtml;
}

async function selectRoadmapWeek(weekNum) {
    stopSpeaking();
    const config = roadmapConfig[weekNum];
    if (!config) return;
    
    const tuanHienTai = Number(currentUser?.tuanHienTai) || 1;
    if (weekNum > tuanHienTai) {
        return alert(`Tuần ${weekNum} đang bị khóa. Bé hãy hoàn thành Tuần ${tuanHienTai} đạt từ 80% trở lên để mở khóa nhé!`);
    }

    if (config.isExam) return openExamHub();

    activeRoadmapContext = { week: weekNum, topicId: config.subIds[0] || '1.1', chuDe: config.name, isReview15: !!(config.isGrandReview || config.isReview15) };
    pendingTopicQuiz = null; activeExamContext = null;
    const topicLabel = config.name.replace(/^Tuần\s*\d+:\s*/i, '');
    updateNavTabs("Tiến trình tuần", "📅", `Tuần ${weekNum}`, topicLabel);

    const isReviewMode = !!(config.isGrandReview || config.isReview15);
    showLoadingOverlay(isReviewMode ? `Đang chuẩn bị đề ôn tổng hợp 15 câu Tuần ${weekNum}...` : `Đang bốc 30 câu hỏi Tuần ${weekNum} (tỷ lệ 3:4:3)...`);
    try {
        await fetchAllTopicsData();
        hideLoadingOverlay();

        const weekQuestions = isReviewMode ? generateReview15(weekNum) : getQuestionsForWeek343(weekNum);
        if (!weekQuestions.length) return alert('Tuần này đang chuẩn bị thêm câu hỏi, bé quay lại sau nhé!');

        startTopicQuiz(weekNum, config.name, weekQuestions, null);
    } catch (err) {
        hideLoadingOverlay();
        alert(`Lỗi tải dữ liệu tuần: ${err.message}`);
    }
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
    if (Number(topicNum) === 7) {
        Object.keys(sentenceBuilderSelections_).forEach(k => delete sentenceBuilderSelections_[k]);
        if (!sentenceBuilderSessionKey_) sentenceBuilderSessionKey_ = `topic7-${Date.now()}`;
    }

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

function toggleFlashcardVietnamese() {
    const btn = document.getElementById('flashcard-vi-btn');
    const items = Array.from(document.querySelectorAll('.flashcard-vi-text'));
    if (!btn || !items.length) return;
    const willShow = items.some(el => el.classList.contains('hidden'));
    items.forEach(el => el.classList.toggle('hidden', !willShow));
    btn.innerHTML = willShow
        ? '<i class="fa-solid fa-eye-slash mr-1.5"></i>Hide Vietnamese / Ẩn nghĩa'
        : '<i class="fa-solid fa-language mr-1.5"></i>Vietnamese Meaning / Nghĩa Tiếng Việt';
}

function speakFlashcardWord() {
    const q = activeQuestionsList[currentQIndex];
    if (!q || q.render_style !== 'vocab_flashcard') return;
    speakEnglish(q.word || '', 0.9);
}

function speakFlashcardExample(i) {
    const q = activeQuestionsList[currentQIndex];
    if (!q || q.render_style !== 'vocab_flashcard') return;
    const text = Array.isArray(q.examples) ? q.examples[i] : '';
    if (text) speakEnglish(text, 0.92);
}

function renderVocabularyFlashcard_(q) {
    const imageOrEmoji = q.image_url
        ? `<img src="${escapeHtml(q.image_url)}" alt="${escapeHtml(q.word)}" class="w-full h-full object-cover rounded-3xl" onerror="this.style.display='none'; const f=this.nextElementSibling; if(f) f.classList.remove('hidden');">
           <div class="hidden w-full h-full items-center justify-center text-7xl md:text-8xl">${q.emoji || '✨'}</div>`
        : `<div class="w-full h-full flex items-center justify-center text-7xl md:text-8xl">${q.emoji || '✨'}</div>`;

    const examples = (Array.isArray(q.examples) ? q.examples : []).slice(0,3);
    const exHtml = examples.map((ex, i) => `
        <div class="flex items-start gap-2 bg-white/80 border border-violet-100 rounded-2xl px-3 py-2">
            <button onclick="speakFlashcardExample(${i})" class="w-8 h-8 shrink-0 rounded-full bg-violet-100 text-violet-700 hover:bg-violet-200" title="Listen">
                <i class="fa-solid fa-volume-high text-xs"></i>
            </button>
            <div class="text-left"><span class="font-black text-violet-600 mr-1">${i+1}.</span><span class="font-bold text-slate-700">${escapeHtml(ex)}</span></div>
        </div>`).join('');

    const html = `
        <div class="w-full max-w-5xl mx-auto px-2">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 items-stretch">
                <section class="rounded-3xl border-2 border-pink-200 bg-gradient-to-br from-white to-pink-50 p-4 md:p-5 shadow-sm">
                    <div class="w-full aspect-square max-h-[300px] md:max-h-[330px] bg-white border border-pink-100 rounded-3xl overflow-hidden flex items-center justify-center mx-auto mb-4">
                        ${imageOrEmoji}
                    </div>
                    <div class="flex items-center justify-center gap-2 flex-wrap">
                        <h2 class="text-3xl md:text-4xl font-black text-pink-600">${escapeHtml(q.word || '')}</h2>
                        <button onclick="speakFlashcardWord()" class="w-10 h-10 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200" title="Listen"><i class="fa-solid fa-volume-high"></i></button>
                    </div>
                    ${q.ipa ? `<div class="text-base md:text-lg font-bold text-slate-500 text-center mt-1">/${escapeHtml(String(q.ipa).replace(/^\/|\/$/g,''))}/</div>` : ''}
                    <div class="mt-4 space-y-2">${exHtml}</div>
                </section>

                <section class="rounded-3xl border-2 border-violet-200 bg-gradient-to-br from-white to-violet-50 p-4 md:p-5 shadow-sm flex flex-col">
                    <div class="text-center md:text-left">
                        <div class="text-xs font-black uppercase tracking-wider text-violet-500">Vietnamese support</div>
                        <h3 class="text-xl md:text-2xl font-black text-violet-700 mt-1">Nghĩa Tiếng Việt</h3>
                        <p class="text-xs md:text-sm text-slate-500 mt-1">Bấm nút bên dưới khi con cần xem nghĩa.</p>
                    </div>
                    <button id="flashcard-vi-btn" onclick="toggleFlashcardVietnamese()" class="mt-5 w-full px-4 py-3 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-black shadow-sm">
                        <i class="fa-solid fa-language mr-1.5"></i>Vietnamese Meaning / Nghĩa Tiếng Việt
                    </button>
                    <div id="flashcard-vi-panel" class="hidden mt-4 flex-1 rounded-3xl bg-white border-2 border-dashed border-violet-200 p-5 flex items-center justify-center">
                        <div class="text-center">
                            <div class="text-sm font-bold text-slate-400 mb-1">${escapeHtml(q.word || '')}</div>
                            <div class="text-2xl md:text-3xl font-black text-violet-700">${escapeHtml(q.vietnamese || '')}</div>
                        </div>
                    </div>
                </section>
            </div>
        </div>`;

    document.getElementById('question-box').innerHTML = html;
}


const sentenceBuilderSelections_ = {};
let sentenceBuilderSessionKey_ = '';
let lastExploreLevelFirstQuestion_ = {};

function sentenceBuilderStateKey_(q) {
    const qid = String(q?.question_id || q?.id || currentQIndex);
    return `${sentenceBuilderSessionKey_}::${qid}`;
}

function sentenceBuilderNormalize_(text) {
    return String(text || '')
        .replace(/\s+([?.!,])/g, '$1')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();
}

function sentenceBuilderTokenIpa_(token) {
    const clean = String(token || '').replace(/^[^A-Za-z']+|[^A-Za-z']+$/g, '');
    if (!clean) return '';
    const common = {
        'a':'ə','an':'æn','the':'ðə','i':'aɪ','you':'juː','he':'hiː','she':'ʃiː','it':'ɪt','we':'wiː','they':'ðeɪ',
        'my':'maɪ','your':'jɔː','our':'aʊə','his':'hɪz','her':'hɜː','is':'ɪz','are':'ɑː','am':'æm','can':'kæn',
        "can't":'kɑːnt','do':'duː','does':'dʌz','have':'hæv','has':'hæz','there':'ðeə','this':'ðɪs','these':'ðiːz',
        'what':'wɒt','where':'weə','how':'haʊ','yes':'jes','no':'nəʊ','not':'nɒt','in':'ɪn','on':'ɒn','under':'ˈʌndə',
        'near':'nɪə','at':'æt','to':'tuː','with':'wɪð','and':'ænd','of':'əv','some':'sʌm','here':'hɪə','over':'ˈəʊvə',
        'together':'təˈɡeðə','please':'pliːz','me':'miː','like':'laɪk','want':'wɒnt','see':'siː','look':'lʊk',
        "let's":'lets',"he's":'hiːz',"she's":'ʃiːz',"it's":'ɪts',"they're":'ðeə',"what's":'wɒts'
    };
    const key=clean.toLowerCase();
    return common[key] || getVocabularyIpaForWord_(clean) || '';
}

function sentenceBuilderGetTokens_(q) {
    if (!q._sentenceBuilderTokens) {
        q._sentenceBuilderTokens = String(q.answer || '').trim().split(/\s+/).map((text, id) => ({ id, text }));
        q._sentenceBuilderOrder = shuffleArray(q._sentenceBuilderTokens.map(x => x.id));
    }
    return q._sentenceBuilderTokens;
}

function renderSentenceBuilderTap_(q) {
    const tokens = sentenceBuilderGetTokens_(q);
    const stateKey = sentenceBuilderStateKey_(q);
    const selected = sentenceBuilderSelections_[stateKey] || [];
    const completed = userAnswers[currentQIndex] !== undefined;
    const selectedSet = new Set(selected);
    const chosen = completed ? tokens.map(x=>x.id) : selected;
    const chosenText = chosen.map(id => tokens.find(t=>t.id===id)?.text || '').join(' ');
    const available = (q._sentenceBuilderOrder || tokens.map(x=>x.id)).filter(id => !selectedSet.has(id) && !completed);
    const meaning = q.meaning_vi || q.question_text_vi || '';

    const chosenHtml = chosen.length
        ? chosen.map(id => {
            const t=tokens.find(x=>x.id===id); if(!t) return '';
            return `<button ${completed?'disabled':''} onclick="sentenceBuilderUnpick_(${id})" class="px-3.5 py-2 rounded-xl border-2 ${completed?'bg-emerald-50 border-emerald-300 text-emerald-700':'bg-white border-fuchsia-300 text-fuchsia-700 hover:bg-fuchsia-50'} font-black text-base md:text-lg transition-all">${escapeHtml(t.text)}</button>`;
          }).join('')
        : `<span class="text-slate-400 italic font-bold text-sm md:text-base">Tap the words below to build the sentence...</span>`;

    const wordHtml = available.map(id => {
        const t=tokens.find(x=>x.id===id); if(!t) return '';
        const ipa=sentenceBuilderTokenIpa_(t.text);
        return `<button onclick="sentenceBuilderPick_(${id})" class="min-w-[76px] px-4 py-2.5 rounded-2xl border-2 border-fuchsia-300 bg-gradient-to-b from-white to-pink-50 hover:from-pink-50 hover:to-violet-50 shadow-sm transition-all text-fuchsia-700 font-black">
            <div class="text-base md:text-lg leading-tight">${escapeHtml(t.text)}</div>
            ${ipa?`<div class="text-xs md:text-sm text-violet-500 font-extrabold mt-1">/${escapeHtml(ipa.replace(/^\/|\/$/g,''))}/</div>`:''}
        </button>`;
    }).join('');

    const html = `
        <div class="w-full max-w-4xl mx-auto px-2 -mt-4 md:-mt-6">
            <div class="relative mb-1.5 min-h-[32px] flex items-center justify-center">
                <div class="text-center leading-tight">
                    <div class="text-base md:text-xl font-black text-slate-800">Tap words in correct order to make a sentence.</div>
                    <div class="text-sm md:text-base font-bold text-fuchsia-500 mt-0.5">Chạm các từ theo đúng thứ tự để tạo thành câu.</div>
                </div>
                ${completed ? `<button onclick="speakEnglish(decodeURIComponent('${encodeURIComponent(String(q.answer || ''))}'))" class="absolute right-0 top-1/2 -translate-y-1/2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 text-white font-black text-xs md:text-sm shadow-md hover:brightness-105"><i class="fa-solid fa-volume-high mr-1.5"></i>Listen</button>` : ''}
            </div>

            <div class="bg-transparent px-0 py-0">
                <div class="min-h-[52px] rounded-2xl border-2 border-pink-200 bg-white/90 px-3 py-2.5 flex flex-wrap items-center justify-center gap-2 shadow-sm">
                    ${chosenHtml}
                </div>
                <div id="sentence-builder-feedback" class="text-center min-h-[18px] mt-1 text-sm font-extrabold ${completed?'text-emerald-600':'text-fuchsia-500'}">${completed?'✓ Excellent! The sentence is correct.':''}</div>
                ${completed && meaning ? `<div class="mt-1.5 rounded-2xl bg-white border-2 border-violet-200 px-4 py-2.5 text-center text-base md:text-lg"><span class="font-black text-violet-700">Meaning: </span><span class="font-extrabold text-slate-700">${escapeHtml(meaning)}</span></div>` : ''}
            </div>

            ${!completed ? `<div class="mt-1 flex flex-wrap items-stretch justify-center gap-2 md:gap-2.5">${wordHtml}</div>` : ''}
        </div>`;

    document.getElementById('question-box').innerHTML = html;
    updateNavButtons();
    updateQuizPalletUI();
}

function sentenceBuilderPick_(id) {
    const q=activeQuestionsList[currentQIndex];
    if (!q || q.render_style!=='sentence_builder_tap' || userAnswers[currentQIndex]!==undefined) return;
    const tokens=sentenceBuilderGetTokens_(q);
    const stateKey=sentenceBuilderStateKey_(q);
    const sel=sentenceBuilderSelections_[stateKey] || (sentenceBuilderSelections_[stateKey]=[]);
    const pickedId=Number(id);

    // The upper sentence area must always contain the correct sentence prefix.
    // Only accept the next token in the answer order; a wrong tap stays below.
    const expectedId=sel.length;
    if (pickedId !== expectedId) {
        renderSentenceBuilderTap_(q);
        const fb=document.getElementById('sentence-builder-feedback');
        if (fb) {
            fb.textContent='Try another word.';
            fb.className='text-center min-h-[20px] mt-1.5 text-sm font-extrabold text-rose-500';
        }
        return;
    }

    if (!sel.includes(pickedId)) sel.push(pickedId);
    if (sel.length===tokens.length) {
        checkAnswer(q.answer);
        renderSentenceBuilderTap_(q);
        setTimeout(()=>speakEnglish(q.answer),180);
        return;
    }
    renderSentenceBuilderTap_(q);
}

function sentenceBuilderUnpick_(id) {
    const q=activeQuestionsList[currentQIndex];
    if (!q || q.render_style!=='sentence_builder_tap' || userAnswers[currentQIndex]!==undefined) return;
    const stateKey=sentenceBuilderStateKey_(q);
    const sel=sentenceBuilderSelections_[stateKey] || [];
    const pos=sel.indexOf(Number(id));
    if (pos>=0) sel.splice(pos,1);
    renderSentenceBuilderTap_(q);
}

function renderFillSentenceInteractive_(q) {
    const solved = userAnswers[currentQIndex] === q.answer;
    const wrong = new Set(wrongAttemptsByQ[currentQIndex] || []);
    const sentence = solved ? (q.completed_sentence || String(q.question_text || '').replace(/_{2,}/g, q.answer)) : (q.question_text || '');
    const sentenceVi = solved ? (q.completed_sentence_vi || '') : '';
    let sentenceHtml = escapeHtml(sentence);
    if (solved && q.answer) {
        const rawSentence = String(sentence);
        const rawAnswer = String(q.answer);
        const pos = rawSentence.toLocaleLowerCase().indexOf(rawAnswer.toLocaleLowerCase());
        if (pos >= 0) {
            sentenceHtml = escapeHtml(rawSentence.slice(0, pos))
                + `<span class="text-rose-500 font-black">${escapeHtml(rawSentence.slice(pos, pos + rawAnswer.length))}</span>`
                + escapeHtml(rawSentence.slice(pos + rawAnswer.length));
        }
    }
    const instructionEn = q.instruction_en || 'Choose the correct word to complete the sentence.';
    const instructionVi = q.instruction_vi || 'Chọn từ đúng để hoàn thành câu.';

    const optionsHtml = (q.options || []).map((opt, idx) => {
        const ipa = q.options_ipa && q.options_ipa[idx] ? String(q.options_ipa[idx]).replace(/^\/|\/$/g,'') : '';
        const isCorrect = solved && opt === q.answer;
        const isWrong = wrong.has(opt);
        const disabled = isWrong ? 'disabled' : '';
        const cls = isCorrect
            ? 'border-emerald-400 bg-emerald-50 text-emerald-800'
            : (isWrong ? 'border-rose-400 bg-rose-50 text-rose-700 opacity-75' : 'border-pink-200 bg-white hover:bg-pink-50 text-slate-800');
        return `<button ${disabled} data-opt="${escapeHtml(opt)}" onclick="checkFillSentenceInteractive_(decodeURIComponent('${encodeURIComponent(String(opt))}'))" class="option-btn w-full min-h-[72px] px-4 py-3 rounded-2xl border-2 ${cls} text-left transition-all shadow-sm pastel-btn">
            <div class="flex items-start gap-3">
                <span class="text-pink-600 font-black text-lg shrink-0">${String.fromCharCode(65+idx)}.</span>
                <div class="min-w-0">
                    <div class="font-black text-base md:text-lg">${escapeHtml(capitalizeFirstLetter(opt))}</div>
                    ${ipa ? `<div class="text-xs md:text-sm font-extrabold text-violet-500 mt-0.5">/${escapeHtml(ipa)}/</div>` : ''}
                    ${isCorrect && q.answer_vi ? `<div class="text-xs md:text-sm font-bold text-fuchsia-600 mt-1">Meaning: ${escapeHtml(q.answer_vi)}</div>` : ''}
                </div>
            </div>
        </button>`;
    }).join('');

    document.getElementById('question-box').innerHTML = `
        <div class="w-full max-w-4xl mx-auto px-2">
            <div class="text-center mb-3">
                <div class="text-base md:text-xl font-black text-slate-900">${escapeHtml(instructionEn)}</div>
                <div class="text-sm md:text-base font-bold text-fuchsia-500 mt-1">${escapeHtml(instructionVi)}</div>
            </div>

            <div class="relative rounded-3xl border-2 border-dashed border-pink-300 bg-gradient-to-br from-pink-50/80 via-white to-violet-50/80 p-4 md:p-5 shadow-sm">
                <button onclick="speakFillSentence_()" ${solved ? '' : 'disabled'} class="absolute right-3 md:right-4 top-3 md:top-4 px-3.5 py-2 rounded-xl font-black text-xs md:text-sm shadow-sm inline-flex items-center gap-1.5 ${solved ? 'bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 text-white hover:brightness-105' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}">
                    <i class="fa-solid fa-volume-high"></i><span>Listen</span>
                </button>
                <div class="text-center px-16 md:px-20">
                    <div class="text-xl md:text-2xl font-black text-slate-900 leading-snug">${sentenceHtml}</div>
                    ${sentenceVi ? `<div class="mt-2 text-base md:text-lg font-extrabold text-violet-700">${escapeHtml(sentenceVi)}</div>` : ''}
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-4">${optionsHtml}</div>
        </div>`;
    updateNavButtons();
    updateQuizPalletUI();
}

function speakFillSentence_() {
    const q = activeQuestionsList[currentQIndex];
    if (!q || q.render_style !== 'fill_sentence_interactive' || userAnswers[currentQIndex] !== q.answer) return;
    speakEnglish(q.completed_sentence || q.tts_text || String(q.question_text || '').replace(/_{2,}/g, q.answer), 0.92);
}

function checkFillSentenceInteractive_(selectedOpt) {
    const q = activeQuestionsList[currentQIndex];
    if (!q || q.render_style !== 'fill_sentence_interactive') return;

    // Every option can be tapped to hear the English word.
    speakEnglish(selectedOpt, 0.9);

    // Once solved, taps are for listening only.
    if (userAnswers[currentQIndex] !== undefined) return;

    if (selectedOpt === q.answer) {
        userAnswers[currentQIndex] = selectedOpt;
        score += (q.diem ?? 0.5);
        starGreenCount++;
        const green = document.getElementById('star-green-count'); if (green) green.textContent = starGreenCount;
        playAudio('correct');
        confetti({ particleCount: 30, spread: 55, origin: { y: 0.7 } });
        renderFillSentenceInteractive_(q);
        setTimeout(() => speakFillSentence_(), 220);
        return;
    }

    if (!wrongAttemptsByQ[currentQIndex]) wrongAttemptsByQ[currentQIndex] = [];
    if (!wrongAttemptsByQ[currentQIndex].includes(selectedOpt)) {
        wrongAttemptsByQ[currentQIndex].push(selectedOpt);
        starRedCount++;
        const red = document.getElementById('star-red-count'); if (red) red.textContent = starRedCount;
    }
    playAudio('wrong');
    renderFillSentenceInteractive_(q);
}

function getGrammarQuestionParts_(q) {
    if (!q) return { instruction: '', sentence: '' };
    const raw = String(q.question_text || '').trim();
    let instruction = '';
    let sentence = raw;

    const firstDot = raw.indexOf('.');
    if (firstDot >= 0) {
        const firstPart = raw.slice(0, firstDot + 1).trim();
        const rest = raw.slice(firstDot + 1).trim();
        if (/^choose\b/i.test(firstPart) && rest) {
            instruction = firstPart;
            sentence = rest;
        }
    }

    const quoted = [...sentence.matchAll(/[\"'“”‘’]([^\"'“”‘’]*[A-Za-z][^\"'“”‘’]*)[\"'“”‘’]/g)];
    if (quoted.length) sentence = String(quoted[quoted.length - 1][1] || '').trim();
    sentence = sentence.replace(/^[\"'“”‘’]+|[\"'“”‘’]+$/g, '').trim();
    return { instruction, sentence };
}

function getGrammarEnglishSentence_(q, completed = false) {
    const parts = getGrammarQuestionParts_(q);
    let sentence = parts.sentence;
    if (completed && q && q.answer) sentence = sentence.replace(/_{2,}/g, String(q.answer));
    return sentence;
}

function getGrammarSentenceHtml_(q) {
    const sentence = getGrammarEnglishSentence_(q, false);
    const solved = !!q && userAnswers[currentQIndex] === q.answer;
    if (!solved || !q.answer) return escapeHtml(sentence);

    const marker = /_{2,}/;
    if (!marker.test(sentence)) return escapeHtml(getGrammarEnglishSentence_(q, true));
    const pieces = sentence.split(marker);
    return `${escapeHtml(pieces[0])}<span class="text-rose-500 font-black">${escapeHtml(String(q.answer))}</span>${escapeHtml(pieces.slice(1).join(''))}`;
}

function speakGrammarCompletedSentence_() {
    const q = activeQuestionsList[currentQIndex];
    if (!q || Number(activeTopicId) !== 10) return;
    if (userAnswers[currentQIndex] !== q.answer) return;
    const sentence = getGrammarEnglishSentence_(q, true);
    if (sentence) speakEnglish(sentence, 0.92);
}

function updateGrammarListenButton_() {
    if (Number(activeTopicId) !== 10) return;
    const q = activeQuestionsList[currentQIndex];
    const btn = document.getElementById('grammar-listen-btn');
    if (!q || !btn) return;
    const solved = userAnswers[currentQIndex] === q.answer;
    btn.disabled = !solved;
    btn.className = solved
        ? 'px-4 py-1.5 bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white border border-pink-300 rounded-2xl text-xs md:text-sm font-extrabold flex items-center space-x-1.5 pastel-btn shadow-sm transition-all'
        : 'px-4 py-1.5 bg-pink-50 text-pink-300 border border-pink-100 rounded-2xl text-xs md:text-sm font-extrabold flex items-center space-x-1.5 opacity-45 cursor-not-allowed shadow-none transition-all';
}

function loadQuestion() {
    stopSpeaking();
    const q = activeQuestionsList[currentQIndex];
    if (!q) return;

    if (q.render_style === 'reading_pair') {
        const stepEl = document.getElementById('practice-step-text');
        if (stepEl) stepEl.textContent = `Bài ${currentQIndex + 1} / ${activeQuestionsList.length}`;
        renderReadingPair_(q);
        return;
    }

    if (q.render_style === 'sentence_builder_tap') {
        const stepEl = document.getElementById('practice-step-text');
        if (stepEl) stepEl.textContent = `${currentQIndex + 1} / ${activeQuestionsList.length}`;
        renderSentenceBuilderTap_(q);
        return;
    }

    if (q.render_style === 'fill_sentence_interactive') {
        const stepEl = document.getElementById('practice-step-text');
        if (stepEl) stepEl.textContent = `${currentQIndex + 1} / ${activeQuestionsList.length}`;
        renderFillSentenceInteractive_(q);
        return;
    }

    const isEvaluationMode = !!activeExamContext || !!activeRoadmapContext;
    const isGrammarPoint = !isEvaluationMode && Number(activeTopicId) === 10;

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
        if (stepEl) stepEl.textContent = (activeVocabularyHubTopic && q.render_style === 'vocab_flashcard')
            ? `${currentQIndex + 1} / ${activeQuestionsList.length}`
            : (q.render_style === 'vocab_flashcard' ? `${currentQIndex + 1} / ${activeQuestionsList.length}` : `Câu ${currentQIndex + 1} / ${activeQuestionsList.length}`);
    }

    if (!isEvaluationMode && q.render_style === 'remove_letter_shared') {
        renderRemoveLetterShared_(q);
        return;
    }

    if (!isEvaluationMode && q.render_style === 'fill_missing_shared') {
        renderFillMissingShared_(q);
        return;
    }

    if (!isEvaluationMode && q.render_style === 'odd_one_out_shared') {
        renderOddOneOutShared_(q);
        return;
    }

    if (!isEvaluationMode && activeVocabularyHubTopic && q.render_style === 'vocab_flashcard') {
        renderVocabularySharedStudy_(q);
        return;
    }

    if (!isEvaluationMode && q.render_style === 'vocab_flashcard') {
        renderVocabularyFlashcard_(q);
        updateNavButtons();
        return;
    }

    let mediaHtml = '';
    if ((q.image_url || q.emoji) && !activeExamContext && !(isGrammarPoint && String(q.sub_topic) === '10.1')) {
        // Khung cố định kích thước bọc NGOÀI ảnh — dù ảnh tải lỗi hay thành công, chiều cao
        // khu vực này không đổi (tránh đáp án bên dưới bị đẩy giật lên như lỗi trước đây).
        // Ưu tiên hiển thị ảnh thật nếu có; lỗi tải thì tự động ẩn ảnh và hiện Emoji dự phòng.
        mediaHtml = `
            <div class="w-14 h-14 md:w-16 md:h-16 mb-1 flex items-center justify-center relative">
                ${q.image_url ? `<img src="${q.image_url}" alt="minh họa" class="w-full h-full object-contain floating absolute inset-0" onerror="this.style.display='none'; const f=this.nextElementSibling; if(f) f.classList.remove('hidden');">` : ''}
                <div class="text-4xl md:text-5xl floating ${q.image_url ? 'hidden' : ''}">${q.emoji || '📘'}</div>
            </div>`;
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

    const practiceSpeakerBtnHtml = !isEvaluationMode ? (isGrammarPoint ? `
        <div class="flex items-center justify-center mt-1 mb-1">
            <button id="grammar-listen-btn" onclick="speakGrammarCompletedSentence_()" disabled class="px-4 py-1.5 bg-pink-50 text-pink-300 border border-pink-100 rounded-2xl text-xs md:text-sm font-extrabold flex items-center space-x-1.5 opacity-45 cursor-not-allowed shadow-none transition-all">
                <i class="fa-solid fa-volume-high"></i>
                <span>Listen</span>
            </button>
        </div>
    ` : `
        <div class="flex items-center justify-center mt-1 mb-1">
            <button onclick="speakCurrentQuestion()" class="px-4 py-1.5 bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 rounded-2xl text-xs md:text-sm font-extrabold flex items-center space-x-1.5 pastel-btn shadow-xs">
                <i class="fa-solid fa-volume-high text-pink-600"></i>
                <span>Listen</span>
            </button>
        </div>
    `) : '';

    const isQaDialogue = !isEvaluationMode && Number(activeTopicId) === 9;
    const grammarParts = isGrammarPoint ? getGrammarQuestionParts_(q) : null;
    const qaDefaultInstructionHtml = (isQaDialogue || isGrammarPoint) ? `
        <div class="w-full self-start text-left mb-2 px-1 md:px-2">
            <div class="inline-flex items-center rounded-xl bg-gradient-to-r from-pink-50 to-violet-50 border border-pink-200 px-3 py-1.5 text-xs md:text-sm font-black text-fuchsia-700">
                Choose the correct answer.
            </div>
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
                <button data-opt="${escapeHtml(opt)}" onclick="checkAnswer('${opt.replace(/'/g, "\\'")}')" class="option-btn min-w-[140px] px-6 py-3 bg-white hover:bg-emerald-50 border-2 border-emerald-400 rounded-full font-black text-violet-700 text-base md:text-lg transition-all pastel-btn shadow-xs">
                    ${escapeHtml(opt)}
                </button>`;
        });
        html += `</div>`;
        if (q.mascot_text) {
            html += `
                <div class="mt-4 inline-flex items-center space-x-1.5 bg-pink-50 border border-pink-200 rounded-full px-3.5 py-1.5">
                    <span>🐰</span>
                    <span class="text-xs md:text-sm font-extrabold text-rose-600">${escapeHtml(q.mascot_text)}</span>
                </div>`;
        }
    } else {
        html = `
        ${isGrammarPoint ? qaDefaultInstructionHtml : ''}
        ${mediaHtml}
        ${passageHtml}
        ${isGrammarPoint ? '' : qaDefaultInstructionHtml}
        <div class="flex flex-col items-center justify-center max-w-3xl text-center px-2 mb-0.5">
            <h3 ${isGrammarPoint ? 'id="grammar-question-display"' : ''} class="text-sm md:text-base lg:text-lg font-black text-slate-900 leading-snug">
                ${isGrammarPoint ? getGrammarSentenceHtml_(q) : escapeHtml(q.question_text)}
            </h3>
            ${(!isQaDialogue && !isGrammarPoint && q.question_text_vi) ? `<div class="text-xs md:text-sm font-bold text-slate-500 mt-1">${escapeHtml(q.question_text_vi)}</div>` : ''}
            ${practiceSpeakerBtnHtml}
        </div>
        
        <div class="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-1">
    `;

    q.options.forEach((opt, idx) => {
        const formattedOpt = capitalizeFirstLetter(opt);
        const letter = String.fromCharCode(65 + idx);
        // Chỉ hiện phiên âm khi JSON thật sự có field "options_ipa" (mảng cùng thứ tự với "options") —
        // không tự bịa phiên âm để tránh sai, chờ NotebookLM bổ sung dữ liệu.
        const ipaText = q.options_ipa && q.options_ipa[idx] ? q.options_ipa[idx] : '';
        const ipaHtml = ipaText ? `<span class="text-sm md:text-base text-gray-500 font-semibold ml-1.5 whitespace-nowrap">/${escapeHtml(ipaText.replace(/^\/|\/$/g, ''))}/</span>` : '';

        if (activeExamContext) {
            html += `
                <button data-opt="${escapeHtml(opt)}" onclick="checkAnswer('${opt.replace(/'/g, "\\'")}')" class="option-btn w-full p-2.5 md:p-3 bg-white hover:bg-pink-50/50 border border-pink-200 rounded-2xl font-extrabold text-gray-800 text-left transition-all flex items-center justify-between text-sm md:text-base shadow-xs">
                    <div class="flex items-center space-x-2.5">
                        <span class="opt-badge w-7 h-7 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center font-black text-sm shrink-0">${letter}</span>
                        <span class="opt-text">${escapeHtml(formattedOpt)}${ipaHtml}</span>
                    </div>
                    <span class="option-icon text-pink-500 text-base md:text-lg"></span>
                </button>`;
        } else {
            html += `
                <button data-opt="${escapeHtml(opt)}" onclick="checkAnswer('${opt.replace(/'/g, "\\'")}')" class="option-btn w-full p-3 md:p-3.5 bg-pink-50/40 hover:bg-pink-100/70 border-2 border-pink-200 rounded-2xl font-extrabold text-gray-800 text-left transition-all flex items-center justify-between text-sm md:text-base shadow-xs pastel-btn">
                    <span class="opt-text"><strong class="text-pink-600 mr-2 text-base md:text-lg">${letter}.</strong> ${escapeHtml(formattedOpt)}${ipaHtml}</span>
                    <span class="option-icon text-pink-500 text-base md:text-lg"></span>
                </button>`;
        }
    });
        html += `</div>`;
    }

    document.getElementById('question-box').innerHTML = html;

    restoreQuestionState(q);
    if (isGrammarPoint) updateGrammarListenButton_();
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
    const btnNext = isEvaluationMode ? document.getElementById('btn-next-q-exam') : document.getElementById('btn-next-q-prac');
    const nextText = isEvaluationMode ? document.getElementById('btn-next-text-exam') : document.getElementById('btn-next-text-prac');
    const nextIcon = isEvaluationMode ? document.getElementById('btn-next-icon-exam') : document.getElementById('btn-next-icon-prac');

    if (!btnPrev || !btnNext) return;

    // Navigation is English-only and visually consistent across the whole app.
    btnPrev.innerHTML = '<i class="fa-solid fa-chevron-left mr-1.5"></i><span>Previous</span>';
    if (nextText) nextText.textContent = 'Next';
    if (nextIcon) nextIcon.className = 'fa-solid fa-chevron-right ml-1.5';

    [btnPrev, btnNext].forEach(btn => {
        btn.classList.remove('px-4','px-5','px-6','rounded-xl');
        btn.classList.add('w-[124px]','md:w-[132px]','h-[44px]','px-4','py-2','rounded-2xl','inline-flex','items-center','justify-center');
    });

    const stepEl = document.getElementById('practice-step-text');
    if (stepEl) stepEl.textContent = `${currentQIndex + 1} / ${activeQuestionsList.length}`;

    if (currentQIndex === 0) {
        btnPrev.disabled = true;
        btnPrev.classList.add('opacity-40', 'cursor-not-allowed');
    } else {
        btnPrev.disabled = false;
        btnPrev.classList.remove('opacity-40', 'cursor-not-allowed');
    }
}

/** Bấm vào 1 đáp án để nghe lại: LUÔN đọc to từ đó (áp dụng cho mọi mục, trừ Đề thi).
 * Riêng phần HIỆN NGHĨA TIẾNG VIỆT bên cạnh thì thu hẹp lại — chỉ hiện khi câu hỏi đang xem
 * thật sự thuộc đúng mục "2.1 Flashcards Library" (dù đang ở Học tự do hay Tiến trình tuần),
 * vì đây là nơi duy nhất có ngữ cảnh phù hợp để chèn nghĩa; các mục khác dù đáp án trùng từ
 * vựng cũng KHÔNG hiện, tránh gây rối vì ngữ cảnh câu hỏi không phải để học nghĩa của từ đó. */
function speakOptionWithMeaning(optText) {
    speakEnglish(optText);
    const q = activeQuestionsList[currentQIndex];
    // Vocabulary picture/listen already owns its controlled meaning reveal. Do not append
    // a second Vietnamese meaning beside the option, otherwise the correct option duplicates it.
    if (activeVocabularyHubTopic) return;
    if (!q || q.sub_topic !== '2.1') return;
    const meaning = wordMeaningMapCache ? wordMeaningMapCache[String(optText).toLowerCase()] : null;
    if (!meaning) return;
    document.querySelectorAll('.option-btn').forEach(b => {
        if (b.getAttribute('data-opt') === optText) {
            const textSpan = b.querySelector('.opt-text');
            if (!textSpan) return;
            let meaningSpan = textSpan.querySelector('.opt-meaning');
            if (!meaningSpan) {
                meaningSpan = document.createElement('span');
                meaningSpan.className = 'opt-meaning text-xs md:text-sm font-bold text-purple-500 ml-1.5 italic';
                textSpan.appendChild(meaningSpan);
            }
            meaningSpan.textContent = `(${meaning})`;
        }
    });
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
        if (userAnswers[currentQIndex] !== undefined) {
            // Đã khoá đáp án rồi -> bấm lại bất kỳ đáp án nào (đúng hoặc sai) chỉ để NGHE LẠI
            // phát âm của từ đó, không tính điểm lại (bé cần nghe hết cả 4 từ, không chỉ từ đúng).
            speakOptionWithMeaning(selectedOpt);
            return;
        }

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
            setTimeout(() => speakOptionWithMeaning(q.answer), 180);
        } else {
            playAudio('wrong');
        }

        updateQuizPalletUI();
        return;
    }

    // CHẾ ĐỘ LUYỆN TẬP TỰ DO
    const isCorrect = selectedOpt === q.answer;
    if (userAnswers[currentQIndex] !== undefined) {
        // Grammar Point: sau khi đúng chỉ nghe lại cả câu tiếng Anh đã hoàn chỉnh.
        if (Number(activeTopicId) === 10) {
            speakGrammarCompletedSentence_();
            return;
        }
        speakOptionWithMeaning(selectedOpt);
        return;
    }

    if (isCorrect) {
        userAnswers[currentQIndex] = selectedOpt;
        score += (q.diem ?? 0.5);
        starGreenCount++;
        document.getElementById('star-green-count').textContent = starGreenCount;

        document.querySelectorAll('.option-btn').forEach(b => {
            if (b.getAttribute('data-opt') === q.answer) {
                b.classList.remove('bg-pink-50/40', 'border-pink-200');
                b.classList.add('bg-green-100', 'border-green-400', 'text-green-800');
            }
        });

        playAudio('correct');
        confetti({ particleCount: 30, spread: 55, origin: { y: 0.7 } });
        if (q.render_style === 'fill_missing_shared') {
            const slot = document.getElementById('fill-missing-slot');
            if (slot) {
                slot.textContent = String(q.answer || '').toUpperCase();
                slot.classList.remove('text-fuchsia-500', 'border-fuchsia-500');
                slot.classList.add('text-rose-600', 'border-rose-500');
            }
        }
        revealVocabularyVietnameseAfterCorrect_();
        revealVocabularyPictureExamples_();
        if (Number(activeTopicId) === 10) {
            const grammarDisplay = document.getElementById('grammar-question-display');
            if (grammarDisplay) grammarDisplay.innerHTML = getGrammarSentenceHtml_(q);
            updateGrammarListenButton_();
            setTimeout(() => speakGrammarCompletedSentence_(), 180);
        } else {
            setTimeout(() => speakOptionWithMeaning(q.answer), 180);
        }
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
            }
        });

        playAudio('wrong');
    }

    updateQuizPalletUI();
}

function prevQuestion() {
    stopSpeaking();
    if (activeVocabularyHubTopic) saveVocabularyModeState_();
    if (currentQIndex > 0) {
        currentQIndex--;
        loadQuestion();
    }
}

function nextQuestion() {
    stopSpeaking();
    if (activeVocabularyHubTopic) saveVocabularyModeState_();
    const isEvaluationMode = !!activeExamContext || !!activeRoadmapContext;

    const inVocabularySharedStudy = !isEvaluationMode && !!activeVocabularyHubTopic && activeQuestionsList[currentQIndex]?.render_style === 'vocab_flashcard';
    const vocabularyNeedsAnswer = inVocabularySharedStudy && activeVocabularyStudyMode !== 'flashcard';
    const isSharedRemoveLetter = !isEvaluationMode && activeQuestionsList[currentQIndex]?.render_style === 'remove_letter_shared';
    if (!isEvaluationMode && !isSharedRemoveLetter && ((vocabularyNeedsAnswer) || (!inVocabularySharedStudy && activeQuestionsList[currentQIndex]?.render_style !== 'vocab_flashcard')) && userAnswers[currentQIndex] === undefined) {
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
            if (activeVocabularyHubTopic) {
                vocabularyModeState = {
                    flashcard: { answers: {}, wrongs: {} },
                    picture: { answers: {}, wrongs: {} },
                    listen: { answers: {}, wrongs: {} }
                };
            }
            userAnswers = {};
            wrongAttemptsByQ = {};
            Object.keys(sentenceBuilderSelections_).forEach(k => delete sentenceBuilderSelections_[k]);
            if (activeSharedVocabActivity?.activityId === 3) removeLetterSelections_ = {};
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

function showResultScreen() {
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

    // Tiến trình tuần thường: điểm tính đều tay 10/tổng số câu (không trọng số).
    // Riêng đề ôn 15 câu (Tuần 12/17): mỗi câu có trọng số điểm thật khác nhau, phải dùng đúng "score" thực tế.
    const displayScore = (activeRoadmapContext && !activeRoadmapContext.isReview15)
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
        nextActionLabel.textContent = activeRoadmapContext ? '🔙 Quay lại tiến trình tuần' : '🚀 Làm đề thi tiếp theo';
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
    const skillKeys = SKILL_KEYS;
    const skillStats = {};
    skillKeys.forEach(k => {
        skillStats[k] = { total: 0, correct: 0, maxScore: 0, earnedScore: 0 };
    });

    activeQuestionsList.forEach((q, idx) => {
        let tag = String(q.skill_tag || 'ENG_VOC').toUpperCase();
        if (!skillKeys.includes(tag)) tag = 'ENG_VOC';

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
        const pct = isRoadmap
            ? (data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0)
            : (data.maxScore > 0 ? Math.round((data.earnedScore / data.maxScore) * 100) : 0);
        const isPassed = pct >= 50;
        const badgeClass = isPassed ? 'bg-violet-100 text-violet-700 border border-amber-200' : 'bg-rose-50 text-rose-700 border border-rose-200';
        const badgeText = isPassed ? 'Đạt yêu cầu' : 'Cần luyện tập thêm';
        const barColor = isPassed ? 'bg-gradient-to-r from-fuchsia-400 to-violet-400' : 'bg-gradient-to-r from-pink-400 to-rose-400';
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
            </div>
        `;
    });
    container.innerHTML = html;
}

function openReviewWrongModal() {
    const modal = document.getElementById('modal-review-wrong');
    const content = document.getElementById('review-wrong-content');
    if (!modal || !content) return;

    if (!quizWrongAnswers.length) {
        content.innerHTML = `<div class="text-center py-8 text-fuchsia-600 font-extrabold text-base"><i class="fa-solid fa-circle-check text-3xl mb-2 block"></i>Tuyệt vời! Bé không làm sai câu nào trong bài thi này!</div>`;
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
                        <p class="text-violet-700"><i class="fa-solid fa-check mr-1"></i> Đáp án đúng chuẩn: <strong>${escapeHtml(item.dap_an_dung)}</strong></p>
                    </div>
                    <div class="p-2.5 bg-gradient-to-br from-pink-50/80 to-violet-50/80 border border-violet-200 rounded-xl text-xs text-amber-900 font-semibold flex items-start gap-2">
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

    const skillScores = {}; SKILL_KEYS.forEach(k => skillScores[k] = 0);
    quizAnsweredLog.forEach(item => {
        let tag = String(item.skill_tag || 'ENG_VOC').toUpperCase();
        if (!SKILL_KEYS.includes(tag)) tag = 'ENG_VOC';
        if (item.isCorrect) skillScores[tag] += (item.diem || 0.5);
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
        wrongQuestions: quizWrongAnswers
    };
    // Ghi điểm từng nhóm năng lực vào ĐÚNG tên cột "diem" + mã kỹ năng (diemENG_PHO, diemENG_VOC...)
    // — không hard-code tên cột, tránh lệch dữ liệu nếu sau này đổi lại taxonomy.
    SKILL_KEYS.forEach(k => { payload['diem' + k] = skillScores[k].toFixed(1); });
    try { await callAppsScript('saveExamResult', payload); } catch (e) {}
}

async function saveWeeklyProgressToSheet(percent, starCount, scoreVal) {
    const { week, topicId, chuDe } = activeRoadmapContext;
    const thoiGianLamBai = quizStartTime ? formatDuration(Date.now() - quizStartTime) : '';
    const scoreThang10 = (scoreVal ?? ((score / activeQuestionsList.length) * 10)).toFixed(1);

    // Đếm CHÍNH XÁC số câu đúng / tổng số câu của từng nhóm năng lực, dựa theo skill_tag
    // (ENG_PHO-READ) mà mỗi câu tự mang sẵn — không ước lượng chia đều, không suy luận gián tiếp qua chủ đề Mục lớn.
    const skillCorrect = {}; const skillTotal = {};
    SKILL_KEYS.forEach(k => { skillCorrect[k] = 0; skillTotal[k] = 0; });
    quizAnsweredLog.forEach(item => {
        let tag = String(item.skill_tag || 'ENG_VOC').toUpperCase();
        if (!SKILL_KEYS.includes(tag)) tag = 'ENG_VOC';
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
        await callAppsScript('saveWeeklyProgress', payload);
        if (percent >= 80) {
            const nextWeek = week + 1;
            if (nextWeek > (Number(currentUser.tuanHienTai) || 1) && nextWeek <= TOTAL_ROADMAP_WEEKS) {
                currentUser.tuanHienTai = nextWeek;
                setTimeout(() => alert(`🎉 Chúc mừng bé đạt ${percent}% điểm! Tuần ${nextWeek} đã được mở khóa trên bản đồ!`), 500);
            }
        }
    } catch (e) {}
}

async function openHistoryModal(sheetName = 'LichSuTienTrinhTuan') {
    if (!currentUser || currentUser.isGuest) {
        return alert('Bé vui lòng đăng nhập để xem lịch sử tiến trình nhé!');
    }

    const modal = document.getElementById('modal-history-progress');
    modal.classList.remove('hidden');

    document.getElementById('hist-info-name').textContent = currentUser.hoTen || '--';
    document.getElementById('hist-info-class').textContent = currentUser.lop || '--';
    document.getElementById('hist-info-code').textContent = currentUser.maHS || '--';
    document.getElementById('hist-info-dob').textContent = formatDobOnly(currentUser.ngaySinh) || '03/09/2019';
    document.getElementById('hist-report-date').textContent = new Date().toLocaleDateString('vi-VN');

    const titleMap = {
        LichSuTienTrinhTuan: "Báo cáo tiến trình 24 tuần học tập",
        LichSuBaiThiHK1: "Báo cáo kết quả đấu trường — Học kỳ 1",
        LichSuBaiThiHK2: "Báo cáo kết quả đấu trường — Học kỳ 2",
        LichSuBaiThiHSG: "Báo cáo kết quả đấu trường — Học sinh giỏi"
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

/** Chuẩn hoá Ngày sinh về đúng DD/MM/YYYY, bất kể GAS trả về dạng gì —
 * Google Sheets hay tự nhận diện chuỗi "05-09-19" là kiểu Date và trả nguyên
 * 1 mốc thời gian ISO ("2019-09-05T17:00:00.000Z") kèm giờ/phút/giây không cần thiết. */
function formatDobOnly(value) {
    if (!value) return '--';
    const raw = String(value).trim();
    // Chuỗi đã đúng sẵn dạng d-m-yy hoặc dd-mm-yyyy do FE tự gửi lên (không có ký tự "T")
    if (!raw.includes('T') && /^\d{1,2}-\d{1,2}-\d{2,4}$/.test(raw)) {
        const [d, m, y] = raw.split('-');
        const fullYear = y.length === 2 ? `20${y}` : y;
        return `${d.padStart(2, '0')}/${m.padStart(2, '0')}/${fullYear}`;
    }
    const d = new Date(raw);
    if (isNaN(d.getTime())) return raw;
    return `${String(d.getUTCDate()).padStart(2, '0')}/${String(d.getUTCMonth() + 1).padStart(2, '0')}/${d.getUTCFullYear()}`;
}

function renderHistoryReport(rows, sheetName) {
    const isWeekly = sheetName === 'LichSuTienTrinhTuan';
    const labels = rows.map((r, i) => {
        const dm = formatDateShort(r.ThoiGianGhi || r.Timestamp || r.ngayLam);
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

    const skillKeys = SKILL_KEYS;
    const skillAverages = { ENG_PHO: 0, ENG_VOC: 0, ENG_LIS: 0, ENG_GRA: 0, ENG_SYN: 0, ENG_READ: 0 };
    const touchedSkills = [];

    if (rows.length && isWeekly) {
        // Tiến trình tuần: % = tổng số câu đúng / tổng số câu đã làm THẬT của nhóm kỹ năng đó
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
        // Điểm tối đa mỗi nhóm năng lực trên 1 đề thi chuẩn (đúng Ma trận đề thi V2, 13 câu/10đ)
        const MAX_SKILL_POINTS = { ENG_PHO: 1.5, ENG_VOC: 1.0, ENG_LIS: 1.5, ENG_GRA: 2.0, ENG_SYN: 2.0, ENG_READ: 2.0 };
        skillKeys.forEach((k) => {
            const maxPts = MAX_SKILL_POINTS[k] || 1.5;
            const vals = rows.map(r => {
                const val = r[`diem${k}`];
                return (val !== undefined && val !== null && val !== '--' && val !== '') ? Number(val) : 0;
            });
            const sum = vals.reduce((a, b) => a + b, 0);
            if (vals.length > 0) {
                skillAverages[k] = Math.min(100, Math.round((sum / (vals.length * maxPts)) * 100));
                touchedSkills.push(k);
            }
        });
    }

    const ctxBar = document.getElementById('topicRadarChartCanvas').getContext('2d');
    if (histBarChartInstance) histBarChartInstance.destroy();

    histBarChartInstance = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: skillKeys.map(k => SKILL_TAXONOMY[k].name),
            datasets: [{
                label: 'Độ thành thạo (%)',
                data: skillKeys.map(k => skillAverages[k]),
                backgroundColor: ['#f472b6', '#fb7185', '#f59e0b', '#a855f7', '#ec4899', '#e11d48'],
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
                tooltip: { callbacks: { label: (ctx) => ` Độ thành thạo: ${ctx.raw}%` } }
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
                    ctx.fillStyle = '#1e293b';
                    ctx.textAlign = 'left';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(`${val}%`, meta.x + 6, meta.y);
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
                <span class="text-violet-700 font-extrabold block mb-0.5">✅ 2. Khen ngợi & thế mạnh nổi trội:</span>
                <p class="text-gray-700">${strengthHtml}</p>
            </div>

            <div class="bg-rose-50/70 p-3 rounded-xl border border-rose-200">
                <span class="text-rose-700 font-extrabold block mb-0.5">⚠️ 3. Điểm cần lưu ý & khắc phục:</span>
                <p class="text-gray-700">${weaknessHtml}</p>
            </div>
        </div>

        <div class="bg-white/80 p-3 rounded-xl border border-purple-200">
            <span class="text-purple-700 font-extrabold block mb-0.5">💡 4. Kế hoạch bồi dưỡng & hướng dẫn phụ huynh:</span>
            <p class="text-gray-700">Ba mẹ nên dành 15 phút mỗi tối cùng con ôn lại từ vựng, đặt câu hỏi gợi mở bằng tiếng Anh đơn giản và khen ngợi kịp thời để giúp ${studentName} giữ vững niềm yêu thích tiếng Anh nhé!</p>
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
    const skillKeys = SKILL_KEYS;

    const getScoreVal = (r, skillKey) => {
        const val = r['diem' + skillKey];
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
            const dateStr = formatDateOnly(r.ThoiGianGhi || r.Timestamp || r.ngayLam);
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
            const sum = rows.reduce((acc, r) => acc + getScoreVal(r, k), 0);
            summaryCells += `<td class="py-2 px-1">${(sum / totalRows).toFixed(1)}</td>`;
        });

        rows.forEach((r, idx) => {
            const itemDiem = r.tongDiem || r.score || '--';
            const dateStr = formatDateOnly(r.ThoiGianGhi || r.Timestamp || r.ngayLam);
            const durationStr = r.thoiGianLamBai || '--';

            let examSkillCells = '';
            skillKeys.forEach((k, i) => {
                examSkillCells += `<td class="py-2 px-1">${getScoreVal(r, k)}</td>`;
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

/** Đọc to toàn bộ nội dung khối "Nhận xét sư phạm" trong báo cáo lịch sử. */
function speakPedagogicalEvaluation() {
    const box = document.getElementById('pedagogical-evaluation-box');
    if (!box) return;
    const text = box.innerText || box.textContent || '';
    if (!text.trim()) return;
    speakVietnamese(text, 0.96);
}

// Giữ đúng cơ chế bản cũ đang chạy ổn: gọi trực tiếp Google Translate TTS,
// KHÔNG dùng Web Speech / SpeechSynthesis làm fallback.
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
            if (playPromise !== undefined) playPromise.catch(() => {});
            return;
        }

        const sentences = cleanText.match(/[^.!?\n]+[.!?\n]*/g) || [cleanText];
        let sIdx = 0;
        function playSentence() {
            if (sIdx >= sentences.length) return;
            const sentence = sentences[sIdx++].trim();
            if (!sentence) { playSentence(); return; }
            const encoded = encodeURIComponent(sentence);
            banMaiAudio.src = `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${encoded}`;
            banMaiAudio.playbackRate = rate;
            banMaiAudio.onended = playSentence;
            const playPromise = banMaiAudio.play();
            if (playPromise !== undefined) playPromise.catch(() => {});
        }
        playSentence();
    } catch (err) {}
}

// Tiếng Anh vẫn dùng chính Google Translate TTS, chỉ đổi tl=en.
// Không bao giờ rơi xuống giọng máy của trình duyệt.
function speakEnglish(text, rate = 0.92) {
    if (!text) return;
    try {
        stopSpeaking();

        const cleanText = String(text)
            .replace(/<[^>]*>/g, '')
            .trim();

        if (!cleanText) return;

        if (cleanText.length <= 180) {
            const encoded = encodeURIComponent(cleanText);
            banMaiAudio.src = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encoded}`;
            banMaiAudio.playbackRate = rate;
            const playPromise = banMaiAudio.play();
            if (playPromise !== undefined) playPromise.catch(() => {});
            return;
        }

        const sentences = cleanText.match(/[^.!?\n]+[.!?\n]*/g) || [cleanText];
        let sIdx = 0;
        function playSentence() {
            if (sIdx >= sentences.length) return;
            const sentence = sentences[sIdx++].trim();
            if (!sentence) { playSentence(); return; }
            const encoded = encodeURIComponent(sentence);
            banMaiAudio.src = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encoded}`;
            banMaiAudio.playbackRate = rate;
            banMaiAudio.onended = playSentence;
            const playPromise = banMaiAudio.play();
            if (playPromise !== undefined) playPromise.catch(() => {});
        }
        playSentence();
    } catch (err) {}
}

function speakCurrentQuestion() {
    const q = activeQuestionsList[currentQIndex];
    if (!q) return;

    // Câu nghe / đoạn tiếng Anh -> Google TTS tiếng Anh.
    // Phần hướng dẫn bằng tiếng Việt -> Google TTS chị Ban Mai.
    if (Number(activeTopicId) === 10) {
        // Mục 10 không đọc hướng dẫn tiếng Việt; chỉ đọc câu tiếng Anh sau khi trả lời đúng.
        if (userAnswers[currentQIndex] === q.answer) return speakGrammarCompletedSentence_();
        return;
    }
    if (q.audio_text) return speakEnglish(q.audio_text, 0.92);
    if (q.reading_passage) return speakEnglish(q.reading_passage, 0.92);
    if (Number(activeTopicId) === 9) return speakEnglish(q.question_text, 0.92);
    speakVietnamese(q.question_text, 0.96);
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
            [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
                setTimeout(() => {
                    const o = audioCtx.createOscillator(), g = audioCtx.createGain();
                    o.connect(g); g.connect(audioCtx.destination);
                    o.frequency.value = freq; g.gain.setValueAtTime(0.2, audioCtx.currentTime);
                    g.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
                    o.start(); o.stop(audioCtx.currentTime + 0.3);
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
    localStorage.setItem('autoSpeechEnabled', autoSpeechEnabled ? 'true' : 'false');
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

function applyResponsiveWidthTuning_() {
    if (document.getElementById('ta2-responsive-width-tuning')) return;
    const style = document.createElement('style');
    style.id = 'ta2-responsive-width-tuning';
    style.textContent = `
        @media (min-width: 768px) {
            #screen-dashboard { max-width: 72rem !important; }
        }
        #view-lecture.ta2-compact-vocab-hub {
            padding-top: 0.65rem !important;
        }
        #view-lecture.ta2-compact-vocab-hub > div:first-child {
            gap: 0 !important;
        }
        #view-lecture .ta2-vocab-list-wrap {
            padding-top: 0 !important;
            border-top: 0 !important;
        }
        #view-lecture.ta2-compact-vocab-hub #lecture-subtopics-list > .flex:first-child {
            margin-bottom: 0.55rem !important;
        }
        /* 6 main tabs: keep the label optically centered, with icon close to its left. */
        #main-module-tabs .main-module-tab {
            position: relative !important;
            justify-content: center !important;
            gap: 0 !important;
            padding-left: 2rem !important;
            padding-right: 2rem !important;
        }
        #main-module-tabs .main-module-tab > span:first-child {
            position: absolute !important;
            left: calc(50% - 3.55rem) !important;
            margin: 0 !important;
            line-height: 1 !important;
        }
        #main-module-tabs .main-module-tab > .bi-label {
            width: 100% !important;
            align-items: center !important;
            text-align: center !important;
        }
        @media (max-width: 900px) {
            #main-module-tabs .main-module-tab > span:first-child {
                left: calc(50% - 3.15rem) !important;
            }
        }
    `;
    document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', () => {
    applyResponsiveWidthTuning_();
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

    // Kiến trúc 6 tab mới: Đề thi dùng nhãn English là Exams.
    const examsTab = document.getElementById('main-tab-exams');
    const examsEn = examsTab?.querySelector('.bi-label .en');
    if (examsEn) examsEn.textContent = 'Exams';
});

// ==========================================
// TRUNG TÂM MINI GAME (12 game, lưới 3x4)
// ==========================================
// ==========================================
// THEME DÙNG CHUNG CHO TOÀN BỘ MINI GAME
// Giữ ngôn ngữ thiết kế của phần Học: card pastel, 2 cột, badge số lượng,
// màu sắc luân phiên theo từng game để vui mắt nhưng vẫn đồng bộ toàn app.
// ==========================================
const MINIGAME_TOPIC_PALETTES = SUBTOPIC_PALETTES;

function miniGameHash(text = '') {
    return [...String(text)].reduce((acc, ch) => ((acc * 31) + ch.charCodeAt(0)) >>> 0, 7);
}

function getMiniGamePaletteOrder(seed = 'minigame') {
    const order = MINIGAME_TOPIC_PALETTES.map((_, i) => i);
    let state = miniGameHash(seed) || 1;
    for (let i = order.length - 1; i > 0; i--) {
        state = (state * 1664525 + 1013904223) >>> 0;
        const j = state % (i + 1);
        [order[i], order[j]] = [order[j], order[i]];
    }
    return order.map(i => MINIGAME_TOPIC_PALETTES[i]);
}

function getMiniGameTopicName(topicId) {
    if (topicId === null || topicId === undefined || topicId === 'all') return 'Trộn tất cả các nhóm';
    const g = getMiniGameTopicGroups().find(x => Number(x.id) === Number(topicId));
    return g ? `${g.id}. ${g.name}` : `Nhóm ${topicId}`;
}

function renderMiniGameTopicMenu({
    gameKey,
    onChoose,
    subtitle = 'Chọn 1 trong 6 Nhóm từ vựng để bắt đầu chơi nhé!',
    countFilter = null,
    mixLabel = 'Trộn tất cả các nhóm'
}) {
    const groups = getMiniGameTopicGroups();
    const palettes = getMiniGamePaletteOrder(gameKey || 'minigame');
    const countFor = (topicId) => {
        let pool = getMiniGameVocabPool({ topicId });
        if (typeof countFilter === 'function') pool = pool.filter(countFilter);
        return pool.length;
    };
    const total = countFor('all');
    return `
        <div class="mg-topic-menu w-full max-w-4xl mx-auto">
            <div class="w-full bg-pink-50/35 border-2 border-pink-100 rounded-2xl px-4 py-4 md:py-5 text-center mb-3">
                <p class="text-base md:text-lg text-gray-700 font-bold leading-relaxed">${escapeHtml(subtitle)}</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
                ${groups.map((g, idx) => {
                    const style = palettes[idx % palettes.length];
                    return `
                        <button onclick="${onChoose}(${g.id})" class="mg-topic-card p-3.5 md:p-4 ${style.card} border-2 rounded-xl font-bold text-left transition-all flex items-center justify-between shadow-sm pastel-btn min-h-[76px]">
                            <span class="text-base md:text-[17px] leading-snug pr-2"><strong class="${style.num} mr-1.5">${g.id}.</strong>${escapeHtml(g.name)}</span>
                            <span class="text-sm font-extrabold ${style.badge} px-2.5 py-0.5 rounded-full border shrink-0 ml-1.5 shadow-inner">${countFor(g.id)} từ</span>
                        </button>`;
                }).join('')}
            </div>
            <div class="mt-3 flex justify-center">
                <button onclick="${onChoose}('all')" class="mg-mix-btn pastel-btn inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-pink-400 to-violet-400 hover:from-pink-500 hover:to-violet-500 text-white font-extrabold text-sm md:text-base shadow-md border border-purple-300">
                    <span>🌟 ${escapeHtml(mixLabel)}</span>
                    <span class="text-xs md:text-sm font-black bg-white/20 px-2 py-0.5 rounded-full">${total} từ</span>
                </button>
            </div>
        </div>`;
}

function ensureMiniGameThemeStyles() {
    if (document.getElementById('minigame-theme-v3')) return;
    const style = document.createElement('style');
    style.id = 'minigame-theme-v3';
    style.textContent = `
        #view-game-play > div { max-width: 56rem !important; }
        #game-play-title { font-size: 1.2rem !important; }
        #game-play-container { font-size: 16px; }
        #game-play-container .text-\\[10px\\] { font-size: 12px !important; }
        #game-play-container .text-\\[11px\\] { font-size: 13px !important; }
        #game-play-container .text-xs { font-size: 14px !important; }
        #game-play-container .mg-topic-card { min-height: 78px; }
        #game-play-container .mg-topic-card:hover { transform: translateY(-2px); }
        #game-play-container .mg-mix-btn { min-width: 250px; }
        @media (max-width: 640px) {
            #view-game-play > div { max-width: 100% !important; }
            #game-play-title { font-size: 1.05rem !important; }
            #game-play-container .mg-mix-btn { min-width: 0; width: auto; }
        }
    `;
    document.head.appendChild(style);
}

const MINIGAME_LIST = [
    { id: 'word-search', title: '1. Word Search', desc: 'Tìm từ giấu trong ô chữ', icon: '🔍', ready: true },
    { id: 'word-scramble', title: '2. Word Scramble', desc: 'Sắp xếp chữ cái thành từ', icon: '🔤', ready: true },
    { id: 'bingo', title: '3. Bingo', desc: 'Nghe và tìm đúng từ trên bảng', icon: '🎲', ready: true },
    { id: 'fishing-game', title: '4. Fishing Game', desc: 'Câu đúng con cá mang từ', icon: '🎣', ready: true },
    { id: 'sentence-train', title: '5. Sentence Train', desc: 'Xếp toa từ thành câu đúng', icon: '🚂', ready: true },
    { id: 'grammar-river', title: '6. Grammar River', desc: 'Nhảy qua đúng giới từ', icon: '🐸', ready: true },
    { id: 'qa-bridge', title: '7. Q&A Bridge', desc: 'Ghép đúng câu hỏi - trả lời', icon: '🌉', ready: true },
    { id: 'sentence-doctor', title: '8. Sentence Doctor', desc: 'Tìm và chữa lỗi ngữ pháp', icon: '🩺', ready: true },
    { id: 'action-race', title: '9. Action Race', desc: 'Đua xe cùng động từ hành động', icon: '🏎️', ready: true },
    { id: 'feeling-detective', title: '10. Feeling Detective', desc: 'Truy tìm tính từ và trạng thái', icon: '🕵️', ready: true },
    { id: 'a-or-an-factory', title: '11. A or An Factory', desc: 'Phân loại mạo từ a / an', icon: '🏭', ready: true },
    { id: 'teacher-says', title: '12. Teacher Says', desc: 'Phản xạ với câu mệnh lệnh', icon: '🤖', ready: true }
];

function openMiniGameHub() {
    stopSpeaking();
    setMainTabActive_('games');
    if (!requirePremiumAccess('Mini Game')) return;
    inAlphaIpaFlow = false;
    inMiniGameFlow = true;
    activeExamContext = null; activeRoadmapContext = null; activeTopicId = null; pendingTopicQuiz = null;
    updateNavTabs("Mini Game", "🎮", null);

    ensureMiniGameThemeStyles();
    const grid = document.getElementById('minigame-grid');
    grid.innerHTML = MINIGAME_LIST.map((g, idx) => {
        const style = getMiniGamePaletteOrder('hub')[idx % MINIGAME_TOPIC_PALETTES.length];
        return `
        <div onclick="openGamePlay('${g.id}')" class="p-3.5 md:p-4 flex flex-col items-center text-center cursor-pointer transition-all group ${style.card} border-2 rounded-[26px] min-h-[132px] justify-between relative shadow-sm pastel-btn">
            ${!g.ready ? `<span class="absolute top-2 right-2 bg-violet-100 text-violet-700 text-[10px] font-black px-2 py-0.5 rounded-full border border-violet-200">Sắp ra mắt</span>` : ''}
            <div class="text-4xl group-hover:scale-110 transition-transform mt-1">${g.icon}</div>
            <div class="w-full">
                <h3 class="font-extrabold ${style.num} text-base leading-tight">${g.title}</h3>
                <p class="text-sm text-gray-700 font-bold mt-1 w-full leading-snug">${g.desc}</p>
            </div>
        </div>`;
    }).join('');

    switchAppView('view-minigame-hub');
}

// Đường dẫn file JS riêng của từng game — chỉ tải về máy khi bé THẬT SỰ bấm vào game đó,
// không bắt tải sẵn hết 12 game ngay từ đầu (giữ app.js gọn nhẹ dù sau này thêm bao nhiêu game).
const GAME_SCRIPT_MAP = {
    'word-search': 'assets/js/games/word-search.js?v=mg4',
    'word-scramble': 'assets/js/games/word-scramble.js?v=mg4',
    'bingo': 'assets/js/games/bingo.js?v=mg4',
    'fishing-game': 'assets/js/games/fishing-game.js?v=mg4',
    'sentence-train': 'assets/js/games/sentence-train.js?v=mg5',
    'grammar-river': 'assets/js/games/grammar-river.js?v=mg6',
    'qa-bridge': 'assets/js/games/qa-bridge.js?v=mg7',
    'sentence-doctor': 'assets/js/games/sentence-doctor.js?v=mg8',
    'action-race': 'assets/js/games/action-race.js?v=mg9',
    'feeling-detective': 'assets/js/games/feeling-detective.js?v=mg10',
    'a-or-an-factory': 'assets/js/games/a-or-an-factory.js?v=mg11',
    'teacher-says': 'assets/js/games/teacher-says.js?v=mg12'
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
    stopSpeaking();
    ensureMiniGameThemeStyles();
    inMiniGameFlow = true;
    const game = MINIGAME_LIST.find(g => g.id === gameId);
    if (!game) return;

    if (!game.ready) {
        alert(`Game "${game.title}" đang được xây dựng, sắp ra mắt sớm nhé! Con quay lại sau nha!`);
        return;
    }

    document.getElementById('game-play-title').innerHTML = `<span>${game.icon}</span><span>${game.title}</span>`;
    updateNavTabs("Mini Game", "🎮", game.title);
    switchAppView('view-game-play');

    const scriptSrc = GAME_SCRIPT_MAP[gameId];
    if (scriptSrc) {
        document.getElementById('game-play-container').innerHTML = `<p class="text-center text-gray-400 font-bold py-8">Đang tải game...</p>`;
        try {
            await loadGameScript(scriptSrc);
        } catch (e) {
            document.getElementById('game-play-container').innerHTML = `<p class="text-center text-rose-500 font-bold py-8">Không tải được game, bé thử lại nhé!</p>`;
            return;
        }
    }

    if (gameId === 'word-search') startWordSearchGame();
    if (gameId === 'word-scramble') startWordScrambleGame();
    if (gameId === 'bingo') startBingoGame();
    if (gameId === 'fishing-game') startFishingGame();
    if (gameId === 'sentence-train') startSentenceTrainGame();
    if (gameId === 'grammar-river') startGrammarRiverGame();
    if (gameId === 'qa-bridge') startQABridgeGame();
    if (gameId === 'sentence-doctor') startSentenceDoctorGame();
    if (gameId === 'action-race') startActionRaceGame();
    if (gameId === 'feeling-detective') startFeelingDetectiveGame();
    if (gameId === 'a-or-an-factory') startAOrAnFactoryGame();
    if (gameId === 'teacher-says') startTeacherSaysGame();
}

/** Lấy nguồn từ vựng thật của chương trình (kho tra nghĩa xây từ Flashcards Library) —
 * chỉ lấy từ ĐƠN (không dấu cách/gạch nối), độ dài 3-7 ký tự để vừa vặn lưới ô chữ. */
function getWordSearchVocabPool(topicId = 'all') {
    return getMiniGameVocabPool({ topicId, singleWordOnly: true, minLength: 3, maxLength: 7 })
        .map(item => ({ w: item.word.toUpperCase(), vi: item.vietnamese }));
}

tryAutoLogin();

// ===== RESTORED FROM CURRENT TA2 6-TAB / LESSON-EXERCISE BRANCH =====
function switchAppView(viewId) {
    stopSpeaking();
    ['view-dashboard-grid', 'view-bai-hoc-hub', 'view-bai-hoc-lesson', 'view-alphabet', 'view-lecture', 'view-quiz', 'view-roadmap', 'view-minigame-hub', 'view-game-play', 'view-exam-hub', 'view-result'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        if (id === viewId) el.classList.remove('hidden');
        else el.classList.add('hidden');
    });
}

function setMainTabActive_(tabName) {
    currentMainTab = tabName || 'discover';
    document.querySelectorAll('.main-module-tab').forEach(btn => {
        const active = btn.dataset.tab === currentMainTab;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-selected', active ? 'true' : 'false');
    });
}

function refreshMainTabLocks_() {
    const locked = !getPremiumAccessState().allowed;
    ['lessons-lock-icon', 'roadmap-lock-icon', 'review-lock-icon', 'exam-lock-icon', 'minigame-lock-icon'].forEach(id => {
        document.getElementById(id)?.classList.toggle('hidden', !locked);
    });
}

function openLessonsTab() {
    stopSpeaking();
    clearInterval(quizTimerInterval);
    inAlphaIpaFlow = false;
    inMiniGameFlow = false;
    activeExamContext = null;
    activeRoadmapContext = null;
    activeTopicId = null;
    pendingTopicQuiz = null;
    updateNavTabs('Bài học', '📖', null);
    setMainTabActive_('lessons');
    switchAppView('view-lessons-empty');
}

async function openReviewTab() {
    if (!requirePremiumAccess('Review / Ôn tập')) return;
    stopSpeaking();
    clearInterval(quizTimerInterval);
    inAlphaIpaFlow = false;
    inMiniGameFlow = false;
    activeExamContext = null;
    activeRoadmapContext = null;
    activeTopicId = 11;
    pendingTopicQuiz = null;
    setMainTabActive_('review');
    updateNavTabs('Review / Ôn tập', '🧠', null);

    showLoadingOverlay('Đang tải nội dung ôn tập...');
    try {
        const flat = await fetchAllQuestionsFlat();
        const reviewQuestions = flat.filter(q => q.sub_topic === '11.1' || q.sub_topic === '11.2');
        if (!reviewQuestions.length) throw new Error('Không tìm thấy dữ liệu ôn tập Học kỳ I / Học kỳ II');

        const topicObj = {
            topic_id: 11,
            topic_name: 'Review / Ôn tập',
            description: 'Choose a semester to review. / Chọn học kỳ để ôn tập.',
            lecture_title: 'Review',
            lecture_content: 'Choose Semester 1 or Semester 2 to start reviewing.',
            lecture_audio_text: 'Choose Semester 1 or Semester 2 to start reviewing.',
            questions: reviewQuestions
        };
        hideLoadingOverlay();
        showLectureAndSubtopics(11, 'Review / Ôn tập', topicObj);
    } catch (err) {
        hideLoadingOverlay();
        activeTopicId = null;
        updateNavTabs('Review / Ôn tập', '🧠', null);
        alert(`Không thể tải nội dung ôn tập: ${err.message}`);
    }
}

function openMainTab(tabName) {
    stopSpeaking();
    clearInterval(quizTimerInterval);
    switch (tabName) {
        case 'discover': goHome(); break;
        case 'lessons': openLessonsTab(); break;
        case 'exercises': openRoadmap(); break;
        case 'review': openReviewTab(); break;
        case 'exams': openExamHub(); break;
        case 'games': openMiniGameHub(); break;
        default: goHome();
    }
}

function goHome() {
    stopSpeaking();
    clearInterval(quizTimerInterval);
    inAlphaIpaFlow = false;
    inMiniGameFlow = false;
    activeExamContext = null;
    activeRoadmapContext = null;
    activeTopicId = null;
    pendingTopicQuiz = null;
    setMainTabActive_('discover');
    updateNavTabs(null, null, null);
    switchAppView('view-dashboard-grid');

    // Khám phá là Home logic. Nếu vì bất kỳ lý do gì grid chưa được dựng
    // (cache cũ, restore session, fetch JSON chậm...), dựng lại ngay tại đây.
    const discoverGrid = document.getElementById('view-dashboard-grid');
    if (discoverGrid && !discoverGrid.children.length) {
        renderDashboardGrid();
    }
}


// ==========================================
// V10 - BÀI HỌC <-> BÀI TẬP THEO 16 UNIT SGK GLOBAL SUCCESS
// Giữ engine quiz, tài khoản, TTS, báo cáo, Apps Script và 6 năng lực hiện có.
// Backend cũ vẫn nhận field tuần để tương thích; UI và nghiệp vụ không còn roadmap tuần.
// ==========================================
const BAI_HOC_TA2_DATA_FILE = 'assets/data/bai_hoc_tieng_anh_2.json';
let baiHocTa2DataCache = null;
let inBaiHocFlow = false;
let activeBaiHocContext = { semester: 1, bai: null, lessonId: null, pageNo: 1 };

async function loadBaiHocTa2Data() {
    if (baiHocTa2DataCache) return baiHocTa2DataCache;
    const res = await fetch(BAI_HOC_TA2_DATA_FILE);
    if (!res.ok) throw new Error('Không thể tải bai_hoc_tieng_anh_2.json');
    baiHocTa2DataCache = await res.json();
    return baiHocTa2DataCache;
}
function getBaiHocTa2ProgressKey_(){ return `ta2_bai_hoc_done_v1_${String(currentUser?.maHS||'KHACH').toUpperCase()}`; }
function getBaiHocTa2CompletedSet_(){ try{return new Set(JSON.parse(localStorage.getItem(getBaiHocTa2ProgressKey_())||'[]'));}catch(e){return new Set();} }
function saveBaiHocTa2CompletedSet_(s){ try{localStorage.setItem(getBaiHocTa2ProgressKey_(),JSON.stringify([...s]));}catch(e){} }

function openLessonsTab(){ return openBaiHocHub(1); }
async function openBaiHocHub(semesterNumber=1){
    if (!requirePremiumAccess('Lessons / Bài học')) return;
    stopSpeaking(); clearInterval(quizTimerInterval);
    setMainTabActive_('lessons'); inBaiHocFlow=true; inMiniGameFlow=false;
    activeExamContext=null; activeRoadmapContext=null; activeTopicId=null; pendingTopicQuiz=null;
    activeBaiHocContext={semester:Number(semesterNumber)||1,bai:null,lessonId:null,pageNo:1};
    updateNavTabs('Bài học','📖',null); switchAppView('view-bai-hoc-hub');
    showLoadingOverlay('Đang mở Bài học Tiếng Anh 2...');
    try{ const data=await loadBaiHocTa2Data(); renderBaiHocTa2Hub_(data,activeBaiHocContext.semester); }
    catch(err){ alert(`Không thể mở Bài học: ${err.message}`); }
    finally{ hideLoadingOverlay(); }
}
const TA2_LESSON_TITLE_VI_ = {
    1: 'Tại bữa tiệc sinh nhật',
    2: 'Ở sân sau',
    3: 'Ở bờ biển',
    4: 'Ở vùng nông thôn',
    5: 'Trong lớp học',
    6: 'Ở nông trại',
    7: 'Trong bếp',
    8: 'Trong làng',
    9: 'Trong cửa hàng tạp hóa',
    10: 'Ở sở thú',
    11: 'Ở sân chơi',
    12: 'Ở quán cà phê',
    13: 'Trong giờ Toán',
    14: 'Ở nhà',
    15: 'Trong cửa hàng quần áo',
    16: 'Ở khu cắm trại'
};
function getBaiHocTitleVi_(lesson){
    return String(lesson?.source_title_vi || TA2_LESSON_TITLE_VI_[Number(lesson?.bai)] || '').trim();
}

function renderBaiHocTa2Hub_(data,semester){
    const tabs=document.getElementById('bai-hoc-semester-tabs'), grid=document.getElementById('bai-hoc-grid'), sub=document.getElementById('bai-hoc-hub-subtitle');
    if(!tabs||!grid)return;
    const arr=(data.bai_hoc||[]).filter(x=>Number(x.semester)===Number(semester));
    tabs.innerHTML=[1,2].map(s=>`<button onclick="openBaiHocHub(${s})" class="semester-switch-btn ${Number(s)===Number(semester)?'is-active':'is-inactive'}"><span class="block">Semester ${s}</span><span class="semester-vi">Học kỳ ${s}</span></button>`).join('');
    if(sub) sub.innerHTML=`Semester ${semester} · ${arr.length} Units · 3 pages each<span class="lesson-hub-vi">Học kỳ ${semester} · mỗi bài 3 trang · khoảng 12–18 phút</span>`;
    const done=getBaiHocTa2CompletedSet_();
    grid.innerHTML=arr.map((l,idx)=>{const ok=done.has(`${l.lesson_id}_done`), titleVi=getBaiHocTitleVi_(l);return `<button onclick="openBaiHocTa2_(${l.bai},1)" class="text-left min-h-[112px] rounded-2xl border-2 ${ok?'border-emerald-300 bg-emerald-50/60':(idx%2?'border-purple-200 bg-gradient-to-br from-white to-purple-50':'border-pink-200 bg-gradient-to-br from-white to-pink-50')} px-3 py-3 hover:border-fuchsia-400 hover:shadow-md transition-shadow"><div class="flex items-center justify-between"><span class="font-black text-purple-700 text-[15px] md:text-base">Lesson ${l.bai}<span class="block text-[11px] font-extrabold text-slate-400 mt-0.5">Bài ${l.bai}</span></span><span>${ok?'✅':'›'}</span></div><div class="mt-1.5 text-[13px] md:text-[14px] leading-5 font-extrabold text-slate-700">${escapeHtml(l.source_title||'')}</div><div class="text-[12px] md:text-[13px] leading-4 font-extrabold text-slate-400 mt-1.5">${escapeHtml(titleVi)}</div></button>`}).join('');
}
async function openBaiHocTa2_(bai,pageNo=1){
    stopSpeaking(); const data=await loadBaiHocTa2Data(); const l=(data.bai_hoc||[]).find(x=>Number(x.bai)===Number(bai));
    if(!l)return alert('Không tìm thấy bài học.');
    const p=Math.max(1,Math.min(3,Number(pageNo)||1)); activeBaiHocContext={semester:Number(l.semester),bai:Number(bai),lessonId:l.lesson_id,pageNo:p};
    setMainTabActive_('lessons'); updateNavTabs('Bài học','📖',`Bài ${bai}`,l.source_title||''); switchAppView('view-bai-hoc-lesson'); renderBaiHocTa2Lesson_(l,p);
}
function renderBaiHocTa2Lesson_(l,pageNo){
    const meta=document.getElementById('bai-hoc-lesson-meta'), host=document.getElementById('bai-hoc-sections'); if(!host)return;
    if(meta){const titleVi=getBaiHocTitleVi_(l);meta.innerHTML=`Lesson ${l.bai} · ${escapeHtml(l.source_title||'')}<div class="text-[12px] font-extrabold text-slate-400 mt-1">Bài ${l.bai}${titleVi?' · '+escapeHtml(titleVi):''}</div>`;}
    const page=(l.pages||[]).find(x=>Number(x.page_no)===Number(pageNo))||l.pages?.[0]; if(!page)return;
    let body=''; if(page.page_type==='lesson')body=renderTa2LessonPage_(page); else if(page.page_type==='questions')body=renderTa2QuestionsPage_(page); else body=renderTa2SummaryPage_(page,l);
    host.innerHTML=`${renderTa2LessonTabs_(l,pageNo)}${body}${renderTa2LessonBottom_(l,pageNo)}`;
}
function renderTa2LessonTabs_(l,pageNo){
    const a=[['📖','Learn','Bài học'],['❓','Practice','Câu hỏi'],['🌟','Review','Tổng kết']];
    return `<div class="grid grid-cols-3 gap-2 mb-3">${a.map((x,i)=>{const n=i+1,ac=Number(pageNo)===n;return `<button onclick="openBaiHocTa2_(${l.bai},${n})" class="py-2.5 rounded-xl border font-black text-sm ${ac?'bg-gradient-to-r from-pink-500 to-purple-500 text-white border-purple-400 shadow-md':'bg-pink-50/60 text-purple-700 border-pink-200'}">${x[0]} <span><span class="block">${x[1]}</span><span class="block text-[9px] opacity-75">${x[2]}</span></span></button>`}).join('')}</div>`;
}
function renderTa2LessonPage_(p){
    const ph=p.phonics||{}, voc=p.vocabulary||[], dialog=p.mini_dialogue||[];
    const words=(ph.words||[]).map(w=>`<span class="lesson-chip">${escapeHtml(w)}</span>`).join('');
    const vocab=voc.map(v=>`<div class="rounded-xl bg-white border border-pink-100 px-3 py-2 font-black text-slate-700">${escapeHtml(v.word||'')}<div class="text-[10px] font-bold text-slate-400 mt-0.5">${escapeHtml(v.meaning||'')}</div></div>`).join('');
    const dlgVi=p.mini_dialogue_vi||[]; const dlg=dialog.map((x,i)=>`<div class="rounded-xl bg-purple-50 border border-purple-100 px-3 py-2 text-sm font-bold text-slate-700">${escapeHtml(x)}${dlgVi[i]?`<div class="text-[10px] text-slate-400 mt-1">${escapeHtml(dlgVi[i])}</div>`:''}</div>`).join('');
    return `<div class="space-y-3"><section class="rounded-3xl border-2 border-pink-200 bg-gradient-to-br from-pink-50 via-white to-purple-50 p-4"><div class="flex flex-col md:flex-row gap-4"><div class="md:w-[42%]"><img src="${escapeHtml(p.image||'')}" onerror="this.style.display='none'" class="w-full aspect-square object-cover rounded-2xl border border-pink-100 shadow-sm"></div><div class="md:w-[58%] space-y-3"><div class="flex items-start justify-between gap-2"><p class="text-sm md:text-base font-bold text-slate-600 leading-6">${escapeHtml(p.intro||'')}</p>${p.intro_vi?`<p class="text-[10px] font-bold text-slate-400 mt-1">${escapeHtml(p.intro_vi)}</p>`:''}<button onclick="speakBaiHocTa2_()" class="shrink-0 px-3 py-2 rounded-xl bg-pink-500 text-white text-xs font-black">🔊 Listen<span class="block text-[9px] opacity-80">Nghe</span></button></div><div class="rounded-2xl bg-white border border-violet-100 p-3"><div class="text-xs font-black text-violet-600 mb-2">🔤 PHONICS</div><div class="text-lg font-black text-violet-800">${escapeHtml(ph.letter||'')} · ${escapeHtml(ph.sound||'')}</div><div class="flex flex-wrap gap-2 mt-2">${words}</div></div><div class="rounded-2xl bg-white border border-fuchsia-100 p-3"><div class="text-xs font-black text-fuchsia-600 mb-2">📚 VOCABULARY</div><div class="grid grid-cols-3 gap-2">${vocab}</div></div></div></div></section><section class="rounded-2xl bg-gradient-to-br from-pink-50 to-violet-50 border border-fuchsia-200 p-4"><div class="text-xs font-black text-fuchsia-700 mb-1">💬 SENTENCE PATTERN<br><span class="text-[10px] text-slate-400">Mẫu câu</span></div><div class="text-lg md:text-xl font-black text-slate-800">${escapeHtml(p.sentence_pattern||'')}</div></section><section class="rounded-2xl bg-white border border-purple-100 p-4"><div class="font-black text-purple-700 mb-2">🐰 SPEAK WITH BUNNY<br><span class="text-[10px] text-slate-400">Cùng Thỏ Ngọc nói thử</span></div><div class="space-y-2">${dlg}</div></section></div>`;
}
function renderTa2QuestionsPage_(p){
    const items=(p.items||[]).map((it,i)=>{if(it.type==='choice'){const opts=(it.options||[]).map((o,j)=>`<button onclick="this.parentElement.querySelectorAll('button').forEach(b=>b.disabled=true); this.classList.add(${j===it.answer?"'bg-emerald-100','border-emerald-400'":"'bg-rose-100','border-rose-400'"})" class="text-left rounded-xl border border-pink-200 bg-white px-3 py-2 font-bold text-sm">${String.fromCharCode(65+j)}. ${escapeHtml(o)}</button>`).join('');return `<div class="rounded-2xl bg-pink-50/50 border border-pink-100 p-4"><div class="font-black text-slate-800 mb-2">${i+1}. ${escapeHtml(it.prompt||'')}${it.prompt_vi?`<div class="text-[10px] text-slate-400 mt-1">${escapeHtml(it.prompt_vi)}</div>`:''}</div><div class="grid gap-2">${opts}</div></div>`;}return `<div class="rounded-2xl bg-purple-50/50 border border-purple-100 p-4"><div class="font-black text-purple-700">🎙️ ${escapeHtml(it.prompt||'')}${it.prompt_vi?`<div class="text-[10px] text-slate-400 mt-1">${escapeHtml(it.prompt_vi)}</div>`:''}</div><button onclick="speakEnglish('${escapeJsString_(it.prompt||'')}',0.92)" class="mt-2 px-3 py-1.5 rounded-lg bg-purple-100 text-purple-700 text-xs font-black">🔊 Listen<span class="block text-[9px]">Nghe</span></button></div>`;}).join('');
    return `<div class="space-y-3"><div class="rounded-2xl bg-sky-50 border border-sky-100 p-3 text-sm font-bold text-slate-600">${escapeHtml(p.recall||'')}${p.recall_vi?`<div class="text-[10px] text-slate-400 mt-1">${escapeHtml(p.recall_vi)}</div>`:''}</div>${items}</div>`;
}
function renderTa2SummaryPage_(p,l){
    const pts=(p.key_points||[]).map(x=>`<li>${escapeHtml(x)}</li>`).join(''), lines=(p.practice_lines||[]).map(x=>`<div class="rounded-xl bg-white border border-pink-100 px-3 py-2 font-black text-slate-700">${escapeHtml(x)}</div>`).join('');
    return `<div class="space-y-3"><section class="rounded-3xl bg-gradient-to-br from-pink-50 via-fuchsia-50 to-violet-50 border-2 border-fuchsia-200 p-4"><div class="text-xs font-black text-fuchsia-600">🌟 TỔNG KẾT</div><ul class="list-disc pl-5 mt-3 space-y-2 text-sm md:text-base text-slate-700 font-semibold leading-7">${pts}</ul></section><section class="rounded-2xl bg-white border border-pink-100 p-4"><div class="font-black text-pink-700 mb-2">🗣️ Con nói lại nhé</div><div class="grid gap-2">${lines}</div></section><section class="rounded-2xl bg-violet-50 border border-violet-100 p-4"><div class="font-black text-violet-700">${escapeHtml(p.finish_prompt||'')}</div></section><button onclick="markBaiHocTa2Complete_(${l.bai})" class="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-black shadow-md">✅ Hoàn thành Bài ${l.bai}</button></div>`;
}
function renderTa2LessonBottom_(l,pageNo){const prev=pageNo>1?`<button onclick="openBaiHocTa2_(${l.bai},${pageNo-1})" class="px-4 py-2 rounded-xl bg-white border border-purple-200 text-purple-700 font-black text-xs">← Trang trước</button>`:'<span></span>';const next=pageNo<3?`<button onclick="openBaiHocTa2_(${l.bai},${pageNo+1})" class="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-black text-xs">Trang tiếp →</button>`:`<button onclick="openBaiHocTa2_(${l.bai},1)" class="px-4 py-2 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 font-black text-xs">↺ Xem lại</button>`;return `<div class="flex items-center justify-between gap-3 pt-2">${prev}<div class="text-xs font-black text-slate-400">${pageNo}/3</div>${next}</div>`;}
function markBaiHocTa2Complete_(bai){const id=activeBaiHocContext?.lessonId;if(!id)return;const s=getBaiHocTa2CompletedSet_();s.add(`${id}_done`);saveBaiHocTa2CompletedSet_(s);alert(`✅ Bé đã hoàn thành Bài ${bai}!`);}
function speakBaiHocTa2_(){const data=baiHocTa2DataCache,l=(data?.bai_hoc||[]).find(x=>Number(x.bai)===Number(activeBaiHocContext?.bai)),p=(l?.pages||[]).find(x=>Number(x.page_no)===1);if(!p)return;const ph=p.phonics||{};const text=[...(ph.words||[]),p.sentence_pattern,...(p.mini_dialogue||[])].filter(Boolean).join('. ');speakEnglish(text,0.88);}

function getBaiTapTa2UnlockKey_(){return `ta2_bai_tap_unlocked_v1_${String(currentUser?.maHS||'KHACH').toUpperCase()}`;}
function getUnlockedBaiTapTa2_(){let local=1;try{local=Number(localStorage.getItem(getBaiTapTa2UnlockKey_())||1)||1;}catch(e){}const server=Number(currentUser?.baiTapHienTai??currentUser?.tuanHienTai??1)||1;return Math.max(1,local,server);}
function saveUnlockedBaiTapTa2_(n){try{localStorage.setItem(getBaiTapTa2UnlockKey_(),String(Math.max(1,Number(n)||1)));}catch(e){}if(currentUser)currentUser.baiTapHienTai=Math.max(Number(currentUser.baiTapHienTai||1),Number(n)||1);}
function getBaiTapRecentKey_(bai){return `ta2_bt_recent_${String(currentUser?.maHS||'KHACH').toUpperCase()}_${bai}`;}
function getBaiTapRecent_(bai){try{return JSON.parse(localStorage.getItem(getBaiTapRecentKey_(bai))||'[]');}catch(e){return[];}}
function saveBaiTapRecent_(bai,ids){try{localStorage.setItem(getBaiTapRecentKey_(bai),JSON.stringify(ids.slice(-40)));}catch(e){}}
function questionSearchTextTa2_(q){return [q.question_text,q.answer,q.audio_text,q.reading_title,q.reading_passage,q.hint,...(q.options||[])].filter(Boolean).join(' ').toLowerCase();}
function matchesAnyTa2_(text,words){return (words||[]).some(k=>text.includes(String(k).toLowerCase()));}
function selectBalancedTa2_(pool,count){const by={};pool.forEach(q=>{const k=SKILL_KEYS.includes(String(q.skill_tag||'').toUpperCase())?String(q.skill_tag).toUpperCase():'ENG_VOC';(by[k]||=[]).push(q);});Object.keys(by).forEach(k=>by[k]=shuffleArray(by[k]));const out=[],used=new Set();let progressed=true;while(out.length<count&&progressed){progressed=false;for(const k of SKILL_KEYS){const a=by[k]||[];while(a.length&&used.has(a[0].question_id))a.shift();if(a.length&&out.length<count){const q=a.shift();used.add(q.question_id);out.push(q);progressed=true;}}}for(const q of shuffleArray(pool)){if(out.length>=count)break;if(!used.has(q.question_id)){used.add(q.question_id);out.push(q);}}return shuffleArray(out.slice(0,count));}
function getQuestionsForBaiTapTa2_(bt){
    const all=allQuestionsFlatCache||[]; if(!bt||!all.length)return[]; const recent=new Set(getBaiTapRecent_(bt.bai));
    const primary=all.filter(q=>matchesAnyTa2_(questionSearchTextTa2_(q),bt.keywords));
    const extended=all.filter(q=>!primary.includes(q)&&matchesAnyTa2_(questionSearchTextTa2_(q),bt.extended_keywords));
    let candidate=[...shuffleArray(primary),...shuffleArray(extended)].filter(q=>!recent.has(q.question_id));
    const target=Math.min(Number(bt.candidate_pool_target)||30,primary.length+extended.length);
    candidate=candidate.slice(0,target);
    if(candidate.length<Math.min(20,primary.length+extended.length)) candidate=[...shuffleArray(primary),...shuffleArray(extended)].slice(0,target);
    const chosen=selectBalancedTa2_(candidate,Math.min(Number(bt.draw_count)||20,candidate.length));
    saveBaiTapRecent_(bt.bai,chosen.map(q=>q.question_id)); return chosen;
}
async function openRoadmap(semesterNumber=1){
    stopSpeaking(); if(!requirePremiumAccess('Bài tập'))return; setMainTabActive_('exercises'); inMiniGameFlow=false;inBaiHocFlow=false;updateNavTabs('Bài tập','✏️',null);switchAppView('view-roadmap');showLoadingOverlay('Đang mở Bài tập...');
    try{const data=await loadBaiHocTa2Data();renderBaiTapTa2Grid_(data,semesterNumber);}catch(err){alert(`Không thể mở Bài tập: ${err.message}`);}finally{hideLoadingOverlay();}
}
function renderBaiTapTa2Grid_(data,semester){
    const host=document.getElementById('roadmap-svg-container'),tabs=document.getElementById('bai-tap-semester-tabs');if(!host)return;const arr=(data.bai_tap||[]).filter(x=>Number(x.semester)===Number(semester)),unlocked=getUnlockedBaiTapTa2_();
    if(tabs)tabs.innerHTML=[1,2].map(s=>`<button onclick="openRoadmap(${s})" class="semester-switch-btn ${Number(s)===Number(semester)?'is-active':'is-inactive'}"><span class="block">Semester ${s}</span><span class="block text-[9px] opacity-75">Học kỳ ${s}</span></button>`).join('');
    host.innerHTML=`<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">${arr.map((bt,idx)=>{const open=Number(bt.bai)<=unlocked;return `<button onclick="${open?`selectBaiTapTa2_(${bt.bai})`:`showLockedBaiTapTa2_(${bt.bai})`}" class="relative text-left min-h-[105px] rounded-2xl border-2 p-3 ${open?(idx%2?'bg-purple-50 border-purple-200 hover:border-purple-400':'bg-pink-50 border-pink-200 hover:border-pink-400'):'bg-slate-50 border-slate-200 opacity-60'} hover:shadow-md transition-shadow"><div class="flex justify-between"><span class="font-black ${open?'text-purple-700':'text-slate-500'}">Exercise ${bt.bai}<span class="block text-[9px] text-slate-400">Bài tập ${bt.bai}</span></span><span>${open?'':'🔒'}</span></div><div class="text-[12px] md:text-[13px] font-bold text-slate-600 mt-1 line-clamp-2">${escapeHtml(bt.title||'')}</div><div class="text-[10px] mt-2 ${open?'text-fuchsia-600':'text-slate-400'} font-black">${open?'20 questions · 6 skills<br><span class="text-[9px] text-slate-400">20 câu · 6 năng lực</span>':'Score ≥80% to unlock<br><span class="text-[9px] text-slate-400">Cần ≥80% bài trước</span>'}</div></button>`}).join('')}</div>`;
}
function showLockedBaiTapTa2_(bai){alert(`🔒 Bài tập ${bai} chưa mở. Bé cần đạt từ 80% ở Bài tập trước để mở khóa nhé!`);}
async function selectBaiTapTa2_(bai){
    stopSpeaking();showLoadingOverlay(`Đang chuẩn bị Bài tập ${bai}...`);try{const data=await loadBaiHocTa2Data(),bt=(data.bai_tap||[]).find(x=>Number(x.bai)===Number(bai));if(!bt)throw new Error('Không tìm thấy Bài tập');if(Number(bai)>getUnlockedBaiTapTa2_()){showLockedBaiTapTa2_(bai);return;}await fetchAllTopicsData();const qs=getQuestionsForBaiTapTa2_(bt);if(qs.length<10)throw new Error('Kho câu hỏi phù hợp Unit này chưa đủ dữ liệu để tạo lượt luyện ổn định');activeRoadmapContext={week:Number(bai),bai:Number(bai),topicId:`TA2_BT${String(bai).padStart(2,'0')}`,chuDe:`Bài tập ${bai} · ${bt.title||''}`};pendingTopicQuiz=null;activeExamContext=null;updateNavTabs('Bài tập','✏️',`Bài ${bai}`,bt.title||'');startTopicQuiz(bai,activeRoadmapContext.chuDe,qs,null);}catch(err){alert(`Không thể mở Bài tập: ${err.message}`);}finally{hideLoadingOverlay();}
}

// Báo cáo 6 năng lực: không có dữ liệu không được hiểu là 0%.
function renderReportTopicsBreakdown(){
    const container=document.getElementById('report-topics-list');if(!container)return;const stats={};SKILL_KEYS.forEach(k=>stats[k]={total:0,correct:0,maxScore:0,earnedScore:0});activeQuestionsList.forEach((q,i)=>{let k=String(q.skill_tag||'ENG_VOC').toUpperCase();if(!SKILL_KEYS.includes(k))k='ENG_VOC';stats[k].total++;stats[k].maxScore+=(q.diem??0.5);if(userAnswers[i]===q.answer){stats[k].correct++;stats[k].earnedScore+=(q.diem??0.5);}});
    container.innerHTML=SKILL_KEYS.map(k=>{const d=stats[k];if(!d.total)return `<div class="bg-slate-50 border border-slate-200 rounded-2xl p-3"><div class="flex items-center justify-between gap-2"><span class="font-black text-slate-700 text-xs sm:text-sm">${SKILL_TAXONOMY[k].name}</span><span class="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[11px] font-extrabold">Chưa đủ dữ liệu</span></div><div class="mt-2 text-xs font-bold text-slate-400">Bài này chưa có câu hỏi thuộc năng lực này.</div></div>`;const pct=Math.round(d.correct/d.total*100),pass=pct>=50;return `<div class="bg-pink-50/40 border border-pink-100 rounded-2xl p-3 space-y-2"><div class="flex items-center justify-between"><span class="font-black text-slate-800 text-xs sm:text-sm">${SKILL_TAXONOMY[k].name}</span><span class="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${pass?'bg-violet-100 text-violet-700':'bg-rose-50 text-rose-700'}">${pass?'Đạt yêu cầu':'Cần luyện thêm'}</span></div><div class="flex justify-between text-xs font-bold text-slate-600"><span>Số câu đúng: <strong class="text-pink-600">${d.correct}/${d.total}</strong></span><span class="font-black">${pct}%</span></div><div class="w-full bg-pink-100 rounded-full h-2 overflow-hidden"><div class="${pass?'bg-gradient-to-r from-fuchsia-400 to-violet-400':'bg-gradient-to-r from-pink-400 to-rose-400'} h-full rounded-full" style="width:${pct}%"></div></div></div>`;}).join('');
}

async function saveWeeklyProgressToSheet(percent,starCount,scoreVal){
    const bai=Number(activeRoadmapContext?.bai??activeRoadmapContext?.week??1),chuDe=activeRoadmapContext?.chuDe||`Bài tập ${bai}`,thoiGianLamBai=quizStartTime?formatDuration(Date.now()-quizStartTime):'',scoreThang10=(scoreVal??((score/activeQuestionsList.length)*10)).toFixed(1);const skillCorrect={},skillTotal={};SKILL_KEYS.forEach(k=>{skillCorrect[k]=0;skillTotal[k]=0});quizAnsweredLog.forEach(item=>{let k=String(item.skill_tag||'ENG_VOC').toUpperCase();if(!SKILL_KEYS.includes(k))k='ENG_VOC';skillTotal[k]++;if(item.isCorrect)skillCorrect[k]++;});
    const payload={student_id:currentUser.maHS,maHS:currentUser.maHS,token:currentUser.token,hoTen:currentUser.hoTen,lop:currentUser.lop,sheetName:'LichSuTienTrinhTuan',week_completed:bai,tuan:bai,baiTap:bai,chuDe,topicId:activeRoadmapContext?.topicId||`TA2_BT${String(bai).padStart(2,'0')}`,score:scoreThang10,stars_earned:starCount,tongCauHoi:activeQuestionsList.length,soCauDung:quizAnsweredLog.filter(x=>x.isCorrect).length,percent,thoiGianLamBai,wrongQuestions:quizWrongAnswers};Object.keys(SKILL_TAXONOMY).forEach(k=>{payload[SKILL_TAXONOMY[k].sheetCol]=skillCorrect[k];payload[SKILL_TAXONOMY[k].totalCol]=skillTotal[k];});
    let next=null;if(percent>=80){try{const data=await loadBaiHocTa2Data(),nums=(data.bai_tap||[]).map(x=>Number(x.bai)).sort((a,b)=>a-b);next=nums.find(x=>x>bai)||null;if(next){saveUnlockedBaiTapTa2_(next);if(currentUser)currentUser.tuanHienTai=Math.max(Number(currentUser.tuanHienTai||1),next);}}catch(e){console.warn('[Bài tập] Không xác định được bài kế tiếp:',e);}}
    try{await callAppsScript('saveWeeklyProgress',payload);}catch(e){console.warn('[Bài tập] Lỗi lưu tiến trình:',e);}
    if(next)setTimeout(()=>alert(`🎉 Chúc mừng bé đạt ${percent}%! Bài tập ${next} đã được mở khóa.`),500);
}


function returnToTopicLecture(){
    stopSpeaking();clearInterval(quizTimerInterval);
    if(inBaiHocFlow){openBaiHocHub(activeBaiHocContext?.semester||1);return;}
    if(activeExamContext){openExamHub();return;}
    if(activeRoadmapContext){openRoadmap(activeRoadmapContext?.bai>8?2:1);return;}
    if(pendingTopicQuiz){showLectureAndSubtopics(pendingTopicQuiz.topicNum,pendingTopicQuiz.topicName,{questions:pendingTopicQuiz.questions});return;}
    if(inAlphaIpaFlow){openAlphabetIPA();return;}
    if(inMiniGameFlow){openMiniGameHub();return;}
    goHome();
}
