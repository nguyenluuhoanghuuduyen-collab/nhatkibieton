import React, { useState } from 'react';
import { Lock, KeyRound, AlertCircle } from 'lucide-react';

interface PasscodeLockModalProps {
  isOpen: boolean;
  correctPin: string;
  onUnlockSuccess: () => void;
}

export const PasscodeLockModal: React.FC<PasscodeLockModalProps> = ({
  isOpen,
  correctPin,
  onUnlockSuccess
}) => {
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);

  if (!isOpen) return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === correctPin) {
      setErrorMsg(false);
      setPin('');
      onUnlockSuccess();
    } else {
      setErrorMsg(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mx-auto shadow-xs">
          <Lock className="w-6 h-6" />
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-800">
            Nhật ký đang được Bảo vệ Riêng tư
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Vui lòng nhập Mã PIN riêng tư để mở khóa giao diện
          </p>
        </div>

        <form onSubmit={handleUnlock} className="space-y-3">
          <input
            type="password"
            maxLength={6}
            autoFocus
            value={pin}
            onChange={(e) => {
              setPin(e.target.value);
              setErrorMsg(false);
            }}
            placeholder="****"
            className="w-full text-center tracking-widest text-lg font-bold px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50"
          />

          {errorMsg && (
            <p className="text-xs font-semibold text-rose-600 flex items-center justify-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              Mã PIN không đúng. Vui lòng thử lại.
            </p>
          )}

          <button
            type="submit"
            className="w-full text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white py-2.5 rounded-xl shadow-xs transition-all"
          >
            Mở khóa
          </button>
        </form>
      </div>
    </div>
  );
};
