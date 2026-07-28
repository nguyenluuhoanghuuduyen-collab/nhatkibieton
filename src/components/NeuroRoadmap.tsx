import React from 'react';
import { UserProfile } from '../types';
import { NEURO_MILESTONES } from '../data/neuroscienceInfo';
import {
  Brain,
  Sparkles,
  Award,
  Users,
  ShieldCheck,
  Workflow,
  Sun,
  Compass,
  BatteryCharging,
  CheckCircle2,
  Calendar,
  Zap
} from 'lucide-react';

interface NeuroRoadmapProps {
  profile: UserProfile;
}

export const NeuroRoadmap: React.FC<NeuroRoadmapProps> = ({ profile }) => {
  const currentWeek = Math.min(12, profile.currentWeek || 1);
  const progressPercent = Math.min(100, Math.round((currentWeek / 12) * 100));

  const getMilestoneIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-500" />;
      case 'Users': return <Users className="w-5 h-5 text-sky-500" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-emerald-500" />;
      case 'Workflow': return <Workflow className="w-5 h-5 text-indigo-500" />;
      case 'Sun': return <Sun className="w-5 h-5 text-amber-500" />;
      case 'Compass': return <Compass className="w-5 h-5 text-teal-500" />;
      case 'BatteryCharging': return <BatteryCharging className="w-5 h-5 text-purple-500" />;
      case 'Award': return <Award className="w-5 h-5 text-rose-500" />;
      default: return <Brain className="w-5 h-5 text-teal-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white p-6 rounded-3xl shadow-lg border border-teal-800/40 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <span className="bg-teal-500/20 text-teal-300 text-xs font-bold px-3 py-1 rounded-full border border-teal-500/40 inline-flex items-center gap-1.5">
              <Brain className="w-3.5 h-3.5" />
              Lộ trình Dẻo Thần kinh (Neuroplasticity Roadmap)
            </span>
            <h2 className="text-xl font-black text-white">
              Chu kỳ 12 Tuần Tái Cấu Trúc Tư Duy Biết Ơn
            </h2>
            <p className="text-xs text-slate-300 max-w-xl">
              Khoa học thần kinh chứng minh: Cần 84 ngày rèn luyện liên tục để khớp thần kinh (Synapse) ghi nhớ và biến tư duy tích cực thành phản xạ tự nhiên.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-center shrink-0 w-full sm:w-auto">
            <div className="text-3xl font-black text-emerald-400">Tuần {currentWeek} / 12</div>
            <div className="text-[11px] text-slate-300 mt-0.5">Tiến độ sinh học thần kinh</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-slate-300 font-medium">
            <span>Hoàn thành {progressPercent}% chặng đường</span>
            <span>{profile.totalEntries} bài viết đã lưu trữ</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-3 p-0.5 overflow-hidden border border-slate-700">
            <div
              className="bg-gradient-to-r from-teal-500 via-emerald-400 to-amber-400 h-full rounded-full transition-all duration-700 shadow-sm"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* 3K Encouragement Note */}
        <div className="bg-emerald-950/60 p-3 rounded-xl border border-emerald-500/30 text-xs text-emerald-200 flex items-center gap-2">
          <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong>Nguyên tắc 3K:</strong> Dù bạn bận rộn hay tạm nghỉ vài ngày, cấu trúc não bộ vẫn luôn lưu giữ tiến trình. Hãy tiếp tục bất cứ lúc nào!
          </span>
        </div>
      </div>

      {/* 12-Week Milestones Grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-teal-600" />
          <span>Các cột mốc chuyển hóa não bộ qua 12 tuần:</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {NEURO_MILESTONES.map((milestone) => {
            const isCompleted = currentWeek > milestone.week;
            const isCurrent = currentWeek === milestone.week;

            return (
              <div
                key={milestone.week}
                className={`p-4 rounded-2xl border transition-all ${
                  isCurrent
                    ? 'bg-teal-50/80 border-teal-300 ring-2 ring-teal-500/20 shadow-xs'
                    : isCompleted
                    ? 'bg-white border-emerald-200 opacity-90'
                    : 'bg-slate-50/60 border-slate-200/80'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                        isCurrent
                          ? 'bg-teal-600 text-white border-teal-500 shadow-xs'
                          : isCompleted
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-slate-100 text-slate-400 border-slate-200'
                      }`}
                    >
                      {getMilestoneIcon(milestone.icon)}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">
                          Tuần {milestone.week}: {milestone.title}
                        </span>
                        {isCompleted && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                        )}
                        {isCurrent && (
                          <span className="text-[10px] font-bold bg-teal-600 text-white px-2 py-0.5 rounded-full animate-pulse">
                            Hiện tại
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-medium text-teal-800 mt-0.5">
                        {milestone.subtitle}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold bg-white text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 shrink-0">
                    {milestone.badge}
                  </span>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-200/60 text-xs text-slate-600 space-y-1">
                  <div className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                    <span>Hormone trọng tâm:</span>
                    <span className="text-teal-700 bg-teal-100/80 px-2 py-0.2 rounded font-semibold">
                      {milestone.hormone}
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-600">
                    {milestone.scientificInsight}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
