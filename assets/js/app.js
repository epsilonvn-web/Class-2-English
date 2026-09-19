// ==========================================
// CẤU HÌNH 12 CHỦ ĐỀ CHÍNH & MA TRẬN KỸ NĂNG C1-C6
// ==========================================
const TOPICS_CONFIG = [
    { id: 1, title: "1. Bảng chữ cái", desc: "Nguyên âm, phụ âm, âm ghép", icon: "🅰️", color: "pink" },
    { id: 2, title: "2. Dấu thanh kì diệu", desc: "Ngang, sắc, huyền, hỏi, ngã, nặng", icon: "🎵", color: "purple" },
    { id: 3, title: "3. Ghép âm - vần", desc: "Vần xuôi & phức tạp", icon: "🧩", color: "blue" },
    { id: 4, title: "4. Tập đọc", desc: "Đọc trơn từ 1 từ đến câu dài", icon: "📚", color: "fuchsia" },
    { id: 7, title: "5. Kho từ vựng của bé", desc: "Nhìn tranh, chọn từ và mở rộng vốn từ", icon: "🌿", color: "emerald" },
    { id: 9, title: "6. Nhà thông thái sắp câu", desc: "4 cấp độ từ câu ngắn đến câu dài", icon: "🧠", color: "indigo" },
    { id: 10, title: "7. Đọc hiểu - trả lời", desc: "4 cấp độ từ đọc ngắn đến suy luận", icon: "📖", color: "pink" },
    { id: 5, title: "8. Điền từ / chữ còn thiếu", desc: "Điền phần còn thiếu để hoàn chỉnh từ, tiếng", icon: "✍️", color: "amber" },
    { id: 6, title: "9. Bác sĩ bắt bệnh chính tả", desc: "Sửa lỗi từ & viết hoa", icon: "S/X", color: "rose", isCustomTextIcon: true },
    { id: 8, title: "10. Gia đình từ loại", desc: "Sự vật, hoạt động, đặc điểm", icon: "🧸", color: "teal" },
    { id: 11, title: "11. Đố vui bé ngoan (IQ)", desc: "Câu đố con vật, đồ dùng", icon: "🎯", color: "yellow" },
    { id: 12, title: "12. Vườn thơ và nhạc", desc: "20 bài thơ + 20 bài hát do Cô Thỏ Hồng sáng tác", icon: "🎶", color: "fuchsia" },
    { id: 13, title: "13. Ôn tập học kỳ", desc: "Học kỳ 1 & Học kỳ 2", icon: "📚", color: "cyan" }
];

const SUBTOPIC_PALETTES = [
    { card: "bg-pink-50/80 hover:bg-pink-100 border-pink-300 text-pink-800", num: "text-pink-600", badge: "bg-white text-pink-600 border-pink-200" },
    { card: "bg-emerald-50/80 hover:bg-emerald-100 border-emerald-300 text-emerald-800", num: "text-emerald-600", badge: "bg-white text-emerald-600 border-emerald-200" },
    { card: "bg-purple-50/80 hover:bg-purple-100 border-purple-300 text-purple-800", num: "text-purple-600", badge: "bg-white text-purple-600 border-purple-200" },
    { card: "bg-amber-50/80 hover:bg-amber-100 border-amber-300 text-amber-800", num: "text-amber-600", badge: "bg-white text-amber-600 border-amber-200" },
    { card: "bg-sky-50/80 hover:bg-sky-100 border-sky-300 text-sky-800", num: "text-sky-600", badge: "bg-white text-sky-600 border-sky-200" },
    { card: "bg-rose-50/80 hover:bg-rose-100 border-rose-300 text-rose-800", num: "text-rose-600", badge: "bg-white text-rose-600 border-rose-200" }
];

const roadmapConfig = {
    1: { name: "Tuần 1: Làm quen chữ cái & nguyên âm", topicIds: [1], desc: "Nhận diện nguyên âm, phụ âm đơn và nền tảng bảng chữ cái.", icon: "🅰️" },
    2: { name: "Tuần 2: Phụ âm ghép & chữ hoa", topicIds: [1], desc: "Phân biệt phụ âm ghép, chữ in hoa và chữ thường.", icon: "🔤" },
    3: { name: "Tuần 3: Sáu thanh điệu cơ bản", topicIds: [2], desc: "Nhận biết thanh ngang, sắc, huyền, hỏi, ngã, nặng.", icon: "🎵" },
    4: { name: "Tuần 4: Thanh điệu trong tiếng", topicIds: [2], desc: "Phân biệt thanh điệu trong các tiếng quen thuộc và tiếng khó hơn.", icon: "🎶" },
    5: { name: "Tuần 5: Từ thanh điệu đến ghép âm", topicIds: [2,3], desc: "Củng cố thanh điệu và bắt đầu ghép âm đầu với nguyên âm.", icon: "🧩" },
    6: { name: "Tuần 6: Ghép tiếng & thêm thanh", topicIds: [3], desc: "Ghép tiếng cơ bản rồi thêm thanh để tạo tiếng có nghĩa.", icon: "🔡" },
    7: { name: "Tuần 7: Ghép vần & luật c/k, g/gh", topicIds: [3,5], desc: "Ghép âm đầu với vần; làm quen c/k/q và g/gh.", icon: "✍️" },
    8: { name: "Tuần 8: Tạo tiếng & ng/ngh, ch/tr", topicIds: [3,5], desc: "Tạo tiếng hoàn chỉnh; phân biệt ng/ngh và ch/tr.", icon: "📝" },
    9: { name: "Tuần 9: Phân biệt s/x, l/n, ch/tr", topicIds: [5], desc: "Luyện các cặp âm đầu dễ lẫn trong chính tả.", icon: "S/X" },
    10: { name: "Tuần 10: d/gi/r & chính tả tổng hợp", topicIds: [5], desc: "Phân biệt d/gi/r và ôn tổng hợp các luật chính tả đã học.", icon: "🩺" },
    11: { name: "Tuần 11: Vốn từ & từ chỉ sự vật", topicIds: [7,8], desc: "Mở rộng từ về gia đình, trường học và nhận diện từ chỉ sự vật.", icon: "🌿" },
    12: { name: "Tuần 12: Ôn tập Học kỳ 1", topicIds: [13], desc: "Ôn tổng hợp kiến thức Học kỳ 1 trước khi vào giai đoạn tiếp theo.", icon: "📘" },
    13: { name: "Tuần 13: Vần phức & tiếng hoàn chỉnh", topicIds: [3], desc: "Củng cố vần khó, ghép âm đầu + vần + thanh ở mức cao hơn.", icon: "🔠" },
    14: { name: "Tuần 14: Chính tả nâng cao & chữa lỗi", topicIds: [3,5,6], desc: "Ôn luật c/k, g/gh, ng/ngh, ch/tr và bắt đầu chữa từ sai.", icon: "🩹" },
    15: { name: "Tuần 15: Viết hoa & bác sĩ chính tả", topicIds: [6], desc: "Luyện viết hoa tên riêng và phát hiện lỗi trong câu ngắn.", icon: "🩺" },
    16: { name: "Tuần 16: Từ ngữ thiên nhiên & đặc điểm", topicIds: [7], desc: "Mở rộng vốn từ về con vật, cây cối, màu sắc, hình dáng và đặc điểm.", icon: "🌳" },
    17: { name: "Tuần 17: Hoạt động, cảm xúc & quan hệ từ", topicIds: [7], desc: "Mở rộng từ chỉ hoạt động, cảm xúc, đồng nghĩa, trái nghĩa và ngữ cảnh.", icon: "😊" },
    18: { name: "Tuần 18: Từ chỉ hoạt động & đặc điểm", topicIds: [8], desc: "Nhận biết và phân biệt hai nhóm từ quan trọng trong câu.", icon: "🏃" },
    19: { name: "Tuần 19: Phân loại từ & dùng từ trong câu", topicIds: [8], desc: "Phân loại sự vật - hoạt động - đặc điểm và chọn từ đúng ngữ cảnh.", icon: "🧸" },
    20: { name: "Tuần 20: Sắp câu 3-4 từ", topicIds: [9], desc: "Xếp các từ thành câu ngắn đúng trật tự và đúng nghĩa.", icon: "🧠" },
    21: { name: "Tuần 21: Câu dài, câu hỏi & câu cảm", topicIds: [9], desc: "Xếp câu 5 từ trở lên, luyện câu hỏi, câu cảm và thử thách tổng hợp.", icon: "💬" },
    22: { name: "Tuần 22: Đọc hiểu văn xuôi & thơ", topicIds: [10], desc: "Đọc văn xuôi, thơ ngắn và trả lời câu hỏi bám chi tiết văn bản.", icon: "📖" },
    23: { name: "Tuần 23: Đọc hiểu thông tin & suy luận", topicIds: [10], desc: "Đọc văn bản thông tin, suy luận ý nghĩa và rút ra bài học phù hợp.", icon: "🔎" },
    24: { name: "Tuần 24: Ôn tập Học kỳ 2", topicIds: [13], desc: "Ôn tổng hợp kiến thức Học kỳ 2, sẵn sàng bước vào Đấu trường đề thi.", icon: "📗" }
};

const TOPIC_TO_SKILL = {
    1: 'C1', 2: 'C1', 3: 'C1',
    4: 'C5',
    5: 'C2', 6: 'C2',
    7: 'C3',
    8: 'C4', 9: 'C4',
    10: 'C5', 11: 'C6',
    12: 'C5', 13: 'C5'
};

function skillsForWeek(weekNum) {
    const cfg = roadmapConfig[weekNum];
    if (!cfg) return [];
    return [...new Set(cfg.topicIds.map(id => TOPIC_TO_SKILL[id] || 'C1'))];
}

const ROADMAP_COORDS = {
    1: { x: 130, y: 125 },  2: { x: 390, y: 125 },  3: { x: 650, y: 125 },  4: { x: 910, y: 125 },
    5: { x: 910, y: 315 },  6: { x: 650, y: 315 },  7: { x: 390, y: 315 },  8: { x: 130, y: 315 },
    9: { x: 130, y: 505 }, 10: { x: 390, y: 505 }, 11: { x: 650, y: 505 }, 12: { x: 910, y: 505 }
};

const examFileMap = {
    hocky1: { file: 'de_thi_tieng_viet_1.json', sheet: 'LichSuBaiThi_HK1', label: 'Học kỳ 1', color: 'pink' },
    hocky2: { file: 'de_thi_tieng_viet_1.json', sheet: 'LichSuBaiThi_HK2', label: 'Học kỳ 2', color: 'purple' },
    hsg:    { file: 'de_thi_tieng_viet_1.json', sheet: 'LichSuBaiThi_HSG', label: 'Học sinh giỏi', color: 'amber' }
};

const SKILL_TAXONOMY = {
    C1: { code: 'C1', sheetCol: 'C1_NguAm', totalCol: 'C1_NguAm_Tong', name: 'Ngữ âm & Nhận diện', advice: 'Cần ôn lại bảng chữ cái, phân biệt nguyên âm và phụ âm ghép.' },
    C2: { code: 'C2', sheetCol: 'C2_ChinhTa', totalCol: 'C2_ChinhTa_Tong', name: 'Luật chính tả', advice: 'Rèn luyện thêm quy tắc đặt 5 dấu thanh, phân biệt c/k, g/gh, ng/ngh.' },
    C3: { code: 'C3', sheetCol: 'C3_VonTu', totalCol: 'C3_VonTu_Tong', name: 'Vốn từ & Ngữ nghĩa', advice: 'Luyện đọc các vần đôi, mở rộng vốn từ miêu tả qua đời sống hàng ngày.' },
    C4: { code: 'C4', sheetCol: 'C4_CuPhap', totalCol: 'C4_CuPhap_Tong', name: 'Cú pháp & Đặt câu', advice: 'Rèn luyện sắp xếp từ ngữ xáo trộn thành câu kể hoàn chỉnh có nghĩa.' },
    C5: { code: 'C5', sheetCol: 'C5_DocHieu', totalCol: 'C5_DocHieu_Tong', name: 'Đọc hiểu & Cảm thụ', advice: 'Tăng cường đọc diễn cảm truyện ngụ ngôn và nắm bắt nội dung mẩu chuyện.' },
    C6: { code: 'C6', sheetCol: 'C6_TuDuyIQ', totalCol: 'C6_TuDuyIQ_Tong', name: 'Tư duy & Phản xạ IQ', advice: 'Rèn kỹ năng suy luận logic, giải mã các câu đố thơ dân gian.' }
};

const GREETINGS_STUDENT = [
    "Chào {name}, cô Thỏ Hồng chúc con có một buổi học thật vui và đạt điểm mười nhé!",
    "Chào mừng {name} đã quay trở lại! Hôm nay chúng mình cùng tự tin bứt phá nhé!",
    "Cô Thỏ Hồng chào {name}, chúc bé yêu học giỏi, chăm ngoan và giành thật nhiều sao!",
    "Chào con yêu {name}, hãy cùng cô Thỏ Hồng khám phá những bài học kì diệu hôm nay nhé!",
    "Chào mừng {name} đến với buổi học! Chúc con làm bài thật xuất sắc và tràn ngập niềm vui!"
];

const GREETINGS_GUEST = [
    "Chào bé yêu, cô Thỏ Hồng chúc con có một buổi học thử thật vui và bổ ích!",
    "Chào mừng bé đến với lớp học Tiếng Việt của cô Thỏ Hồng! Chúc bé học thật giỏi nhé!",
    "Cô Thỏ Hồng chào bé yêu! Chúng mình cùng nhau khám phá những bài học kì diệu nào!",
    "Chào thiên thần nhỏ! Hãy cùng cô Thỏ Hồng chinh phục các câu hỏi thật xuất sắc nhé!",
    "Chào mừng con đến với Đấu trường học tập! Chúc con học thật vui và say mê nhé!"
];

// DỮ LIỆU BẢNG CHỮ CÁI TƯƠNG TÁC (1.1, 1.2, 1.3, 1.4)
const ALPHABET_29_DETAILS = [
    { u:'A', l:'a', hw:'A', sound:'a', name:'Chữ A', group:'nguyen_am_don', examples:[{w:'Quả na', emo:'🍈', tag:'Danh từ', sent:'Quả na mở mắt đón xuân'},{w:'Con cá', emo:'🐟', tag:'Danh từ', sent:'Con cá bơi lội tung tăng'},{w:'Cái ca', emo:'🥛', tag:'Đồ vật', sent:'Cái ca nước uống của bé'}] },
    { u:'Ă', l:'ă', hw:'Ă', sound:'á', name:'Chữ Á', group:'nguyen_am_don', examples:[{w:'Mặt trăng', emo:'🌙', tag:'Thiên nhiên', sent:'Mặt trăng khuyết sáng ngời'},{w:'Khăn mặt', emo:'🧣', tag:'Đồ vật', sent:'Bé rửa mặt bằng khăn sạch'},{w:'Búp măng', emo:'🎋', tag:'Cây cối', sent:'Búp măng non mọc thẳng'}] },
    { u:'Â', l:'â', hw:'Â', sound:'ớ', name:'Chữ Ớ', group:'nguyen_am_don', examples:[{w:'Cây nấm', emo:'🍄', tag:'Cây cối', sent:'Cây nấm rơm nhỏ bé'},{w:'Cái ấm', emo:'🫖', tag:'Đồ vật', sent:'Cái ấm pha trà nóng'},{w:'Gấu trúc', emo:'🐼', tag:'Động vật', sent:'Gấu trúc thích ăn lá trúc'}] },
    { u:'B', l:'b', hw:'B', sound:'bờ', name:'Chữ Bờ', group:'phu_am', examples:[{w:'Con bò', emo:'🐄', tag:'Động vật', sent:'Con bò gặm cỏ trên đồi'},{w:'Quả bóng', emo:'⚽', tag:'Đồ chơi', sent:'Quả bóng tròn lăn trên sân'},{w:'Búp bê', emo:'🧸', tag:'Đồ chơi', sent:'Búp bê của bé rất xinh'}] },
    { u:'C', l:'c', hw:'C', sound:'cờ', name:'Chữ Cờ', group:'phu_am', examples:[{w:'Con cò', emo:'🦩', tag:'Loài chim', sent:'Con cò bay lả bay la'},{w:'Quả cam', emo:'🍊', tag:'Trái cây', sent:'Quả cam nhiều vitamin C'},{w:'Lá cờ', emo:'🚩', tag:'Đồ vật', sent:'Lá cờ đỏ sao vàng'}] },
    { u:'CH', l:'ch', hw:'Ch', sound:'chờ', name:'Chữ Chờ', group:'phu_am_ghep', examples:[{w:'Chú chó', emo:'🐶', tag:'Động vật', sent:'Chú chó trông nhà rất ngoan'},{w:'Cái chổi', emo:'🧹', tag:'Đồ vật', sent:'Cái chổi quét nhà sạch tinh'},{w:'Chùm khế', emo:'⭐', tag:'Trái cây', sent:'Chùm khế ngọt trĩu cành'}] },
    { u:'D', l:'d', hw:'D', sound:'dờ', name:'Chữ Dờ', group:'phu_am', examples:[{w:'Con dê', emo:'🐐', tag:'Động vật', sent:'Con dê kêu be be'},{w:'Quả dừa', emo:'🥥', tag:'Trái cây', sent:'Quả dừa ngọt mát trưa hè'},{w:'Quả dâu', emo:'🍓', tag:'Trái cây', sent:'Quả dâu tây đỏ mọng'}] },
    { u:'Đ', l:'đ', hw:'Đ', sound:'đờ', name:'Chữ Đờ', group:'phu_am', examples:[{w:'Đu đủ', emo:'🥭', tag:'Trái cây', sent:'Quả đu đủ chín vàng'},{w:'Đồng hồ', emo:'⏰', tag:'Đồ vật', sent:'Đồng hồ tích tắc đếm giờ'},{w:'Đoàn tàu', emo:'🚂', tag:'Phương tiện', sent:'Đoàn tàu chạy xình xịch'}] },
    { u:'E', l:'e', hw:'E', sound:'e', name:'Chữ E', group:'nguyen_am_don', examples:[{w:'Con ve', emo:'🦗', tag:'Côn trùng', sent:'Tiếng ve kêu râm ran hè về'},{w:'Chiếc xe', emo:'🚗', tag:'Phương tiện', sent:'Xe ô tô chạy bon bon'},{w:'Que kem', emo:'🍦', tag:'Món ăn', sent:'Que kem mát lạnh ngọt bùi'}] },
    { u:'Ê', l:'ê', hw:'Ê', sound:'ê', name:'Chữ Ê', group:'nguyen_am_don', examples:[{w:'Con bê', emo:'🐮', tag:'Động vật', sent:'Chú bê con lon ton theo mẹ'},{w:'Quả lê', emo:'🍐', tag:'Trái cây', sent:'Quả lê giòn ngọt mát'},{w:'Cái ghế', emo:'🪑', tag:'Đồ vật', sent:'Cái ghế gỗ của em ngồi học'}] },
    { u:'G', l:'g', hw:'G', sound:'gờ', name:'Chữ Gờ', group:'phu_am', examples:[{w:'Con gà', emo:'🐔', tag:'Vật nuôi', sent:'Con gà trống gáy ò ó o'},{w:'Quả gấc', emo:'🍈', tag:'Trái cây', sent:'Quả gấc đỏ dùng nấu xôi'},{w:'Cái gối', emo:'🛌', tag:'Đồ dùng', sent:'Cái gối êm ái bé nằm ngủ'}] },
    { u:'GH', l:'gh', hw:'Gh', sound:'ghờ', name:'Chữ Ghờ', group:'phu_am_ghep', examples:[{w:'Ghế gỗ', emo:'🪑', tag:'Đồ vật', sent:'Cái ghế gỗ chắc chắn'},{w:'Ghép hình', emo:'🧩', tag:'Trò chơi', sent:'Bé thích chơi ghép hình'},{w:'Ghi nhớ', emo:'📝', tag:'Học tập', sent:'Bé ghi nhớ lời cô dạy'}] },
    { u:'GI', l:'gi', hw:'Gi', sound:'giờ', name:'Chữ Giờ', group:'phu_am_ghep', examples:[{w:'Cây gió', emo:'🌳', tag:'Thực vật', sent:'Cây gió thổi vi vu'},{w:'Giỏ quà', emo:'🎁', tag:'Đồ vật', sent:'Giỏ quà Tết xinh xắn'},{w:'Giọt nước', emo:'💧', tag:'Thiên nhiên', sent:'Giọt nước trong veo'}] },
    { u:'H', l:'h', hw:'H', sound:'hờ', name:'Chữ Hờ', group:'phu_am', examples:[{w:'Bông hoa', emo:'🌸', tag:'Thực vật', sent:'Bông hoa hồng nở rực rỡ'},{w:'Con hổ', emo:'🐯', tag:'Động vật hoang dã', sent:'Chúa sơn lâm con hổ dũng mãnh'},{w:'Chú hươu', emo:'🦌', tag:'Động vật', sent:'Chú hươu sao hiền lành'}] },
    { u:'I', l:'i', hw:'I', sound:'i', name:'Chữ I ngắn', group:'nguyen_am_don', examples:[{w:'Hòn bi', emo:'🔮', tag:'Đồ chơi', sent:'Hòn bi ve tròn xoe lấp lánh'},{w:'Quả bí', emo:'🎃', tag:'Rau củ', sent:'Quả bí đỏ nấu canh rất ngọt'},{w:'Cây kim', emo:'🪡', tag:'Đồ dùng', sent:'Cây kim khâu quần áo'}] },
    { u:'K', l:'k', hw:'K', sound:'ca', name:'Chữ Ca', group:'phu_am', examples:[{w:'Cái kéo', emo:'✂️', tag:'Đồ dùng', sent:'Cái kéo cắt giấy thủ công'},{w:'Cái kính', emo:'👓', tag:'Đồ dùng', sent:'Cặp kính mắt tròn xoe'},{w:'Kì lân', emo:'🦄', tag:'Con vật', sent:'Chú kì lân bảy sắc diệu kì'}] },
    { u:'KH', l:'kh', hw:'Kh', sound:'khờ', name:'Chữ Khờ', group:'phu_am_ghep', examples:[{w:'Cái khiên', emo:'🛡️', tag:'Đồ vật', sent:'Cái khiên bảo vệ'},{w:'Cây khế', emo:'⭐', tag:'Cây cối', sent:'Cây khế ngọt trĩu quả'},{w:'Con khỉ', emo:'🐵', tag:'Động vật', sent:'Con khỉ leo trèo nhanh'}] },
    { u:'L', l:'l', hw:'L', sound:'lờ', name:'Chữ Lờ cao', group:'phu_am', examples:[{w:'Chiếc lá', emo:'🍃', tag:'Thực vật', sent:'Chiếc lá xanh đung đưa trong gió'},{w:'Hoa lan', emo:'💐', tag:'Loài hoa', sent:'Hoa phong lan thơm ngát'},{w:'Con lợn', emo:'🐷', tag:'Vật nuôi', sent:'Chú lợn con ủn ỉn ăn no'}] },
    { u:'M', l:'m', hw:'M', sound:'mờ', name:'Chữ Mờ', group:'phu_am', examples:[{w:'Con mèo', emo:'🐱', tag:'Vật nuôi', sent:'Con mèo mướp bắt chuột tài'},{w:'Quả mít', emo:'🍈', tag:'Trái cây', sent:'Quả mít chín thơm lừng cả nhà'},{w:'Cái mũ', emo:'👒', tag:'Trang phục', sent:'Cái mũ rộng vành che nắng'}] },
    { u:'N', l:'n', hw:'N', sound:'nờ', name:'Chữ Nờ thấp', group:'phu_am', examples:[{w:'Cái nơ', emo:'🎀', tag:'Phụ kiện', sent:'Cái nơ hồng bé cài trên tóc'},{w:'Quả na', emo:'🍈', tag:'Trái cây', sent:'Quả na chín ngọt ngào'},{w:'Nụ hoa', emo:'🌷', tag:'Thực vật', sent:'Nụ hoa hồng hé nở ban mai'}] },
    { u:'NG', l:'ng', hw:'Ng', sound:'ngờ', name:'Chữ Ngờ đơn', group:'phu_am_ghep', examples:[{w:'Ngôi nhà', emo:'🏡', tag:'Kiến trúc', sent:'Ngôi nhà ấm cúng'},{w:'Ngọn lửa', emo:'🔥', tag:'Thiên nhiên', sent:'Ngọn lửa bập bùng'},{w:'Con ngựa', emo:'🐴', tag:'Động vật', sent:'Con ngựa phi nước đại'}] },
    { u:'NGH', l:'ngh', hw:'Ngh', sound:'ngờ', name:'Chữ Ngờ kép', group:'phu_am_ghep', examples:[{w:'Nghỉ ngơi', emo:'🛋️', tag:'Hoạt động', sent:'Bé nghỉ ngơi buổi trưa'},{w:'Suy nghĩ', emo:'🤔', tag:'Tư duy', sent:'Bé suy nghĩ tìm đáp án'},{w:'Con nghé', emo:'🐃', tag:'Động vật', sent:'Con nghé con theo mẹ'}] },
    { u:'NH', l:'nh', hw:'Nh', sound:'nhờ', name:'Chữ Nhờ', group:'phu_am_ghep', examples:[{w:'Nhà sàn', emo:'🏠', tag:'Kiến trúc', sent:'Nhà sàn bản làng'},{w:'Quả nhãn', emo:'🍈', tag:'Trái cây', sent:'Quả nhãn ngọt lịm'},{w:'Con nhện', emo:'🕷️', tag:'Côn trùng', sent:'Con nhện chăng tơ'}] },
    { u:'O', l:'o', hw:'O', sound:'o', name:'Chữ O tròn', group:'nguyen_am_don', examples:[{w:'Con ong', emo:'🐝', tag:'Côn trùng', sent:'Con ong chăm chỉ hút mật hoa'},{w:'Con bò', emo:'🐄', tag:'Vật nuôi', sent:'Con bò sữa hiền lành ăn cỏ'},{w:'Con thỏ', emo:'🐰', tag:'Động vật', sent:'Chú thỏ trắng có đôi tai dài'}] },
    { u:'Ô', l:'ô', hw:'Ô', sound:'ô', name:'Chữ Ô đội mũ', group:'nguyen_am_don', examples:[{w:'Cái ô', emo:'☂️', tag:'Đồ dùng', sent:'Chiếc ô xinh che mưa che nắng'},{w:'Cái xô', emo:'🪣', tag:'Đồ dùng', sent:'Cái xô nhựa xách nước tưới cây'},{w:'Bắp ngô', emo:'🌽', tag:'Nông sản', sent:'Bắp ngô vàng ngọt bùi thơm'}] },
    { u:'Ơ', l:'ơ', hw:'Ơ', sound:'ơ', name:'Chữ Ơ có râu', group:'nguyen_am_don', examples:[{w:'Quả mơ', emo:'🍑', tag:'Trái cây', sent:'Quả mơ chín ngâm đường uống mát'},{w:'Lá cờ', emo:'🚩', tag:'Biểu tượng', sent:'Lá cờ đỏ thắm phấp phới bay'},{w:'Cái nơ', emo:'🎀', tag:'Phụ kiện', sent:'Cái nơ xinh xắn của em'}] },
    { u:'P', l:'p', hw:'P', sound:'pờ', name:'Chữ Pờ', group:'phu_am', examples:[{w:'Đèn pin', emo:'🔦', tag:'Đồ vật', sent:'Cây đèn pin chiếu sáng trong đêm'},{w:'Bát phở', emo:'🍜', tag:'Món ăn', sent:'Bát phở bò nóng hổi thơm ngon'},{w:'Hoa phượng', emo:'🌺', tag:'Loài hoa', sent:'Hoa phượng nở đỏ rực sân trường'}] },
    { u:'PH', l:'ph', hw:'Ph', sound:'phờ', name:'Chữ Phờ', group:'phu_am_ghep', examples:[{w:'Phố cổ', emo:'🏮', tag:'Địa danh', sent:'Phố cổ rực rỡ đèn lồng'},{w:'Phút giây', emo:'⏱️', tag:'Thời gian', sent:'Phút giây vui vẻ bên bạn'},{w:'Phở bò', emo:'🍜', tag:'Món ăn', sent:'Bát phở bò thơm ngon'}] },
    { u:'Q', l:'q', hw:'Q', sound:'quy', name:'Chữ Quy', group:'phu_am', examples:[{w:'Quả quýt', emo:'🍊', tag:'Trái cây', sent:'Quả quýt mọng nước chua ngọt'},{w:'Hộp quà', emo:'🎁', tag:'Đồ vật', sent:'Hộp quà sinh nhật thắt nơ xinh'},{w:'Cái quạt', emo:'🪭', tag:'Đồ dùng', sent:'Cái quạt nan xua tan cơn nóng'}] },
    { u:'QU', l:'qu', hw:'Qu', sound:'quờ', name:'Chữ Quờ', group:'phu_am_ghep', examples:[{w:'Quả quất', emo:'🍊', tag:'Trái cây', sent:'Cây quất trĩu quả vàng'},{w:'Quyển vở', emo:'📓', tag:'Học tập', sent:'Quyển vở sạch chữ đẹp'},{w:'Quân kì', emo:'🚩', tag:'Biểu tượng', sent:'Lá quân kì tung bay'}] },
    { u:'R', l:'r', hw:'R', sound:'rờ', name:'Chữ Rờ rung', group:'phu_am', examples:[{w:'Con rùa', emo:'🐢', tag:'Bò sát', sent:'Con rùa bò chậm mang mai cứng'},{w:'Rừng cây', emo:'🌲', tag:'Thiên nhiên', sent:'Rừng cây xanh mát bao la'},{w:'Con rắn', emo:'🐍', tag:'Động vật hoang dã', sent:'Con rắn lục bò trên cành cây'}] },
    { u:'S', l:'s', hw:'S', sound:'sờ', name:'Chữ Sờ cong', group:'phu_am', examples:[{w:'Ngôi sao', emo:'⭐', tag:'Vũ trụ', sent:'Ngôi sao lấp lánh trên trời đêm'},{w:'Hoa sen', emo:'🪷', tag:'Loài hoa', sent:'Hoa sen thanh tao tỏa ngát hương'},{w:'Sư tử', emo:'🦁', tag:'Chúa sơn lâm', sent:'Sư tử dũng mãnh bảo vệ rừng xanh'}] },
    { u:'T', l:'t', hw:'T', sound:'tờ', name:'Chữ Tờ', group:'phu_am', examples:[{w:'Quả táo', emo:'🍎', tag:'Trái cây', sent:'Quả táo đỏ ngọt lành thơm ngon'},{w:'Con tôm', emo:'🦐', tag:'Thủy sản', sent:'Con tôm búng càng tanh tách'},{w:'Thước kẻ', emo:'📏', tag:'Học tập', sent:'Cây thước kẻ thẳng tắp trong cặp'}] },
    { u:'TH', l:'th', hw:'Th', sound:'thờ', name:'Chữ Thờ', group:'phu_am_ghep', examples:[{w:'Thuyền nan', emo:'⛵', tag:'Phương tiện', sent:'Thuyền nan trôi trên sông'},{w:'Thầy giáo', emo:'👨‍🏫', tag:'Nghề nghiệp', sent:'Thầy giáo tận tụy'},{w:'Thước kẻ', emo:'📏', tag:'Đồ dùng', sent:'Cây thước kẻ thẳng'}] },
    { u:'TR', l:'tr', hw:'Tr', sound:'trờ', name:'Chữ Trờ', group:'phu_am_ghep', examples:[{w:'Trường học', emo:'🏫', tag:'Kiến trúc', sent:'Trường học thân yêu'},{w:'Trăng sáng', emo:'🌙', tag:'Thiên nhiên', sent:'Trăng sáng rọi qua cây'},{w:'Trái cây', emo:'🍎', tag:'Thực phẩm', sent:'Trái cây tươi ngon'}] },
    { u:'U', l:'u', hw:'U', sound:'u', name:'Chữ U', group:'nguyen_am_don', examples:[{w:'Con cú', emo:'🦉', tag:'Loài chim', sent:'Chú cú mèo thức ban đêm'},{w:'Mũ len', emo:'🧢', tag:'Trang phục', sent:'Mũ len giữ ấm mùa đông'},{w:'Quả đu đủ', emo:'🥭', tag:'Trái cây', sent:'Quả đu đủ ngọt mát bổ dưỡng'}] },
    { u:'Ư', l:'ư', hw:'Ư', sound:'ư', name:'Chữ Ư có râu', group:'nguyen_am_don', examples:[{w:'Sư tử', emo:'🦁', tag:'Động vật', sent:'Sư tử có chiếc bờm to lớn'},{w:'Lá thư', emo:'✉️', tag:'Đồ dùng', sent:'Bé viết lá thư thăm ông bà'},{w:'Quả dưa', emo:'🍉', tag:'Trái cây', sent:'Quả dưa hấu giải nhiệt ngày hè'}] },
    { u:'V', l:'v', hw:'V', sound:'vờ', name:'Chữ Vờ', group:'phu_am', examples:[{w:'Con voi', emo:'🐘', tag:'Động vật', sent:'Chú voi có chiếc vòi dài ngoằng'},{w:'Con vịt', emo:'🦆', tag:'Gia cầm', sent:'Con vịt bầu kêu cạp cạp bơi ao'},{w:'Quyển vở', emo:'📓', tag:'Học tập', sent:'Quyển vở sạch chữ đẹp của bé'}] },
    { u:'X', l:'x', hw:'X', sound:'xờ', name:'Chữ Xờ nhẹ', group:'phu_am', examples:[{w:'Chiếc xe', emo:'🚗', tag:'Phương tiện', sent:'Chiếc xe đạp nhỏ em tự đi'},{w:'Mùa xuân', emo:'🌸', tag:'Mùa màng', sent:'Mùa xuân trăm hoa đua nở rực rỡ'},{w:'Cái xẻng', emo:'🪴', tag:'Dụng cụ', sent:'Cái xẻng nhỏ bé xúc đất trồng cây'}] },
    { u:'Y', l:'y', hw:'Y', sound:'y dài', name:'Chữ Y dài', group:'nguyen_am_don', examples:[{w:'Y tá', emo:'👩‍⚕️', tag:'Nghề nghiệp', sent:'Cô y tá chăm sóc người bệnh ân cần'},{w:'Chim yến', emo:'🕊️', tag:'Loài chim', sent:'Chim yến làm tổ trên vách đá'},{w:'Cái yếm', emo:'🎽', tag:'Trang phục', sent:'Cái yếm ăn xinh xắn của em bé'}] }
];

