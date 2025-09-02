import {BottomTabBarProps, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useCallback} from 'react';
import {TabBar} from '../components';
import {colors} from '../utils/constants';
import {Stacks} from '../utils/constants/navigation';

import {GoalSetting} from '../screens/1GoalSettingStack';
import {HabitTracker} from '../screens/2HabitTrackerStack';
import {AIChat} from '../screens/3AIChatStack';
import {PurityStreaks} from '../screens/4PurityStreaksStack';
import {Quotes} from '../screens/5QuotesStack';

export const Tabs = () => {
  const TabNavigator = createBottomTabNavigator();

  const options = {
    headerShown: false,
  };
  const renderBottomBar = useCallback((props: BottomTabBarProps) => <TabBar {...props} />, []);

  return (
    <TabNavigator.Navigator
      tabBar={renderBottomBar}
      screenOptions={{
        ...options,
        tabBarStyle: {backgroundColor: colors.background},
      }}>
      <TabNavigator.Screen name={Stacks.GoalSetting} component={GoalSetting} />
      <TabNavigator.Screen name={Stacks.AIChat} component={AIChat} />
      <TabNavigator.Screen name={Stacks.HabitTracker} component={HabitTracker} />
      {/* <TabNavigator.Screen name={Stacks.PurityStreaks} component={PurityStreaks} />
      <TabNavigator.Screen name={Stacks.Quotes} component={Quotes} /> */}
    </TabNavigator.Navigator>
  );
};
