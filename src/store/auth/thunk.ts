import {ILoginRequestResponse} from '@api/types/auth';
import {IValidateReject} from '@api/types/types';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import {AuthApi} from '../../api/auth';
import {StorageHelper} from '../../utils/helpers/storage';
import {HabitStreakData, OnboardingData} from './types';

const handleApiError = (error: unknown, rejectWithValue: unknown) =>
  error instanceof AxiosError && rejectWithValue(error?.response?.data || {errors: ['An unexpected error occurred']});

export const loginThunk = createAsyncThunk<ILoginRequestResponse, {email: string; password: string}, IValidateReject>(
  'auth/loginThunk',
  async ({email, password}, {rejectWithValue}) => {
    try {
      const {data, error} = await AuthApi.login(email, password);

      if (error) {
        return rejectWithValue(error);
      }

      if (data?.refreshToken && data.token) {
        await StorageHelper.set('refreshToken', data.refreshToken);
        await StorageHelper.set('accessToken', data.token);
      }

      return data as ILoginRequestResponse;
    } catch (err) {
      return handleApiError(err, rejectWithValue);
    }
  },
);

export const logoutThunk = createAsyncThunk<void, void, IValidateReject>(
  'auth/logoutThunk',
  async (_, {rejectWithValue}) => {
    try {
      const refreshToken = await StorageHelper.get<string>('refreshToken');

      if (!refreshToken) {
        return rejectWithValue({message: 'Refresh token not found'});
      }

      const {data, error} = await AuthApi.logOut();

      if (error) {
        return rejectWithValue(error);
      }

      await StorageHelper.set('refreshToken', '');
      await StorageHelper.set('accessToken', '');

      return data;
    } catch (err) {
      return handleApiError(err, rejectWithValue);
    }
  },
);

export const saveOnboardingDataThunk = createAsyncThunk<unknown, OnboardingData, IValidateReject>(
  'auth/saveOnboardingDataThunk',
  async (onboardingData, {rejectWithValue}) => {
    try {
      const {data, error} = await AuthApi.saveOnboardingData(onboardingData);

      if (error) {
        return rejectWithValue(error);
      }

      return data;
    } catch (err) {
      return handleApiError(err, rejectWithValue);
    }
  },
);

export const saveHabitTrackingDataThunk = createAsyncThunk<unknown, HabitStreakData[], IValidateReject>(
  'auth/saveHabitTrackingDataThunk',
  async (habitTrackingData, {rejectWithValue}) => {
    try {
      const {data, error} = await AuthApi.saveHabitTrackingData(habitTrackingData);

      if (error) {
        return rejectWithValue(error);
      }

      return data;
    } catch (err) {
      return handleApiError(err, rejectWithValue);
    }
  },
);

export const registerThunk = createAsyncThunk<
  ILoginRequestResponse,
  {email: string; password: string},
  IValidateReject
>('auth/registerThunk', async ({email, password}, {rejectWithValue}) => {
  try {
    const {data, error} = await AuthApi.register(email, password);

    if (error) {
      return rejectWithValue(error);
    }

    return data as ILoginRequestResponse;
  } catch (err) {
    return handleApiError(err, rejectWithValue);
  }
});

export const saveNotificationTokenThunk = createAsyncThunk<unknown, {uid: string; token: string}, IValidateReject>(
  'auth/saveNotificationTokenThunk',
  async ({uid, token}, {rejectWithValue}) => {
    try {
      const {data, error} = await AuthApi.saveNotificationToken(uid, token);

      if (error) {
        return rejectWithValue(error);
      }

      return data;
    } catch (err) {
      return handleApiError(err, rejectWithValue);
    }
  },
);