// ==========================================
// ĐỊNH DANH MÁY CHỦ APPS SCRIPT & BIẾN TOÀN CỤC
// ==========================================
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxgPIbG8HsEph5Etfu9sNQExNtb3K3mjAtyVXIfj_5IRwCfAqFIEBVrDaLlT2kql9qvUQ/exec";
let allTopicsDataCache = null;
let allQuestionsFlatCache = null;
// Bật/tắt đọc câu hỏi TỰ ĐỘNG khi vào câu mới — nút "Nghe câu hỏi" thủ công vẫn luôn hoạt động
// dù tắt tính năng này (đây chỉ tắt phần tự động phát, không tắt hẳn tính năng nghe).
let autoSpeechEnabled = localStorage.getItem('autoSpeechEnabled') !== 'false';
const examsCache = {};

let currentUser = null;
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
let inMiniGameFlow = false;
let inBaiHocFlow = false;

// Chỉ riêng Chuyên đề 2 và 3 ở chế độ Khám phá: trả lời đúng sẽ tự chuyển câu tiếp theo.
let topic23AutoAdvanceTimer = null;

function clearTopic23AutoAdvance_() {
    if (topic23AutoAdvanceTimer) {
        clearTimeout(topic23AutoAdvanceTimer);
        topic23AutoAdvanceTimer = null;
    }
}

function scheduleTopic23AutoAdvance_() {
    if (activeExamContext || activeRoadmapContext) return;
    if (![2, 3].includes(Number(activeTopicId))) return;

    const answeredIndex = currentQIndex;
    clearTopic23AutoAdvance_();
    topic23AutoAdvanceTimer = setTimeout(() => {
        topic23AutoAdvanceTimer = null;
        // Nếu bé đã tự chuyển câu trước khi hết thời gian chờ thì không nhảy thêm lần nữa.
        if (currentQIndex !== answeredIndex) return;
        if (![2, 3].includes(Number(activeTopicId))) return;
        if (userAnswers[currentQIndex] === undefined) return;
        nextQuestion();
    }, 900);
}

let audioCtx = null;
const banMaiAudio = new Audio();
banMaiAudio.referrerPolicy = 'no-referrer';

let histLineChartInstance = null;
let histBarChartInstance = null;

// ==========================================
// HỆ THỐNG THÔNG BÁO TRONG APP
// Thay toàn bộ alert()/confirm() mặc định của trình duyệt bằng dialog/toast đồng bộ giao diện.
// ==========================================
let appDialogResolver_ = null;
let appDialogKeyHandler_ = null;

function ensureAppFeedbackUI_() {
    if (!document.getElementById('app-dialog-modal')) {
        const modal = document.createElement('div');
        modal.id = 'app-dialog-modal';
        modal.className = 'hidden app-dialog-backdrop';
        modal.innerHTML = `
            <div class="app-dialog-card" role="dialog" aria-modal="true" aria-labelledby="app-dialog-title">
                <div class="app-dialog-body">
                    <div id="app-dialog-icon-wrap" class="app-dialog-icon-wrap"><span id="app-dialog-icon">🐰</span></div>
                    <h3 id="app-dialog-title" class="app-dialog-title">Thông báo</h3>
                    <p id="app-dialog-message" class="app-dialog-message"></p>
                </div>
                <div class="app-dialog-actions">
                    <button id="app-dialog-cancel" type="button" class="app-dialog-btn app-dialog-btn-cancel">Đóng</button>
                    <button id="app-dialog-ok" type="button" class="app-dialog-btn app-dialog-btn-ok">OK</button>
                </div>
            </div>`;
        document.body.appendChild(modal);
    }
    if (!document.getElementById('app-toast-container')) {
        const host = document.createElement('div');
        host.id = 'app-toast-container';
        host.className = 'app-toast-container';
        document.body.appendChild(host);
    }
}

function getAppFeedbackTheme_(type = 'info') {
    const themes = {
        success: { icon:'🌟', title:'Tuyệt vời!', accent:'#10b981', soft:'#ecfdf5', border:'#a7f3d0' },
        warning: { icon:'💡', title:'Bé chú ý nhé', accent:'#f59e0b', soft:'#fffbeb', border:'#fde68a' },
        error:   { icon:'🌧️', title:'Có chút trục trặc', accent:'#f43f5e', soft:'#fff1f2', border:'#fecdd3' },
        confirm: { icon:'🐰', title:'Cô hỏi bé một chút', accent:'#8b5cf6', soft:'#f5f3ff', border:'#ddd6fe' },
        info:    { icon:'🐰', title:'Cô Thỏ Hồng nhắn bé', accent:'#ec4899', soft:'#fdf2f8', border:'#fbcfe8' }
    };
    return themes[type] || themes.info;
}

function closeAppDialog_(result = true) {
    const modal = document.getElementById('app-dialog-modal');
    if (modal) modal.classList.add('hidden');
    if (appDialogKeyHandler_) {
        document.removeEventListener('keydown', appDialogKeyHandler_);
        appDialogKeyHandler_ = null;
    }
    const resolve = appDialogResolver_;
    appDialogResolver_ = null;
    if (resolve) resolve(result);
}

function showAppDialog(message, options = {}) {
    ensureAppFeedbackUI_();
    if (appDialogResolver_) closeAppDialog_(false);

    const type = options.type || 'info';
    const theme = getAppFeedbackTheme_(type);
    const modal = document.getElementById('app-dialog-modal');
    const card = modal?.querySelector('.app-dialog-card');
    const iconWrap = document.getElementById('app-dialog-icon-wrap');
    const icon = document.getElementById('app-dialog-icon');
    const title = document.getElementById('app-dialog-title');
    const msg = document.getElementById('app-dialog-message');
    const ok = document.getElementById('app-dialog-ok');
    const cancel = document.getElementById('app-dialog-cancel');
    if (!modal || !card || !iconWrap || !icon || !title || !msg || !ok || !cancel) return Promise.resolve(true);

    icon.textContent = options.icon || theme.icon;
    title.textContent = options.title || theme.title;
    msg.textContent = String(message || '');
    iconWrap.style.background = theme.soft;
    iconWrap.style.borderColor = theme.border;
    title.style.color = theme.accent;
    card.style.borderColor = theme.border;
    ok.style.background = `linear-gradient(135deg, ${theme.accent}, #a855f7)`;
    ok.textContent = options.okText || 'OK';
    cancel.textContent = options.cancelText || 'Đóng';
    cancel.classList.toggle('hidden', !options.confirm);

    modal.classList.remove('hidden');
    requestAnimationFrame(() => ok.focus());

    return new Promise(resolve => {
        appDialogResolver_ = resolve;
        ok.onclick = () => closeAppDialog_(true);
        cancel.onclick = () => closeAppDialog_(false);
        appDialogKeyHandler_ = (e) => {
            if (e.key === 'Escape') closeAppDialog_(options.confirm ? false : true);
            if (e.key === 'Enter' && !e.shiftKey) closeAppDialog_(true);
        };
        document.addEventListener('keydown', appDialogKeyHandler_);
    });
}

function showAppConfirm(message, options = {}) {
    return showAppDialog(message, {
        ...options,
        type: 'confirm',
        confirm: true,
        okText: options.okText || 'Đồng ý',
        cancelText: options.cancelText || 'Chưa nhé'
    });
}

function showAppToast(message, type = 'info', duration = 1900) {
    ensureAppFeedbackUI_();
    const host = document.getElementById('app-toast-container');
    if (!host) return;
    const theme = getAppFeedbackTheme_(type);
    const toast = document.createElement('div');
    toast.className = 'app-toast-item';
    toast.style.borderColor = theme.border;
    toast.style.background = theme.soft;
    toast.innerHTML = `<span class="app-toast-icon">${theme.icon}</span><span class="app-toast-text"></span>`;
    toast.querySelector('.app-toast-text').textContent = String(message || '');
    host.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('is-visible'));
    window.setTimeout(() => {
        toast.classList.remove('is-visible');
        window.setTimeout(() => toast.remove(), 220);
    }, Math.max(900, Number(duration) || 1900));
}



// ==========================================
// ACCOUNT / PREMIUM ENGINE v2
// VaiTro: admin | student
// LoaiTaiKhoan: regular | trial | vip
// ==========================================
const PREMIUM_TOPIC_IDS = new Set([13]);
let accountManagerAccounts = [];
let accountManagerSort = { key: 'maHS', dir: 1 };
let adminNewRegistrationCount = 0;
let adminNotificationTimer = null;

function isAdminUser() {
    return !!currentUser && !currentUser.isGuest && String(currentUser.vaiTro || currentUser.role || '').toLowerCase() === 'admin';
}

function getAccountType() {
    if (!currentUser || currentUser.isGuest) return 'guest';
    if (isAdminUser()) return 'admin';
    if (currentUser.sessionPending) return 'pending';
    const type = String(currentUser.loaiTaiKhoan || 'regular').toLowerCase();
    return ['regular', 'trial', 'vip'].includes(type) ? type : 'regular';
}

function hasPremiumAccess() {
    return ['admin', 'trial', 'vip'].includes(getAccountType());
}

function getPremiumAccessState() {
    const type = getAccountType();
    return { allowed: hasPremiumAccess(), reason: type };
}

function ensurePremiumAccessModal() {
    let modal = document.getElementById('modal-premium-access');
    if (modal) return modal;
    modal = document.createElement('div');
    modal.id = 'modal-premium-access';
    modal.className = 'hidden fixed inset-0 z-[130] bg-slate-900/55 backdrop-blur-sm flex items-center justify-center p-3';
    modal.innerHTML = `
      <div class="w-full max-w-md bg-white rounded-[28px] border-2 border-pink-200 shadow-2xl p-5 md:p-6 text-center">
        <div class="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center text-3xl mb-3">🔒</div>
        <h3 id="premium-popup-title" class="text-lg md:text-xl font-black text-purple-700 mb-2">Nội dung Premium</h3>
        <p id="premium-popup-message" class="text-sm font-bold text-gray-600 leading-relaxed whitespace-pre-line"></p>
        <div id="premium-popup-actions" class="mt-5 space-y-2"></div>
      </div>`;
    document.body.appendChild(modal);
    return modal;
}

function closePremiumAccessPopup() {
    document.getElementById('modal-premium-access')?.classList.add('hidden');
}

function showPremiumAccessPopup(featureName = 'chức năng này', accessState = getPremiumAccessState()) {
    const modal = ensurePremiumAccessModal();
    const title = document.getElementById('premium-popup-title');
    const message = document.getElementById('premium-popup-message');
    const actions = document.getElementById('premium-popup-actions');
    if (accessState.reason === 'guest') {
        title.textContent = 'Khu vực dành cho Trial / VIP ✨';
        message.textContent = `Đây là ${featureName} dành cho tài khoản Trial hoặc VIP.\n\nCon có thể Sign in nếu đã có tài khoản hoặc Sign up để đăng ký nhé!\n\nCác chuyên đề cơ bản vẫn học miễn phí bình thường.`;
        actions.innerHTML = `
          <div class="grid grid-cols-2 gap-2">
            <button onclick="closePremiumAccessPopup(); openAuthScreen('login')" class="py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black text-sm pastel-btn">Sign in</button>
            <button onclick="closePremiumAccessPopup(); openAuthScreen('register')" class="py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-black text-sm pastel-btn">Sign up</button>
          </div>
          <button onclick="closePremiumAccessPopup()" class="w-full py-3 text-base font-black text-gray-500 hover:text-gray-700">Để sau nhé</button>`;
    } else {
        title.textContent = 'Tài khoản Regular chưa mở khu vực này ⭐';
        message.textContent = `Tài khoản hiện tại của con là Regular.\n\n${featureName} yêu cầu tài khoản Trial hoặc VIP. Các chuyên đề cơ bản vẫn học miễn phí bình thường.`;
        actions.innerHTML = `<button onclick="closePremiumAccessPopup()" class="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-black text-sm pastel-btn">Đã hiểu</button><button onclick="closePremiumAccessPopup()" class="w-full py-3 text-base font-black text-gray-500 hover:text-gray-700">Để sau nhé</button>`;
    }
    modal.classList.remove('hidden');
}

function requirePremiumAccess(featureName) {
    if (hasPremiumAccess()) return true;
    showPremiumAccessPopup(featureName);
    return false;
}

function updatePremiumUI() {
    const locked = !hasPremiumAccess();
    ['btn-bai-hoc-lock','btn-progress-lock','minigame-lock-icon','bai-hoc-lock-icon','roadmap-lock-icon','review-lock-icon','exam-lock-icon'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.toggle('hidden', !locked);
    });
}


function openAuthScreen(tab = 'login') {
    const screen = document.getElementById('screen-login');
    if (!screen) return;
    switchAuthTab(tab);
    screen.classList.remove('hidden');
    screen.classList.add('flex');
    setTimeout(() => document.getElementById(tab === 'login' ? 'login-mahs' : 'reg-hoten')?.focus(), 80);
}

function closeAuthScreen() {
    const screen = document.getElementById('screen-login');
    if (!screen) return;
    screen.classList.add('hidden');
    screen.classList.remove('flex');
    hideAuthError();
}

function getSessionToken() {
    return localStorage.getItem('tv1_session_token') || '';
}

function storeSessionToken(token) {
    if (token) localStorage.setItem('tv1_session_token', String(token));
}

function clearStoredSession() {
    localStorage.removeItem('tv1_session_token');
    // Dọn dữ liệu đăng nhập kiểu cũ nếu người dùng từng chạy bản trước.
    localStorage.removeItem('tv1_mahs');
    localStorage.removeItem('tv1_mapin');
}

function getAdminAuthPayload() {
    return { sessionToken: getSessionToken() };
}

function formatAccountDate(value) {
    if (!value) return '--';
    const d = new Date(value);
    if (!isNaN(d.getTime())) return d.toLocaleDateString('vi-VN');
    return String(value);
}

function renderAdminRegistrationBadge() {
    const badge = document.getElementById('admin-new-registration-badge');
    if (!badge) return;
    const count = Math.max(0, Number(adminNewRegistrationCount) || 0);
    badge.textContent = count > 99 ? '99+' : String(count);
    badge.classList.toggle('hidden', count <= 0);
}

async function refreshAdminRegistrationBadge() {
    if (!isAdminUser()) return;
    try {
        const res = await callAppsScript('getNewRegistrationsCount', getAdminAuthPayload());
        if (!res.ok) throw new Error(res.error || 'Không lấy được số đăng ký mới');
        adminNewRegistrationCount = Number(res.count) || 0;
        renderAdminRegistrationBadge();
    } catch (e) {
        // Badge là thông tin phụ, không làm gián đoạn ứng dụng nếu máy chủ tạm thời lỗi.
    }
}

function startAdminNotificationPolling() {
    clearInterval(adminNotificationTimer);
    adminNotificationTimer = null;
    if (!isAdminUser()) return;
    refreshAdminRegistrationBadge();
    adminNotificationTimer = setInterval(refreshAdminRegistrationBadge, 15000);
}

// Khi Admin quay lại tab/cửa sổ, kiểm tra ngay thay vì chờ chu kỳ polling.
window.addEventListener('focus', () => {
    if (isAdminUser()) refreshAdminRegistrationBadge();
});
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && isAdminUser()) refreshAdminRegistrationBadge();
});

async function markAdminRegistrationsSeen() {
    if (!isAdminUser() || adminNewRegistrationCount <= 0) return;
    try {
        const res = await callAppsScript('markRegistrationsSeen', getAdminAuthPayload());
        if (res.ok) {
            adminNewRegistrationCount = 0;
            renderAdminRegistrationBadge();
        }
    } catch (e) {
        // Không chặn màn quản lý nếu thao tác đánh dấu đã xem thất bại.
    }
}

