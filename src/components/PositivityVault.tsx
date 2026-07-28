import React, { useState } from 'react';
import { JournalEntry } from '../types';
import { Sun, Quote, Smile } from 'lucide-react';

interface PositivityVaultProps {
  entries: JournalEntry[];
}

export const PositivityVault: React.FC<PositivityVaultProps> = ({ entries }) => {
  const [filterType, setFilterType] = useState<'all' | 'wins' | 'gratitude' | 'future'>('all');

  const allWins = entries.flatMap((e) =>
    e.smallWins.map((w) => ({
      text: w,
      date: e.dateFormatted,
      mood: e.mood,
      type: 'win' as const
    }))
  );

  const allGratitude = entries.map((e) => ({
    text: `Tri ân ${e.gratitude.target}: ${e.gratitude.reason}`,
    date: e.dateFormatted,
    mood: e.mood,
    type: 'gratitude' as const
  }));

  const allFutureMessages = entries.map((e) => ({
    text: e.futureSelfMessage,
    date: e.dateFormatted,
    mood: e.mood,
    type: 'future' as const
  }));

  const combinedItems = [
    ...(filterType === 'all' || filterType === 'wins' ? allWins : []),
    ...(filterType === 'all' || filterType === 'gratitude' ? allGratitude : []),
    ...(filterType === 'all' || filterType === 'future' ? allFutureMessages : [])
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white p-6 rounded-3xl shadow-md space-y-2">
        <div className="flex items-center gap-2">
          <Sun className="w-6 h-6 animate-spin-slow" />
          <h2 className="text-xl font-black">Góc Bình Yên (Positivity Vault)</h2>
        </div>
        <p className="text-xs text-amber-100 max-w-xl leading-relaxed">
          Nơi lưu giữ toàn bộ những chiến thắng nhỏ và lời tri ân bạn đã gặt hái. Mỗi khi cảm thấy mệt mỏi hay mất năng lượng, hãy ghé qua đây để tiếp thêm vitamin Dopamine & Oxytocin nhé!
        </p>

        {/* Quick Filter */}
        <div className="pt-3 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`text-xs px-3.5 py-1.5 rounded-full font-bold transition-all ${
              filterType === 'all'
                ? 'bg-white text-orange-900 shadow-xs'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            Tất cả khoảnh khắc ({allWins.length + allGratitude.length + allFutureMessages.length})
          </button>
          <button
            onClick={() => setFilterType('wins')}
            className={`text-xs px-3.5 py-1.5 rounded-full font-bold transition-all ${
              filterType === 'wins'
                ? 'bg-white text-orange-900 shadow-xs'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            ✨ Niềm vui nhỏ ({allWins.length})
          </button>
          <button
            onClick={() => setFilterType('gratitude')}
            className={`text-xs px-3.5 py-1.5 rounded-full font-bold transition-all ${
              filterType === 'gratitude'
                ? 'bg-white text-orange-900 shadow-xs'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            💖 Lời tri ân ({allGratitude.length})
          </button>
          <button
            onClick={() => setFilterType('future')}
            className={`text-xs px-3.5 py-1.5 rounded-full font-bold transition-all ${
              filterType === 'future'
                ? 'bg-white text-orange-900 shadow-xs'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            💌 Lời nhắn gửi ({allFutureMessages.length})
          </button>
        </div>
      </div>

      {/* Grid of Memory Cards */}
      {combinedItems.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border text-center space-y-2">
          <Smile className="w-8 h-8 text-amber-500 mx-auto" />
          <p className="text-xs text-slate-600">Góc bình yên đang chờ những hạt mầm cảm xúc đầu tiên của bạn!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {combinedItems.map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border transition-all flex flex-col justify-between hover:shadow-xs ${
                item.type === 'win'
                  ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                  : item.type === 'gratitude'
                  ? 'bg-sky-50/70 border-sky-200 text-sky-950'
                  : 'bg-indigo-50/70 border-indigo-200 text-indigo-950'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/80 border border-black/5">
                    {item.type === 'win' && '✨ Niềm vui'}
                    {item.type === 'gratitude' && '💖 Tri ân'}
                    {item.type === 'future' && '💌 Nhắn gửi'}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">{item.date}</span>
                </div>
                <p className="text-xs font-medium leading-relaxed">
                  <Quote className="w-3 h-3 inline mr-1 opacity-50" />
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
