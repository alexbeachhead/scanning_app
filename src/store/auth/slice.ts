import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IAuthState } from "./types";
import {
  forgotPasswordThunk,
  loginThunk,
  loginVerificationThunk,
  logoutThunk,
  registerThunk,
} from "./thunk";

const initialState: IAuthState = {
  loading: false,
  isAuthorized: null,

  loginVerificationThunkSuccess: false,
  loginVerificationThunkErrors: null,

  loginThunkSuccess: false,
  loginThunkErrors: null,
  loginThunkData: null,

  forgotPasswordThunkSuccess: false,
  forgotPasswordThunkErrors: null,

  registerThunkSuccess: false,
  registerThunkErrors: null,
};

const handlePending = (state: IAuthState) => {
  state.loading = true;
};

const handleRejected = (state: IAuthState, { payload }: PayloadAction<any>) => {
  // console.log(state, "payload", payload.message);

  state.loading = false;
  const errorField = `${payload?.type}Errors` as keyof IAuthState;

  let data: string[] | null;

  if (payload.errors) {
    data = Object.values(payload.errors) as unknown as string[];
  } else if (payload?.message) {
    data = [payload.message];
  } else {
    data = null;
  }

  (state[errorField] as string[] | null) = data as string[] | null;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthorized(state, action: PayloadAction<boolean>) {
      state.isAuthorized = action.payload;
    },
    logout(state) {
      state.loading = false;
      state.isAuthorized = false;
    },
    resetLoginThunk(state) {
      state.loginVerificationThunkErrors = null;
      state.loginVerificationThunkSuccess = false;
      state.loginThunkSuccess = false;
      state.loginThunkErrors = null;
    },
    resetRegisterThunk(state) {
      state.registerThunkErrors = null;
      state.registerThunkSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginVerificationThunk.pending, handlePending)
      .addCase(loginVerificationThunk.fulfilled, (state, {}) => {
        state.loading = false;
        state.loginVerificationThunkSuccess = true;
      })
      .addCase(loginVerificationThunk.rejected, (state, action) => {
        handleRejected(state, {
          ...action,
          payload: { ...action.payload, type: "loginVerificationThunk" },
        });
      })

      .addCase(loginThunk.pending, handlePending)
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.loginThunkSuccess = true;
        state.loginThunkData = payload.userInfo;
        state.isAuthorized = true;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        handleRejected(state, {
          ...action,
          payload: { ...action.payload, type: "loginThunk" },
        });
      })

      .addCase(logoutThunk.pending, handlePending)
      .addCase(logoutThunk.fulfilled, (state) => {
        state.loading = false;
        state.isAuthorized = false;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        handleRejected(state, {
          ...action,
          payload: { ...action.payload, type: "logoutThunk" },
        });
      })

      .addCase(forgotPasswordThunk.pending, handlePending)
      .addCase(forgotPasswordThunk.fulfilled, (state, {}) => {
        state.loading = false;
        state.forgotPasswordThunkSuccess = true;
      })
      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        handleRejected(state, {
          ...action,
          payload: { ...action.payload, type: "forgotPasswordThunk" },
        });
      })

      .addCase(registerThunk.pending, handlePending)
      .addCase(registerThunk.fulfilled, (state, {}) => {
        state.loading = false;
        state.registerThunkSuccess = true;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        handleRejected(state, {
          ...action,
          payload: { ...action.payload, type: "registerThunk" },
        });
      });
  },
});

export const { setIsAuthorized, logout, resetLoginThunk, resetRegisterThunk } = authSlice.actions;
export default authSlice.reducer;
