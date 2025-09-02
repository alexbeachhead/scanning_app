import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  BaseResponse,
  ILoginResponse,
  ILoginVerificationResponse,
  IRegisterBody,
  IValidateReject,
  PlatformSelection,
} from "../../api/types/auth";
import { AuthApi } from "../../api/auth";
import { StorageHelper } from "../../utils/helpers/storage";

const handleApiError = (error: unknown, rejectWithValue: any) =>
  error instanceof AxiosError &&
  rejectWithValue(error?.response?.data || { errors: ["An unexpected error occurred"] });

export const loginVerificationThunk = createAsyncThunk<
  ILoginVerificationResponse,
  string,
  IValidateReject
>("auth/loginVerificationThunk", async (login: string, { rejectWithValue }) => {
  try {
    const { data, error } = await AuthApi.loginVerification(login);

    if (error) {
      return rejectWithValue(error);
    }

    return data as ILoginVerificationResponse;
  } catch (err) {
    return handleApiError(err, rejectWithValue);
  }
});

export const loginThunk = createAsyncThunk<
  ILoginResponse,
  { login: string; password: string },
  IValidateReject
>("auth/loginThunk", async ({ login, password }, { rejectWithValue }) => {
  try {
    const { data, error } = await AuthApi.login(login, password);

    if (error) {
      return rejectWithValue(error);
    }

    if (data?.tokeninfo.access_token && data.tokeninfo.refresh_token) {
      await StorageHelper.set("refreshToken", data.tokeninfo.refresh_token);
      await StorageHelper.set("accessToken", data.tokeninfo.access_token);
    }

    return data as ILoginResponse;
  } catch (err) {
    return handleApiError(err, rejectWithValue);
  }
});

export const logoutThunk = createAsyncThunk<void, void, IValidateReject>(
  "auth/logoutThunk",
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = await StorageHelper.get<string>("refreshToken");

      if (!refreshToken) {
        return rejectWithValue({ message: "Refresh token not found" });
      }

      const { data, error } = await AuthApi.logout({ refreshToken });

      if (error) {
        return rejectWithValue(error);
      }

      await StorageHelper.set("refreshToken", "");
      await StorageHelper.set("accessToken", "");

      return data;
    } catch (err) {
      return handleApiError(err, rejectWithValue);
    }
  }
);

export const forgotPasswordThunk = createAsyncThunk<
  BaseResponse,
  { email: string; platform: PlatformSelection },
  IValidateReject
>("auth/forgotPasswordThunk", async ({ email, platform }, { rejectWithValue }) => {
  try {
    const { data, error } = await AuthApi.forgotPassword(email, platform);

    if (error) {
      return rejectWithValue(error);
    }

    return data;
  } catch (err) {
    return handleApiError(err, rejectWithValue);
  }
});

export const registerThunk = createAsyncThunk<
  BaseResponse,
  IRegisterBody,
  IValidateReject
>("auth/registerThunk", async (body, { rejectWithValue }) => {
  try {
    const { data, error } = await AuthApi.register(body);

    if (error) {
      return rejectWithValue(error);
    }

    return data;
  } catch (err) {
    return handleApiError(err, rejectWithValue);
  }
});
