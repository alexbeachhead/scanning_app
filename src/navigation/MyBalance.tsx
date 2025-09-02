import {createStackNavigator, StackNavigationOptions} from '@react-navigation/stack';
import {MyBalanceStack} from '../screens';
import {Routes} from '../utils/constants/navigation';

import {RouteParamList} from '../types';

const Stack = createStackNavigator<RouteParamList>();

const options: StackNavigationOptions = {
  headerShown: false,
};

export const MyBalance = () => (
  <Stack.Navigator screenOptions={options} initialRouteName={Routes.MyBalance}>
    <Stack.Screen name={Routes.MyBalance} component={MyBalanceStack} />
  </Stack.Navigator>
);
