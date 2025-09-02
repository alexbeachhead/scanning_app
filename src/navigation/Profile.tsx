import {createStackNavigator, StackNavigationOptions} from '@react-navigation/stack';
import {ProfileStack} from '../screens';
import {Routes} from '../utils/constants/navigation';

import {RouteParamList} from '../types';

const Stack = createStackNavigator<RouteParamList>();

const options: StackNavigationOptions = {
  headerShown: false,
};

export const Profile = () => (
  <Stack.Navigator screenOptions={options} initialRouteName={Routes.Profile}>
    <Stack.Screen name={Routes.Profile} component={ProfileStack} />
  </Stack.Navigator>
);