function ensureAccountManagerModal() {
    let modal = document.getElementById('modal-account-manager');
    if (modal) return modal;
    modal = document.createElement('div');
    modal.id = 'modal-account-manager';
    modal.className = 'hidden fixed inset-0 z-[120] bg-slate-900/55 backdrop-blur-sm flex items-center justify-center p-2 md:p-3';
    modal.innerHTML = `
      <div class="w-full max-w-6xl max-h-[94vh] bg-white rounded-[28px] border-2 border-pink-200 shadow-2xl overflow-hidden flex flex-col">
        <div class="px-4 md:px-5 py-3 bg-gradient-to-r from-pink-50 via-purple-50 to-pink-50 border-b border-pink-100 flex items-center justify-between gap-3">
          <div>
            <div class="flex flex-wrap items-center gap-2 text-purple-700 font-black text-lg md:text-xl"><span>👥</span><span>Quản lý tài khoản</span><span id="account-manager-total" class="px-2.5 py-1 rounded-full bg-white border border-purple-200 text-purple-600 text-xs font-black shadow-sm">0 tài khoản</span></div>
            <div class="text-xs text-gray-500 font-bold mt-0.5">Regular miễn phí · Trial Premium 1 tháng · VIP Premium 1 năm</div>
          </div>
          <button onclick="closeAccountManager()" class="w-9 h-9 rounded-full bg-white border border-pink-200 text-pink-500 hover:bg-pink-100"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="p-3 md:p-4 border-b border-pink-100 flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
          <div class="relative flex-1"><i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-pink-400"></i><input id="account-search" oninput="renderAccountManagerRows()" placeholder="Tìm ID, họ tên, lớp, loại tài khoản..." class="w-full pl-9 pr-3 py-2.5 rounded-xl border-2 border-pink-200 focus:border-pink-400 outline-none text-sm font-bold"></div>
          <button onclick="loadAccountManager()" class="px-4 py-2.5 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 font-black text-sm pastel-btn"><i class="fa-solid fa-rotate mr-1"></i>Làm mới</button>
        </div>
        <div class="overflow-auto flex-1">
          <table class="w-full min-w-[820px] text-sm md:text-[15px]">
            <thead class="sticky top-0 bg-pink-50 text-slate-700 font-black border-b border-pink-200">
              <tr>
                <th onclick="sortAccountManager('maHS')" class="px-3 py-3 text-left cursor-pointer">Mã HS ↕</th>
                <th onclick="sortAccountManager('hoTen')" class="px-3 py-3 text-left cursor-pointer">Họ tên ↕</th>
                <th onclick="sortAccountManager('lop')" class="px-3 py-3 text-center cursor-pointer">Lớp ↕</th>
                <th onclick="sortAccountManager('loaiTaiKhoan')" class="px-3 py-3 text-center cursor-pointer">Loại tài khoản ↕</th>
                <th onclick="sortAccountManager('hanDungThu')" class="px-3 py-3 text-center cursor-pointer">Hạn dùng thử ↕</th>
                <th onclick="sortAccountManager('hanVIP')" class="px-3 py-3 text-center cursor-pointer">Hạn VIP ↕</th>
              </tr>
            </thead>
            <tbody id="account-manager-body" class="divide-y divide-pink-100 font-bold text-slate-700"></tbody>
          </table>
        </div>
        <div class="px-4 py-3 bg-slate-50 border-t border-slate-100 text-xs md:text-sm font-bold text-gray-500">Regular: miễn phí &nbsp;·&nbsp; Trial: Premium 1 tháng &nbsp;·&nbsp; VIP: Premium 1 năm</div>
      </div>`;
    document.body.appendChild(modal);
    return modal;
}

async function openAccountManager() {
    if (!isAdminUser()) return;
    ensureAccountManagerModal().classList.remove('hidden');
    await loadAccountManager();
    await markAdminRegistrationsSeen();
}
function closeAccountManager() { document.getElementById('modal-account-manager')?.classList.add('hidden'); }

async function loadAccountManager() {
    if (!isAdminUser()) return;
    const body = document.getElementById('account-manager-body');
    if (body) body.innerHTML = `<tr><td colspan="6" class="py-8 text-center text-gray-400"><i class="fa-solid fa-spinner fa-spin mr-2"></i>Đang tải...</td></tr>`;
    try {
        const res = await callAppsScript('listAccounts', getAdminAuthPayload());
        if (!res.ok) throw new Error(res.error || 'Không tải được tài khoản');
        accountManagerAccounts = res.accounts || [];
        document.getElementById('account-manager-total').textContent = `${res.totalCount ?? accountManagerAccounts.length} tài khoản`;
        renderAccountManagerRows();
    } catch (e) { if (body) body.innerHTML = `<tr><td colspan="6" class="py-8 text-center text-rose-500">${escapeHtml(e.message)}</td></tr>`; }
}

function sortAccountManager(key) {
    if (accountManagerSort.key === key) accountManagerSort.dir *= -1;
    else accountManagerSort = { key, dir: 1 };
    renderAccountManagerRows();
}

function accountTierBadge(type) {
    const t = String(type || 'regular').toLowerCase();
    if (t === 'vip') return 'text-purple-700 bg-purple-50 border-purple-200';
    if (t === 'trial') return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-slate-600 bg-slate-50 border-slate-200';
}

function renderAccountManagerRows() {
    const body = document.getElementById('account-manager-body');
    if (!body) return;
    const q = String(document.getElementById('account-search')?.value || '').trim().toLowerCase();
    const { key, dir } = accountManagerSort;
    let rows = accountManagerAccounts.filter(a => !q || [a.maHS,a.hoTen,a.lop,a.loaiTaiKhoan].some(v => String(v||'').toLowerCase().includes(q)));
    rows = rows.slice().sort((a,b) => String(a[key]||'').localeCompare(String(b[key]||''), 'vi', {numeric:true}) * dir);
    if (!rows.length) { body.innerHTML = '<tr><td colspan="6" class="py-8 text-center text-gray-400">Không có tài khoản phù hợp</td></tr>'; return; }
    body.innerHTML = rows.map(a => `
      <tr class="hover:bg-pink-50/40">
        <td class="px-3 py-3 font-black text-pink-700">${escapeHtml(a.maHS)}</td>
        <td class="px-3 py-3">${escapeHtml(a.hoTen)}</td>
        <td class="px-3 py-3 text-center">${escapeHtml(a.lop)}</td>
        <td class="px-3 py-3 text-center"><select onchange="changeAccountType('${String(a.maHS).replace(/'/g,"\\'")}', this.value)" class="px-2.5 py-2 rounded-xl border font-black ${accountTierBadge(a.loaiTaiKhoan)}"><option value="regular" ${a.loaiTaiKhoan==='regular'?'selected':''}>Regular</option><option value="trial" ${a.loaiTaiKhoan==='trial'?'selected':''}>Trial</option><option value="vip" ${a.loaiTaiKhoan==='vip'?'selected':''}>VIP</option></select></td>
        <td class="px-3 py-3 text-center">${escapeHtml(formatAccountDate(a.hanDungThu))}</td>
        <td class="px-3 py-3 text-center">${escapeHtml(formatAccountDate(a.hanVIP))}</td>
      </tr>`).join('');
}

async function changeAccountType(maHS, type) {
    try {
        const res = await callAppsScript('updateAccountType', { ...getAdminAuthPayload(), targetMaHS: maHS, accountType: type });
        if (!res.ok) throw new Error(res.error || 'Không cập nhật được');
        await loadAccountManager();
    } catch(e) { await showAppDialog(e.message, { type:'error', title:'Không thể cập nhật tài khoản' }); await loadAccountManager(); }
}


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
        question_id: q.id ?? q.question_id ?? 0,
        sub_topic: String(q.sub ?? q.sub_topic ?? 'Câu hỏi chung').trim(),
        week: q.week ?? q.w ?? null,
        tags: Array.isArray(q.tags) ? q.tags.slice() : [],
        tokens: Array.isArray(q.tokens) ? q.tokens.slice() : [],
        question_text: q.q ?? q.question_text ?? '',
        options: Array.isArray(q.o) ? q.o : (Array.isArray(q.options) ? q.options : []),
        answer: q.a ?? q.answer ?? '',
        hint: q.h ?? q.hint ?? '',
        image_url: q.img ?? q.image_url ?? '',
        emoji: q.emoji ?? q.icon ?? '',
        audio_text: q.aud ?? q.audio_text ?? '',
        reading_title: q.r_title ?? q.reading_title ?? '',
        reading_passage: q.r_passage ?? q.reading_passage ?? q.passage_text ?? '',
        skill_tag: q.skill_tag ?? q.tag ?? 'C1',
        diem: Number(q.diem ?? q.score ?? 0.5),
        explanation: q.explanation ?? q.h ?? 'Không có giải thích chi tiết.'
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
        questions: rawQuestions.map(normalizeQuestion).filter(Boolean),
        poems: Array.isArray(t.poems) ? t.poems : [],
        songs: Array.isArray(t.songs) ? t.songs : [],
        copyright_note: t.copyright_note ?? ''
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

function getQuestionsForWeek343(weekNumber) {
    const config = roadmapConfig[weekNumber];
    if (!config || !allTopicsDataCache) return [];

    const weekTag = `week${weekNumber}`;
    let pool = [];
    config.topicIds.forEach(topicId => {
        const topicData = allTopicsDataCache.find(t => t.topic_id === topicId);
        if (!topicData || !topicData.questions) return;
        const matched = topicData.questions.filter(q => {
            const byWeek = Number(q.week) === Number(weekNumber);
            const byTag = Array.isArray(q.tags) && q.tags.includes(weekTag);
            return byWeek || byTag;
        });
        pool = pool.concat(matched.map(q => ({ ...q, source_topic_id: topicId })));
    });

    // Roadmap 24 tuần: mỗi tuần có ngân hàng đúng 60 câu, mỗi lượt bốc ngẫu nhiên 30 câu.
    if (pool.length !== 60) {
        console.warn(`[Roadmap] Tuần ${weekNumber} có ${pool.length}/60 câu trong ngân hàng.`);
    }
    return shuffleArray([...pool]).slice(0, 30);
}

function capitalizeFirstLetter(val) {
    if (!val) return '';
    const s = String(val).trim();
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function beautifySubtopicName(name) {
    if (!name) return '';
    let s = name.trim();
    if (/đa giác quan/i.test(s)) return 'Trải nghiệm đa giác quan';
    if (/trái nghĩa.*đồng nghĩa/i.test(s) || /đồng nghĩa.*trái nghĩa/i.test(s)) return 'Trái nghĩa - đồng nghĩa';
    if (s.length > 25 && s.includes('(')) {
        s = s.replace(/\s*\([^)]*\)/g, '').trim();
    }
    return s;
}

const TOPICS_DATA_FILES = [
    'assets/data/kho_hoc_tieng_viet_part1.json',
    'assets/data/kho_hoc_tieng_viet_part2.json'
];

async function fetchAllTopicsData() {
    if (allTopicsDataCache) return allTopicsDataCache;

    const results = await Promise.all(TOPICS_DATA_FILES.map(async (file) => {
        const res = await fetch(file);
        if (!res.ok) throw new Error(`Không thể tải file dữ liệu ${file}`);
        return res.json();
    }));

    const rawTopics = results.flatMap(data => Array.isArray(data) ? data : (data.topics || []));
    allTopicsDataCache = rawTopics.map(normalizeTopic).filter(Boolean);
    allQuestionsFlatCache = allTopicsDataCache.flatMap(t =>
        (t.questions || []).map(q => ({ ...q, source_topic_id: t.topic_id }))
    );
    return allTopicsDataCache;
}

async function fetchAllQuestionsFlat() {
    if (allQuestionsFlatCache) return allQuestionsFlatCache;
    await fetchAllTopicsData();
    return allQuestionsFlatCache || [];
}

async function loadExamDataFile(file) {
    if (examsCache[file]) return examsCache[file];
    const res = await fetch(`assets/data/${file}`);
    if (!res.ok) throw new Error("Không thể tải file đề thi");
    const data = await res.json();
    if (data && Array.isArray(data.exams)) {
        data.exams = data.exams.map(ex => ({
            ...ex,
            questions: (ex.qs || ex.questions || []).map(normalizeQuestion).filter(Boolean)
        }));
    }
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
    TOPICS_CONFIG.filter(t => Number(t.id) <= 12).forEach(t => {
        const topicObj = topicsData.find(item => Number(item.topic_id) === Number(t.id));
        const totalCount = topicObj && topicObj.questions ? topicObj.questions.length : (t.id === 1 ? 29 : 0);
        const mediaCount = Number(t.id) === 12 ? ((topicObj?.poems?.length || 0) + (topicObj?.songs?.length || 0)) : 0;
        const countLabel = Number(t.id) === 12
            ? (mediaCount > 0 ? `${mediaCount} bài` : 'Thơ & nhạc')
            : (totalCount > 0 ? `${totalCount} câu` : t.desc);
        const iconHtml = t.isCustomTextIcon
            ? `<div class="w-8 h-8 bg-rose-100 rounded-xl flex items-center justify-center text-[11px] font-black text-rose-600 shadow-inner group-hover:scale-110 transition-transform shrink-0 tracking-tight">S/X</div>`
            : `<div class="w-8 h-8 bg-${t.color}-100 rounded-xl flex items-center justify-center text-sm font-extrabold text-${t.color}-600 shadow-inner group-hover:scale-110 transition-transform shrink-0">${t.icon}</div>`;
        const locked = PREMIUM_TOPIC_IDS.has(Number(t.id)) && !hasPremiumAccess();
        html += `
            <div onclick="openTopic(${t.id}, '${t.title}', '${t.icon}')" class="relative pastel-card p-3 flex flex-col justify-between cursor-pointer hover:border-${t.color}-400 transition-all group min-h-[92px]">
                ${locked ? '<span class="absolute top-2 right-2 text-gray-400 text-xs">🔒</span>' : ''}
                <div class="flex items-center space-x-2.5">
                    ${iconHtml}
                    <h3 class="font-extrabold text-${t.color}-700 text-sm md:text-base leading-tight">${t.title}</h3>
                </div>
                <div class="flex justify-between items-center mt-1.5 pt-1 border-t border-pink-100 text-[11px] font-bold text-gray-500">
                    <span>${t.desc}</span>
                    <span class="bg-${t.color}-50 text-${t.color}-600 px-2 py-0.5 rounded-full">${countLabel}</span>
                </div>
            </div>`;
    });
    container.classList.add('nature-ambient-host');
    container.innerHTML = `${renderNatureAmbientLayer_(true)}${html}`;
}

async function startRandomExam(categoryKey) {
    if (!requirePremiumAccess('Đấu trường đề thi')) return;
    stopSpeaking();
    const catKeywords = {
        hocky1: ['học kỳ 1', 'hk1'],
        hocky2: ['học kỳ 2', 'hk2'],
        hsg: ['giỏi', 'hsg']
    }[categoryKey] || [];

    showLoadingOverlay("Đang chuẩn bị đề thi...");
    try {
        const examData = await loadExamDataFile('de_thi_tieng_viet_1.json');
        hideLoadingOverlay();

        const pool = (examData && Array.isArray(examData.exams)) ? examData.exams : [];
        let candidates = pool.filter(e => catKeywords.some(k => (e.exam_category || '').toLowerCase().includes(k)));
        if (!candidates.length) candidates = pool;
        if (!candidates.length) return showAppDialog('Đang cập nhật thêm đề thi cho mục này, bé quay lại sau nhé!', { type:'info', title:'Đề thi đang được cập nhật' });

        const exam = candidates[Math.floor(Math.random() * candidates.length)];
        const examIndex = pool.indexOf(exam);
        const examLabel = examFileMap[categoryKey]?.label || 'Đề thi';
        const examTitle = exam.exam_name || exam.exam_title || exam.title || `${examLabel} - Đề số ${examIndex + 1}`;

        activeExamContext = { categoryKey, examIndex, examTitle };
        activeRoadmapContext = null;
        pendingTopicQuiz = null;

        const questions = Array.isArray(exam.questions) && exam.questions.length ? exam.questions : [];
        if (!questions.length) return showAppDialog('Đề thi này chưa có câu hỏi, bé chọn đề khác nhé!', { type:'warning' });

        updateNavTabs("12. Đấu trường đề thi", "🏆", examTitle);
        startTopicQuiz(0, examTitle, questions, null);
    } catch (err) {
        hideLoadingOverlay();
        await showAppDialog(`Không thể tải đề thi: ${err.message}`, { type:'error' });
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
            showAppDialog('Đã hết giờ làm bài! Bài thi sẽ được nộp lại nhé bé.', { type:'warning', title:'Hết giờ làm bài', okText:'Xem kết quả' }).then(() => showResultScreen());
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
    if (!requirePremiumAccess('Đấu trường đề thi')) return;
    setMainTabActive_('exams');
    stopSpeaking();
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
    try { examData = await loadExamDataFile('de_thi_tieng_viet_1.json'); } catch (e) {}

    const getCountForCat = (catName) => {
        if (!examData || !examData.exams) return 3;
        return examData.exams.filter(e => (e.exam_category || '').toLowerCase().includes(catName)).length || 3;
    };

    const countHK1 = getCountForCat('học kỳ 1') || getCountForCat('hk1');
    const countHK2 = getCountForCat('học kỳ 2') || getCountForCat('hk2');
    const countHSG = getCountForCat('giỏi') || getCountForCat('hsg');

    let html = `
        <div class="bg-pink-50/70 p-5 rounded-3xl border-2 border-pink-200 flex flex-col justify-between items-center text-center group min-h-[250px] pastel-card">
            <div>
                <div class="text-4xl mb-1.5 group-hover:scale-110 transition-transform">🌸</div>
                <h3 class="font-extrabold text-pink-600 text-lg mb-1">Học kỳ 1</h3>
                <p class="text-xs text-gray-500 font-bold mb-2">Kiểm tra kiến thức HK1</p>
                <span class="inline-block bg-pink-100 text-pink-700 px-3 py-0.5 rounded-full text-xs font-black mb-3">${countHK1} đề thi chuẩn</span>
            </div>
            <div class="w-full space-y-2">
                <button onclick="startRandomExam('hocky1')" class="w-full py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-extrabold rounded-xl text-xs pastel-btn shadow-sm">
                    🚀 Vào thi thử
                </button>
                <button onclick="openHistoryModal('LichSuBaiThi_HK1')" class="w-full py-2 bg-white text-pink-700 border border-pink-300 font-extrabold rounded-xl text-xs pastel-btn hover:bg-pink-50">
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
                <button onclick="openHistoryModal('LichSuBaiThi_HK2')" class="w-full py-2 bg-white text-purple-700 border border-purple-300 font-extrabold rounded-xl text-xs pastel-btn hover:bg-purple-50">
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
                <button onclick="openHistoryModal('LichSuBaiThi_HSG')" class="w-full py-2 bg-white text-amber-700 border border-amber-300 font-extrabold rounded-xl text-xs pastel-btn hover:bg-amber-50">
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
        document.getElementById('header-level2-icon').textContent = level2Icon || '🌸';
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

        // Trong cây Khám phá: Khám phá → Chuyên mục → Mục nhỏ.
        // Chuyên mục (level 3, ví dụ "4. Tập đọc") phải bấm được để
        // quay lại màn giới thiệu / danh sách cấp độ của chính chuyên mục đó.
        const level3Box = tab3.querySelector('div');
        if (level3Box && currentMainTab === 'discover' && activeTopicId) {
            level3Box.setAttribute('role', 'button');
            level3Box.setAttribute('tabindex', '0');
            level3Box.setAttribute('title', 'Quay lại chuyên mục');
            level3Box.classList.add('cursor-pointer', 'hover:bg-purple-100', 'transition-colors');
            level3Box.onclick = returnToCurrentDiscoverTopic_;
            level3Box.onkeydown = (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    returnToCurrentDiscoverTopic_();
                }
            };
        } else if (level3Box) {
            level3Box.removeAttribute('role');
            level3Box.removeAttribute('tabindex');
            level3Box.removeAttribute('title');
            level3Box.classList.remove('cursor-pointer', 'hover:bg-purple-100', 'transition-colors');
            level3Box.onclick = null;
            level3Box.onkeydown = null;
        }
    } else {
        const level3Box = tab3.querySelector('div');
        if (level3Box) {
            level3Box.removeAttribute('role');
            level3Box.removeAttribute('tabindex');
            level3Box.removeAttribute('title');
            level3Box.classList.remove('cursor-pointer', 'hover:bg-purple-100', 'transition-colors');
            level3Box.onclick = null;
            level3Box.onkeydown = null;
        }
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

function updateDiscoverBreadcrumb_(topicTitle = null, topicIcon = '🌸', subTitle = null) {
    // Cây thư mục của tab Khám phá: Khám phá → Chuyên mục → Mục nhỏ.
    // Nút Khám phá ở breadcrumb luôn quay về trang Khám phá.
    updateNavTabs('Khám phá', '🧭', topicTitle || null, subTitle || null);
}

function returnToCurrentDiscoverTopic_() {
    stopSpeaking();
    clearInterval(quizTimerInterval);

    const topicId = Number(activeTopicId || pendingTopicQuiz?.topicNum || 0);
    if (!topicId) {
        goHome();
        return;
    }

    // Chủ đề 1, Thơ & nhạc và Ôn tập có màn chuyên biệt riêng.
    if (topicId === 1) {
        openLettersSubmenu();
        return;
    }
    if (topicId === 12) {
        openThoNhacMenu();
        return;
    }
    if (topicId === 13) {
        openSemesterReviewMenu();
        return;
    }

    const cfg = TOPICS_CONFIG.find(t => Number(t.id) === topicId);
    const topicName = pendingTopicQuiz?.topicName || cfg?.title || `Chủ đề ${topicId}`;
    const icon = cfg?.icon || '🌸';
    openTopic(topicId, topicName, icon);
}

function returnToTopicLecture() {
    stopSpeaking();
    clearInterval(quizTimerInterval);
    if (currentMainTab === 'discover') {
        goHome();
        return;
    }
    if (inBaiHocFlow) {
        openBaiHocHub();
    } else if (activeExamContext) {
        openExamHub();
    } else if (activeRoadmapContext) {
        openRoadmap();
    } else if (inMiniGameFlow) {
        openMiniGameHub();
    } else if (activeTopicId === 1) {
        openLettersSubmenu();
    } else if (pendingTopicQuiz) {
        updateDiscoverBreadcrumb_(pendingTopicQuiz.topicName, TOPICS_CONFIG.find(t => t.id === pendingTopicQuiz.topicNum)?.icon || '🌸', null);
        switchAppView('view-lecture');
    }
}

function switchAppView(viewId) {
    stopSpeaking();
    ['view-dashboard-grid', 'view-bai-hoc-hub', 'view-lecture', 'view-quiz', 'view-roadmap', 'view-minigame-hub', 'view-game-play', 'view-exam-hub', 'view-result'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        if (id === viewId) el.classList.remove('hidden');
        else el.classList.add('hidden');
    });
}

function goHome() {
    inMiniGameFlow = false;
    inBaiHocFlow = false;
    stopSpeaking();
    clearInterval(quizTimerInterval);
    updateNavTabs('Khám phá', '🧭', null);
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
    const requestOnce = async () => {
        // Apps Script ContentService trả dữ liệu qua redirect script.googleusercontent.com.
        // Cache-buster + no-store tránh trình duyệt/PWA tái dùng redirect cũ đã hết hạn (có thể gây HTTP 404).
        const sep = APPS_SCRIPT_URL.includes('?') ? '&' : '?';
        const url = `${APPS_SCRIPT_URL}${sep}_=${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
        return fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({ action, payload }),
            cache: 'no-store',
            redirect: 'follow'
        });
    };

    let res = await requestOnce();
    // Retry đúng 1 lần nếu Google trả 404 từ redirect tạm thời/cũ.
    if (res.status === 404) res = await requestOnce();
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
    const maHS = (document.getElementById('login-mahs')?.value || '').trim().toUpperCase();
    const maPin = (document.getElementById('login-mapin')?.value || '').trim();
    if (!maHS || !maPin) return showAuthError('Bé nhập đủ mã ID và mã PIN nhé!');
    const btn = document.getElementById('btn-do-login');
    btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i> Đang đăng nhập...';
    try {
        const result = await callAppsScript('login', { maHS, maPin });
        if (!result.ok) { showAuthError(result.error || 'ID hoặc PIN không đúng!'); return; }
        if (!result.sessionToken) throw new Error('Máy chủ không trả về session token.');
        currentUser = { ...result.student, isGuest: false, sessionPending: false };
        clearStoredSession();
        storeSessionToken(result.sessionToken);
        document.getElementById('login-mapin').value = '';
        closeAuthScreen();
        enterDashboard();
    } catch (err) { showAuthError('Lỗi kết nối máy chủ: ' + err.message); }
    finally { btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-right-to-bracket mr-1"></i> Đăng nhập'; }
}

