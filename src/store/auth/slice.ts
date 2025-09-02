import {HabitStreakData, IUser, NotificationSettings} from '@api/types/auth';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {HabitProgress, PersonalInfoData} from '@screens';
import {
  loginThunk,
  registerThunk,
  saveHabitTrackingDataThunk,
  saveNotificationTokenThunk,
  saveOnboardingDataThunk,
} from './thunk';
import {IAuthState} from './types';

const initialState: IAuthState = {
  isAuthorized: null,
  loading: false,

  currentStep: 0,
  onboardingData: {},
  habitTrackingData: [],
  initialHabitTrackingData: [],

  loginThunkErrors: [],
  loginThunkSuccess: false,
  loginThunkData: null,

  saveOnboardingDataThunkErrors: [],
  saveOnboardingDataThunkSuccess: false,
  saveOnboardingDataThunkData: null,

  saveHabitTrackingDataThunkErrors: [],
  saveHabitTrackingDataThunkSuccess: false,
  saveHabitTrackingDataThunkData: null,

  registerThunkErrors: [],
  registerThunkSuccess: false,
  registerThunkData: null,

  saveNotificationTokenThunkErrors: [],
  saveNotificationTokenThunkSuccess: false,
  saveNotificationTokenThunkData: null,
};

const handlePending = (state: IAuthState) => {
  state.loading = true;
};

