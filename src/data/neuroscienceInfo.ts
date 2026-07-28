import { MoodOption, NeuroMilestone } from '../types';

export const MOOD_OPTIONS: MoodOption[] = [
  {
    id: 'joy',
    emoji: '😄',
    label: 'Rạng rỡ',
    description: 'Tràn đầy năng lượng, vui vẻ & phấn khích',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50 hover:bg-amber-100/80',
    borderColor: 'border-amber-300',
    hormoneFocus: 'Dopamine & Endorphin cao'
  },
  {
    id: 'peace',
    emoji: '😌',
    label: 'Bình yên',
    description: 'Thư thái, an tĩnh & vẹn toàn',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50 hover:bg-emerald-100/80',
    borderColor: 'border-emerald-300',
    hormoneFocus: 'Serotonin & GABA cân bằng'
  },
  {
    id: 'neutral',
    emoji: '😐',
    label: 'Bình thường',
    description: 'Ổn định, chưa có sóng gió hay đột phá',
    color: 'text-slate-600',
    bgColor: 'bg-slate-50 hover:bg-slate-100/80',
    borderColor: 'border-slate-300',
    hormoneFocus: 'Trạng thái nghỉ tĩnh cơ bản'
  },
  {
    id: 'sad',
    emoji: '🌧️',
    label: 'Lắng đọng',
    description: 'Trầm tư, mệt mỏi hoặc suy tư sâu',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50 hover:bg-indigo-100/80',
    borderColor: 'border-indigo-300',
    hormoneFocus: 'Cần nạp Oxytocin & sự ôm ấp tâm trí'
  },
  {
    id: 'fire',
    emoji: '🔥',
    label: 'Căng thẳng',
    description: 'Sục sôi, áp lực hoặc bối rối',
    color: 'text-rose-600',
    bgColor: 'bg-rose-50 hover:bg-rose-100/80',
    borderColor: 'border-rose-300',
    hormoneFocus: 'Cortisol tăng - Cần nhịp thở thả lỏng'
  }
];

export const PRINCIPLES_3K = [
  {
    code: 'KHÔNG ÁP LỰC',
    title: 'Không áp lực (No Pressure)',
    desc: 'Viết nhật ký không phải là bài tập về nhà. Nếu bạn bỏ lỡ 1 ngày, không sao cả! Bộ não luôn mở rộng cơ chế tiếp nhận mà không phạt bạn.',
    icon: 'Feather',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    code: 'KHÔNG PHÁN XÉT',
    title: 'Không phán xét (No Judgment)',
    desc: 'Mọi cảm xúc - từ niềm vui 😄 đến nỗi buồn 🌧️ hay căng thẳng 🔥 - đều có giá trị. Hãy đón nhận trọn vẹn mà không chỉ trích bản thân.',
    icon: 'HeartHandshake',
    color: 'from-sky-500 to-indigo-600'
  },
  {
    code: 'KIÊN TRÌ',
    title: 'Kiên trì 12 tuần (Neuroplasticity)',
    desc: 'Tích tiểu thành đại. Chỉ 3 phút mỗi ngày giúp tái cấu trúc các liên kết thần kinh (Synaptic Rewiring), tạo phản xạ biết ơn tự nhiên.',
    icon: 'Zap',
    color: 'from-amber-500 to-orange-600'
  }
];

