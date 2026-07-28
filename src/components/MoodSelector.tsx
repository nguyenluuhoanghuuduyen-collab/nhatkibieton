import React from 'react';
import { MoodType } from '../types';
import { MOOD_OPTIONS } from '../data/neuroscienceInfo';

interface MoodSelectorProps {
  selectedMood: MoodType;
  onSelectMood: (mood: MoodType) => void;
  moodNote?: string;
  onMoodNoteChange?: (note: string) => void;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({
  selectedMood,
  onSelectMood,
  moodNote,
  onMoodNoteChange
}) => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200/60 uppercase tracking-wider">
            Bước 0: Định danh Cảm xúc (Emotional Identification)
          </span>
          <h3 className="text-base font-bold text-slate-800 mt-1">
            Bây giờ tâm trạng của bạn đang như thế nào?
          </h3>
          <p className="text-xs text-slate-500">
            Nguyên tắc 3K: Mọi cảm xúc đều hoàn toàn hợp lệ và đáng được ghi nhận.
          </p>
        </div>
      </div>

      {/* Emoji Blocks */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {MOOD_OPTIONS.map((item) => {
          const isSelected = selectedMood === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectMood(item.id)}
              className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between relative ${
                isSelected
                  ? `${item.bgColor} ${item.borderColor} ring-2 ring-teal-500/30 shadow-xs scale-[1.02]`
                  : 'bg-slate-50/70 border-slate-200/80 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{item.emoji}</span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-teal-600 animate-ping"></span>
                )}
              </div>
              <div className="mt-3">
                <div className={`text-xs font-bold ${item.color}`}>{item.label}</div>
                <p className="text-[10px] text-slate-500 line-clamp-2 mt-0.5">{item.description}</p>
                <div className="text-[9px] font-semibold text-slate-400 mt-1 border-t border-slate-200/50 pt-1">
                  {item.hormoneFocus}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Optional Mood Note */}
      {onMoodNoteChange && (
        <div className="pt-2">
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Ghi chú ngắn về cảm xúc hiện tại (Không bắt buộc):
          </label>
          <input
            type="text"
            value={moodNote || ''}
            onChange={(e) => onMoodNoteChange(e.target.value)}
            placeholder="Ví dụ: Vừa đi học về, hơi mệt do tiết thể dục nhưng thấy nhẹ nhõm..."
            className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all bg-slate-50/50"
          />
        </div>
      )}
    </div>
  );
};
