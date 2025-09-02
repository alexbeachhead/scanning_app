import {AxiosError} from 'axios';

import {Platform} from 'react-native';
import {api} from './base';
import {HabitStreakData, ILoginRequestResponse, OnboardingData} from './types/auth';
import {IUnauthorizedErrorResponse, Response} from './types/types';

export class AuthApi {
  /**
   * Generic API request handler to reduce code duplication
   */
  private static async apiRequest<T, E = unknown>({
    method,
    url,
    data,
    isFormData = false,
  }: {
    method: 'get' | 'post' | 'patch' | 'delete';
    url: string;
    data?: unknown;
    isFormData?: boolean;
  }): Promise<Response<T, E>> {
    try {
      console.log('🔍 API Request:', {method, url, data, isFormData});

      const config: unknown = {};

      if (isFormData) {
        config.headers = {'Content-Type': 'multipart/form-data'};
      }

      let response;

      switch (method) {
        case 'get':
          response = await api.get<T>(url, config);
          break;
        case 'post':
          response = await api.post<T>(url, data, config);
          break;
        case 'patch':
          response = await api.patch<T>(url, data, config);
          break;
        case 'delete':
          response = await api.delete<T>(url, {data, ...config});
          break;
      }
      console.log('✅ API Response:', response);

      return {data: response.data, error: null};
    } catch (err) {
      console.error('❌ API Error:', err);
      if (err instanceof AxiosError) {
        const error = err.response?.data;

        return {data: null, error};
      }

      return {data: null, error: null};
    }
  }

  static async login(
    email: string,
    password: string,
  ): Promise<Response<ILoginRequestResponse, IUnauthorizedErrorResponse>> {
    return this.apiRequest({
      method: 'post',
      url: 'auth/login',
      data: {
        email,
        password,
      },
    });
  }

  static async register(
    email: string,
    password: string,
  ): Promise<Response<ILoginRequestResponse, IUnauthorizedErrorResponse>> {
    return this.apiRequest({
      method: 'post',
      url: 'auth/register',
      data: {
        email,
        password,
      },
    });
  }

  static async saveOnboardingData(onboardingData: OnboardingData): Promise<Response<unknown, unknown>> {
    return this.apiRequest({
      method: 'post',
      url: 'auth/onboarding',
      data: onboardingData,
    });
  }

  static async saveHabitTrackingData(habitTrackingData: HabitStreakData[]): Promise<Response<unknown, unknown>> {
    return this.apiRequest({
      method: 'post',
      url: 'auth/habits',
      data: habitTrackingData,
    });
  }

  // === Account management endpoints ===
  static async logOut(): Promise<Response<unknown, unknown>> {
    return this.apiRequest({
      method: 'post',
      url: 'auth/logout',
    });
  }

  static async saveNotificationToken(uid: string, token: string): Promise<Response<unknown, unknown>> {
    return this.apiRequest({
      method: 'post',
      url: `notifications/register-token/${uid}`,
      data: {
        fcmToken: token,
        platform: Platform.OS,
      },
    });
  }

  // static async deleteAccount(): Promise<Response<unknown, unknown>> {
  //   return this.apiRequest({
  //     method: 'delete',
  //     url: 'auth/me',
  //   });
  // }
}