const handleRejected = (state: IAuthState, {payload}: PayloadAction<unknown>) => {
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
  name: 'auth',
  initialState,
  reducers: {
    setIsAuthorized(state, action: PayloadAction<boolean>) {
      state.isAuthorized = action.payload;
    },

    // Onboarding reducers
    setCurrentStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },

    nextStep(state) {
      state.currentStep += 1;
    },

    previousStep(state) {
      if (state.currentStep > 0) {
        state.currentStep -= 1;
      }
    },

    setPersonalInfo(state, action: PayloadAction<Partial<PersonalInfoData>>) {
      console.log('action', action.payload);
      state.onboardingData.personalInfo = {
        ...state.onboardingData.personalInfo,
        ...action.payload,
      } as PersonalInfoData;
    },

    setSelectedHabits(state, action: PayloadAction<string[]>) {
      state.onboardingData.selectedHabits = action.payload;
    },

    setHaveTried(state, action: PayloadAction<boolean>) {
      state.onboardingData.haveTried = action.payload;
    },

    setProgressData(state, action: PayloadAction<HabitProgress[]>) {
      state.onboardingData.progressData = action.payload;
    },

    setOnboardingComplete(state, action: PayloadAction<boolean>) {
      state.onboardingData.isOnboardingComplete = action.payload;
    },

    resetOnboarding(state) {
      state.currentStep = 0;
      state.onboardingData = {};
    },

    // Habit tracking reducers
    setHabitTrackingData(state, action: PayloadAction<HabitStreakData[]>) {
      state.habitTrackingData = action.payload;
    },

    updateHabitStreak(state, action: PayloadAction<HabitStreakData>) {
      console.log('action.payload', action.payload);
      console.log('state.habitTrackingData', state.habitTrackingData);
      const existingIndex = state.habitTrackingData.findIndex(habit => habit.habit === action.payload.habit);

      if (existingIndex >= 0) {
        state.habitTrackingData[existingIndex] = action.payload;
      } else {
        state.habitTrackingData.push(action.payload);
      }
    },

    recordDailyHabitEntry(state, action: PayloadAction<{habit: string; date: string; wasSuccessful: boolean}>) {
      const {habit, date, wasSuccessful} = action.payload;
      const habitIndex = state.habitTrackingData.findIndex(h => h.habit === habit);

      if (habitIndex >= 0) {
        state.habitTrackingData[habitIndex].dailyEntries[date] = wasSuccessful;
        state.habitTrackingData[habitIndex].lastCheckedDate = date;
      }
    },

    initializeHabitTracking(state, action: PayloadAction<HabitStreakData[]>) {
      state.habitTrackingData = action.payload;
    },

    setMotivationSources(state, action: PayloadAction<string[]>) {
      state.onboardingData.motivationSources = action.payload;
    },

    setNotificationSettings(state, action: PayloadAction<NotificationSettings>) {
      state.onboardingData.notificationSettings = action.payload;
    },

    resetHabitTracking(state) {
      state.habitTrackingData = [];
    },

    resetRegisterThunk(state) {
      state.registerThunkErrors = [];
      state.registerThunkSuccess = false;
      state.registerThunkData = null;
    },

    resetLoginThunk(state) {
      state.loginThunkErrors = [];
      state.loginThunkSuccess = false;
      state.loginThunkData = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginThunk.pending, handlePending)
      .addCase(loginThunk.fulfilled, (state, {payload}) => {
        console.log('payload', payload);
        state.loading = false;
        state.loginThunkSuccess = true;
        state.loginThunkData = payload.user as IUser;
        state.isAuthorized = true;
        state.onboardingData.isOnboardingComplete = payload.user.onboardingData?.isOnboardingComplete || false;
        state.onboardingData.personalInfo =
          (payload.user.onboardingData?.personalInfo as PersonalInfoData) || ({} as PersonalInfoData);
        state.onboardingData.selectedHabits = payload.user.onboardingData?.selectedHabits || [];
        state.onboardingData.haveTried = payload.user.onboardingData?.haveTried || false;
        state.onboardingData.progressData = payload.user.onboardingData?.progressData || [];
        state.onboardingData.motivationSources = payload.user.onboardingData?.motivationSources || [];
        state.onboardingData.notificationSettings =
          payload.user.onboardingData?.notificationSettings || ({} as NotificationSettings);
        state.initialHabitTrackingData = payload.user.habitTrackingData || [];
        state.habitTrackingData = payload.user.habitTrackingData || [];
      })
      .addCase(loginThunk.rejected, (state, action) =>
        handleRejected(state, {...action, payload: {...action.payload, type: 'loginThunk'}}),
      )

      .addCase(registerThunk.pending, handlePending)
      .addCase(registerThunk.fulfilled, (state, {payload}) => {
        console.log('payload', payload);
        state.loading = false;
        state.registerThunkSuccess = true;
        state.registerThunkData = payload.user as IUser;
        state.isAuthorized = true;
      })
      .addCase(registerThunk.rejected, (state, action) =>
        handleRejected(state, {...action, payload: {...action.payload, type: 'registerThunk'}}),
      )

      .addCase(saveOnboardingDataThunk.pending, handlePending)
      .addCase(saveOnboardingDataThunk.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.saveOnboardingDataThunkSuccess = true;
        state.saveOnboardingDataThunkData = payload;
      })
      .addCase(saveOnboardingDataThunk.rejected, (state, action) =>
        handleRejected(state, {...action, payload: {...action.payload, type: 'saveOnboardingDataThunk'}}),
      )
      .addCase(saveHabitTrackingDataThunk.pending, handlePending)
      .addCase(saveHabitTrackingDataThunk.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.saveHabitTrackingDataThunkSuccess = true;
        state.saveHabitTrackingDataThunkData = payload;
      })
      .addCase(saveHabitTrackingDataThunk.rejected, (state, action) =>
        handleRejected(state, {...action, payload: {...action.payload, type: 'saveHabitTrackingDataThunk'}}),
      )

      .addCase(saveNotificationTokenThunk.pending, handlePending)
      .addCase(saveNotificationTokenThunk.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.saveNotificationTokenThunkSuccess = true;
        state.saveNotificationTokenThunkData = payload;
      })
      .addCase(saveNotificationTokenThunk.rejected, (state, action) =>
        handleRejected(state, {...action, payload: {...action.payload, type: 'saveNotificationTokenThunk'}}),
      );
  },
});

export const {
  setIsAuthorized,
  setCurrentStep,
  nextStep,
  previousStep,
  setPersonalInfo,
  setSelectedHabits,
  setProgressData,
  setOnboardingComplete,
  resetOnboarding,
  setHabitTrackingData,
  updateHabitStreak,
  recordDailyHabitEntry,
  initializeHabitTracking,
  resetHabitTracking,
  setHaveTried,
  setMotivationSources,
  setNotificationSettings,
  resetRegisterThunk,
  resetLoginThunk,
  resetSaveNotificationTokenThunk,
} = authSlice.actions;

export default authSlice.reducer;