async function doRegister() {
    hideAuthError();
    const hoTen = document.getElementById('reg-hoten').value.trim();
    const ngaySinhRaw = document.getElementById('reg-ngaysinh').value;
    const lop = document.getElementById('reg-lop').value.trim().toUpperCase();
    const soThuTu = document.getElementById('reg-stt').value.trim();
    const maPin = document.getElementById('reg-mapin').value.trim();
    if (!hoTen || !ngaySinhRaw || !lop || !soThuTu || !maPin) return showAuthError('Bé điền đủ tất cả các ô có dấu * nhé!');
    if (!/^\d{6}$/.test(maPin)) return showAuthError('Mã PIN phải gồm đúng 6 chữ số!');
    const [y,m,d] = ngaySinhRaw.split('-');
    const ngaySinh = `${d}-${m}-${y.slice(2)}`;
    const btn = document.getElementById('btn-do-register');
    btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i> Đang đăng ký...';
    try {
        const result = await callAppsScript('register', { hoTen, ngaySinh, lop, soThuTu, maPin });
        if (!result.ok) { showAuthError(result.error || 'Không đăng ký được.'); return; }
        const actualId = result.student.maHS;
        document.getElementById('login-mahs').value = actualId;
        document.getElementById('login-mapin').value = '';
        document.getElementById('reg-mapin').value = '';
        switchAuthTab('login');
        await showAppDialog(`Đăng ký thành công!\nMã ID của con: ${actualId}\nTài khoản mới là Regular và có thể học nội dung miễn phí ngay.`, { type:'success', title:'Đăng ký thành công', okText:'Đăng nhập ngay' });
    } catch (err) { showAuthError('Lỗi kết nối: ' + err.message); }
    finally { btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-user-plus mr-1"></i> Đăng ký ngay'; }
}

function makeGuestUser() {
    return { name: 'Khách (Guest)', isGuest: true, tuanHienTai: 1, hoTen: 'Bé Khách', lop: '', maHS: 'KHACH', role: 'guest', vaiTro: 'guest', loaiTaiKhoan: 'guest', sessionPending: false };
}

function makePendingSessionUser() {
    return { name: 'Đang khôi phục phiên', isGuest: false, tuanHienTai: 1, hoTen: 'Đang khôi phục phiên', lop: '', maHS: '', role: 'pending', vaiTro: 'pending', loaiTaiKhoan: 'pending', sessionPending: true };
}

async function tryAutoLogin() {
    const token = getSessionToken();
    if (!token) return 'none';
    try {
        const res = await callAppsScript('restoreSession', { sessionToken: token });
        if (res.ok && res.student) {
            currentUser = { ...res.student, isGuest: false, sessionPending: false };
            return 'restored';
        }
        // Chỉ xóa token khi chính backend xác nhận token không còn hợp lệ.
        clearStoredSession();
        return 'invalid';
    } catch (e) {
        // Lỗi mạng / Apps Script tạm thời không được phép làm mất phiên.
        return 'network-error';
    }
}

async function retryPendingSessionRestore() {
    if (!getSessionToken() || !currentUser?.sessionPending) return;
    const status = await tryAutoLogin();
    if (status === 'restored') enterDashboard(true);
    else if (status === 'invalid') { currentUser = makeGuestUser(); enterDashboard(true); }
}

async function initializeApp() {
    if (!getSessionToken()) {
        currentUser = makeGuestUser();
        enterDashboard(true);
        closeAuthScreen();
        return;
    }

    // Có token nghĩa là đã có phiên đăng nhập. Trong lúc chưa liên lạc được backend,
    // giữ trạng thái "đang khôi phục" thay vì tự hạ xuống Khách.
    currentUser = makePendingSessionUser();
    enterDashboard(true);

    const status = await tryAutoLogin();
    if (status === 'restored') {
        enterDashboard(true);
    } else if (status === 'invalid') {
        currentUser = makeGuestUser();
        enterDashboard(true);
    } else if (status === 'network-error') {
        currentUser = makePendingSessionUser();
        enterDashboard(true);
    }
    closeAuthScreen();
}

async function logout() {
    clearInterval(adminNotificationTimer);
    adminNotificationTimer = null;
    adminNewRegistrationCount = 0;
    const token = getSessionToken();
    if (token) {
        try { await callAppsScript('logout', { sessionToken: token }); } catch (e) {}
    }
    // Người dùng đã chủ động bấm Đăng xuất nên xóa token cục bộ dù mạng có lỗi.
    clearStoredSession();
    currentUser = makeGuestUser();
    enterDashboard(true);
}

function handleGuestMode() { closeAuthScreen(); }

function enterDashboard(isSilent = false) {
    document.getElementById('screen-dashboard').classList.remove('hidden');
    updateUserInfoBox();
    updatePremiumUI();
    startAdminNotificationPolling();
    resetStars();
    renderDashboardGrid();
    if (hasPremiumAccess()) renderExamHubGrid();
    goHome();
    if (!isSilent && currentUser && !currentUser.isGuest) setTimeout(() => {
        const template = GREETINGS_STUDENT[Math.floor(Math.random() * GREETINGS_STUDENT.length)];
        speakVietnamese(template.replace('{name}', currentUser.hoTen), 0.96);
    }, 350);
}

function updateUserInfoBox() {
    const box = document.getElementById('user-info-box');
    if (!box) return;
    if (currentUser?.sessionPending) {
        box.innerHTML = `<div class="flex items-center gap-1.5 text-[11px] font-black text-indigo-600"><i class="fa-solid fa-cloud-arrow-down fa-beat-fade"></i><span>Đang khôi phục phiên...</span></div>`;
    } else if (currentUser && !currentUser.isGuest) {
        const adminBtn = isAdminUser() ? `<button onclick="openAccountManager()" title="Quản lý tài khoản" class="relative h-9 px-3 flex items-center gap-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl border border-purple-200 text-[11px] font-black shadow-sm pastel-btn whitespace-nowrap"><i class="fa-solid fa-users-gear"></i><span>Quản lý</span><span id="admin-new-registration-badge" class="hidden absolute -top-2 -right-2 min-w-[19px] h-[19px] px-1 rounded-full bg-rose-500 text-white text-[10px] leading-[19px] text-center font-black border-2 border-white shadow-md">0</span></button>` : '';
        const tier = isAdminUser() ? 'Admin' : String(currentUser.loaiTaiKhoan || 'regular').toUpperCase();
        box.innerHTML = `<div class="flex items-center gap-1.5"><div class="text-right"><div class="text-pink-600 font-extrabold text-xs md:text-sm leading-tight">${escapeHtml(currentUser.hoTen)}</div><div class="text-gray-500 font-semibold text-[10px]">${escapeHtml(tier)} · ID ${escapeHtml(currentUser.maHS)}</div></div>${adminBtn}<button onclick="logout()" title="Đăng xuất" class="w-8 h-8 flex items-center justify-center bg-rose-100 hover:bg-rose-200 text-rose-500 rounded-xl border border-rose-200 text-xs"><i class="fa-solid fa-right-from-bracket"></i></button></div>`;
    } else {
        box.innerHTML = `<div class="flex items-center gap-1.5"><span class="text-amber-600 font-extrabold text-[11px] mr-0.5">Khách</span><button onclick="openAuthScreen('login')" class="h-9 px-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[11px] font-black shadow-sm pastel-btn">Sign in</button><button onclick="openAuthScreen('register')" class="h-9 px-3 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 text-[11px] font-black shadow-sm pastel-btn">Sign up</button></div>`;
    }
}

function resetStars() {
    starGreenCount = 0; starRedCount = 0;
    const greenEl = document.getElementById('star-green-count'); const redEl = document.getElementById('star-red-count');
    if (greenEl) greenEl.textContent = 0; if (redEl) redEl.textContent = 0;
}

function clickProgressOrExam(type) {
    if (type === 'progress') openRoadmap();
    else if (type === 'exam') openExamHub();
}

// ==========================================
// CHỦ ĐỀ 1: BẢNG CHỮ CÁI TƯƠNG TÁC (1.1 ĐẾN 1.4)
// ==========================================
function openTopic(topicNum, topicName, icon) {
    if (PREMIUM_TOPIC_IDS.has(Number(topicNum)) && !requirePremiumAccess(topicName)) return;
    stopSpeaking();
    activeTopicId = topicNum; activeExamContext = null; activeRoadmapContext = null;
    updateDiscoverBreadcrumb_(topicName, icon || '🌸', null);

    if (topicNum === 1) {
        openLettersSubmenu();
        return;
    }

    if (topicNum === 12) {
        openThoNhacMenu();
        return;
    }

    if (topicNum === 13) {
        openSemesterReviewMenu();
        return;
    }

    showLoadingOverlay(`Đang tải chủ đề "${topicName}"...`);
    fetchAllTopicsData().then(topics => {
        hideLoadingOverlay();
        const topicObj = topics.find(t => Number(t.topic_id) === Number(topicNum));
        if (!topicObj || !topicObj.questions || !topicObj.questions.length) throw new Error("Chủ đề không có câu hỏi nào");
        showLectureAndSubtopics(topicNum, topicName, topicObj);
    }).catch(err => {
        hideLoadingOverlay();
        showAppDialog(`Không thể tải chủ đề: ${err.message}`, { type:'error' });
    });
}


function openSemesterReviewMenu() {
    stopSpeaking();
    currentTopicKey = 'semester_review_menu';
    currentTopicName = '13. Ôn tập học kỳ';
    updateNavTabs('Ôn tập', '🧠', '13. Ôn tập học kỳ', null);

    showLoadingOverlay('Đang tải kho ôn tập học kỳ...');
    fetchAllTopicsData().then(topics => {
        hideLoadingOverlay();
        const topicObj = topics.find(t => Number(t.topic_id) === 13);
        if (!topicObj || !Array.isArray(topicObj.questions) || !topicObj.questions.length) {
            throw new Error('Chưa có dữ liệu ôn tập học kỳ');
        }
        showLectureAndSubtopics(13, '13. Ôn tập học kỳ', topicObj);
    }).catch(err => {
        hideLoadingOverlay();
        showAppDialog(`Không thể tải ôn tập học kỳ: ${err.message}`, { type:'error' });
    });
}

function openLettersSubmenu() {
    stopSpeaking();
    currentTopicKey = 'letters_menu';
    currentTopicName = '1. Bảng chữ cái';
    updateDiscoverBreadcrumb_("1. Bảng chữ cái", "🅰️", null);

    const subtopics = [
        { title: 'Bảng chữ cái', badge: '29 chữ', desc: 'Khám phá 29 chữ cái in hoa, in thường, chữ tập viết và 3 ví dụ trực quan.', action: () => renderAlphabetBoard(0) },
        { title: '12 Nguyên âm', badge: `${countAlphabetQuizQuestions('nguyen_am_don')} câu`, desc: 'Trò chơi nghe và nhận diện chính xác 12 nguyên âm đơn & đôi.', action: () => startAlphabetCategoryQuiz('nguyen_am_don', '12 Nguyên âm') },
        { title: '17 Phụ âm', badge: `${countAlphabetQuizQuestions('phu_am')} câu`, desc: 'Luyện tập nghe phát âm và tìm đúng 17 phụ âm đơn trong tiếng Việt.', action: () => startAlphabetCategoryQuiz('phu_am', '17 Phụ âm') },
        { title: '11 Phụ âm ghép', badge: `${countAlphabetQuizQuestions('phu_am_ghep')} câu`, desc: 'Thử thách nhận diện ch, gh, gi, kh, ng, ngh, nh, ph, qu, th, tr.', action: () => startAlphabetCategoryQuiz('phu_am_ghep', '11 Phụ âm ghép') }
    ];

    document.getElementById('lecture-title').textContent = "1. Bảng chữ cái tiếng Việt";
    document.getElementById('lecture-content').textContent = "Bé làm quen với 29 chữ cái tiếng Việt, nhận diện chính xác 12 nguyên âm, 17 phụ âm và 11 phụ âm ghép qua các trò chơi nghe âm đoán chữ thật vui nhé!";
    document.getElementById('view-lecture').dataset.audioText = "Chào mừng bé đến với Bảng chữ cái tiếng Việt. Bé hãy chọn một mục bên dưới nhé!";

    let subHtml = '';
    subtopics.forEach((sub, idx) => {
        const style = SUBTOPIC_PALETTES[idx % SUBTOPIC_PALETTES.length];
        subHtml += `
            <button onclick="window.letterSubActions[${idx}]()" class="p-3 ${style.card} border-2 rounded-xl font-bold text-left transition-all flex items-center justify-between shadow-sm pastel-btn">
                <span class="text-sm md:text-base leading-snug"><strong class="${style.num} mr-1.5">${idx + 1}.</strong> ${sub.title}</span>
                <span class="text-xs font-extrabold ${style.badge} px-2.5 py-0.5 rounded-full border shrink-0 ml-1.5 shadow-inner">${sub.badge}</span>
            </button>`;
    });

    window.letterSubActions = subtopics.map(s => s.action);
    setSubtopicGridColumns(subtopics.length);
    document.getElementById('lecture-subtopics-list').innerHTML = subHtml;
    switchAppView('view-lecture');
}

function renderAlphabetBoard(index = 0) {
    stopSpeaking();
    updateDiscoverBreadcrumb_("1. Bảng chữ cái", "🅰️", "Bảng chữ cái");
    const item = ALPHABET_29_DETAILS[index];

    const row1 = ALPHABET_29_DETAILS.slice(0, 15);
    const row2 = ALPHABET_29_DETAILS.slice(15);

    const renderKeyRow = (arr) => arr.map(l => {
        const idx = ALPHABET_29_DETAILS.indexOf(l);
        const isActive = idx === index;
        const activeCls = isActive ? "bg-rose-500 text-white border-rose-600 shadow-md scale-105" : "bg-white text-gray-700 border-gray-200 hover:border-pink-300";
        return `
          <button class="w-9 h-11 md:w-11 md:h-12 rounded-xl font-black text-xs md:text-sm border-2 transition-all flex flex-col items-center justify-center p-0.5 ${activeCls}" onclick="renderAlphabetBoard(${idx})">
            <span>${l.u}</span>
            <span class="text-[10px] opacity-75">${l.l}</span>
          </button>`;
    }).join('');

    const html = `
        <div class="w-full flex flex-col items-center justify-between space-y-2.5">
            <div class="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                <div class="p-3 bg-pink-50/70 border-2 border-pink-300 rounded-2xl flex flex-col items-center justify-center shadow-xs text-center">
                    <div class="flex items-baseline space-x-2 mb-1">
                        <span class="text-3xl md:text-4xl font-black text-rose-600">${item.u}</span>
                        <span class="text-2xl md:text-3xl font-bold text-pink-500">${item.l}</span>
                        <span class="text-3xl font-serif italic text-indigo-600">${item.hw}</span>
                    </div>
                    <span class="text-xs font-bold text-purple-700 mb-2">Âm đọc: "${item.sound}"</span>
                    <button onclick="speakVietnamese('${item.sound}')" class="px-3 py-1 bg-amber-200 hover:bg-amber-300 text-amber-900 rounded-xl text-xs font-black pastel-btn shadow-xs flex items-center space-x-1">
                        <i class="fa-solid fa-volume-high"></i><span>Nghe âm</span>
                    </button>
                </div>

                ${item.examples.map(ex => `
                    <div onclick="speakVietnamese('${ex.w}. ${ex.sent}')" class="p-2.5 bg-white hover:bg-pink-50/50 border-2 border-emerald-300 rounded-2xl flex flex-col items-center justify-between text-center cursor-pointer shadow-xs pastel-btn transition-all">
                        <span class="text-2xl md:text-3xl mb-0.5">${ex.emo}</span>
                        <span class="text-xs md:text-sm font-black text-emerald-800">${ex.w}</span>
                        <span class="text-[9px] px-2 py-0.2 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full font-bold my-1">${ex.tag}</span>
                        <p class="text-[11px] text-gray-600 font-medium italic leading-tight mb-1.5">"${ex.sent}"</p>
                        <button onclick="event.stopPropagation(); speakVietnamese('${ex.w}. ${ex.sent}')" class="px-2.5 py-0.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg text-[10px] font-black border border-amber-300">
                            <i class="fa-solid fa-volume-high mr-1"></i>Nghe
                        </button>
                    </div>
                `).join('')}
            </div>

            <div class="w-full max-w-4xl bg-white p-2.5 rounded-2xl border-2 border-pink-200 shadow-xs flex flex-col items-center space-y-1.5">
                <div class="flex flex-wrap justify-center gap-1.5">${renderKeyRow(row1)}</div>
                <div class="flex flex-wrap justify-center gap-1.5">${renderKeyRow(row2)}</div>
            </div>
        </div>
    `;

    document.getElementById('question-box').innerHTML = html;
    document.getElementById('quiz-top-bar').classList.add('hidden');
    document.getElementById('quiz-card-header').classList.add('hidden');
    document.getElementById('nav-group-practice').classList.add('hidden');
    document.getElementById('nav-group-exam').classList.add('hidden');

    switchAppView('view-quiz');
    speakVietnamese(`${item.name}, âm đọc là ${item.sound}`);
}

const ALPHABET_QUIZ_TARGET_TOTAL = 30;

function getAlphabetQuizVariantsPerLetter(groupKey) {
    const count = ALPHABET_29_DETAILS.filter(item => item.group === groupKey).length;
    return count ? Math.max(1, Math.ceil(ALPHABET_QUIZ_TARGET_TOTAL / count)) : 1;
}

function countAlphabetQuizQuestions(groupKey) {
    const count = ALPHABET_29_DETAILS.filter(item => item.group === groupKey).length;
    return count * getAlphabetQuizVariantsPerLetter(groupKey);
}

function startAlphabetCategoryQuiz(groupKey, subTitle) {
    stopSpeaking();
    const filtered = ALPHABET_29_DETAILS.filter(item => item.group === groupKey);
    if (!filtered.length) { showAppToast('Đang cập nhật thêm câu hỏi cho phần này bé nhé!', 'info', 2200); return; }

    const variantsPerLetter = getAlphabetQuizVariantsPerLetter(groupKey);

    let questions = [];
    filtered.forEach(item => {
        const correctStr = `${item.u} ${item.l}`;
        const wrongLetterPool = ALPHABET_29_DETAILS.filter(x => x.u !== item.u).map(x => `${x.u} ${x.l}`);
        const exampleWord = item.examples[0]?.w || '';

        for (let v = 0; v < variantsPerLetter; v++) {
            questions.push({
                question_id: 1000 + Math.floor(Math.random() * 9000) + v,
                sub_topic: subTitle,
                question_text: `Bé hãy lắng nghe âm đọc của cô Thỏ Hồng rồi chọn chữ cái đúng nhé!`,
                options: buildTrickyChoices(correctStr, wrongLetterPool, wrongLetterPool, 3),
                answer: correctStr,
                audio_text: `Bé hãy tìm chữ ${item.u}, âm đọc là ${item.sound}`,
                skill_tag: 'C1',
                diem: 0.5,
                render_style: 'letter_listen',
                mascot_text: 'Chữ cái nào vừa phát ra âm thanh vậy bé ơi?',
                explanation: `Chữ ${item.u} (${item.l}) có âm đọc là "${item.sound}". Ví dụ: ${exampleWord}.`
            });
        }
    });

    questions = shuffleArray(questions);

    updateDiscoverBreadcrumb_("1. Bảng chữ cái", "🅰️", subTitle);
    startTopicQuiz(1, subTitle, questions, subTitle);
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


// ==========================================
// CHỦ ĐỀ 12: VƯỜN THƠ VÀ NHẠC
// - 20 bài thơ + 20 lời bài hát: nội dung gốc do Cô Thỏ Hồng sáng tác riêng cho chương trình.
// - Bài hát hiện lời đầy đủ, nhịp/phong cách gợi ý; TTS đọc lời để bé luyện đọc.
// ==========================================
let activeThoNhacTopic_ = null;
let activeThoNhacSection_ = null;

function setLectureUtilityVisibility_(showSpeak = true, showMix = true) {
    const view = document.getElementById('view-lecture');
    if (!view) return;
    const speakBtn = view.querySelector('button[onclick="speakLecture()"]');
    if (speakBtn) speakBtn.classList.toggle('hidden', !showSpeak);
    const bottomWrap = view.querySelector(':scope > div:last-child');
    if (bottomWrap) bottomWrap.classList.toggle('hidden', !showMix);
}

async function openThoNhacMenu() {
    stopSpeaking();
    activeTopicId = 12;
    activeExamContext = null;
    activeRoadmapContext = null;
    pendingTopicQuiz = null;
    activeThoNhacSection_ = null;
    updateDiscoverBreadcrumb_('12. Vườn thơ và nhạc', '🎶', null);
    showLoadingOverlay('Đang mở Vườn thơ và nhạc...');
    try {
        const topics = await fetchAllTopicsData();
        const topicObj = topics.find(t => Number(t.topic_id) === 12);
        if (!topicObj) throw new Error('Không tìm thấy dữ liệu Vườn thơ và nhạc');
        activeThoNhacTopic_ = topicObj;
        renderThoNhacHome_(topicObj);
        switchAppView('view-lecture');
    } catch (err) {
        showAppDialog(`Không thể mở Vườn thơ và nhạc: ${err.message}`, { type:'error' });
    } finally {
        hideLoadingOverlay();
    }
}

function renderThoNhacHome_(topicObj) {
    setLectureUtilityVisibility_(true, false);
    const poems = topicObj?.poems || [];
    const songs = topicObj?.songs || [];
    const titleEl = document.getElementById('lecture-title');
    const contentEl = document.getElementById('lecture-content');
    const listEl = document.getElementById('lecture-subtopics-list');
    if (titleEl) titleEl.textContent = '12. Vườn thơ và nhạc';
    if (contentEl) {
        contentEl.innerHTML = `
            <span class="block text-3xl mb-2">🌷🎶</span>
            <span class="font-black text-purple-700">Một khu vườn nhỏ của Cô Thỏ Hồng dành riêng cho bé!</span><br>
            <span class="text-sm md:text-base text-slate-600 font-semibold">20 bài thơ để đọc · 20 bài hát có lời để đọc theo nhịp.</span>`;
    }
    const lectureView = document.getElementById('view-lecture');
    if (lectureView) lectureView.dataset.audioText = 'Chào bé đến với Vườn thơ và nhạc của Cô Thỏ Hồng. Bé hãy chọn Vườn thơ hoặc Vườn nhạc nhé!';
    if (!listEl) return;
    listEl.className = 'grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl';
    listEl.innerHTML = `
        <button onclick="openThoNhacSection_('poems')" class="p-4 bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200 rounded-2xl text-left pastel-btn shadow-sm hover:border-purple-300">
            <div class="text-3xl mb-2">🌷📖</div>
            <div class="font-black text-pink-700 text-base md:text-lg">Vườn thơ Cô Thỏ Hồng</div>
            <div class="text-xs md:text-sm text-slate-500 font-bold mt-1">${poems.length} bài thơ ngắn · Cô Thỏ Hồng xuất hiện trong từng bài</div>
        </button>
        <button onclick="openThoNhacSection_('songs')" class="p-4 bg-gradient-to-br from-sky-50 to-fuchsia-50 border-2 border-fuchsia-200 rounded-2xl text-left pastel-btn shadow-sm hover:border-fuchsia-300">
            <div class="text-3xl mb-2">🎵✨</div>
            <div class="font-black text-fuchsia-700 text-base md:text-lg">Vườn nhạc Cô Thỏ Hồng</div>
            <div class="text-xs md:text-sm text-slate-500 font-bold mt-1">${songs.length} bài hát nguyên bản · có lời và nhịp gợi ý</div>
        </button>`;
}

function openThoNhacSection_(kind) {
    stopSpeaking();
    if (!activeThoNhacTopic_) return openThoNhacMenu();
    activeThoNhacSection_ = kind;
    const isPoems = kind === 'poems';
    const items = isPoems ? (activeThoNhacTopic_.poems || []) : (activeThoNhacTopic_.songs || []);
    updateDiscoverBreadcrumb_('12. Vườn thơ và nhạc', '🎶', isPoems ? 'Vườn thơ' : 'Vườn nhạc');
    setLectureUtilityVisibility_(false, false);

    const titleEl = document.getElementById('lecture-title');
    const contentEl = document.getElementById('lecture-content');
    const listEl = document.getElementById('lecture-subtopics-list');
    if (titleEl) titleEl.textContent = isPoems ? 'Vườn thơ Cô Thỏ Hồng' : 'Vườn nhạc Cô Thỏ Hồng';
    if (contentEl) {
        contentEl.innerHTML = isPoems
            ? '<span class="font-black text-pink-700">🌷 Chọn một bài thơ. Bé tự đọc trước, rồi bấm Cô đọc để nghe mẫu nhé!</span>'
            : '<span class="font-black text-fuchsia-700">🎵 Chọn một bài hát. Đây là lời và nhịp gợi ý nguyên bản; nút Cô đọc giúp bé nghe lời rõ trước khi hát theo giai điệu riêng.</span>';
    }
    const lectureView = document.getElementById('view-lecture');
    if (lectureView) lectureView.dataset.audioText = '';
    if (!listEl) return;
    listEl.className = 'grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-3xl';
    listEl.innerHTML = items.map((item, idx) => {
        if (isPoems) {
            return `<button onclick="openThoNhacPoem_(${idx})" class="p-3.5 bg-white border-2 border-pink-200 hover:border-purple-300 rounded-2xl text-left pastel-btn shadow-sm">
                <div class="flex items-start gap-3"><span class="text-2xl">${escapeHtml(item.icon || '🌷')}</span><div class="min-w-0"><div class="font-black text-purple-700">${escapeHtml(item.title || `Bài thơ ${idx+1}`)}</div><div class="text-xs text-slate-500 font-bold mt-1">${escapeHtml(item.theme || 'Thơ vui cùng Cô Thỏ Hồng')}</div></div></div>
            </button>`;
        }
        return `<button onclick="openThoNhacSong_(${idx})" class="p-3.5 bg-white border-2 border-fuchsia-200 hover:border-sky-300 rounded-2xl text-left pastel-btn shadow-sm">
            <div class="flex items-start gap-3"><span class="text-2xl">${escapeHtml(item.icon || '🎵')}</span><div class="min-w-0"><div class="font-black text-fuchsia-700">${escapeHtml(item.title || `Bài hát ${idx+1}`)}</div><div class="text-xs text-slate-500 font-bold mt-1">${escapeHtml(item.theme || 'Bài hát của Cô Thỏ Hồng')}${item.tempo ? ` · ${escapeHtml(item.tempo)}` : ''}</div></div></div>
        </button>`;
    }).join('') + `
        <button onclick="openThoNhacMenu()" class="sm:col-span-2 py-2.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-xl text-xs font-black pastel-btn">← Quay lại Vườn thơ và nhạc</button>`;
}

function openThoNhacPoem_(index) {
    stopSpeaking();
    const poem = activeThoNhacTopic_?.poems?.[Number(index)];
    if (!poem) return;
    updateDiscoverBreadcrumb_('12. Vườn thơ và nhạc', '🎶', poem.title || 'Bài thơ');
    setLectureUtilityVisibility_(true, false);
    const titleEl = document.getElementById('lecture-title');
    const contentEl = document.getElementById('lecture-content');
    const listEl = document.getElementById('lecture-subtopics-list');
    if (titleEl) titleEl.textContent = poem.title || 'Bài thơ';
    const lines = Array.isArray(poem.lines) ? poem.lines : [];
    if (contentEl) {
        contentEl.innerHTML = `<div class="max-w-xl mx-auto rounded-3xl bg-gradient-to-br from-amber-50 via-pink-50 to-purple-50 border-2 border-pink-200 px-5 py-4 shadow-sm">
            <div class="text-3xl mb-2">${escapeHtml(poem.icon || '🌷')}</div>
            <div class="font-black text-xl md:text-2xl text-purple-800 mb-1">${escapeHtml(poem.title || '')}</div>
            <div class="text-xs text-pink-500 font-black mb-3">✍️ Cô Thỏ Hồng sáng tác</div>
            <div class="space-y-1.5 text-[17px] md:text-[19px] leading-8 text-slate-800 font-bold">${lines.map(line => line ? `<div>${escapeHtml(line)}</div>` : '<div class="h-2"></div>').join('')}</div>
            ${poem.message ? `<div class="mt-4 pt-3 border-t border-pink-200 text-sm text-pink-700 font-black">🌟 ${escapeHtml(poem.message)}</div>` : ''}
        </div>`;
    }
    const lectureView = document.getElementById('view-lecture');
    if (lectureView) lectureView.dataset.audioText = `${poem.title || ''}. ${lines.filter(Boolean).join(' ')}`;
    if (listEl) {
        listEl.className = 'grid grid-cols-2 gap-2 w-full max-w-xl';
        listEl.innerHTML = `<button onclick="openThoNhacSection_('poems')" class="py-2.5 bg-pink-50 border border-pink-200 text-pink-700 rounded-xl text-xs font-black pastel-btn">← Vườn thơ</button>
            <button onclick="openThoNhacPoem_(${(Number(index)+1) % Math.max(1,(activeThoNhacTopic_.poems||[]).length)})" class="py-2.5 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl text-xs font-black pastel-btn">Bài tiếp →</button>`;
    }
}

function openThoNhacSong_(index) {
    stopSpeaking();
    const song = activeThoNhacTopic_?.songs?.[Number(index)];
    if (!song) return;
    updateDiscoverBreadcrumb_('12. Vườn thơ và nhạc', '🎶', song.title || 'Bài hát');
    setLectureUtilityVisibility_(true, false);
    const titleEl = document.getElementById('lecture-title');
    const contentEl = document.getElementById('lecture-content');
    const listEl = document.getElementById('lecture-subtopics-list');
    if (titleEl) titleEl.textContent = song.title || 'Bài hát';
    const lines = Array.isArray(song.lines) ? song.lines : [];
    if (contentEl) {
        contentEl.innerHTML = `<div class="max-w-xl mx-auto rounded-3xl bg-gradient-to-br from-sky-50 via-white to-fuchsia-50 border-2 border-fuchsia-200 px-5 py-5 shadow-sm">
            <div class="text-4xl mb-2">${escapeHtml(song.icon || '🎵')}</div>
            <div class="font-black text-xl md:text-2xl text-fuchsia-800">${escapeHtml(song.title || '')}</div>
            <div class="text-xs text-fuchsia-500 font-black mt-1">✍️ Cô Thỏ Hồng sáng tác</div>
            <div class="flex flex-wrap justify-center gap-2 mt-3">
                ${song.style ? `<span class="px-3 py-1.5 rounded-full bg-white border border-fuchsia-200 text-fuchsia-700 text-xs font-black">🎼 ${escapeHtml(song.style)}</span>` : ''}
                ${song.tempo ? `<span class="px-3 py-1.5 rounded-full bg-white border border-sky-200 text-sky-700 text-xs font-black">🥁 ${escapeHtml(song.tempo)}</span>` : ''}
            </div>
            <div class="mt-4 space-y-1.5 text-[17px] md:text-[19px] leading-8 text-slate-800 font-bold">${lines.map(line => line ? `<div>${escapeHtml(line)}</div>` : '<div class="h-2"></div>').join('')}</div>
            ${song.message ? `<div class="mt-4 pt-3 border-t border-fuchsia-200 text-sm text-fuchsia-700 font-black">✨ ${escapeHtml(song.message)}</div>` : ''}
            <div class="mt-3 text-xs text-slate-500 font-bold">🔊 Nút “Cô đọc” đọc rõ phần lời; giai điệu là phần gia đình có thể hát theo nhịp gợi ý.</div>
        </div>`;
    }
    const lectureView = document.getElementById('view-lecture');
    if (lectureView) lectureView.dataset.audioText = `${song.title || ''}. ${lines.filter(Boolean).join(' ')}`;
    if (listEl) {
        listEl.className = 'grid grid-cols-2 gap-2 w-full max-w-xl';
        listEl.innerHTML = `<button onclick="openThoNhacSection_('songs')" class="py-2.5 bg-fuchsia-50 border border-fuchsia-200 text-fuchsia-700 rounded-xl text-xs font-black pastel-btn">← Vườn nhạc</button>
            <button onclick="openThoNhacSong_(${(Number(index)+1) % Math.max(1,(activeThoNhacTopic_.songs||[]).length)})" class="py-2.5 bg-gradient-to-r from-fuchsia-500 to-sky-500 text-white rounded-xl text-xs font-black pastel-btn">Bài tiếp →</button>`;
    }
}

function showLectureAndSubtopics(topicNum, topicName, topicObj) {
    setLectureUtilityVisibility_(true, true);
    pendingTopicQuiz = { topicNum, topicName, questions: topicObj.questions };
    
    document.getElementById('lecture-title').textContent = topicObj.lecture_title || topicName;
    document.getElementById('lecture-content').textContent = topicObj.lecture_content || topicObj.description || 'Chào mừng bé yêu! Hãy chọn một mục nhỏ bên dưới để bắt đầu luyện tập nhé.';
    document.getElementById('view-lecture').dataset.audioText = topicObj.lecture_audio_text || topicObj.lecture_content || topicObj.description || '';

    const groups = [], groupMap = {};
    topicObj.questions.forEach(q => {
        const k = (q.sub_topic || 'Câu hỏi chung').trim();
        if (!groupMap[k]) { groupMap[k] = []; groups.push(k); }
        groupMap[k].push(q);
    });
    // Đố vui (ID nội bộ 11): thêm một mục ảo "Trộn ngẫu nhiên" dùng toàn bộ kho câu hỏi,
    // không nhân đôi dữ liệu trong JSON.
    if (Number(topicNum) === 11 && topicObj.questions.length) {
        const randomKey = '__TOPIC10_RANDOM_ALL__';
        groups.push(randomKey);
        groupMap[randomKey] = topicObj.questions;
    }

    pendingTopicQuiz.groups = groups; 
    pendingTopicQuiz.groupMap = groupMap;

    let subHtml = '';
    groups.forEach((subName, idx) => {
        const style = SUBTOPIC_PALETTES[idx % SUBTOPIC_PALETTES.length];
        const isTopic10Random = Number(topicNum) === 11 && subName === '__TOPIC10_RANDOM_ALL__';
        const displayTitle = isTopic10Random ? '🎲 Trộn ngẫu nhiên' : beautifySubtopicName(subName);
        const count = groupMap[subName].length;

        subHtml += `
            <button onclick="selectSubtopic(${idx})" class="p-3 ${style.card} border-2 rounded-xl font-bold text-left transition-all flex items-center justify-between shadow-sm pastel-btn">
                <span class="text-sm md:text-base leading-snug"><strong class="${style.num} mr-1.5">${idx + 1}.</strong> ${escapeHtml(displayTitle)}</span>
                <span class="text-xs font-extrabold ${style.badge} px-2.5 py-0.5 rounded-full border shrink-0 ml-1.5 shadow-inner">${count} ${Number(topicNum) === 4 ? 'lượt' : 'câu'}</span>
            </button>`;
    });
    setSubtopicGridColumns(groups.length);
    document.getElementById('lecture-subtopics-list').innerHTML = subHtml;

    updateDiscoverBreadcrumb_(topicName, TOPICS_CONFIG.find(t => t.id === topicNum)?.icon || '🌸', null);
    switchAppView('view-lecture');
}

function speakLecture() {
    speakVietnamese(document.getElementById('view-lecture').dataset.audioText || '', 0.96);
}

function selectSubtopic(idx) {
    stopSpeaking();
    if (!pendingTopicQuiz) return;
    const { topicNum, topicName, questions, groups, groupMap } = pendingTopicQuiz;
    const subLabel = idx !== null ? groups[idx] : null;
    const pool = idx !== null ? groupMap[subLabel] : questions;
    const isTopic10Random = Number(topicNum) === 11 && subLabel === '__TOPIC10_RANDOM_ALL__';
    const displaySubLabel = isTopic10Random ? '🎲 Trộn ngẫu nhiên' : (subLabel ? beautifySubtopicName(subLabel) : null);
    const finalTitle = displaySubLabel ? `${topicName} - ${displaySubLabel}` : topicName;

    practiceCycleRawPool = [...pool];
    const firstCycleQuestions = shuffleArray([...pool]);

    updateDiscoverBreadcrumb_(topicName, TOPICS_CONFIG.find(t => t.id === topicNum)?.icon || '🌸', displaySubLabel || 'Tất cả các mục');
    startTopicQuiz(topicNum, finalTitle, firstCycleQuestions, displaySubLabel);
}

// ==========================================
// BÀI HỌC - stub cũ được giữ lại dưới tên legacy để tránh trùng hàm
// Hàm openBaiHocHub thực tế nằm ở module TV1_BH_BT phía cuối file.
// ==========================================
function openBaiHocHubLegacyStub_() {
    if (!requirePremiumAccess('Bài học')) return;
    stopSpeaking();
    clearInterval(quizTimerInterval);
    inBaiHocFlow = true;
    inMiniGameFlow = false;
    activeExamContext = null;
    activeRoadmapContext = null;
    activeTopicId = null;
    pendingTopicQuiz = null;
    updateNavTabs('Bài học', '📖', null);
    switchAppView('view-bai-hoc-hub');
}

// ==========================================
// BÀI TẬP - hiện tạm dùng engine tiến trình tuần cũ
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
    if (!requirePremiumAccess('Bài tập')) return;
    inBaiHocFlow = false;
    stopSpeaking();
    updateNavTabs("Bài tập", "✏️", null);
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

    function buildSemesterSvg(startWeek, title, subtitle, badgeClass) {
        let nodesHtml = '';
        for (let local = 1; local <= 12; local++) {
            const w = startWeek + local - 1;
            const item = roadmapConfig[w];
            const coord = ROADMAP_COORDS[local];
            const isDone = w < tuanHienTai;
            const isCurrent = w === tuanHienTai;
            const isLocked = w > tuanHienTai;
            const nodeColor = isDone ? '#10b981' : (isCurrent ? '#ec4899' : '#cbd5e1');
            const strokeColor = isDone ? '#34d399' : (isCurrent ? '#f43f5e' : '#94a3b8');
            let badgeHtml = '';
            if (isDone) badgeHtml = `<text x="${coord.x}" y="${coord.y + 40}" text-anchor="middle" font-size="16" fill="#f59e0b">⭐⭐⭐</text>`;
            else if (isCurrent) badgeHtml = `<text x="${coord.x}" y="${coord.y + 40}" text-anchor="middle" font-size="12" font-weight="900" fill="#ec4899">Đang học</text>`;
            else badgeHtml = `<text x="${coord.x}" y="${coord.y + 38}" text-anchor="middle" font-size="14" fill="#94a3b8">🔒 Khóa</text>`;

            const cursorCls = isLocked ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:scale-105 transition-transform';
            const animCls = isCurrent ? 'node-current' : '';
            const [capLine1, capLine2, capLine3] = wrapCaptionLines(item.desc, 20, 3);
            const capColor = isLocked ? '#475569' : '#7c3aed';
            nodesHtml += `
                <g class="${cursorCls} ${animCls}" onclick="selectRoadmapWeek(${w})" id="svg-node-week-${w}">
                    <text x="${coord.x}" y="${coord.y - 88}" text-anchor="middle" font-size="16" font-weight="700" fill="${capColor}">${escapeHtml(capLine1)}</text>
                    <text x="${coord.x}" y="${coord.y - 69}" text-anchor="middle" font-size="16" font-weight="700" fill="${capColor}">${escapeHtml(capLine2)}</text>
                    <text x="${coord.x}" y="${coord.y - 50}" text-anchor="middle" font-size="16" font-weight="700" fill="${capColor}">${escapeHtml(capLine3)}</text>
                    <circle cx="${coord.x}" cy="${coord.y}" r="40" fill="#ffffff" stroke="${strokeColor}" stroke-width="4" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.08))"/>
                    <circle cx="${coord.x}" cy="${coord.y}" r="34" fill="${nodeColor}" opacity="${isLocked ? '0.25' : '0.15'}"/>
                    <text x="${coord.x}" y="${coord.y - 4}" text-anchor="middle" font-size="24">${item.icon || '🌸'}</text>
                    <text x="${coord.x}" y="${coord.y + 18}" text-anchor="middle" font-size="13" font-weight="800" fill="${isLocked ? '#64748b' : '#1e293b'}">Tuần ${w}</text>
                    ${badgeHtml}
                </g>`;
        }
        return `
            <div class="mb-5 rounded-3xl border-2 border-pink-100 bg-white/70 p-2 md:p-3 shadow-sm">
                <div class="flex items-center justify-center gap-2 mb-1">
                    <span class="px-3 py-1 rounded-full ${badgeClass} font-black text-sm">${title}</span>
                    <span class="text-xs md:text-sm font-bold text-slate-500">${subtitle}</span>
                </div>
                <svg viewBox="0 0 1040 620" class="w-full select-none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 130,125 Q 520,125 910,125 C 1030,125 1030,315 910,315 Q 520,315 130,315 C 10,315 10,505 130,505 Q 520,505 910,505"
                          fill="none" stroke="#fbcfe8" stroke-width="12" stroke-dasharray="14,14" stroke-linecap="round"/>
                    <path d="M 130,125 Q 520,125 910,125 C 1030,125 1030,315 910,315 Q 520,315 130,315 C 10,315 10,505 130,505 Q 520,505 910,505"
                          fill="none" stroke="#f472b6" stroke-width="4" stroke-dasharray="14,14" stroke-linecap="round"/>
                    ${nodesHtml}
                </svg>
            </div>`;
    }

    container.innerHTML = `
        <div class="w-full max-w-6xl mx-auto">
            ${buildSemesterSvg(1, 'HỌC KỲ 1', 'Tuần 1 - 12', 'bg-pink-50 text-pink-700 border border-pink-200')}
            ${buildSemesterSvg(13, 'HỌC KỲ 2', 'Tuần 13 - 24', 'bg-purple-50 text-purple-700 border border-purple-200')}
        </div>`;
}

async function selectRoadmapWeek(weekNum) {
    stopSpeaking();
    const config = roadmapConfig[weekNum];
    if (!config) return;
    
    const tuanHienTai = Number(currentUser?.tuanHienTai) || 1;
    if (weekNum > tuanHienTai) {
        return showAppDialog(`Tuần ${weekNum} đang bị khóa. Bé hãy hoàn thành Tuần ${tuanHienTai} đạt từ 80% trở lên để mở khóa nhé!`, { type:'warning', title:'Chưa mở khóa' });
    }

    if (config.isExam) return openExamHub();

    activeRoadmapContext = { week: weekNum, topicId: config.topicIds[0] || 1, chuDe: config.name };
    pendingTopicQuiz = null; activeExamContext = null;
    const topicLabel = config.name.replace(/^Tuần\s*\d+:\s*/i, '');
    updateNavTabs("Bài tập", "✏️", `Tuần ${weekNum}`, topicLabel);

    showLoadingOverlay(`Đang bốc ngẫu nhiên 30/60 câu hỏi Tuần ${weekNum}...`);
    try {
        await fetchAllTopicsData();
        hideLoadingOverlay();

        const weekQuestions = getQuestionsForWeek343(weekNum);
        if (!weekQuestions.length) return showAppDialog('Tuần này đang chuẩn bị thêm câu hỏi, bé quay lại sau nhé!', { type:'info' });

        startTopicQuiz(config.topicIds[0] || 1, config.name, weekQuestions, null);
    } catch (err) {
        hideLoadingOverlay();
        await showAppDialog(`Lỗi tải dữ liệu tuần: ${err.message}`, { type:'error' });
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


// ==========================================
// CHỦ ĐỀ 3: XƯỞNG GHÉP TIẾNG - GIAO DIỆN RIÊNG
// ==========================================
function ensureTopic3FusionStyles() {
    if (document.getElementById('topic3-fusion-style')) return;
    const style = document.createElement('style');
    style.id = 'topic3-fusion-style';
    style.textContent = `
        @keyframes t3PieceInLeft {
            from { transform: translateX(-36px) scale(.92); opacity:.15; }
            to { transform: translateX(0) scale(1); opacity:1; }
        }
        @keyframes t3PieceInRight {
            from { transform: translateX(36px) scale(.92); opacity:.15; }
            to { transform: translateX(0) scale(1); opacity:1; }
        }
        @keyframes t3ResultPop {
            0% { transform: scale(.45); opacity:0; }
            70% { transform: scale(1.12); opacity:1; }
            100% { transform: scale(1); opacity:1; }
        }
        .t3-piece-left { animation:t3PieceInLeft .42s ease both; }
        .t3-piece-right { animation:t3PieceInRight .42s ease both; }
        .t3-result-pop { animation:t3ResultPop .42s ease both; }
    `;
    document.head.appendChild(style);
}

function getTopic3FusionMeta(q) {
    const tags = Array.isArray(q?.tags) ? q.tags : [];
    let level = 0;
    if (tags.includes('cap1_ghep_am_nguyen_am')) level = 1;
    else if (tags.includes('cap2_them_thanh')) level = 2;
    else if (tags.includes('cap3_am_dau_van')) level = 3;
    else if (tags.includes('cap4_tieng_hoan_chinh')) level = 4;
    if (!level) return null;

    const text = String(q.question_text || '');
    const quoted = [...text.matchAll(/'([^']+)'/g)].map(m => m[1]);
    const toneMatch = text.match(/\bthanh\s+(sắc|huyền|hỏi|ngã|nặng|ngang)\b/i);
    let tone = toneMatch ? toneMatch[1].toLowerCase() : '';
    // Fallback an toàn cho Level 2: suy ra thanh từ đáp án đúng nếu câu chữ thay đổi.
    // Không dùng dấu ngang làm mặc định vì sẽ làm sai nghĩa bài học.
    if (!tone && level === 2 && q?.answer) {
        const ans = String(q.answer).normalize('NFD');
        if (/\u0301/.test(ans)) tone = 'sắc';
        else if (/\u0300/.test(ans)) tone = 'huyền';
        else if (/\u0309/.test(ans)) tone = 'hỏi';
        else if (/\u0303/.test(ans)) tone = 'ngã';
        else if (/\u0323/.test(ans)) tone = 'nặng';
        else tone = 'ngang';
    }

    const onsetMatch =
        text.match(/âm đầu\s+'([^']+)'/i) ||
        text.match(/ghép với\s+'([^']+)'\s*thì/i) ||
        text.match(/một âm đầu.*?ghép với\s+'([^']+)'/i);

    const vowelMatch = text.match(/nguyên âm\s+'([^']+)'/i);
    const rimeMatch = text.match(/vần\s+'([^']+)'/i);
    const baseMatch = text.match(/tiếng\s+'([^']+)'/i);

    if (level === 1) {
        const onset = onsetMatch?.[1] || quoted[0] || '';
        const vowel = vowelMatch?.[1] || quoted[1] || '';
        return {
            level, label:'Cấp 1 · Ghép âm',
            instruction:'Ghép âm đầu với nguyên âm',
            pieces:[onset, vowel],
            speech:`${onset}, ghép với ${vowel}, được tiếng gì?`
        };
    }

    if (level === 2) {
        const base = baseMatch?.[1] || quoted[0] || '';
        return {
            level, label:'Cấp 2 · Thêm thanh',
            instruction:'Ghép tiếng trước, rồi thêm thanh',
            pieces:[base, ({
                'sắc':'◌́',
                'huyền':'◌̀',
                'hỏi':'◌̉',
                'ngã':'◌̃',
                'nặng':'◌̣',
                'ngang':'không dấu'
            })[tone] || '?'],
            speech:`Tiếng ${base}, thêm thanh ${tone || ''}, được tiếng gì?`
        };
    }

    if (level === 3) {
        let onset = '';
        let rime = '';

        if (onsetMatch && rimeMatch) {
            onset = onsetMatch[1];
            rime = rimeMatch[1];
        } else if (/Vần\s+'[^']+'.*ghép với\s+'[^']+'/i.test(text)) {
            // Mẫu: "Vần 'ao' đang chờ một âm đầu. Ghép với 'c'..."
            const m = text.match(/Vần\s+'([^']+)'.*ghép với\s+'([^']+)'/i);
            rime = m?.[1] || '';
            onset = m?.[2] || '';
        } else {
            // Các mẫu còn lại được sinh theo thứ tự âm đầu rồi vần.
            onset = quoted[0] || '';
            rime = quoted[1] || '';
        }

        return {
            level, label:'Cấp 3 · Ghép vần',
            instruction:'Ghép âm đầu với vần',
            pieces:[onset, rime],
            speech:`${onset}, ghép với vần ${rime}, được tiếng gì?`
        };
    }

    let onset = onsetMatch?.[1] || quoted[0] || '';
    let rime = rimeMatch?.[1] || quoted[1] || '';

    return {
        level, label:'Cấp 4 · Tiếng hoàn chỉnh',
        instruction:'Ghép âm đầu + vần + thanh',
        pieces:[onset, rime, tone ? `thanh ${tone}` : 'thanh'],
        speech:`${onset}, ghép với vần ${rime}, thêm thanh ${tone || ''}, được tiếng gì?`
    };
}

