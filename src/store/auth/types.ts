import {IUser} from '@api/types/auth';

// Onboarding types
export interface PersonalInfoData {
  firstName: string;
  age: string;
  sex: 'male' | 'female';
  religion: 'Christian' | 'Catholic' | 'Other';
}

export interface HabitProgress {
  habit: string;
  cleanDays: number;
  startDate: string; // ISO string for Redux serialization
}

export interface NotificationSettings {
  enabled: boolean;
  time: string;
  frequency: 'daily' | 'every-other-day' | 'weekly';
}

export interface OnboardingData {
  personalInfo: PersonalInfoData;
  selectedHabits: string[];
  haveTried: boolean;
  progressData: HabitProgress[];
  motivationSources: string[];
  notificationSettings: NotificationSettings;
  isOnboardingComplete: boolean;
}

// Habit tracking types
export interface DailyHabitEntry {
  habit: string;
  date: string; // ISO date string
  wasSuccessful: boolean;
  timestamp: string; // When the entry was recorded
}

export interface HabitStreakData {
  habit: string;
  currentStreak: number;
  longestStreak: number;
  startDate: string;
  isActive: boolean;
  lastCheckedDate: string;
  dailyEntries: Record<string, boolean>; // date -> success/failure
}

// Auth state
export interface IAuthState {
  isAuthorized: boolean | null;
  loading: boolean;

  currentStep: number;
  onboardingData: Partial<OnboardingData>;
  habitTrackingData: HabitStreakData[];
  initialHabitTrackingData: HabitStreakData[];

  loginThunkErrors: string[];
  loginThunkSuccess: boolean;
  loginThunkData: IUser | null;

  saveOnboardingDataThunkErrors: string[];
  saveOnboardingDataThunkSuccess: boolean;
  saveOnboardingDataThunkData: unknown;

  saveHabitTrackingDataThunkErrors: string[];
  saveHabitTrackingDataThunkSuccess: boolean;
  saveHabitTrackingDataThunkData: unknown;

  registerThunkErrors: string[];
  registerThunkSuccess: boolean;
  registerThunkData: IUser | null;

  saveNotificationTokenThunkErrors: string[];
  saveNotificationTokenThunkSuccess: boolean;
  saveNotificationTokenThunkData: unknown;
}