export const NEURO_MILESTONES: NeuroMilestone[] = [
  {
    week: 1,
    title: 'Khởi động Dopamine',
    subtitle: 'Đánh thức khả năng tìm kiếm niềm vui',
    scientificInsight: 'Ghi nhận 3 chiến thắng nhỏ giúp não bộ kích hoạt đường truyền dopamine trong hệ thống phần thưởng (VTA & Hạch nhân).',
    hormone: 'Dopamine',
    icon: 'Sparkles',
    badge: 'Mầm xanh thần kinh'
  },
  {
    week: 2,
    title: 'Gắn kết Oxytocin',
    subtitle: 'Xây dựng nhịp cầu tri ân xã hội',
    scientificInsight: 'Viết lời tri ân có lý do cụ thể gửi đến thầy cô, bạn bè, gia đình làm tăng nồng độ oxytocin, giảm bớt cảm giác cô lập.',
    hormone: 'Oxytocin',
    icon: 'Users',
    badge: 'Trái tim gắn kết'
  },
  {
    week: 3,
    title: 'Củng cố Lòng tự trọng',
    subtitle: 'Nhận diện điểm mạnh bản thân (Resilience)',
    scientificInsight: 'Tự công nhận nỗ lực giúp làm dịu vỏ não trán trước (mFC), giảm bớt thói quen tự chỉ trích (Self-criticism).',
    hormone: 'Serotonin',
    icon: 'ShieldCheck',
    badge: 'Khiên kiên cường'
  },
  {
    week: 4,
    title: 'Hình thành Lối mòn tư duy',
    subtitle: 'Liên kết Synapse bước đầu bền vững',
    scientificInsight: '21 ngày liên tục giúp đường truyền thần kinh biết ơn trở nên dày đặc và phản xạ nhanh hơn phản xạ lo âu.',
    hormone: 'Neuroplasticity',
    icon: 'Workflow',
    badge: 'Lối mòn hạnh phúc'
  },
  {
    week: 6,
    title: 'Giải tỏa Cortisol tự nhiên',
    subtitle: 'Cân bằng hệ thần kinh thực vật',
    scientificInsight: 'Khả năng quan sát cảm xúc mà không phán xét làm hạ chỉ số hoóc-môn căng thẳng Cortisol nhanh chóng.',
    hormone: 'Serotonin',
    icon: 'Sun',
    badge: 'Tâm an giữa bão'
  },
  {
    week: 8,
    title: 'Liên kết Bản thân Tương lai',
    subtitle: 'Tăng sự nối liền tâm trí (Future self continuity)',
    scientificInsight: 'Gửi thông điệp lạc quan cho tương lai giúp tăng khả năng tự điều chỉnh hành vi và hoạch định mục tiêu dài hạn.',
    hormone: 'Dopamine',
    icon: 'Compass',
    badge: 'Nhà kiến tạo tương lai'
  },
  {
    week: 10,
    title: 'Miễn dịch Tinh thần Chuyên sâu',
    subtitle: 'Sức mạnh tự phục hồi sau vấp ngã',
    scientificInsight: 'Bộ não tự động quét tìm cơ hội và điểm tựa ngay cả khi đối mặt với thử thách hay điểm số chưa như ý.',
    hormone: 'Neuroplasticity',
    icon: 'BatteryCharging',
    badge: 'Bộ não Kim cương'
  },
  {
    week: 12,
    title: 'Tái cấu trúc Dẻo Thần kinh Toàn diện',
    subtitle: 'Thói quen tư duy biết ơn vững chãi trọn đời',
    scientificInsight: 'Sau 12 tuần (84 ngày), cấu trúc chất xám tại vỏ não trán trước thay đổi đo lường được, giúp tư duy tích cực trở thành bản năng.',
    hormone: 'Neuroplasticity',
    icon: 'Award',
    badge: 'Bậc thầy Biết ơn EdTech'
  }
];

export const STEP_PROMPT_SUGGESTIONS = {
  smallWins: [
    'Hôm nay mình đã dậy đúng giờ và ăn sáng đàng hoàng 🍳',
    'Hiểu trọn vẹn một bài toán/bài lý khó trên lớp 📐',
    'Được bạn cùng bàn mỉm cười và chia sẻ đồ ăn 🥪',
    'Đã dũng cảm giơ tay phát biểu ý kiến 🙋‍♂️',
    'Uống đủ 2 lít nước và dành 15 phút tập thể dục 🏃‍♀️',
    'Nhìn thấy bầu trời chiều thu rất đẹp qua cửa sổ lớp ⛅'
  ],
  gratitudeTargets: [
    'Mẹ/Bố', 'Thầy/Cô giáo chủ nhiệm', 'Bạn thân cùng bàn', 'Bác bảo vệ trường', 'Bản thân mình'
  ],
  gratitudeReasons: [
    'vì đã lắng nghe và động viên mình khi mình cảm thấy mệt mỏi.',
    'vì đã kiên nhẫn giảng lại bài cho mình hiểu.',
    'vì đã chuẩn bị cho mình bữa trưa ấm áp.',
    'vì luôn chào đón mình bằng nụ cười thân thiện mỗi sáng.',
    'vì đã không bỏ cuộc dù gặp bài kiểm tra bất ngờ.'
  ],
  selfEsteemPrompts: [
    'Hôm nay mình đã giữ được sự bình tĩnh khi có tranh cãi nhỏ.',
    'Hôm nay mình đã tập trung làm xong bài tập trước khi đi ngủ.',
    'Hôm nay mình đã chủ động hỏi lại bài thầy cô khi chưa rõ.',
    'Hôm nay mình đã biết tự thưởng cho mình một khoảng nghỉ ngơi hợp lý.'
  ],
  futureSelfPrompts: [
    'Gửi bản thân ngày mai: Hãy tin vào chính mình, bạn đã chuẩn bị rất tốt!',
    'Ngày mai dù có chuyện gì xảy ra, hãy mỉm cười và thở sâu 3 nhịp nhé.',
    'Cố gắng lên nhé! Hành trình 12 tuần này đang biến bạn thành phiên bản tuyệt vời hơn.'
  ]
};
