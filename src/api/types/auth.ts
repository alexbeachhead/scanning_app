import {HabitStreakData, OnboardingData} from '@store';

export interface ILoginProps {
  phone: string;
}

export interface ILoginReject {
  rejectValue: IApiError;
}

export interface IApiError {
  errors: string[];
}

export interface IUser {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  };
  lastLogin: {
    _seconds: number;
    _nanoseconds: number;
  };
  preferences: Record<string, unknown>;
  onboardingData?: OnboardingData;
  habitTrackingData?: HabitStreakData[];
}

export interface ILoginRequestResponse {
  refreshToken: string;
  token: string;
  tokenExpires: number;
  user: IUser;
}
