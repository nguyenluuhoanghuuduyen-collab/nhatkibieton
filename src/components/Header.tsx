import React from 'react';
import { UserProfile } from '../types';
import { BookOpen, Map, History, BarChart2, ShieldCheck, Lock, Sparkles, Heart } from 'lucide-react';

interface HeaderProps {
  activeTab: 'journal' | 'roadmap' | 'history' | 'analytics' | 'privacy';
  setActiveTab: (tab: 'journal' | 'roadmap' | 'history' | 'analytics' | 'privacy') => void;
  profile: UserProfile;
  isLocked: boolean;
  onLockClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  profile,
  isLocked,
  onLockClick
}) => {
  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-30 border-b border-slate-200 shadow-2xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between py-3 gap-3">
          {/* Logo & Title */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-sky-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 shrink-0">
              <Heart className="w-5 h-5 fill-white/20 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black tracking-tight text-slate-800">
                  Nhật ký biết ơn
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-300/80">
                  EdTech Behavioral
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Liệu pháp kỹ thuật số & Rèn luyện dẻo thần kinh cho học sinh
              </p>
            </div>
          </div>

          {/* User Profile & Anonymous Pill */}
          <div className="flex items-center gap-2.5 self-end sm:self-auto text-xs">
            {/* Streak Counter Badge */}
            <div className="flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1.5 rounded-full font-bold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{profile.streakDays} Ngày thực hành</span>
            </div>

            {/* Anonymous ID / Student Name Badge */}
            <div className="flex items-center gap-1.5 bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-full font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              {profile.studentName ? (
                <span className="font-semibold text-[11px] text-slate-700">
                  {profile.studentName}{profile.studentClass ? ` (${profile.studentClass})` : ''}
                </span>
              ) : (
                <span className="font-mono text-[11px] font-semibold">{profile.anonymousId}</span>
              )}
            </div>

            {/* Privacy Lock Button */}
            {profile.privacyPin && (
              <button
                onClick={onLockClick}
                className={`p-2 rounded-full border transition-all ${
                  isLocked
                    ? 'bg-rose-100 border-rose-300 text-rose-700'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                }`}
                title={isLocked ? 'Đang khóa riêng tư' : 'Mở khóa'}
              >
                <Lock className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar pt-1 pb-2 border-t border-slate-100 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('journal')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all shrink-0 ${
              activeTab === 'journal'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Viết nhật ký 4 bước</span>
          </button>

          <button
            onClick={() => setActiveTab('roadmap')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all shrink-0 ${
              activeTab === 'roadmap'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Map className="w-4 h-4" />
            <span>Hành trình 12 tuần</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all shrink-0 ${
              activeTab === 'history'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Lịch sử & Góc bình yên</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all shrink-0 ${
              activeTab === 'analytics'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span>Phân tích cảm xúc</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all shrink-0 ${
              activeTab === 'privacy'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Bảo mật & Dữ liệu</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
