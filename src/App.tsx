import React, { useState, useEffect } from 'react';
import { UserProfile, JournalEntry } from './types';
import { loadProfile, saveProfile, loadEntries, addJournalEntry, toggleFavoriteEntry, deleteJournalEntry } from './utils/storage';
import { Header } from './components/Header';
import { Banner3K } from './components/Banner3K';
import { JournalWizard } from './components/JournalWizard';
import { NeuroRoadmap } from './components/NeuroRoadmap';
import { LogHistory } from './components/LogHistory';
import { PositivityVault } from './components/PositivityVault';
import { AnalyticsView } from './components/AnalyticsView';
import { PrivacySettings } from './components/PrivacySettings';
import { AIFeedbackModal } from './components/AIFeedbackModal';
import { PasscodeLockModal } from './components/PasscodeLockModal';
import { Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(loadProfile());
  const [entries, setEntries] = useState<JournalEntry[]>(loadEntries());

  const [activeTab, setActiveTab] = useState<'journal' | 'roadmap' | 'history' | 'analytics' | 'privacy'>('journal');

  // AI Reflection Modal state
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [reflectionText, setReflectionText] = useState('');
  const [isAILoading, setIsAILoading] = useState(false);

  // Passcode Lock state
  const [isLocked, setIsLocked] = useState<boolean>(!!profile.privacyPin);

  // Sync profile & entries from local storage
  const handleRefreshEntries = () => {
    setEntries(loadEntries());
    setProfile(loadProfile());
  };

  const handleSaveEntry = (newEntry: JournalEntry) => {
    const res = addJournalEntry(newEntry, profile);
    setEntries(res.entries);
    setProfile(res.profile);
  };

  const handleToggleFavorite = (id: string) => {
    const updated = toggleFavoriteEntry(id);
    setEntries(updated);
  };

  const handleDeleteEntry = (id: string) => {
    const updated = deleteJournalEntry(id);
    setEntries(updated);
  };

  // Trigger server API `/api/reflect`
  const handleRequestAIReflection = async (entryData: Partial<JournalEntry>) => {
    setIsAIModalOpen(true);
    setIsAILoading(true);
    setReflectionText('');

    try {
      const response = await fetch('/api/reflect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mood: entryData.mood,
          smallWins: entryData.smallWins,
          gratitude: entryData.gratitude,
          selfEsteem: entryData.selfEsteem,
          futureSelfMessage: entryData.futureSelfMessage
        })
      });

      const data = await response.json();
      const reflection = data.reflection || 'Cảm ơn bạn đã rèn luyện thói quen biết ơn ngày hôm nay!';
      setReflectionText(reflection);

      // Save AI reflection into the latest entry if possible
      if (entryData.id) {
        const updatedEntries = entries.map((e) => e.id === entryData.id ? { ...e, aiReflection: reflection } : e);
        setEntries(updatedEntries);
        localStorage.setItem('gratitude_journal_entries_v1', JSON.stringify(updatedEntries));
      }
    } catch (err) {
      setReflectionText('Bộ não của bạn vừa ghi nhận thêm một chiến thắng nhỏ hôm nay! Hãy tiếp tục rèn luyện theo nguyên tắc 3K nhé!');
    } finally {
      setIsAILoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans antialiased selection:bg-teal-200 selection:text-teal-900">
      {/* Passcode Lock Modal */}
      <PasscodeLockModal
        isOpen={isLocked && !!profile.privacyPin}
        correctPin={profile.privacyPin || ''}
        onUnlockSuccess={() => setIsLocked(false)}
      />

      {/* Main Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        profile={profile}
        isLocked={isLocked}
        onLockClick={() => setIsLocked(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Top 3K Banner */}
        <Banner3K />

        {/* Tab 1: Journal Wizard */}
        {activeTab === 'journal' && (
          <JournalWizard
            profile={profile}
            onSaveEntry={handleSaveEntry}
            onRequestAIReflection={handleRequestAIReflection}
          />
        )}

        {/* Tab 2: Neuroplasticity Roadmap */}
        {activeTab === 'roadmap' && (
          <NeuroRoadmap profile={profile} />
        )}

        {/* Tab 3: History & Positivity Vault */}
        {activeTab === 'history' && (
          <div className="space-y-8">
            <LogHistory
              entries={entries}
              onToggleFavorite={handleToggleFavorite}
              onDeleteEntry={handleDeleteEntry}
            />
            <PositivityVault entries={entries} />
          </div>
        )}

        {/* Tab 4: Analytics */}
        {activeTab === 'analytics' && (
          <AnalyticsView entries={entries} />
        )}

        {/* Tab 5: Privacy Settings */}
        {activeTab === 'privacy' && (
          <PrivacySettings
            profile={profile}
            onUpdateProfile={(updated) => {
              setProfile(updated);
              saveProfile(updated);
            }}
            onRefreshEntries={handleRefreshEntries}
          />
        )}
      </main>

      {/* AI Coach Reflection Modal */}
      <AIFeedbackModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        reflectionText={reflectionText}
        isLoading={isAILoading}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 mt-8">
        <div className="max-w-5xl mx-auto px-4 text-center text-xs text-slate-500 space-y-1">
          <p className="font-medium text-slate-700">
            Nhật ký biết ơn EdTech • Thiết kế cho Học sinh dựa trên Tâm lý học Tích cực & Khoa học Thần kinh
          </p>
          <p className="text-[11px] text-slate-400">
            Nguyên tắc 3K: Không áp lực - Không phán xét - Kiên trì 12 tuần
          </p>
        </div>
      </footer>
    </div>
  );
}
