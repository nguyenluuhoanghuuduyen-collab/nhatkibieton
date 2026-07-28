import React, { useState } from 'react';
import { UserProfile } from '../types';
import { exportBackupJSON, importBackupJSON } from '../utils/storage';
import {
  ShieldCheck,
  Lock,
  Unlock,
  Download,
  Upload,
  Trash2,
  CheckCircle2,
  AlertCircle,
  KeyRound
} from 'lucide-react';

interface PrivacySettingsProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onRefreshEntries: () => void;
}

export const PrivacySettings: React.FC<PrivacySettingsProps> = ({
  profile,
  onUpdateProfile,
  onRefreshEntries
}) => {
  const [pinInput, setPinInput] = useState('');
  const [pinConfirm, setPinConfirm] = useState('');
  const [pinMessage, setPinMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [importStatus, setImportStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Set or change PIN code
  const handleSavePin = () => {
    if (pinInput.length < 4) {
      setPinMessage({ type: 'error', text: 'Mã PIN riêng tư phải có ít nhất 4 chữ số.' });
      return;
    }
    if (pinInput !== pinConfirm) {
      setPinMessage({ type: 'error', text: 'Mã PIN xác nhận không trùng khớp.' });
      return;
    }

    const updated: UserProfile = { ...profile, privacyPin: pinInput };
    onUpdateProfile(updated);
    setPinMessage({ type: 'success', text: 'Đã thiết lập Mã PIN riêng tư thành công!' });
    setPinInput('');
    setPinConfirm('');
  };

  const handleRemovePin = () => {
    const updated: UserProfile = { ...profile, privacyPin: undefined };
    onUpdateProfile(updated);
    setPinMessage({ type: 'success', text: 'Đã gỡ bỏ Mã PIN riêng tư.' });
  };

  // Download Backup JSON
  const handleDownloadBackup = () => {
    const jsonStr = exportBackupJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GratitudeJournal_Backup_${profile.anonymousId}_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import Backup JSON
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = importBackupJSON(content);
      if (res.success) {
        setImportStatus({ type: 'success', text: res.message });
        if (res.profile) onUpdateProfile(res.profile);
        onRefreshEntries();
      } else {
        setImportStatus({ type: 'error', text: res.message });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Anonymous ID Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <ShieldCheck className="w-5 h-5 text-teal-600" />
          <h3 className="text-base font-bold text-slate-800">
            Cam kết Ẩn danh & Bảo mật Đạo đức (Ethical Privacy)
          </h3>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Ứng dụng <strong>Nhật ký biết ơn</strong> hoạt động trên nguyên tắc bảo vệ quyền riêng tư tuyệt đối cho học sinh.
          Dữ liệu nhật ký được lưu trữ trực tiếp trên thiết bị của bạn dưới dạng mã hóa ẩn danh.
        </p>

        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase">Mã Định danh Ẩn danh (Unique ID):</div>
            <div className="text-sm font-mono font-bold text-teal-700 mt-0.5">{profile.anonymousId}</div>
          </div>
          <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-md border border-emerald-300">
            Không PII (No Personal Data)
          </span>
        </div>
      </div>

      {/* PIN Code Setup */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <KeyRound className="w-5 h-5 text-teal-600" />
          <h3 className="text-base font-bold text-slate-800">
            Mã PIN Bảo vệ Riêng tư (Passcode Lock)
          </h3>
        </div>

        <p className="text-xs text-slate-600">
          Đặt mã PIN 4 chữ số để khóa giao diện nhật ký, ngăn người khác xem trộm khi mượn thiết bị.
        </p>

        {profile.privacyPin ? (
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>Đang bật Mã PIN bảo vệ riêng tư</span>
            </div>
            <button
              onClick={handleRemovePin}
              className="text-xs text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg border border-rose-200 font-semibold transition-colors"
            >
              Tắt mã PIN
            </button>
          </div>
        ) : (
          <div className="space-y-3 max-w-sm">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tạo mã PIN (4-6 chữ số):
              </label>
              <input
                type="password"
                maxLength={6}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="****"
                className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Xác nhận lại mã PIN:
              </label>
              <input
                type="password"
                maxLength={6}
                value={pinConfirm}
                onChange={(e) => setPinConfirm(e.target.value)}
                placeholder="****"
                className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-slate-50/50"
              />
            </div>

            <button
              onClick={handleSavePin}
              className="text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-xl shadow-xs transition-all"
            >
              Lưu mã PIN
            </button>
          </div>
        )}

        {pinMessage && (
          <div
            className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
              pinMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}
          >
            {pinMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600" />
            )}
            <span>{pinMessage.text}</span>
          </div>
        )}
      </div>

      {/* Backup & Restore Data */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Download className="w-5 h-5 text-teal-600" />
          <h3 className="text-base font-bold text-slate-800">
            Sao lưu & Khôi phục Dữ liệu (Backup JSON)
          </h3>
        </div>

        <p className="text-xs text-slate-600">
          Bạn có thể tải về bản sao lưu dự phòng toàn bộ bài viết để chuyển sang máy mới hoặc lưu trữ lâu dài.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleDownloadBackup}
            className="text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Tải về Tệp Sao lưu JSON</span>
          </button>

          <label className="text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer">
            <Upload className="w-4 h-4" />
            <span>Khôi phục từ Tệp JSON</span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {importStatus && (
          <div
            className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
              importStatus.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}
          >
            {importStatus.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600" />
            )}
            <span>{importStatus.text}</span>
          </div>
        )}
      </div>
    </div>
  );
};