function speakTopic3FusionQuestion() {
    const q = activeQuestionsList[currentQIndex];
    const meta = getTopic3FusionMeta(q);
    if (!meta) return speakCurrentQuestion();
    speakVietnamese(meta.speech, 0.92);
}

function checkTopic3FusionAnswer(selectedOpt) {
    const q = activeQuestionsList[currentQIndex];
    const isCorrect = selectedOpt === q.answer;

    if (isCorrect) {
        const result = document.getElementById('topic3-fusion-result');
        const arrow = document.getElementById('topic3-fusion-arrow');
        if (result) {
            result.textContent = q.answer;
            result.className = 't3-result-pop min-w-[92px] px-5 py-3 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white text-[1.69rem] md:text-[2.03rem] font-black shadow-lg border-2 border-emerald-300';
        }
        if (arrow) arrow.textContent = '→';
    }

    checkAnswer(selectedOpt);
}

function renderTopic3FusionQuestion(q) {
    ensureTopic3FusionStyles();
    const meta = getTopic3FusionMeta(q);
    if (!meta) return false;

    const palette = [
        ['from-pink-100','to-rose-100','border-pink-300','text-rose-700'],
        ['from-sky-100','to-cyan-100','border-sky-300','text-sky-700'],
        ['from-violet-100','to-fuchsia-100','border-violet-300','text-violet-700'],
        ['from-amber-100','to-orange-100','border-amber-300','text-amber-700']
    ];

    const piecesHtml = meta.pieces.map((piece, idx) => {
        const p = palette[idx % palette.length];
        const anim = idx === 0 ? 't3-piece-left' : 't3-piece-right';
        return `
            ${idx > 0 ? `<span class="text-[1.69rem] md:text-[2.03rem] font-black text-pink-400 select-none">+</span>` : ''}
            <div class="${anim} ${meta.level === 2 && idx === 1 ? 'min-w-[150px] md:min-w-[190px] px-7 md:px-9' : 'min-w-[82px] md:min-w-[104px] px-5'} py-2.5 md:py-3 rounded-2xl bg-gradient-to-br ${p[0]} ${p[1]} border-2 ${p[2]} ${p[3]} text-[1.69rem] md:text-[2.03rem] font-black shadow-sm text-center whitespace-nowrap">
                ${escapeHtml(piece)}
            </div>`;
    }).join('');

    const optionsHtml = q.options.map((opt, idx) => `
        <button
            data-opt="${escapeHtml(opt)}"
            onclick="checkTopic3FusionAnswer('${String(opt).replace(/'/g, "\\'")}')"
            class="option-btn min-h-[54px] px-4 py-2 bg-pink-50/40 hover:bg-pink-100/70 border-2 border-pink-200 rounded-2xl font-black text-gray-800 text-center transition-all text-[1.125rem] md:text-[1.35rem] shadow-xs pastel-btn">
            ${escapeHtml(opt)}
        </button>
    `).join('');

    document.getElementById('question-box').innerHTML = `
        <div class="w-full max-w-4xl flex flex-col items-center">
            <!-- Breadcrumb phía trên đã hiển thị cấp độ, nên không lặp lại badge/tiêu đề ở đây. -->
            <div class="w-full rounded-3xl border-2 border-pink-200 bg-gradient-to-br from-white via-pink-50/40 to-purple-50/50 p-3 md:p-4 shadow-sm">
                <div class="flex flex-wrap items-center justify-center gap-3 md:gap-4">
                    ${piecesHtml}
                    <span id="topic3-fusion-arrow" class="text-[1.69rem] md:text-[2.03rem] font-black text-emerald-500 select-none">→</span>
                    <div id="topic3-fusion-result" class="min-w-[92px] px-5 py-3 rounded-2xl bg-white border-2 border-dashed border-emerald-300 text-emerald-400 text-[1.69rem] md:text-[2.03rem] font-black shadow-inner text-center">?</div>
                </div>

                <div class="flex justify-center mt-2.5">
                    <button onclick="speakTopic3FusionQuestion()" class="px-4 py-2 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-700 text-xs md:text-sm font-black pastel-btn shadow-sm">
                        <i class="fa-solid fa-volume-high mr-1.5"></i> Nghe cách ghép
                    </button>
                </div>
            </div>

            <div class="mt-2 text-xs md:text-sm font-black text-pink-600">Bé chọn tiếng được ghép đúng:</div>

            <div class="w-full max-w-3xl grid grid-cols-2 gap-2 mt-1.5">
                ${optionsHtml}
            </div>
        </div>
    `;

    restoreQuestionState(q);
    updateNavButtons();
    updateQuizPalletUI();

    if (autoSpeechEnabled) setTimeout(speakTopic3FusionQuestion, 120);
    return true;
}


// ==========================================
// CHỦ ĐỀ 8: NHÀ THÔNG THÁI SẮP CÂU - GIAO DIỆN XẾP THẺ TỪ
// ==========================================
const topic8ArrangeState = {};

