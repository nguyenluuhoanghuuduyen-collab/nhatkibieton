import React from 'react';
import { Bot, Sparkles, X, Heart, ShieldCheck } from 'lucide-react';

interface AIFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  reflectionText: string;
  isLoading: boolean;
}

export const AIFeedbackModal: React.FC<AIFeedbackModalProps> = ({
  isOpen,
  onClose,
  reflectionText,
  isLoading
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-xl border border-slate-200 relative space-y-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-600 text-white flex items-center justify-center shadow-md shrink-0">
            <Bot className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
              Phản hồi Tâm lý EdTech & Neuroscience
            </span>
            <h3 className="text-base font-bold text-slate-800 mt-0.5">
              Lời đồng hành thấu cảm dành cho bạn
            </h3>
          </div>
        </div>

        {/* Content Body */}
        {isLoading ? (
          <div className="py-10 text-center space-y-3">
            <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-semibold text-slate-600">
              AI Coach đang nghiên cứu nội dung nhật ký và tổng hợp phản hồi thấu cảm...
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-teal-50/80 via-emerald-50/60 to-sky-50/80 p-4 rounded-2xl border border-teal-200/80 text-xs text-slate-700 leading-relaxed space-y-2">
              <p className="font-medium whitespace-pre-line text-slate-800">{reflectionText}</p>
            </div>

            {/* 3K Reminder Footer */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
              <span>
                <strong>Ghi nhớ 3K:</strong> Mọi phản hồi đều hướng đến mục tiêu khích lệ, không áp lực và tôn trọng tối đa cảm xúc của bạn.
              </span>
            </div>
          </div>
        )}

        {/* Footer Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-xs transition-all"
          >
            Đã hiểu & Tiếp tục hành trình
          </button>
        </div>
      </div>
    </div>
  );
};
