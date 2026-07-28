import { JournalEntry, UserProfile } from '../types';
import { INITIAL_SAMPLE_ENTRIES } from '../data/sampleEntries';

const STORAGE_KEYS = {
  ENTRIES: 'gratitude_journal_entries_v1',
  PROFILE: 'gratitude_journal_profile_v1',
};

// Generate Anonymous User ID (e.g., NHAT-KY-A8B9)
export function generateAnonymousId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = 'STUDENT-';
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function loadProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load profile:', e);
  }

  const defaultProfile: UserProfile = {
    anonymousId: generateAnonymousId(),
    currentWeek: 1,
    startDate: new Date().toISOString(),
    streakDays: 1,
    totalEntries: INITIAL_SAMPLE_ENTRIES.length,
    themeMode: 'light'
  };
  saveProfile(defaultProfile);
  return defaultProfile;
}

export function saveProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save profile:', e);
  }
}

export function loadEntries(): JournalEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ENTRIES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load entries:', e);
  }

  // Save initial samples if first time
  saveEntries(INITIAL_SAMPLE_ENTRIES);
  return INITIAL_SAMPLE_ENTRIES;
}

export function saveEntries(entries: JournalEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ENTRIES, JSON.stringify(entries));
  } catch (e) {
    console.error('Failed to save entries:', e);
  }
}

export function addJournalEntry(entry: JournalEntry, profile: UserProfile): { entries: JournalEntry[]; profile: UserProfile } {
  const currentEntries = loadEntries();
  const updatedEntries = [entry, ...currentEntries];
  saveEntries(updatedEntries);

  // Update profile streak & week count gracefully (3K Principle: No guilt trip)
  const todayStr = new Date().toDateString();
  const lastDateStr = profile.lastEntryDate ? new Date(profile.lastEntryDate).toDateString() : '';

  let newStreak = profile.streakDays;
  if (lastDateStr !== todayStr) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (lastDateStr === yesterday.toDateString()) {
      newStreak += 1;
    } else if (!profile.lastEntryDate) {
      newStreak = 1;
    } else {
      // 3K principle: We preserve total cumulative progress or gracefully set streak to max(1, previous)
      newStreak += 1; 
    }
  }

  // Calculate week based on days since start date or cumulative days
  const cumulativeDays = updatedEntries.length;
  const calculatedWeek = Math.min(12, Math.max(1, Math.ceil(cumulativeDays / 3))); // 3 entries = 1 week milestone

  const updatedProfile: UserProfile = {
    ...profile,
    streakDays: newStreak,
    totalEntries: updatedEntries.length,
    lastEntryDate: new Date().toISOString(),
    currentWeek: calculatedWeek
  };

  saveProfile(updatedProfile);
  return { entries: updatedEntries, profile: updatedProfile };
}

export function toggleFavoriteEntry(id: string): JournalEntry[] {
  const entries = loadEntries();
  const updated = entries.map(e => e.id === id ? { ...e, isFavorite: !e.isFavorite } : e);
  saveEntries(updated);
  return updated;
}

export function deleteJournalEntry(id: string): JournalEntry[] {
  const entries = loadEntries();
  const updated = entries.filter(e => e.id !== id);
  saveEntries(updated);
  return updated;
}

export function exportBackupJSON(): string {
  const profile = loadProfile();
  const entries = loadEntries();
  const data = {
    app: 'GratitudeJournalEdTech',
    version: '1.0',
    exportDate: new Date().toISOString(),
    profile,
    entries
  };
  return JSON.stringify(data, null, 2);
}

export function importBackupJSON(jsonString: string): { success: boolean; message: string; entries?: JournalEntry[]; profile?: UserProfile } {
  try {
    const data = JSON.parse(jsonString);
    if (data && Array.isArray(data.entries)) {
      saveEntries(data.entries);
      if (data.profile) {
        saveProfile(data.profile);
      }
      return {
        success: true,
        message: `Đã khôi phục thành công ${data.entries.length} nhật ký!`,
        entries: data.entries,
        profile: data.profile || loadProfile()
      };
    } else {
      return { success: false, message: 'Định dạng tệp dữ liệu không hợp lệ.' };
    }
  } catch (e) {
    return { success: false, message: 'Không thể đọc tệp JSON. Vui lòng kiểm tra lại.' };
  }
}