function getTopic8State(q) {
    const key = `${q.question_id}`;
    if (!topic8ArrangeState[key]) {
        const tokens = Array.isArray(q.tokens) && q.tokens.length ? q.tokens.slice() : String(q.answer || '').split(/\s+/).filter(Boolean);
        topic8ArrangeState[key] = { selected: [], pool: tokens.map((text, i) => ({ id: `${key}-${i}`, text })) };
    }
    return topic8ArrangeState[key];
}

function topic8SentenceFromSelected(state) {
    return state.selected.map(x => x.text).join(' ').replace(/\s+([,.!?])/g, '$1').trim();
}

function renderTopic8SentenceBuilder(q) {
    const state = getTopic8State(q);
    const completed = userAnswers[currentQIndex] !== undefined;
    const selectedIds = new Set(state.selected.map(x => x.id));
    const available = state.pool.filter(x => !selectedIds.has(x.id));
    const built = topic8SentenceFromSelected(state);

    const topHtml = state.selected.length
        ? state.selected.map((tok, i) => `<button ${completed ? 'disabled' : ''} onclick="topic8ReturnToken(${i})" class="px-3 py-2 md:px-4 md:py-2.5 rounded-2xl border-2 ${completed ? 'bg-emerald-100 border-emerald-400 text-emerald-800' : 'bg-white border-fuchsia-300 text-fuchsia-700 hover:bg-fuchsia-50'} font-black text-sm md:text-base shadow-sm transition-all">${escapeHtml(tok.text)}</button>`).join('')
        : `<span class="text-slate-400 font-bold text-sm md:text-base">Chọn từ bên dưới để ghép câu...</span>`;

    const poolHtml = available.map(tok => `<button ${completed ? 'disabled' : ''} onclick="topic8PickToken('${tok.id.replace(/'/g, "\\'")}')" class="px-3.5 py-2.5 md:px-4 md:py-3 rounded-2xl bg-amber-50 hover:bg-amber-100 border-2 border-amber-300 text-amber-800 font-black text-sm md:text-base shadow-sm transition-all active:scale-95">${escapeHtml(tok.text)}</button>`).join('');

    const statusHtml = completed
        ? `<div class="mt-3 px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-700 font-black text-sm md:text-base">🎉 Chính xác! ${escapeHtml(q.answer)}</div>`
        : `<div id="topic8-status" class="mt-3 min-h-[28px] text-sm md:text-base font-extrabold text-rose-500"></div>`;

    document.getElementById('question-box').innerHTML = `
        <div class="w-full max-w-4xl flex flex-col items-center px-2">
            <div class="text-4xl md:text-5xl mb-2">🧩</div>
            <h3 class="text-base md:text-lg font-black text-slate-900 text-center">Sắp xếp các từ thành câu hoàn chỉnh</h3>
            <p class="text-xs md:text-sm font-bold text-slate-500 mt-1 text-center">Chạm từ bên dưới để đưa lên. Chạm từ phía trên để đưa xuống.</p>

            <div class="w-full mt-4 rounded-3xl border-2 border-dashed border-fuchsia-300 bg-fuchsia-50/40 p-4 min-h-[92px] flex flex-wrap gap-2 items-center justify-center">
                ${topHtml}
            </div>

            <div class="w-full mt-4 rounded-3xl border-2 border-amber-200 bg-white p-4 flex flex-wrap gap-2.5 items-center justify-center min-h-[96px]">
                ${poolHtml || (completed ? '<span class="text-emerald-600 font-black">Hoàn thành rồi! 🌟</span>' : '')}
            </div>

            <div class="flex flex-wrap items-center justify-center gap-2 mt-3">
                <button onclick="speakVietnamese('${String(q.answer || '').replace(/'/g, "\\'")}')" class="px-4 py-2 rounded-2xl bg-pink-50 border border-pink-200 text-pink-700 font-extrabold text-sm hover:bg-pink-100"><i class="fa-solid fa-volume-high mr-1.5"></i>Nghe câu đúng</button>
                ${!completed ? '<button onclick="topic8ResetCurrent()" class="px-4 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 font-extrabold text-sm hover:bg-slate-100"><i class="fa-solid fa-rotate-left mr-1.5"></i>Làm lại</button>' : ''}
            </div>
            ${statusHtml}
        </div>`;

    updateNavButtons();
    updateQuizPalletUI();
}

function topic8PickToken(tokenId) {
    const q = activeQuestionsList[currentQIndex];
    if (!q || userAnswers[currentQIndex] !== undefined) return;
    const state = getTopic8State(q);
    const tok = state.pool.find(x => x.id === tokenId);
    if (!tok || state.selected.some(x => x.id === tokenId)) return;
    state.selected.push(tok);
    topic8EvaluateOrRender(q, state);
}

function topic8ReturnToken(index) {
    const q = activeQuestionsList[currentQIndex];
    if (!q || userAnswers[currentQIndex] !== undefined) return;
    const state = getTopic8State(q);
    state.selected.splice(index, 1);
    renderTopic8SentenceBuilder(q);
}

function topic8ResetCurrent() {
    const q = activeQuestionsList[currentQIndex];
    if (!q || userAnswers[currentQIndex] !== undefined) return;
    const state = getTopic8State(q);
    state.selected = [];
    renderTopic8SentenceBuilder(q);
}

function topic8EvaluateOrRender(q, state) {
    const built = topic8SentenceFromSelected(state);
    if (state.selected.length < state.pool.length) {
        renderTopic8SentenceBuilder(q);
        return;
    }

    if (built === String(q.answer || '').trim()) {
        userAnswers[currentQIndex] = q.answer;
        score += (q.diem ?? 0.5);
        starGreenCount++;
        const greenEl = document.getElementById('star-green-count');
        if (greenEl) greenEl.textContent = starGreenCount;
        playAudio('correct');
        confetti({ particleCount: 55, spread: 70, origin: { y: 0.68 } });
        setTimeout(() => speakVietnamese(`Chính xác! ${q.answer}`), 160);
        renderTopic8SentenceBuilder(q);
        updateQuizPalletUI();
    } else {
        starRedCount++;
        const redEl = document.getElementById('star-red-count');
        if (redEl) redEl.textContent = starRedCount;
        playAudio('wrong');
        renderTopic8SentenceBuilder(q);
        const status = document.getElementById('topic8-status');
        if (status) status.textContent = 'Chưa đúng rồi. Bé chạm vào từ phía trên để đổi lại thứ tự nhé!';
    }
}


// ==========================================
// CHỦ ĐỀ 4: TẬP ĐỌC - TỪ 1 TỪ ĐẾN CÂU DÀI
// Mục tiêu: luyện đọc trơn. Không chấm đúng/sai; bé tự đọc trước,
// chỉ nghe cô đọc khi cần, sau đó đọc lại và chuyển lượt.
// ==========================================
function getTopic4ReadingMeta(q) {
    const tags = Array.isArray(q?.tags) ? q.tags : [];
    let level = 0;
    if (tags.includes('tap_doc_cap1')) level = 1;
    else if (tags.includes('tap_doc_cap2')) level = 2;
    else if (tags.includes('tap_doc_cap3')) level = 3;
    else if (tags.includes('tap_doc_cap4')) level = 4;
    if (!level) return null;
    const cfg = {
        1: { label:'Cấp 1 · Mầm chữ bật tiếng', note:'Một từ · nhìn nhanh, đọc trơn', icon:'🌱' },
        2: { label:'Cấp 2 · Đôi bạn thành lời', note:'Hai từ · đọc liền thành một cụm nghĩa', icon:'🫶' },
        3: { label:'Cấp 3 · Bốn từ liền mạch', note:'Bốn từ · giữ nhịp đều, không đọc rời', icon:'🚂' },
        4: { label:'Cấp 4 · Siêu sao đọc câu', note:'Câu dài · đọc rõ, biết ngắt hơi tự nhiên', icon:'⭐' }
    }[level];
    return { level, ...cfg, text:String(q?.question_text || '').trim(), speech:String(q?.audio_text || q?.question_text || '').trim() };
}

function renderNatureAmbientLayer_(dense = false) {
    return `<div class="nature-ambient-layer" aria-hidden="true">
        <span class="nature-cloud nature-cloud-1">☁️</span>
        <span class="nature-cloud nature-cloud-2">☁️</span>
        ${dense ? '<span class="nature-cloud nature-cloud-3">☁️</span>' : ''}
        <span class="nature-bird nature-bird-1">🐦</span>
        <span class="nature-bird nature-bird-2">🐦</span>
        ${dense ? '<span class="nature-bird nature-bird-3">🐦</span>' : ''}
        <span class="nature-leaf nature-leaf-1 nature-leaf-red">🍁</span>
        <span class="nature-leaf nature-leaf-2 nature-leaf-yellow">🍂</span>
        <span class="nature-leaf nature-leaf-3 nature-leaf-red">🍁</span>
        <span class="nature-leaf nature-leaf-4 nature-leaf-yellow">🍂</span>
        <span class="nature-leaf nature-leaf-5 nature-leaf-red">🍁</span>
        <span class="nature-leaf nature-leaf-6 nature-leaf-yellow">🍂</span>
        ${dense ? '<span class="nature-leaf nature-leaf-7 nature-leaf-yellow">🍂</span><span class="nature-leaf nature-leaf-8 nature-leaf-red">🍁</span>' : ''}
        <span class="nature-wind nature-wind-1"></span>
        <span class="nature-wind nature-wind-2"></span>
        ${dense ? '<span class="nature-wind nature-wind-3"></span>' : ''}
    </div>`;
}

function ensureNatureAmbientForView_(viewId, dense = true) {
    const view = typeof viewId === 'string' ? document.getElementById(viewId) : viewId;
    if (!view) return;
    view.classList.add('nature-ambient-host');
    if (!view.querySelector(':scope > .nature-ambient-layer')) {
        view.insertAdjacentHTML('afterbegin', renderNatureAmbientLayer_(dense));
    }
}

function speakTopic4Reading_() {
    const q = activeQuestionsList[currentQIndex];
    const meta = getTopic4ReadingMeta(q);
    if (!meta) return;
    speakVietnamese(meta.speech, meta.level >= 4 ? 0.88 : 0.92);
    const status = document.getElementById('topic4-reading-status');
    if (status) status.textContent = 'Cô đọc mẫu xong, con tự đọc lại một lần nữa nhé!';
}

function topic4ReadingDone_() {
    const q = activeQuestionsList[currentQIndex];
    const status = document.getElementById('topic4-reading-status');
    if (status) status.textContent = 'Giỏi lắm! Mình sang lượt tiếp theo nhé.';
    if (userAnswers[currentQIndex] === undefined) {
        // Tập đọc là luyện kỹ năng, không có chấm đúng/sai.
        // Chỉ đánh dấu đã hoàn thành lượt để cho phép chuyển tiếp.
        userAnswers[currentQIndex] = q?.answer || q?.question_text || 'Đã đọc';
        playAudio('correct');
    }
    setTimeout(() => nextQuestion(), 450);
}

function topic4ReadingHint_() {
    const q = activeQuestionsList[currentQIndex];
    const meta = getTopic4ReadingMeta(q);
    if (!meta) return;
    const target = document.getElementById('topic4-reading-target');
    const hint = document.getElementById('topic4-reading-hint');
    if (!target || !hint) return;
    if (meta.level === 1) {
        hint.textContent = 'Con nhìn cả từ, đọc chậm một lần rồi đọc liền lại nhé.';
    } else if (meta.level === 2) {
        hint.textContent = meta.text.split(/\s+/).join('  •  ');
    } else if (meta.level === 3) {
        const a = meta.text.split(/\s+/);
        hint.textContent = `${a.slice(0,2).join(' ')}  │  ${a.slice(2).join(' ')}`;
    } else {
        const t = meta.text;
        const comma = t.indexOf(',');
        hint.textContent = comma > 0 ? `${t.slice(0,comma+1)}  │  ${t.slice(comma+1).trim()}` : t;
    }
    hint.classList.remove('hidden');
}

function getTopic4Level1Parts_(text) {
    const raw = String(text || '').trim();
    if (!raw) return { onset:'', rhyme:'', tone:'', full:'' };

    // Bỏ riêng DẤU THANH nhưng giữ dấu cấu tạo nguyên âm (ă, â, ê, ô, ơ, ư).
    const toneMap = {
        '\u0301': { key:'sac', symbol:'◌́', name:'sắc' },
        '\u0300': { key:'huyen', symbol:'◌̀', name:'huyền' },
        '\u0309': { key:'hoi', symbol:'◌̉', name:'hỏi' },
        '\u0303': { key:'nga', symbol:'◌̃', name:'ngã' },
        '\u0323': { key:'nang', symbol:'●', name:'nặng' }
    };
    let tone = null;
    let strippedNfd = '';
    for (const ch of raw.normalize('NFD')) {
        if (toneMap[ch]) {
            if (!tone) tone = toneMap[ch];
            continue;
        }
        strippedNfd += ch;
    }
    const base = strippedNfd.normalize('NFC');

    // Ghép âm đầu theo cụm chữ dài trước, đúng cách bé lớp 1 nhìn mặt chữ.
    const initials = ['ngh','ch','gh','gi','kh','ng','nh','ph','qu','th','tr','b','c','d','đ','g','h','k','l','m','n','p','q','r','s','t','v','x'];
    const lower = base.toLocaleLowerCase('vi-VN');
    const onset = initials.find(x => lower.startsWith(x)) || '';
    const rhyme = onset ? base.slice(onset.length) : base;
    return { onset, rhyme, tone, full:raw };
}

function renderTopic4Level1Target_(text) {
    const p = getTopic4Level1Parts_(text);
    // Cấp 1 Tập đọc: vẫn đọc MỘT TỪ hoàn chỉnh, nhưng dùng 3 ô màu để bé nhìn nhanh
    // cấu tạo của tiếng: âm đầu | vần | dấu thanh. Không dùng dấu + để tránh quay lại kiểu ghép vần.
    const onsetText = p.onset || '—';
    const toneText = p.tone ? p.tone.name : 'ngang';
    return `<div class="flex flex-wrap items-center justify-center gap-3 md:gap-4 leading-none select-none">
        <div class="min-w-[104px] md:min-w-[126px] rounded-2xl border-2 border-pink-200 bg-pink-50/95 px-4 py-3 md:py-4 shadow-sm">
            <div class="text-[10px] md:text-xs font-black uppercase tracking-wide text-pink-400 mb-2">Âm đầu</div>
            <div class="text-[2.15rem] md:text-[2.75rem] font-black text-pink-500">${escapeHtml(onsetText)}</div>
        </div>
        <div class="min-w-[104px] md:min-w-[126px] rounded-2xl border-2 border-violet-200 bg-violet-50/95 px-4 py-3 md:py-4 shadow-sm">
            <div class="text-[10px] md:text-xs font-black uppercase tracking-wide text-violet-400 mb-2">Vần</div>
            <div class="text-[2.15rem] md:text-[2.75rem] font-black text-violet-600">${escapeHtml(p.rhyme)}</div>
        </div>
        <div class="min-w-[104px] md:min-w-[126px] rounded-2xl border-2 border-rose-200 bg-rose-50/95 px-4 py-3 md:py-4 shadow-sm">
            <div class="text-[10px] md:text-xs font-black uppercase tracking-wide text-rose-400 mb-2">Dấu</div>
            <div class="text-xl md:text-2xl font-black text-rose-600 capitalize">${escapeHtml(toneText)}</div>
        </div>
        <span class="mx-1 md:mx-2 text-[2rem] md:text-[2.6rem] text-emerald-500 font-black">→</span>
        <span class="text-[2.8rem] md:text-[3.65rem] font-black text-blue-600 whitespace-nowrap">${escapeHtml(p.full)}</span>
    </div>`;
}


function renderTopic4Level2Target_(text) {
    const words = String(text || '').trim().split(/\s+/).filter(Boolean);
    if (!words.length) return '';
    return `<div class="flex flex-wrap items-center justify-center gap-x-4 md:gap-x-6 gap-y-2 leading-none select-none">${words.map((word, idx) => {
        const color = idx % 2 === 0 ? 'text-violet-600' : 'text-pink-500';
        return `<span class="${color}">${escapeHtml(word)}</span>`;
    }).join('')}</div>`;
}

function renderTopic4ReadingQuestion(q) {
    const meta = getTopic4ReadingMeta(q);
    if (!meta) return false;
    const box = document.getElementById('question-box');
    if (!box) return false;
    const sizeCls = meta.level === 1 ? 'text-[2.7rem] md:text-[3.65rem]'
        : meta.level === 2 ? 'text-[2.6rem] md:text-[3.5rem]'
        : meta.level === 3 ? 'text-[2.05rem] md:text-[2.75rem]'
        : 'text-[1.65rem] md:text-[2.15rem]';
    const targetHtml = meta.level === 1
        ? renderTopic4Level1Target_(meta.text)
        : meta.level === 2
            ? renderTopic4Level2Target_(meta.text)
            : escapeHtml(meta.text);
    box.innerHTML = `
      <div class="topic4-reading-stage relative w-full max-w-5xl overflow-hidden rounded-[30px] border-2 border-pink-200 bg-gradient-to-b from-sky-50/80 via-white to-amber-50/55 px-4 md:px-8 py-5 md:py-7 text-center shadow-sm">
        <div class="relative z-10">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-purple-200 text-purple-700 font-black text-xs md:text-sm shadow-sm">
            <span>${meta.icon}</span><span>${escapeHtml(meta.label)}</span>
          </div>
          <p class="mt-2 text-xs md:text-sm font-bold text-slate-500">${escapeHtml(meta.note)}</p>
          <div class="mt-5 md:mt-6 rounded-[26px] bg-white/90 border-2 border-pink-100 px-4 md:px-8 py-7 md:py-9 shadow-sm min-h-[150px] flex items-center justify-center">
            <div id="topic4-reading-target" class="${sizeCls} leading-[1.35] font-black text-slate-800 tracking-wide select-none">${targetHtml}</div>
          </div>
          <div id="topic4-reading-hint" class="hidden mt-3 text-base md:text-xl font-black text-indigo-600 bg-indigo-50/85 border border-indigo-100 rounded-2xl px-4 py-2.5"></div>
          <p id="topic4-reading-status" class="mt-3 text-xs md:text-sm font-extrabold text-pink-600">Con tự đọc trước nhé. Chưa chắc thì mới nghe cô đọc mẫu.</p>
          <div class="mt-4 flex flex-wrap items-center justify-center gap-2.5 md:gap-3">
            <button onclick="topic4ReadingHint_()" class="px-4 py-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-700 font-black text-xs md:text-sm shadow-sm">💡 Gợi ý nhịp đọc</button>
            <button onclick="speakTopic4Reading_()" class="px-4 py-2.5 rounded-2xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 font-black text-xs md:text-sm shadow-sm">🔊 Cô đọc mẫu</button>
            <button onclick="topic4ReadingDone_()" class="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white font-black text-xs md:text-sm shadow-md">✅ Con đọc xong</button>
          </div>
        </div>
      </div>`;
    updateNavButtons();
    const prevLabel = document.querySelector('#btn-prev-q-prac span');
    const nextLabel = document.getElementById('btn-next-text-prac');
    if (prevLabel) prevLabel.textContent = 'Lượt trước';
    if (nextLabel && currentQIndex < activeQuestionsList.length - 1) nextLabel.textContent = 'Lượt tiếp theo';
    return true;
}

