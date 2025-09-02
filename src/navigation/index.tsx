import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SignIn} from '@screens';
import React from 'react';
import {LoadingProvider} from '../providers';
import {useAppSelector} from '../store';
import {colors} from '../utils/constants';
import {Stacks} from '../utils/constants/navigation';

import {RouteParamList} from '../types';

export const Navigation = () => {
  const AppStack = createStackNavigator<RouteParamList>();
  const {loading} = useAppSelector(state => state.auth);
  const options = {
    headerShown: true,
    header: () => null,
  };

  // Create a proper component for onboarding instead of inline function

  // Navigation theme to prevent white flash
  const navigationTheme = {
    dark: true,
    colors: {
      primary: colors.primary,
      background: 'transparent',
      card: colors.background,
      text: colors.foreground,
      border: colors.divider,
      notification: colors.primary,
    },
  };

  // Linking configuration for web with /him base path
  const linking = {
    prefixes: ['/him'],
    config: {
      screens: {
        [Stacks.SignIn]: 'sign-in',
        [Stacks.SignUp]: 'sign-up',
        [Stacks.Onboarding]: 'onboarding',
        [Stacks.Tabs]: {
          path: 'tabs',
          screens: {
            [Stacks.GoalSetting]: 'goal-setting',
            [Stacks.AIChat]: 'ai-chat',
            [Stacks.HabitTracker]: 'habit-tracker',
            [Stacks.PurityStreaks]: 'purity-streaks',
            [Stacks.Quotes]: 'quotes',
          },
        },
        // [Stacks.AIChat]: 'ai-chat',
        [Stacks.PurityStreaks]: 'purity-streaks',
      },
    },
  };

  return (
    <LoadingProvider loading={loading}>
      <NavigationContainer theme={navigationTheme} linking={linking}>
        <AppStack.Navigator
          screenOptions={{
            ...options,
          }}>
          <AppStack.Screen name={Stacks.SignIn} component={SignIn} />
        </AppStack.Navigator>
      </NavigationContainer>
    </LoadingProvider>
  );
};
