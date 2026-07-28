import { JournalEntry } from '../types';

export const INITIAL_SAMPLE_ENTRIES: JournalEntry[] = [
  {
    id: 'sample-1',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    dateFormatted: '26/07/2026',
    mood: 'joy',
    moodNote: 'Hôm nay làm xong bài tập nhóm đúng hạn!',
    smallWins: [
      'Hiểu trọn vẹn thuật toán lý học lớp 11',
      'Ăn bữa trưa cùng nhóm bạn rất vui',
      'Được cô giáo khen ngợi tinh thần làm việc nhóm'
    ],
    gratitude: {
      target: 'Bạn Minh cùng nhóm',
      reason: 'đã kiên nhẫn hỗ trợ mình sửa lỗi bài thuyết trình Canva và luôn giữ không khí vui vẻ.'
    },
    selfEsteem: 'Mình đã chủ động phân chia công việc công bằng và giữ sự bình tĩnh khi có bất đồng ý kiến.',
    futureSelfMessage: 'Cố lên nhé! Sự kiên trì hôm nay sẽ mang lại quả ngọt trong kỳ thi sắp tới.',
    aiReflection: 'Thật tuyệt vời! Việc ghi nhận chiến thắng nhỏ hôm nay giúp não giải phóng Dopamine dồi dào, đồng thời lời tri ân bạn Minh kích hoạt Oxytocin gắn kết. Bạn đang xây dựng đường truyền thần kinh hạnh phúc rất vững chắc!',
    isFavorite: true,
    tags: ['Học tập', 'Bạn bè', 'Lớp học']
  },
  {
    id: 'sample-2',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    dateFormatted: '27/07/2026',
    mood: 'peace',
    moodNote: 'Một ngày trôi qua bình yên, buổi chiều ngắm hoàng hôn.',
    smallWins: [
      'Dành 20 phút chạy bộ công viên gần nhà',
      'Đọc xong 2 chương sách tâm lý học học đường',
      'Uống đủ 2L nước lọc'
    ],
    gratitude: {
      target: 'Mẹ',
      reason: 'vì đã pha cho mình ly nước cam mát lạnh sau giờ học căng thẳng.'
    },
    selfEsteem: 'Mình đã không lướt điện thoại quá nhiều và biết dành thời gian thư giãn hợp lý.',
    futureSelfMessage: 'Hãy luôn trân trọng những khoảng lặng bình yên này nhé!',
    aiReflection: 'Trạng thái bình yên 😌 giúp sóng não Serotonin và GABA duy trì sự cân bằng tối ưu. Cảm ơn bạn đã yêu thương bản thân đúng cách!',
    isFavorite: false,
    tags: ['Sức khỏe', 'Gia đình', 'Bình yên']
  }
];
