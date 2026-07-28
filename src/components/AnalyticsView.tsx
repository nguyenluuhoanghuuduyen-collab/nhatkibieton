import React from 'react';
import { JournalEntry } from '../types';
import { MOOD_OPTIONS } from '../data/neuroscienceInfo';
import { BarChart2, Brain, Sparkles, Heart, ShieldCheck, TrendingUp, Info } from 'lucide-react';

interface AnalyticsViewProps {
  entries: JournalEntry[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ entries }) => {
  const total = entries.length;

  // Mood counts
  const moodCounts = MOOD_OPTIONS.map((m) => {
    const count = entries.filter((e) => e.mood === m.id).length;
    const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
    return {
      ...m,
      count,
      percentage
    };
  });

  // Total wins and gratitude counts
  const totalSmallWins = entries.reduce((acc, e) => acc + e.smallWins.length, 0);
  const totalGratitude = entries.length; // 1 gratitude per entry
  const totalResilience = entries.filter(e => e.selfEsteem && e.selfEsteem.trim() !== '').length;

  // Dominant mood
  const sortedMoods = [...moodCounts].sort((a, b) => b.count - a.count);
  const dominantMood = sortedMoods[0];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200/80 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Sparkles className="w-5 h-5 fill-white/30" />
          </div>
          <div>
            <div className="text-2xl font-black text-amber-900">{totalSmallWins}</div>
            <div className="text-xs font-bold text-amber-800">Chiến thắng nhỏ (Dopamine)</div>
            <div className="text-[10px] text-amber-700 mt-0.5">Tín hiệu thưởng thần kinh</div>
          </div>
        </div>

        <div className="bg-sky-50/80 p-4 rounded-2xl border border-sky-200/80 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Heart className="w-5 h-5 fill-white/30" />
          </div>
          <div>
            <div className="text-2xl font-black text-sky-900">{totalGratitude}</div>
            <div className="text-xs font-bold text-sky-800">Lời tri ân (Oxytocin)</div>
            <div className="text-[10px] text-sky-700 mt-0.5">Liên kết xã hội ấm áp</div>
          </div>
        </div>

        <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-200/80 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-2xl font-black text-emerald-900">{totalResilience}</div>
            <div className="text-xs font-bold text-emerald-800">Điểm tự hào (Resilience)</div>
            <div className="text-[10px] text-emerald-700 mt-0.5">Lòng tự trọng củng cố</div>
          </div>
        </div>
      </div>

      {/* Mood Distribution */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-teal-600" />
            <h3 className="text-base font-bold text-slate-800">
              Phân bổ Cảm xúc Thường gặp (Emotion Spectrum)
            </h3>
          </div>
          <span className="text-xs font-semibold text-slate-500">Tổng: {total} bài viết</span>
        </div>

        <div className="space-y-3">
          {moodCounts.map((m) => (
            <div key={m.id} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{m.emoji}</span>
                  <span className={m.color}>{m.label}</span>
                </div>
                <span className="text-slate-600">{m.count} lần ({m.percentage}%)</span>
              </div>

              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full transition-all duration-500 bg-teal-500"
                  style={{ width: `${m.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Behavioral Psychology Advice */}
      <div className="bg-gradient-to-r from-teal-50 via-emerald-50 to-sky-50 p-5 rounded-2xl border border-teal-200 space-y-2">
        <div className="flex items-center gap-2 text-teal-900 font-bold text-sm">
          <Brain className="w-4 h-4 text-teal-600" />
          <span>Đánh giá Tâm lý Behavioral EdTech:</span>
        </div>
        {dominantMood && (
          <p className="text-xs text-slate-700 leading-relaxed">
            Trạng thái cảm xúc phổ biến nhất của bạn hiện tại là <strong>{dominantMood.emoji} {dominantMood.label}</strong>.
            Ghi nhận cảm xúc thường xuyên giúp vỏ não trán trước của bạn nhạy bén hơn trong việc tự điều hòa cảm xúc (Self-regulation),
            giúp giảm thiểu căng thẳng thi cử và nâng cao sự tập trung trong học tập.
          </p>
        )}
        <div className="text-[11px] text-teal-800 bg-white/80 p-2.5 rounded-xl border border-teal-200/60 flex items-center gap-1.5 mt-2">
          <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong>Nguyên tắc 3K:</strong> Giữ vững thói quen mỗi ngày 3 phút để tiến dần đến mốc tái cấu trúc tư duy 12 tuần!
          </span>
        </div>
      </div>
    </div>
  );
};
