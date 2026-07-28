import React, { useState } from 'react';
import { PRINCIPLES_3K } from '../data/neuroscienceInfo';
import { Feather, HeartHandshake, Zap, Info, ChevronDown, ChevronUp, Brain } from 'lucide-react';

export const Banner3K: React.FC = () => {
  const [showScience, setShowScience] = useState(false);

  return (
    <div className="bg-gradient-to-r from-teal-50 via-emerald-50/70 to-sky-50 border border-teal-200/80 rounded-2xl p-4 sm:p-5 shadow-xs transition-all duration-300">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Brain className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-teal-100 text-teal-800 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-teal-300/60">
                Triết lý 3K EdTech
              </span>
              <h2 className="text-sm font-bold text-slate-800">
                Phương pháp rèn luyện Tâm lý Tích cực & Dẻo thần kinh
              </h2>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Tạo lập lối mòn tư duy biết ơn vững bền cho học sinh trong chu kỳ 12 tuần
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowScience(!showScience)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-teal-700 hover:text-teal-900 bg-white/80 hover:bg-white px-3 py-1.5 rounded-lg border border-teal-200 transition-colors shrink-0 shadow-2xs"
        >
          <Info className="w-3.5 h-3.5" />
          <span>{showScience ? 'Ẩn cơ sở khoa học' : 'Xem cơ sở khoa học 3K'}</span>
          {showScience ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* 3K Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
        {PRINCIPLES_3K.map((item) => (
          <div
            key={item.code}
            className="bg-white/90 backdrop-blur-xs p-3.5 rounded-xl border border-slate-200/80 shadow-2xs flex items-start gap-3 hover:border-teal-300 transition-all"
          >
            <div className={`p-2 rounded-lg bg-gradient-to-br ${item.color} text-white shrink-0 mt-0.5 shadow-2xs`}>
              {item.icon === 'Feather' && <Feather className="w-4 h-4" />}
              {item.icon === 'HeartHandshake' && <HeartHandshake className="w-4 h-4" />}
              {item.icon === 'Zap' && <Zap className="w-4 h-4" />}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800 tracking-wide">{item.title}</div>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Expanded Neuroscience Explanation */}
      {showScience && (
        <div className="mt-4 pt-3 border-t border-teal-200/60 bg-white/80 p-4 rounded-xl text-xs text-slate-700 space-y-2 animate-fadeIn">
          <div className="font-semibold text-teal-900 flex items-center gap-1.5">
            <Brain className="w-4 h-4 text-teal-600" />
            <span>Cơ chế Sinh học Thần kinh (Neuroscience behind Gratitude):</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
            <div className="bg-amber-50/60 p-2.5 rounded-lg border border-amber-200/60">
              <span className="font-bold text-amber-900">✨ Dopamine (Niềm vui nhỏ):</span> Kích hoạt vùng VTA (Ventral Tegmental Area), huấn luyện não bộ nhạy bén hơn với các tín hiệu hạnh phúc thường ngày.
            </div>
            <div className="bg-sky-50/60 p-2.5 rounded-lg border border-sky-200/60">
              <span className="font-bold text-sky-900">🤝 Oxytocin (Tri ân xã hội):</span> Làm dịu Hạch nhân (Amygdala), giải tỏa cảm giác cô đơn và tăng sự gắn kết với bạn bè, thầy cô.
            </div>
            <div className="bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-200/60">
              <span className="font-bold text-emerald-900">🛡️ Serotonin (Tự hào bản thân):</span> Củng cố sự tự tin, làm dày dặn vỏ não trán trước (PFC) giúp chống chịu tốt trước áp lực thi cử.
            </div>
            <div className="bg-purple-50/60 p-2.5 rounded-lg border border-purple-200/60">
              <span className="font-bold text-purple-900">🧠 Dẻo thần kinh (Neuroplasticity):</span> Chu kỳ 12 tuần hình thành các khớp thần kinh (Synapses) mới, thay thế lối suy nghĩ lo âu mặc định.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
