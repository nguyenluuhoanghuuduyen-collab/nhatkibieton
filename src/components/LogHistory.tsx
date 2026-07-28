import React, { useState } from 'react';
import { JournalEntry, MoodType } from '../types';
import { MOOD_OPTIONS } from '../data/neuroscienceInfo';
import {
  Search,
  Star,
  Trash2,
  Calendar,
  Sparkles,
  Heart,
  ShieldCheck,
  Compass,
  Bot,
  Filter,
  Download
} from 'lucide-react';

interface LogHistoryProps {
  entries: JournalEntry[];
  onToggleFavorite: (id: string) => void;
  onDeleteEntry: (id: string) => void;
}

export const LogHistory: React.FC<LogHistoryProps> = ({
  entries,
  onToggleFavorite,
  onDeleteEntry
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [moodFilter, setMoodFilter] = useState<MoodType | 'all'>('all');
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const filteredEntries = entries.filter((entry) => {
    if (favoritesOnly && !entry.isFavorite) return false;
    if (moodFilter !== 'all' && entry.mood !== moodFilter) return false;
    if (searchTerm.trim() !== '') {
      const q = searchTerm.toLowerCase();
      const matchWins = entry.smallWins.some(w => w.toLowerCase().includes(q));
      const matchGratitude = entry.gratitude.target.toLowerCase().includes(q) || entry.gratitude.reason.toLowerCase().includes(q);
      const matchSelf = entry.selfEsteem.toLowerCase().includes(q);
      const matchFuture = entry.futureSelfMessage.toLowerCase().includes(q);
      const matchMoodNote = entry.moodNote?.toLowerCase().includes(q);
      return matchWins || matchGratitude || matchSelf || matchFuture || matchMoodNote;
    }
    return true;
  });

  const getMoodMeta = (m: MoodType) => {
    return MOOD_OPTIONS.find((o) => o.id === m) || MOOD_OPTIONS[0];
  };

  const handleExportText = (entry: JournalEntry) => {
    const text = `
NHẬT KÝ BIẾT ƠN (EDTECH)
Ngày: ${entry.dateFormatted}
Cảm xúc: ${getMoodMeta(entry.mood).emoji} ${getMoodMeta(entry.mood).label}
${entry.moodNote ? `Ghi chú cảm xúc: ${entry.moodNote}\n` : ''}

1. 3 NIỀM VUI NHỎ (Dopamine):
${entry.smallWins.map((w, i) => `   ${i + 1}. ${w}`).join('\n')}

2. TRI ÂN VÀ KẾT NỐI (Oxytocin):
   Dành cho: ${entry.gratitude.target}
   Lý do: ${entry.gratitude.reason}

3. TỰ HÀO BẢN THÂN (Resilience):
   ${entry.selfEsteem}

4. THÔNG ĐIỆP GỬI TƯƠNG LAI (Optimism):
   ${entry.futureSelfMessage}

${entry.aiReflection ? `\nPHẢN HỒI TỪ AI COACH:\n${entry.aiReflection}` : ''}
------------------------------------------------
Nguyên tắc 3K: Không áp lực - Không phán xét - Kiên trì
    `.trim();

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NhatKyBietOn_${entry.dateFormatted.replace(/\//g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm nội dung nhật ký..."
              className="w-full text-xs pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-slate-50/50"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <button
              onClick={() => setFavoritesOnly(!favoritesOnly)}
              className={`text-xs px-3 py-2 rounded-xl border font-medium flex items-center gap-1.5 shrink-0 transition-colors ${
                favoritesOnly
                  ? 'bg-amber-100 border-amber-300 text-amber-900 font-bold'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${favoritesOnly ? 'fill-amber-500 text-amber-500' : ''}`} />
              <span>Yêu thích</span>
            </button>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0">
              <button
                onClick={() => setMoodFilter('all')}
                className={`text-xs px-2.5 py-1 rounded-lg transition-colors font-medium ${
                  moodFilter === 'all' ? 'bg-white shadow-2xs font-bold text-slate-800' : 'text-slate-600'
                }`}
              >
                Tất cả
              </button>
              {MOOD_OPTIONS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMoodFilter(m.id)}
                  className={`text-xs px-2 py-1 rounded-lg transition-colors ${
                    moodFilter === m.id ? 'bg-white shadow-2xs text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title={m.label}
                >
                  {m.emoji}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Entry Timeline List */}
      {filteredEntries.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-3">
          <div className="text-4xl">🌱</div>
          <h4 className="text-sm font-bold text-slate-700">Chưa tìm thấy bài nhật ký nào</h4>
          <p className="text-xs text-slate-500">
            Hãy bắt đầu viết bài nhật ký đầu tiên để tích lũy những khoảnh khắc đẹp nhé!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEntries.map((entry) => {
            const moodMeta = getMoodMeta(entry.mood);
            return (
              <div
                key={entry.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all overflow-hidden"
              >
                {/* Header */}
                <div className="bg-slate-50/80 px-5 py-3 border-b border-slate-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{moodMeta.emoji}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold ${moodMeta.color}`}>
                          {moodMeta.label}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {entry.dateFormatted}
                        </span>
                      </div>
                      {entry.moodNote && (
                        <p className="text-xs text-slate-600 italic mt-0.5">"{entry.moodNote}"</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleExportText(entry)}
                      className="p-2 text-slate-400 hover:text-teal-700 transition-colors"
                      title="Xuất văn bản"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onToggleFavorite(entry.id)}
                      className="p-2 text-slate-400 hover:text-amber-500 transition-colors"
                      title="Yêu thích"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          entry.isFavorite ? 'fill-amber-400 text-amber-500' : ''
                        }`}
                      />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Bạn có chắc chắn muốn xóa bài nhật ký này?')) {
                          onDeleteEntry(entry.id);
                        }
                      }}
                      className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                      title="Xóa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Content - 4 Steps */}
                <div className="p-5 space-y-4 text-xs text-slate-700">
                  {/* Step 1: Small Wins */}
                  <div className="space-y-1.5">
                    <span className="font-bold text-amber-800 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      1. Niềm vui nhỏ (Dopamine):
                    </span>
                    <ul className="list-disc list-inside space-y-1 pl-2 text-slate-600">
                      {entry.smallWins.map((win, idx) => (
                        <li key={idx}>{win}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Step 2: Gratitude */}
                  <div className="space-y-1 bg-sky-50/50 p-3 rounded-xl border border-sky-100">
                    <span className="font-bold text-sky-900 flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5 text-sky-600 fill-sky-200" />
                      2. Tri ân & Kết nối (Oxytocin):
                    </span>
                    <p className="text-slate-700">
                      <strong>Tri ân:</strong> {entry.gratitude.target}
                    </p>
                    <p className="text-slate-600">
                      <strong>Lý do:</strong> {entry.gratitude.reason}
                    </p>
                  </div>

                  {/* Step 3: Resilience */}
                  <div className="space-y-1">
                    <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      3. Tự hào & Công nhận bản thân (Resilience):
                    </span>
                    <p className="text-slate-600 pl-2">{entry.selfEsteem}</p>
                  </div>

                  {/* Step 4: Future Self */}
                  <div className="space-y-1">
                    <span className="font-bold text-indigo-800 flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-indigo-600" />
                      4. Gửi bản thân tương lai (Optimism):
                    </span>
                    <p className="text-slate-600 pl-2 italic">"{entry.futureSelfMessage}"</p>
                  </div>

                  {/* AI Reflection if available */}
                  {entry.aiReflection && (
                    <div className="mt-3 bg-gradient-to-r from-teal-50 to-emerald-50 p-3.5 rounded-xl border border-teal-200/80 space-y-1">
                      <div className="font-bold text-teal-900 flex items-center gap-1.5 text-xs">
                        <Bot className="w-4 h-4 text-teal-600" />
                        <span>Phản hồi từ AI EdTech Coach:</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed text-[11px] italic">
                        {entry.aiReflection}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