function loadQuestion() {
    stopSpeaking();
    const q = activeQuestionsList[currentQIndex];
    if (!q) return;

    const isEvaluationMode = !!activeExamContext || !!activeRoadmapContext;

    // Topic 2: bỏ minh họa emoji và dồn nội dung lên trên để giảm khoảng trắng.
    // Chỉ áp dụng ở chế độ Khám phá/luyện tập, không ảnh hưởng Bài tập hoặc Đề thi.
    const isTopic2Compact = !isEvaluationMode && Number(activeTopicId) === 2;
    const isTopic3Compact = !isEvaluationMode && Number(activeTopicId) === 3;
    const isTopic4Reading = !isEvaluationMode && Number(activeTopicId) === 4;
    const isCompactPractice = isTopic2Compact || isTopic3Compact || isTopic4Reading;
    const questionBox = document.getElementById('question-box');
    const quizCard = questionBox ? questionBox.closest('.pastel-card') : null;
    const quizBottomNav = document.getElementById('quiz-bottom-nav');
    if (questionBox) {
        questionBox.style.justifyContent = isCompactPractice ? 'flex-start' : 'center';
        questionBox.style.paddingTop = isTopic2Compact ? '0.75rem' : (isTopic3Compact ? '0.35rem' : (isTopic4Reading ? '0.25rem' : ''));
        questionBox.style.paddingBottom = isCompactPractice ? '0.2rem' : '';
        questionBox.style.flex = isCompactPractice ? '0 0 auto' : '';
    }
    if (quizCard) {
        // Mục 2 và 3: card co theo nội dung để toàn bộ câu hỏi + đáp án + điều hướng
        // nằm gọn trong một khung nhìn, không kéo xuống theo min-height mặc định.
        quizCard.style.minHeight = isCompactPractice ? '0' : '';
        quizCard.style.justifyContent = isCompactPractice ? 'flex-start' : '';
    }
    if (quizBottomNav) {
        quizBottomNav.style.marginTop = isTopic2Compact ? '0.75rem' : (isTopic3Compact ? '0.35rem' : (isTopic4Reading ? '0.3rem' : ''));
    }

    // Sắp câu (ID nội bộ 9) ở chế độ luyện tập dùng trò chơi xếp thẻ từ riêng.
    // Tiến trình tuần / đề thi vẫn dùng renderer chuẩn để giữ nguyên cơ chế chấm điểm.
    if (!isEvaluationMode && Number(activeTopicId) === 9 && Array.isArray(q.tokens) && q.tokens.length) {
        const stepEl = document.getElementById('practice-step-text');
        if (stepEl) stepEl.textContent = `Câu ${currentQIndex + 1} / ${activeQuestionsList.length}`;
        renderTopic8SentenceBuilder(q);
        return;
    }

    // Topic 4 - Tập đọc dùng renderer riêng: tự đọc -> gợi ý/nghe mẫu -> đọc lại.
    // Đây là luyện đọc, không phải bài trắc nghiệm nên không chấm đúng/sai.
    if (!isEvaluationMode && Number(activeTopicId) === 4 && getTopic4ReadingMeta(q)) {
        const stepEl = document.getElementById('practice-step-text');
        if (stepEl) stepEl.textContent = `Lượt ${currentQIndex + 1} / ${activeQuestionsList.length}`;
        renderTopic4ReadingQuestion(q);
        return;
    }

    // Topic 3 ở chế độ luyện tập dùng renderer tương tác riêng.
    // Tiến trình tuần / đề thi vẫn dùng renderer chuẩn để giữ nguyên cơ chế chấm điểm.
    if (!isEvaluationMode && Number(activeTopicId) === 3 && getTopic3FusionMeta(q)) {
        const stepEl = document.getElementById('practice-step-text');
        if (stepEl) stepEl.textContent = `Câu ${currentQIndex + 1} / ${activeQuestionsList.length}`;
        renderTopic3FusionQuestion(q);
        return;
    }

    if (isEvaluationMode) {
        document.getElementById('q-badge-index').textContent = `CÂU ${currentQIndex + 1} / ${activeQuestionsList.length}`;
        const isRoadmap = !!activeRoadmapContext;
        const skillName = isRoadmap
            ? (q.sub_topic || 'Kiến thức tổng hợp')
            : (SKILL_TAXONOMY[q.skill_tag]?.name || q.sub_topic || 'Kiến thức tổng hợp');
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
    if (!isTopic2Compact && q.emoji) {
        mediaHtml = `<div class="text-5xl md:text-6xl leading-none mb-1 floating select-none" role="img" aria-label="minh họa">${escapeHtml(q.emoji)}</div>`;
    } else if (!isTopic2Compact && q.image_url) {
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
            <button onclick="speakCurrentQuestion()" class="px-4 py-1.5 bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 rounded-2xl text-xs md:text-sm font-extrabold flex items-center space-x-1.5 pastel-btn shadow-xs">
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
                    <span>🎧</span><span>👂</span><span>🌸</span>
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
                    <span class="text-xs md:text-sm font-extrabold text-rose-600">${escapeHtml(q.mascot_text)}</span>
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
            setTimeout(() => speakVietnamese(`${q.answer}`), 180);
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
        setTimeout(() => speakVietnamese(`${q.answer}`), 180);
        scheduleTopic23AutoAdvance_();
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
    clearTopic23AutoAdvance_();
    stopSpeaking();
    if (currentQIndex > 0) {
        currentQIndex--;
        loadQuestion();
    }
}

async function nextQuestion() {
    clearTopic23AutoAdvance_();
    stopSpeaking();
    const isEvaluationMode = !!activeExamContext || !!activeRoadmapContext;

    if (!isEvaluationMode && userAnswers[currentQIndex] === undefined) {
        showAppToast('Bé hãy tìm đáp án đúng để hoàn thành câu này nhé!', 'warning', 1700);
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
            await showAppDialog(`Bé đã hoàn thành trọn vẹn 1 vòng luyện tập (${activeQuestionsList.length} câu)!\nCô sẽ xáo trộn câu hỏi để bé bước vào vòng tiếp theo nhé!`, { type:'success', title:'Hoàn thành một vòng!', okText:'Luyện tiếp' });

            const basePool = practiceCycleRawPool.length ? practiceCycleRawPool : activeQuestionsList;
            activeQuestionsList = shuffleArray([...basePool]);
            currentQIndex = 0;
            userAnswers = {};
            wrongAttemptsByQ = {};
            loadQuestion();
        }
    }
}

async function triggerSubmitQuizPrompt() {
    const answeredCount = Object.keys(userAnswers).length;
    const total = activeQuestionsList.length;
    const ok = await showAppConfirm(`Bé đã làm ${answeredCount}/${total} câu. Bé có chắc chắn muốn nộp bài thi ngay không?`, {
        title: 'Nộp bài thi?',
        icon: '📝',
        okText: 'Nộp bài',
        cancelText: 'Làm tiếp'
    });
    if (ok) showResultScreen();
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

    // Tiến trình tuần: điểm tính riêng theo công thức 10/tổng số câu (không dùng điểm từng câu để tránh lệch)
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
            : (examFileMap[activeExamContext?.categoryKey]?.sheet || 'LichSuBaiThi_HK1');
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
    const skillKeys = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'];
    const skillStats = {};
    skillKeys.forEach(k => {
        skillStats[k] = { total: 0, correct: 0, maxScore: 0, earnedScore: 0 };
    });

    activeQuestionsList.forEach((q, idx) => {
        let tag;
        if (isRoadmap) {
            tag = TOPIC_TO_SKILL[q.source_topic_id] || 'C1';
        } else {
            let rawTag = String(q.skill_tag || 'C1').toUpperCase();
            let m = rawTag.match(/C([1-6])/);
            tag = m ? 'C' + m[1] : 'C1';
        }

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
        content.innerHTML = `<div class="text-center py-8 text-emerald-600 font-extrabold text-base"><i class="fa-solid fa-circle-check text-3xl mb-2 block"></i>Tuyệt vời! Bé không làm sai câu nào trong bài thi này!</div>`;
    } else {
        let html = '';
        quizWrongAnswers.forEach((item, idx) => {
            html += `
                <div class="bg-rose-50/40 border border-rose-200 rounded-2xl p-3.5 space-y-2">
                    <div class="flex items-center justify-between">
                        <span class="px-2.5 py-0.5 bg-rose-100 text-rose-800 font-black text-xs rounded-lg">CÂU ${item.question_number || (idx + 1)}</span>
                        <span class="text-xs font-bold text-slate-500">${escapeHtml(item.sub_topic || 'Chủ đề tổng hợp')}</span>
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
        sessionToken: getSessionToken(), // bắt buộc để server xác nhận đúng chủ tài khoản mới cho ghi điểm
        hoTen: currentUser.hoTen,
        lop: currentUser.lop,
        examCategory: categoryKey,
        sheetName: examFileMap[categoryKey]?.sheet || 'LichSuBaiThi_HK1',
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
        C1_NguAm: skillScores.C1.toFixed(1),
        C2_ChinhTa: skillScores.C2.toFixed(1),
        C3_VonTu: skillScores.C3.toFixed(1),
        C4_CuPhap: skillScores.C4.toFixed(1),
        C5_DocHieu: skillScores.C5.toFixed(1),
        C6_TuDuyIQ: skillScores.C6.toFixed(1),
        wrongQuestions: quizWrongAnswers
    };
    try { await callAppsScript('saveExamResult', payload); } catch (e) {}
}

async function saveWeeklyProgressToSheet(percent, starCount, scoreVal) {
    const { week, topicId, chuDe } = activeRoadmapContext;
    const thoiGianLamBai = quizStartTime ? formatDuration(Date.now() - quizStartTime) : '';
    const scoreThang10 = (scoreVal ?? ((score / activeQuestionsList.length) * 10)).toFixed(1);

    // Đếm CHÍNH XÁC số câu đúng / tổng số câu của từng nhóm kỹ năng, dựa theo chủ đề
    // nguồn thật của mỗi câu hỏi (source_topic_id) — không ước lượng chia đều.
    const skillCorrect = { C1: 0, C2: 0, C3: 0, C4: 0, C5: 0, C6: 0 };
    const skillTotal = { C1: 0, C2: 0, C3: 0, C4: 0, C5: 0, C6: 0 };
    quizAnsweredLog.forEach(item => {
        const tag = TOPIC_TO_SKILL[item.source_topic_id] || item.skill_tag || 'C1';
        if (skillTotal[tag] === undefined) return;
        skillTotal[tag]++;
        if (item.isCorrect) skillCorrect[tag]++;
    });
    const payload = {
        student_id: currentUser.maHS,
        maHS: currentUser.maHS,
        sessionToken: getSessionToken(), // bắt buộc để server xác nhận đúng chủ tài khoản mới cho ghi điểm
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
        C1_NguAm: skillCorrect.C1, C1_NguAm_Tong: skillTotal.C1,
        C2_ChinhTa: skillCorrect.C2, C2_ChinhTa_Tong: skillTotal.C2,
        C3_VonTu: skillCorrect.C3, C3_VonTu_Tong: skillTotal.C3,
        C4_CuPhap: skillCorrect.C4, C4_CuPhap_Tong: skillTotal.C4,
        C5_DocHieu: skillCorrect.C5, C5_DocHieu_Tong: skillTotal.C5,
        C6_TuDuyIQ: skillCorrect.C6, C6_TuDuyIQ_Tong: skillTotal.C6,
        wrongQuestions: quizWrongAnswers
    };

    try {
        await callAppsScript('saveWeeklyProgress', payload);
        if (percent >= 80) {
            const nextWeek = week + 1;
            if (nextWeek > (Number(currentUser.tuanHienTai) || 1) && nextWeek <= 24) {
                currentUser.tuanHienTai = nextWeek;
                setTimeout(() => showAppToast(`Bé đạt ${percent}%! Tuần ${nextWeek} đã được mở khóa.`, 'success', 2600), 500);
            }
        }
    } catch (e) {}
}

async function openHistoryModal(sheetName = 'LichSuTienTrinhTuan') {
    if (!currentUser || currentUser.isGuest) {
        openAuthScreen('login'); return;
    }

    const modal = document.getElementById('modal-history-progress');
    modal.classList.remove('hidden');

    document.getElementById('hist-info-name').textContent = currentUser.hoTen || '--';
    document.getElementById('hist-info-class').textContent = currentUser.lop || '--';
    document.getElementById('hist-info-code').textContent = currentUser.maHS || '--';
    document.getElementById('hist-info-dob').textContent = currentUser.ngaySinh || '03/09/2019';
    document.getElementById('hist-report-date').textContent = new Date().toLocaleDateString('vi-VN');

    const titleMap = {
        LichSuTienTrinhTuan: "Báo cáo tiến trình Bài tập",
        LichSuBaiThi_HK1: "Báo cáo kết quả đấu trường — Học kỳ 1",
        LichSuBaiThi_HK2: "Báo cáo kết quả đấu trường — Học kỳ 2",
        LichSuBaiThi_HSG: "Báo cáo kết quả đấu trường — Học sinh giỏi"
    };
    document.getElementById('hist-modal-title').textContent = titleMap[sheetName] || "Kết quả tiến trình học tập";

    showLoadingOverlay('Đang trích xuất dữ liệu và vẽ biểu đồ năng lực...');
    try {
        const res = await callAppsScript('getHistory', { maHS: currentUser.maHS, sheetName, sessionToken: getSessionToken() });
        hideLoadingOverlay();
        if (res && res.ok === false) {
            // Token hết hạn/không hợp lệ hoặc không đúng chủ - đóng modal, báo rõ thay vì âm thầm
            // hiện báo cáo trống (dễ gây hiểu lầm là bé chưa học gì).
            closeHistoryModal();
            await showAppDialog(res.error || 'Không thể tải lịch sử - bé đăng nhập lại nhé!', { type:'error' });
            return;
        }
        const rows = (res && res.history) ? res.history : [];
        renderHistoryReport(rows, sheetName);
    } catch (err) {
        hideLoadingOverlay();
        await showAppDialog('Không thể tải lịch sử: ' + err.message, { type:'error' });
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
    const skillAverages = isWeekly
        ? { C1: 0, C2: 0, C3: 0, C4: 0, C5: 0, C6: 0 }
        : { C1: 85, C2: 78, C3: 92, C4: 70, C5: 80, C6: 75 };
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
        skillKeys.forEach((k) => {
            const colName = SKILL_TAXONOMY[k].sheetCol;
            const vals = rows.map(r => {
                const val = r[`diem${k}`] ?? r[colName] ?? r[`diem_${k.toLowerCase()}`] ?? r[k];
                return (val !== undefined && val !== null && val !== '--') ? Number(val) : 0;
            });
            const sum = vals.reduce((a, b) => a + b, 0);
            if (vals.length > 0) {
                skillAverages[k] = Math.min(100, Math.round((sum / (vals.length * 1.5)) * 100)) || 75;
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
            <p class="text-gray-700">Ba mẹ nên dành 15 phút mỗi tối cùng con đọc truyện ngụ ngôn, đặt câu hỏi gợi mở và khen ngợi kịp thời để giúp ${studentName} giữ vững ngọn lửa say mê môn Tiếng Việt nhé!</p>
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

            bodyRows += `
                <tr class="hover:bg-pink-50/30 transition-colors">
                    <td class="py-2.5 px-2">${idx + 1}</td>
                    <td class="py-2.5 px-2 font-black">${r.deSo ? `Đề ${r.deSo}` : `Tuần ${r.tuan || (idx + 1)}`}</td>
                    <td class="py-2.5 px-2 font-black text-rose-600">${itemDiem}</td>
                    <td class="py-2 px-1">${getScoreVal(r, 1, 'C1_NguAm')}</td>
                    <td class="py-2 px-1">${getScoreVal(r, 2, 'C2_ChinhTa')}</td>
                    <td class="py-2 px-1">${getScoreVal(r, 3, 'C3_VonTu')}</td>
                    <td class="py-2 px-1">${getScoreVal(r, 4, 'C4_CuPhap')}</td>
                    <td class="py-2 px-1">${getScoreVal(r, 5, 'C5_DocHieu')}</td>
                    <td class="py-2 px-1">${getScoreVal(r, 6, 'C6_TuDuyIQ')}</td>
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

function speakPedagogicalEvaluation() {
    const box = document.getElementById('pedagogical-evaluation-box');
    if (!box) return;
    const textToRead = box.innerText || box.textContent || '';
    speakVietnamese(textToRead, 0.96);
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
                cls = 'bg-pink-400 text-white border-pink-500 hover:bg-pink-500';
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


// ==========================================
// MINI GAME HUB - TIẾNG VIỆT 1
// 12 game; game 1 hoạt động, 11 game ở trạng thái sắp ra mắt.
// ==========================================
const MINIGAME_TOPIC_PALETTES = SUBTOPIC_PALETTES;

function miniGameHash(text) {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < String(text).length; i++) {
        h ^= String(text).charCodeAt(i);
        h = Math.imul(h, 16777619) >>> 0;
    }
    return h >>> 0;
}

function getMiniGamePaletteOrder(seed = 'tv1-minigame') {
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
    if (document.getElementById('tv1-minigame-theme-v1')) return;
    const style = document.createElement('style');
    style.id = 'tv1-minigame-theme-v1';
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

const MINIGAME_LIST = [
    { id: 'spelling-knight', title: '1. Hiệp sĩ Chính tả', desc: 'Săn quái chữ - chọn đúng âm/chữ còn thiếu', icon: '⚔️', ready: true },
    { id: 'picture-word-catch', title: '2. Nhìn hình bắt chữ', desc: 'Nhìn emoji, bắt đúng từ trước khi chạm tường', icon: '👀', ready: true },
    { id: 'object-sorting', title: '3. Sắp xếp đồ vật', desc: 'Chọn 3 đồ vật phù hợp với bức tranh', icon: '🧹', ready: true },
    { id: 'sharp-eyes', title: '4. Ai tinh mắt hơn', desc: 'Đọc tên đồ vật và tìm vật không có trong tranh', icon: '🔎', ready: true },
    { id: 'right-color', title: '5. Ai chọn đúng màu?', desc: 'Luyện từ chỉ màu sắc qua đồ vật trong tranh', icon: '🎨', ready: true },
    { id: 'pet-feeding', title: '6. Nuôi thú cưng', desc: 'Luyện vốn từ con vật và thức ăn quen thuộc', icon: '🐾', ready: true },
    { id: 'animal-groups', title: '7. Phân nhóm động vật', desc: 'Quan sát tranh và chọn đúng nhóm động vật', icon: '🦁', ready: true },
    { id: 'missing-animal', title: '8. Truy tìm động vật', desc: 'Tìm con vật không có trong bức hình', icon: '🔍', ready: true },
    { id: 'animal-position', title: '9. Động vật ở đâu?', desc: 'Quan sát tranh và xác định vị trí các con vật', icon: '📍', ready: true },
    { id: 'animal-action', title: '10. Động vật làm gì?', desc: 'Quan sát tranh và chọn đúng hành động của con vật', icon: '🏃', ready: true },
    { id: 'family-clothes', title: '11. Ai mặc gì?', desc: 'Quan sát tranh và nhận biết trang phục, màu sắc', icon: '👕', ready: true },
    { id: 'family-action', title: '12. Gia đình làm gì?', desc: 'Đọc câu đầy đủ và nhận biết hoạt động gia đình', icon: '🏡', ready: true }
];

function openMiniGameHub() {
    setMainTabActive_('games');
    inBaiHocFlow = false;
    stopSpeaking();
    if (!requirePremiumAccess('Mini Game')) return;
    inMiniGameFlow = true;
    activeExamContext = null;
    activeRoadmapContext = null;
    activeTopicId = null;
    pendingTopicQuiz = null;
    updateNavTabs('Mini Game', '🎮', null);
    ensureMiniGameThemeStyles();

    const grid = document.getElementById('minigame-grid');
    if (!grid) return;
    const palettes = getMiniGamePaletteOrder('tv1-hub');
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
    'spelling-knight': 'assets/js/games/hiep-si-chinh-ta.js?v=tv1mg1',
    'picture-word-catch': 'assets/js/games/nhin-hinh-bat-chu.js?v=tv1mg2',
    'pet-feeding': 'assets/js/games/nuoi-thu-cung.js?v=tv1mg3',
    'object-sorting': 'assets/js/games/sap-xep-do-vat.js?v=tv1mg4',
    'sharp-eyes': 'assets/js/games/ai-tinh-mat-hon.js?v=tv1mg5',
    'right-color': 'assets/js/games/ai-chon-dung-mau.js?v=tv1mg6',
    'animal-groups': 'assets/js/games/nhom-dong-vat.js?v=tv1mg7',
    'missing-animal': 'assets/js/games/con-vat-khong-co.js?v=tv1mg8',
    'animal-position': 'assets/js/games/vi-tri-dong-vat.js?v=tv1mg9',
    'animal-action': 'assets/js/games/hanh-dong-dong-vat.js?v=tv1mg10',
    'family-clothes': 'assets/js/games/ai-mac-gi.js?v=tv1mg11',
    'family-action': 'assets/js/games/gia-dinh-lam-gi.js?v=tv1mg12'
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
    if (!requirePremiumAccess('Mini Game')) return;
    ensureMiniGameThemeStyles();
    inMiniGameFlow = true;
    const game = MINIGAME_LIST.find(g => g.id === gameId);
    if (!game) return;

    if (!game.ready) {
        const modal = ensurePremiumAccessModal();
        const title = document.getElementById('premium-popup-title');
        const message = document.getElementById('premium-popup-message');
        const actions = document.getElementById('premium-popup-actions');
        title.textContent = 'Sắp ra mắt ' + game.icon;
        message.textContent = `${game.title} đang được cô Thỏ Hồng chuẩn bị.\nCon quay lại sau nhé!`;
        actions.innerHTML = `<button onclick="closePremiumAccessPopup()" class="w-full py-3 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-black text-sm pastel-btn">Đã hiểu</button>`;
        modal.classList.remove('hidden');
        return;
    }

    const title = document.getElementById('game-play-title');
    if (title) title.innerHTML = `<span>${game.icon}</span><span>${game.title}</span>`;
    updateNavTabs('Mini Game', '🎮', game.title);
    switchAppView('view-game-play');

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

    if (gameId === 'spelling-knight' && typeof startSpellingKnightGame === 'function') {
        startSpellingKnightGame();
    } else if (gameId === 'picture-word-catch' && typeof startPictureWordCatchGame === 'function') {
        startPictureWordCatchGame();
    } else if (gameId === 'pet-feeding' && typeof startPetFeedingGame === 'function') {
        startPetFeedingGame();
    } else if (gameId === 'object-sorting' && typeof startObjectSortingGame === 'function') {
        startObjectSortingGame();
    } else if (gameId === 'sharp-eyes' && typeof startSharpEyesGame === 'function') {
        startSharpEyesGame();
    } else if (gameId === 'right-color' && typeof startRightColorGame === 'function') {
        startRightColorGame();
    } else if (gameId === 'animal-groups' && typeof startAnimalGroupGame === 'function') {
        startAnimalGroupGame();
    } else if (gameId === 'missing-animal' && typeof startMissingAnimalGame === 'function') {
        startMissingAnimalGame();
    } else if (gameId === 'animal-position' && typeof startAnimalPositionGame === 'function') {
        startAnimalPositionGame();
    } else if (gameId === 'animal-action' && typeof startAnimalActionGame === 'function') {
        startAnimalActionGame();
    } else if (gameId === 'family-clothes' && typeof startFamilyClothesGame === 'function') {
        startFamilyClothesGame();
    } else if (gameId === 'family-action' && typeof startFamilyActionGame === 'function') {
        startFamilyActionGame();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('login-mapin')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') doLogin();
    });
    document.getElementById('login-mahs')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') doLogin();
    });

    window.addEventListener('online', retryPendingSessionRestore);

    window.addEventListener('click', () => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!audioCtx && AudioContext) audioCtx = new AudioContext();
        if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    }, { once: true });

    updateAutoSpeechButtonUI();
});


// ============================================================
// TV1 UI V11 - 6 TAB CHINH CO DINH
// Kham pha la Home logic; cac module hien truc tiep ben duoi tab.
// ============================================================
var currentMainTab = 'discover';
function setMainTabActive_(tabName) {
    currentMainTab = tabName || 'discover';
    document.querySelectorAll('.main-module-tab').forEach(btn => {
        const active = btn.dataset.tab === currentMainTab;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-selected', active ? 'true' : 'false');
    });
}
function refreshMainTabLocks_() { updatePremiumUI(); }
function openReviewTab() {
    if (!requirePremiumAccess('Ôn tập')) return;
    setMainTabActive_('review');
    openTopic(13, '13. Ôn tập học kỳ', '🧠');
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
    inMiniGameFlow = false;
    inBaiHocFlow = false;
    stopSpeaking();
    clearInterval(quizTimerInterval);
    activeExamContext = null;
    activeRoadmapContext = null;
    activeTopicId = null;
    pendingTopicQuiz = null;
    updateNavTabs('Khám phá', '🧭', null);
    setMainTabActive_('discover');
    switchAppView('view-dashboard-grid');
}

initializeApp();

// ============================================================
// TV1 V10 - BAI HOC <-> BAI TAP THEO DUNG TRUC SGK
// Bài học: 109 bài, mỗi bài 3 trang. Bài tập: 1-1 theo bài học.
// Không dùng roadmap tuần trong trải nghiệm người dùng.
// ============================================================
const BAI_HOC_DATA_FILE_TV1 = 'assets/data/bai_hoc_tieng_viet_1.json';
let baiHocDataCacheTV1 = null;
let activeBaiHocContext = { semester: 1, bai: null, lessonId: null, pageNo: 1 };
const TOTAL_BAI_TAP_TV1 = 109;

function escapeJsStringTV1_(s) {
    return String(s ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r?\n/g, ' ');
}

async function loadBaiHocDataTV1_() {
    if (baiHocDataCacheTV1) return baiHocDataCacheTV1;

    // Ưu tiên đúng cấu trúc production assets/data; fallback root để tránh màn hình trống
    // nếu khi upload người dùng đặt JSON cạnh index.html. Cache-bust để PWA không giữ dữ liệu cũ.
    const stamp = 'tv1-bh-v2';
    const candidates = [
        `${BAI_HOC_DATA_FILE_TV1}?v=${stamp}`,
        `./${BAI_HOC_DATA_FILE_TV1}?v=${stamp}`,
        `bai_hoc_tieng_viet_1.json?v=${stamp}`,
        `./bai_hoc_tieng_viet_1.json?v=${stamp}`
    ];
    let lastError = null;
    for (const url of candidates) {
        try {
            const res = await fetch(url, { cache: 'no-store' });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            if (!data || !Array.isArray(data.bai_hoc) || !data.bai_hoc.length) {
                throw new Error('JSON không có mảng bai_hoc hợp lệ');
            }
            baiHocDataCacheTV1 = data;
            return baiHocDataCacheTV1;
        } catch (err) {
            lastError = err;
            console.warn('[Bài học TV1] Không tải được:', url, err);
        }
    }
    throw new Error(`Không thể tải bai_hoc_tieng_viet_1.json (${lastError?.message || 'không rõ lỗi'})`);
}

function switchAppView(viewId) {
    stopSpeaking();
    [
        'view-dashboard-grid', 'view-bai-hoc-hub', 'view-bai-hoc-lesson',
        'view-lecture', 'view-quiz', 'view-roadmap', 'view-minigame-hub',
        'view-game-play', 'view-exam-hub', 'view-result'
    ].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        if (id === viewId) {
            ensureNatureAmbientForView_(el, true);
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    });
}

function getBaiHocProgressKeyTV1_() {
    const id = currentUser?.maHS || 'KHACH';
    return `tv1_bai_hoc_completed_v1_${String(id).toUpperCase()}`;
}
function getBaiHocCompletedSetTV1_() {
    try {
        const arr = JSON.parse(localStorage.getItem(getBaiHocProgressKeyTV1_()) || '[]');
        return new Set(Array.isArray(arr) ? arr : []);
    } catch (e) { return new Set(); }
}
function saveBaiHocCompletedSetTV1_(setObj) {
    try { localStorage.setItem(getBaiHocProgressKeyTV1_(), JSON.stringify([...setObj])); } catch (e) {}
}

async function openBaiHocHub(semesterNumber = 1) {
    if (!requirePremiumAccess('Bài học')) return;
    setMainTabActive_('lessons');
    stopSpeaking();
    clearInterval(quizTimerInterval);
    inBaiHocFlow = true;
    inMiniGameFlow = false;
    activeExamContext = null;
    activeRoadmapContext = null;
    activeTopicId = null;
    pendingTopicQuiz = null;
    activeBaiHocContext = { semester: Number(semesterNumber) || 1, bai: null, lessonId: null, pageNo: 1 };
    updateNavTabs('Bài học', '📖', null);
    switchAppView('view-bai-hoc-hub');

    // Không để hub trắng trong lúc chờ dữ liệu / khi có lỗi.
    const grid = document.getElementById('bai-hoc-grid');
    const tabs = document.getElementById('bai-hoc-semester-tabs');
    if (grid) grid.innerHTML = '<div class="col-span-full py-8 text-center font-black text-purple-500">⏳ Đang tải danh sách bài học...</div>';
    if (tabs) tabs.innerHTML = '';

    showLoadingOverlay('Đang mở Bài học Tiếng Việt 1...');
    try {
        const data = await loadBaiHocDataTV1_();
        renderBaiHocHubTV1_(data, activeBaiHocContext.semester);
    } catch (err) {
        console.error('[Bài học TV1] Lỗi mở hub:', err);
        if (grid) {
            grid.innerHTML = `<div class="col-span-full rounded-2xl border-2 border-rose-200 bg-rose-50 p-4 text-center">
                <div class="font-black text-rose-600">⚠️ Chưa tải được dữ liệu Bài học</div>
                <div class="mt-1 text-xs md:text-sm font-bold text-slate-600">${escapeHtml(err.message || String(err))}</div>
                <div class="mt-2 text-[11px] font-bold text-slate-400">Kiểm tra file <b>bai_hoc_tieng_viet_1.json</b> trong <b>assets/data/</b>.</div>
            </div>`;
        }
    } finally { hideLoadingOverlay(); }
}

function renderBaiHocHubTV1_(data, semesterNumber) {
    const tabs = document.getElementById('bai-hoc-semester-tabs');
    const grid = document.getElementById('bai-hoc-grid');
    const subtitle = document.getElementById('bai-hoc-hub-subtitle');
    if (!tabs || !grid) throw new Error('Index chưa có khung Bài học');
    const lessons = (data?.bai_hoc || []).filter(x => Number(x.semester) === Number(semesterNumber));
    tabs.innerHTML = [1,2].map(s => `<button onclick="openBaiHocHub(${s})" class="semester-switch-btn ${Number(s) === Number(semesterNumber) ? 'is-active' : 'is-inactive'}">Học kỳ ${s}</button>`).join('');
    if (subtitle) subtitle.textContent = `Học kỳ ${semesterNumber} · ${lessons.length} bài`;
    const done = getBaiHocCompletedSetTV1_();
    grid.className = 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2';
    grid.innerHTML = lessons.map((l, idx) => {
        const ok = done.has(`${l.lesson_id}_done`);
        const alt = idx % 2 === 0;
        return `<button onclick="openBaiHocByNumberTV1_(${l.bai},1)" class="text-left min-h-[82px] rounded-2xl border-2 ${ok ? 'border-emerald-300 bg-emerald-50/50' : (alt ? 'border-pink-200 bg-gradient-to-br from-white to-pink-50' : 'border-purple-200 bg-gradient-to-br from-white to-purple-50')} px-3 py-2.5 hover:border-fuchsia-400 hover:shadow-md transition-shadow">
            <div class="font-black text-purple-700 text-base">Bài ${l.bai}</div>
            <div class="mt-1 text-[12px] md:text-[13px] leading-5 font-bold text-slate-700 line-clamp-2">${escapeHtml(l.source_title || '')}</div>
        </button>`;
    }).join('');
}

