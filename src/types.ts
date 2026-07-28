export type MoodType = 'joy' | 'peace' | 'neutral' | 'sad' | 'fire';

export interface MoodOption {
  id: MoodType;
  emoji: string;
  label: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  hormoneFocus: string;
}

export interface GratitudeTarget {
  target: string;
  reason: string;
}

export interface JournalEntry {
  id: string;
  createdAt: string; // ISO string
  dateFormatted: string; // DD/MM/YYYY
  mood: MoodType;
  moodNote?: string;
  smallWins: string[]; // 3 small wins (Dopamine)
  gratitude: GratitudeTarget; // Oxytocin social connection
  selfEsteem: string; // Resilience & self achievement
  futureSelfMessage: string; // Optimism message to future self
  aiReflection?: string;
  tags?: string[];
  isFavorite?: boolean;
}

export interface UserProfile {
  anonymousId: string;
  currentWeek: number; // 1 to 12
  startDate: string;
  streakDays: number;
  lastEntryDate?: string;
  totalEntries: number;
  privacyPin?: string;
  themeMode?: 'light' | 'dark' | 'calm';
}

export interface NeuroMilestone {
  week: number;
  title: string;
  subtitle: string;
  scientificInsight: string;
  hormone: 'Dopamine' | 'Oxytocin' | 'Serotonin' | 'Neuroplasticity';
  icon: string;
  badge: string;
}