async function openBaiHocByNumberTV1_(bai, pageNo = 1) {
    stopSpeaking();
    inBaiHocFlow = true;
    const data = await loadBaiHocDataTV1_();
    const lesson = (data?.bai_hoc || []).find(x => Number(x.bai) === Number(bai));
    if (!lesson) return showAppDialog('Không tìm thấy bài học', { type:'error' });
    const safePage = Math.max(1, Math.min(3, Number(pageNo) || 1));
    activeBaiHocContext = { semester: Number(lesson.semester), bai: Number(bai), lessonId: lesson.lesson_id, pageNo: safePage };
    updateNavTabs('Bài học', '📖', `Bài ${bai}`, lesson.source_title || '');
    switchAppView('view-bai-hoc-lesson');
    renderBaiHocLessonTV1_(lesson, safePage);
}

function renderBaiHocLessonTV1_(lesson, pageNo) {
    const meta = document.getElementById('bai-hoc-lesson-meta');
    const title = document.getElementById('bai-hoc-lesson-title');
    const sections = document.getElementById('bai-hoc-sections');
    const back = document.getElementById('btn-back-bai-hoc-list');
    if (!sections) return;
    if (meta) {
        meta.textContent = `Bài ${lesson.bai} · ${lesson.theme || ''}`;
        meta.className = 'text-base md:text-lg font-extrabold text-purple-600';
    }
    if (title) { title.textContent = ''; title.className = 'hidden'; }
    if (back) back.onclick = () => openBaiHocHub(lesson.semester);
    const page = (lesson.pages || []).find(p => Number(p.page_no) === Number(pageNo)) || lesson.pages?.[0];
    if (!page) return;
    const body = page.page_type === 'questions'
        ? renderBaiHocQuestionsPageTV1_(page)
        : page.page_type === 'summary'
            ? renderBaiHocSummaryPageTV1_(page, lesson)
            : renderBaiHocReadingPageTV1_(page, lesson);
    sections.innerHTML = `${renderBaiHocPageTabsTV1_(lesson, pageNo)}${body}${renderBaiHocBottomNavTV1_(lesson, pageNo)}`;
}

function renderBaiHocPageTabsTV1_(lesson, pageNo) {
    const labels = [['📖','Bài đọc'],['❓','Câu hỏi'],['🌟','Tổng kết']];
    return `<div class="grid grid-cols-3 gap-2 mb-3">${labels.map((x,i) => {
        const p = i + 1, active = Number(pageNo) === p;
        return `<button onclick="openBaiHocByNumberTV1_(${lesson.bai},${p})" class="py-2.5 rounded-xl border ${active ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white border-purple-400 shadow-md' : 'bg-pink-50/60 text-purple-700 border-pink-200 hover:bg-purple-50'} font-black text-sm md:text-base">${x[0]} ${x[1]}</button>`;
    }).join('')}</div>`;
}

function getLessonAudioTextTV1_(page, lesson) {
    const m = page?.material || {};
    if (m.type === 'phonics') return `${lesson.source_title}. ${m.text || ''}. Ví dụ: ${(m.examples || []).join(', ')}.`;
    if (Array.isArray(m.paragraphs)) return m.paragraphs.join(' ');
    if (Array.isArray(m.lines)) return m.lines.filter(Boolean).join(' ');
    return m.text || page?.intro || lesson.source_title || '';
}

function renderBaiHocReadingPageTV1_(p, lesson) {
    const m = p.material || {};
    const audioText = getLessonAudioTextTV1_(p, lesson);
    const imgSrc = String(p.image || m.image || '').trim();

    let material = '';
    if (m.type === 'phonics') {
        const targets = (m.targets || []).map(t => `<span class="inline-flex min-w-[58px] justify-center px-3 py-2.5 rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 border-2 border-pink-200 text-2xl md:text-3xl font-black text-purple-800">${escapeHtml(t)}</span>`).join('');
        const ex = (m.examples || []).map(w => `<button onclick="speakVietnamese('${escapeJsStringTV1_(w)}',0.88)" class="px-3 py-2 rounded-xl bg-white border-2 border-emerald-200 text-emerald-700 font-black text-base shadow-sm hover:bg-emerald-50">🔊 ${escapeHtml(w)}</button>`).join('');
        material = `<div class="text-center"><h3 class="font-black text-[21px] md:text-[24px] text-slate-900 mb-3">${escapeHtml(lesson.source_title || '')}</h3><div class="flex flex-wrap justify-center gap-2.5 mb-3">${targets}</div><p class="text-[16px] md:text-[18px] leading-8 text-slate-700 font-bold">${escapeHtml(m.text || '')}</p><div class="mt-3 flex flex-wrap justify-center gap-2">${ex}</div>${m.note ? `<p class="mt-3 text-xs md:text-sm text-slate-500 font-semibold">${escapeHtml(m.note)}</p>` : ''}</div>`;
    } else if (m.type === 'poem') {
        material = `<div><h3 class="font-black text-[21px] md:text-[24px] text-slate-900 mb-3">${escapeHtml(lesson.source_title || '')}</h3><div class="space-y-1">${(m.lines || []).map(line => line ? `<p class="text-[17px] md:text-[19px] leading-8 text-slate-800 font-bold">${escapeHtml(line)}</p>` : '<div class="h-2"></div>').join('')}</div></div>`;
    } else {
        const paragraphs = m.paragraphs || [m.text || ''];
        material = `<div><h3 class="font-black text-[21px] md:text-[24px] text-slate-900 mb-3">${escapeHtml(lesson.source_title || '')}</h3><div class="space-y-3">${paragraphs.map(x => `<p class="text-[17px] md:text-[18px] leading-8 text-slate-800 font-semibold">${escapeHtml(x)}</p>`).join('')}</div></div>`;
    }

    const words = (p.words || []).map(x => `<button onclick="speakVietnamese('${escapeJsStringTV1_(x.word)}',0.88)" class="px-3 py-2 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 font-black text-sm md:text-base">🔊 ${escapeHtml(x.word)}</button>`).join('');
    const intro = `<div class="flex items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 px-4 py-2.5"><p class="font-black text-slate-700 text-sm md:text-base leading-6">🐰 ${escapeHtml(p.intro || 'Cùng cô học bài nhé!')}</p><button onclick="speakVietnamese('${escapeJsStringTV1_(audioText)}',0.92)" class="px-4 py-2 rounded-xl bg-purple-100 border border-purple-200 text-purple-700 font-black text-sm md:text-base shrink-0">🔊 Cô đọc</button></div>`;
    const imagePanel = imgSrc ? `<div class="flex items-center justify-center"><div class="w-full overflow-hidden rounded-[22px] border-2 border-pink-100 bg-white shadow-sm"><img src="${escapeHtml(imgSrc)}" alt="Tranh minh họa" class="block w-full h-auto max-h-[520px] object-contain bg-pink-50/20" onerror="this.parentElement.parentElement.style.display='none'"></div></div>` : '';
    const layoutClass = imgSrc ? 'grid grid-cols-1 md:grid-cols-[48%_52%] gap-3 md:gap-4 items-start' : 'grid grid-cols-1';
    return `<div class="space-y-3">${intro}<div class="${layoutClass}">${imagePanel}<section class="rounded-3xl bg-gradient-to-br from-white via-pink-50/35 to-purple-50/35 border-2 border-pink-100 p-4 md:p-5">${material}</section></div>${words ? `<div class="flex flex-wrap gap-2 justify-center">${words}</div>` : ''}</div>`;
}

function renderBaiHocQuestionsPageTV1_(p) {
    const items = (p.items || []).map((x, i) => {
        if (x.type === 'choice') {
            return `<div class="rounded-2xl bg-pink-50/70 border border-pink-100 p-3">
                <div class="font-black text-[15px] md:text-base text-slate-700 mb-2 leading-7">${i+1}. ${escapeHtml(x.prompt)}</div>
                ${(x.options || []).map((op,j) => `<button onclick="this.parentElement.querySelectorAll('button').forEach(b=>b.classList.remove('bg-emerald-100','border-emerald-300','bg-rose-50','border-rose-200')); if(${j}===${Number(x.answer || 0)}){this.classList.add('bg-emerald-100','border-emerald-300')}else{this.classList.add('bg-rose-50','border-rose-200')}" class="w-full text-left px-3 py-2.5 my-1 rounded-xl bg-white border border-pink-100 font-bold text-[15px] md:text-base leading-7">${String.fromCharCode(65+j)}. ${escapeHtml(op)}</button>`).join('')}
            </div>`;
        }
        const tone = x.type === 'speak' ? 'bg-emerald-50 border-emerald-100' : 'bg-purple-50 border-purple-100';
        return `<div class="rounded-2xl ${tone} border p-3"><div class="font-bold text-[15px] md:text-base text-slate-700 leading-7">${i+1}. ${x.type === 'speak' ? '🎙️' : '💭'} ${escapeHtml(x.prompt || '')}</div></div>`;
    }).join('');
    const ex = (p.extra_examples || []).map(x => `<div class="rounded-xl bg-white border border-purple-100 px-3 py-2 text-[15px] md:text-base font-semibold text-slate-700 leading-7">✨ ${escapeHtml(x)}</div>`).join('');
    return `<div class="space-y-3">
        <section class="rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 p-3"><div class="font-black text-purple-700 mb-1">🐰 Nhớ lại bài trước nhé</div><p class="font-bold text-slate-700 text-[15px] md:text-base leading-7">${escapeHtml(p.recall || '')}</p></section>
        <section class="space-y-3">${items}</section>
        ${ex ? `<section class="grid gap-2"><div class="font-black text-purple-700 text-[15px] md:text-base">🌈 Gợi ý học</div>${ex}</section>` : ''}
    </div>`;
}

function renderBaiHocSummaryPageTV1_(p, lesson) {
    const pts = (p.key_points || []).map(x => `<li>${escapeHtml(x)}</li>`).join('');
    const words = (p.words || []).map(x => `<span class="inline-flex px-3 py-2 rounded-full bg-pink-50 border border-pink-100 text-pink-700 font-black text-sm md:text-base">${escapeHtml(x.word)}</span>`).join('');
    const conn = (p.connections || []).map(x => `<div class="rounded-xl bg-white border border-purple-100 px-3 py-2 text-[15px] md:text-base font-semibold text-slate-700 leading-7">🔗 ${escapeHtml(x)}</div>`).join('');
    return `<div class="space-y-3">
        <section class="rounded-3xl bg-gradient-to-br from-amber-50 via-pink-50 to-purple-50 border-2 border-amber-200 p-4 md:p-5"><div class="text-[11px] font-black text-amber-600">🌟 TRANG 3 · TỔNG KẾT</div><h3 class="font-black text-xl text-purple-800 mt-1">Con đã học được gì?</h3><ul class="list-disc pl-5 mt-3 space-y-2 text-[15px] md:text-base text-slate-700 font-semibold leading-7">${pts}</ul></section>
        ${words ? `<section class="rounded-2xl bg-white border border-pink-100 p-4"><div class="font-black text-pink-700 mb-2">💬 Từ/tiếng cần nhớ</div><div class="flex flex-wrap gap-2">${words}</div></section>` : ''}
        ${conn ? `<section class="rounded-2xl bg-purple-50/60 border border-purple-100 p-4"><div class="font-black text-purple-700 mb-2">🌈 Liên hệ thêm</div><div class="grid gap-2">${conn}</div></section>` : ''}
        <section class="rounded-2xl bg-emerald-50 border border-emerald-100 p-4"><div class="font-black text-emerald-700">🎙️ Trước khi xong bài</div><p class="text-[15px] md:text-base font-semibold text-slate-700 mt-1 leading-7">${escapeHtml(p.finish_prompt || '')}</p></section>
        <button onclick="markCurrentBaiHocCompleteTV1_(event)" class="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-black shadow-md hover:brightness-105">✅ Hoàn thành Bài ${lesson.bai}</button>
    </div>`;
}

function renderBaiHocBottomNavTV1_(lesson, pageNo) {
    const prev = Number(pageNo) > 1 ? `<button onclick="openBaiHocByNumberTV1_(${lesson.bai},${Number(pageNo)-1})" class="px-4 py-2.5 rounded-xl bg-white border border-purple-200 text-purple-700 font-black text-sm">← Trang trước</button>` : '<span></span>';
    const next = Number(pageNo) < 3 ? `<button onclick="openBaiHocByNumberTV1_(${lesson.bai},${Number(pageNo)+1})" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-black text-sm shadow-sm">Trang tiếp →</button>` : `<button onclick="openBaiHocByNumberTV1_(${lesson.bai},1)" class="px-4 py-2.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 font-black text-sm">↺ Xem lại bài</button>`;
    return `<div class="flex items-center justify-between gap-3 pt-2">${prev}<div class="text-sm font-black text-slate-400">${pageNo}/3</div>${next}</div>`;
}

function markCurrentBaiHocCompleteTV1_(evt) {
    const id = activeBaiHocContext?.lessonId;
    if (!id) return;
    const setObj = getBaiHocCompletedSetTV1_();
    setObj.add(`${id}_done`);
    saveBaiHocCompletedSetTV1_(setObj);
    const btn = evt?.currentTarget;
    if (btn) {
        btn.textContent = '✅ Đã hoàn thành bài học';
        btn.className = 'w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black shadow-md';
    }
}

function getBaiTapUnlockKeyTV1_() {
    const id = currentUser?.maHS || 'KHACH';
    return `tv1_bai_tap_unlocked_v1_${String(id).toUpperCase()}`;
}
function getUnlockedBaiTapTV1_() {
    try { return Math.max(1, Number(localStorage.getItem(getBaiTapUnlockKeyTV1_()) || 1)); } catch (e) { return 1; }
}
function saveUnlockedBaiTapTV1_(n) {
    try { localStorage.setItem(getBaiTapUnlockKeyTV1_(), String(Math.max(1, Number(n) || 1))); } catch (e) {}
}
function getBaiTapRecentKeyTV1_(bai) {
    const id = currentUser?.maHS || 'KHACH';
    return `tv1_bt_recent_v1_${String(id).toUpperCase()}_${bai}`;
}
function getRecentBaiTapIdsTV1_(bai) {
    try {
        const arr = JSON.parse(localStorage.getItem(getBaiTapRecentKeyTV1_(bai)) || '[]');
        return Array.isArray(arr) ? arr.map(String) : [];
    } catch (e) { return []; }
}
function saveRecentBaiTapIdsTV1_(bai, ids) {
    try { localStorage.setItem(getBaiTapRecentKeyTV1_(bai), JSON.stringify((ids || []).slice(-40))); } catch (e) {}
}

async function openRoadmap(semesterNumber = 1) {
    if (!requirePremiumAccess('Bài tập')) return;
    setMainTabActive_('exercises');
    inBaiHocFlow = false;
    inMiniGameFlow = false;
    stopSpeaking();
    updateNavTabs('Bài tập', '✏️', null);
    switchAppView('view-roadmap');
    showLoadingOverlay('Đang mở Bài tập...');
    try {
        const data = await loadBaiHocDataTV1_();
        renderBaiTapGridTV1_(data, semesterNumber);
    } catch (err) {
        await showAppDialog(`Không thể mở Bài tập: ${err.message}`, { type:'error' });
    } finally { hideLoadingOverlay(); }
}

function renderBaiTapGridTV1_(data, semesterNumber) {
    const view = document.getElementById('view-roadmap');
    const container = document.getElementById('roadmap-svg-container');
    if (!view || !container) return;
    const h2 = view.querySelector('h2');
    if (h2) h2.innerHTML = '<span>✏️</span><span>Bài tập</span>';
    const p = view.querySelector('h2 + p');
    if (p) p.textContent = '20 câu mỗi bài · đạt từ 80% để mở Bài tập tiếp theo.';
    const tabHost = document.getElementById('roadmap-semester-tabs');
    if (tabHost) tabHost.innerHTML = [1,2].map(s => `<button onclick="openRoadmap(${s})" class="semester-switch-btn ${Number(s)===Number(semesterNumber) ? 'is-active' : 'is-inactive'}">Học kỳ ${s}</button>`).join('');
    const arr = (data?.bai_tap || []).filter(x => Number(x.semester) === Number(semesterNumber));
    const unlocked = getUnlockedBaiTapTV1_();
    container.className = 'w-full bg-gradient-to-br from-pink-50/70 via-white to-purple-50/70 rounded-3xl border-2 border-pink-200 p-3 shadow-sm';
    container.innerHTML = `<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">${arr.map((bt, idx) => {
        const open = Number(bt.bai) <= unlocked;
        return `<button onclick="${open ? `selectBaiTapTV1_(${bt.bai})` : `showLockedBaiTapTV1_(${bt.bai})`}" class="relative text-left min-h-[92px] rounded-2xl border-2 p-3 ${open ? (idx%2 ? 'bg-purple-50 border-purple-200 hover:border-purple-400' : 'bg-pink-50 border-pink-200 hover:border-pink-400') : 'bg-slate-50 border-slate-200 opacity-60'} hover:shadow-md transition-shadow">
            <div class="flex justify-between gap-2"><span class="font-black ${open ? 'text-purple-700' : 'text-slate-500'}">Bài ${bt.bai}</span><span>${open ? '' : '🔒'}</span></div>
            <div class="text-[12px] md:text-[13px] font-bold text-slate-600 mt-1 line-clamp-2">${escapeHtml(bt.title || '')}</div>
            <div class="text-[10px] mt-1 ${open ? 'text-emerald-600' : 'text-slate-400'} font-black">${open ? '20 câu' : 'Cần ≥80% bài trước'}</div>
        </button>`;
    }).join('')}</div>`;
}

function showLockedBaiTapTV1_(bai) {
    showAppDialog(`Bài tập ${bai} chưa mở. Bé cần đạt từ 80% ở Bài tập trước để mở khóa nhé!`, { type:'warning', title:'Bài tập đang khóa', icon:'🔒' });
}

function questionMatchesFocusTV1_(q, tokens) {
    if (!tokens || !tokens.length) return true;
    const question = String(q.question_text || '').toLowerCase();
    const answer = String(q.answer || '').toLowerCase();
    const hint = String(q.hint || '').toLowerCase();
    const options = (q.options || []).map(x => String(x).toLowerCase());
    return tokens.some(raw => {
        let t = String(raw || '').trim().toLowerCase();
        if (!t) return false;
        if (t.startsWith('dấu ')) t = t.slice(4).trim();
        // Với âm/vần ngắn, ưu tiên dạng được đặt trong dấu nháy trong kho câu hỏi
        // để tránh khớp mù chỉ vì chữ đó xuất hiện bên trong một từ khác.
        if (t.length <= 4) {
            const quoted = question.includes(`'${t}'`) || question.includes(`“${t}”`) || question.includes(`"${t}"`) || hint.includes(`'${t}'`);
            return quoted || answer === t || options.includes(t);
        }
        return question.includes(t) || hint.includes(t) || answer.includes(t) || options.some(x => x.includes(t));
    });
}

function getQuestionsForBaiTapTV1_(bt) {
    if (!bt || !allQuestionsFlatCache) return [];
    const topicIds = (bt.topic_ids || []).map(Number);
    const subNames = new Set((bt.sub_names || []).map(x => String(x).trim()));
    const focusTokens = (bt.focus_tokens || []).map(x => String(x).trim()).filter(Boolean);

    const semanticPool = allQuestionsFlatCache.filter(q =>
        topicIds.includes(Number(q.source_topic_id)) &&
        (!subNames.size || subNames.has(String(q.sub_topic || '').trim()))
    );

    // Tầng 1: đúng topic/subtopic + đúng âm/vần trọng tâm của bài.
    let scoped = semanticPool.filter(q => questionMatchesFocusTV1_(q, focusTokens));

    // Tầng 2: nếu một bài quá hẹp chưa đủ 20 câu, bù trong cùng subtopic trước.
    if (scoped.length < 20) {
        const used = new Set(scoped.map(q => String(q.question_id)));
        scoped = scoped.concat(semanticPool.filter(q => !used.has(String(q.question_id))));
    }

    // Tầng 3: chỉ khi vẫn thiếu mới bù trong đúng topic của bài, tuyệt đối không lấy toàn kho.
    if (scoped.length < 20) {
        const used = new Set(scoped.map(q => String(q.question_id)));
        scoped = scoped.concat(allQuestionsFlatCache.filter(q =>
            topicIds.includes(Number(q.source_topic_id)) && !used.has(String(q.question_id))
        ));
    }

    const recent = new Set(getRecentBaiTapIdsTV1_(bt.bai));
    const fresh = shuffleArray(scoped.filter(q => !recent.has(String(q.question_id))));
    const old = shuffleArray(scoped.filter(q => recent.has(String(q.question_id))));
    const candidateTarget = Math.max(20, Number(bt.candidate_pool_target || 30));
    const candidate = fresh.concat(old).slice(0, Math.min(candidateTarget, scoped.length));
    const picked = candidate.slice(0, 20);
    saveRecentBaiTapIdsTV1_(bt.bai, picked.map(q => String(q.question_id)));
    return shuffleArray(picked);
}

async function selectBaiTapTV1_(bai) {
    stopSpeaking();
    showLoadingOverlay(`Đang chuẩn bị Bài tập ${bai}...`);
    try {
        const data = await loadBaiHocDataTV1_();
        const bt = (data?.bai_tap || []).find(x => Number(x.bai) === Number(bai));
        if (!bt) throw new Error('Không tìm thấy Bài tập');
        if (Number(bai) > getUnlockedBaiTapTV1_()) { showLockedBaiTapTV1_(bai); return; }
        await fetchAllTopicsData();
        const qs = getQuestionsForBaiTapTV1_(bt);
        if (qs.length < 20) throw new Error(`Kho câu hỏi phù hợp hiện chỉ có ${qs.length}/20 câu`);
        activeRoadmapContext = { week: Number(bai), bai: Number(bai), topicId: (bt.topic_ids || [1])[0], chuDe: `Bài tập ${bai} · ${bt.title || ''}`, semester: Number(bt.semester) };
        pendingTopicQuiz = null;
        activeExamContext = null;
        updateNavTabs('Bài tập', '✏️', `Bài ${bai}`, bt.title || '');
        startTopicQuiz((bt.topic_ids || [1])[0], activeRoadmapContext.chuDe, qs, null);
    } catch (err) {
        await showAppDialog(`Không thể mở Bài tập: ${err.message}`, { type:'error' });
    } finally { hideLoadingOverlay(); }
}

async function saveWeeklyProgressToSheet(percent, starCount, scoreVal) {
    if (!activeRoadmapContext) return;
    const { week, topicId, chuDe } = activeRoadmapContext;
    const thoiGianLamBai = quizStartTime ? formatDuration(Date.now() - quizStartTime) : '';
    const scoreThang10 = Number(scoreVal ?? 0).toFixed(1);
    const skillCorrect = { C1:0, C2:0, C3:0, C4:0, C5:0, C6:0 };
    const skillTotal = { C1:0, C2:0, C3:0, C4:0, C5:0, C6:0 };
    quizAnsweredLog.forEach(item => {
        const tag = TOPIC_TO_SKILL[item.source_topic_id] || item.skill_tag || 'C1';
        if (skillTotal[tag] === undefined) return;
        skillTotal[tag]++;
        if (item.isCorrect) skillCorrect[tag]++;
    });
    if (percent >= 80) {
        const next = Math.min(TOTAL_BAI_TAP_TV1, Number(week) + 1);
        if (next > getUnlockedBaiTapTV1_()) {
            saveUnlockedBaiTapTV1_(next);
            setTimeout(() => showAppToast(`Bé đạt ${percent}%! Bài tập ${next} đã được mở khóa.`, 'success', 2600), 350);
        }
    }
    if (!currentUser || currentUser.isGuest) return;
    const payload = {
        student_id: currentUser.maHS, maHS: currentUser.maHS, sessionToken: getSessionToken(),
        hoTen: currentUser.hoTen, lop: currentUser.lop, sheetName: 'LichSuTienTrinhTuan',
        week_completed: week, tuan: week, chuDe, topicId, score: scoreThang10,
        stars_earned: starCount, tongCauHoi: activeQuestionsList.length,
        soCauDung: quizAnsweredLog.filter(x => x.isCorrect).length, percent, thoiGianLamBai,
        C1_NguAm: skillCorrect.C1, C1_NguAm_Tong: skillTotal.C1,
        C2_ChinhTa: skillCorrect.C2, C2_ChinhTa_Tong: skillTotal.C2,
        C3_VonTu: skillCorrect.C3, C3_VonTu_Tong: skillTotal.C3,
        C4_CuPhap: skillCorrect.C4, C4_CuPhap_Tong: skillTotal.C4,
        C5_DocHieu: skillCorrect.C5, C5_DocHieu_Tong: skillTotal.C5,
        C6_TuDuyIQ: skillCorrect.C6, C6_TuDuyIQ_Tong: skillTotal.C6,
        wrongQuestions: quizWrongAnswers
    };
    try { await callAppsScript('saveWeeklyProgress', payload); } catch (e) {}
}

function handleNextExamFromReport() {
    stopSpeaking();
    if (activeRoadmapContext) {
        const sem = Number(activeRoadmapContext.semester) || (Number(activeRoadmapContext.bai || activeRoadmapContext.week) <= 64 ? 1 : 2);
        activeRoadmapContext = null;
        openRoadmap(sem);
    } else if (activeExamContext) {
        activeExamContext = null;
        openExamHub();
    } else {
        goHome();
    }
}

function returnToTopicLecture() {
    stopSpeaking();
    clearInterval(quizTimerInterval);
    if (currentMainTab === 'discover') {
        goHome();
        return;
    }
    if (inBaiHocFlow) {
        openBaiHocHub(activeBaiHocContext?.semester || 1);
    } else if (activeExamContext) {
        openExamHub();
    } else if (activeRoadmapContext) {
        openRoadmap(activeRoadmapContext?.semester || 1);
    } else if (inMiniGameFlow) {
        openMiniGameHub();
    } else if (activeTopicId === 1) {
        openLettersSubmenu();
    } else if (pendingTopicQuiz) {
        updateDiscoverBreadcrumb_(pendingTopicQuiz.topicName, TOPICS_CONFIG.find(t => t.id === pendingTopicQuiz.topicNum)?.icon || '🌸', null);
        switchAppView('view-lecture');
    }
}
