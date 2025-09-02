import {BuyForMeStack} from '../screens';
import {Routes} from '../utils/constants/navigation';

import {createStackNavigator, StackNavigationOptions} from '@react-navigation/stack';
import {RouteParamList} from '../types';

const Stack = createStackNavigator<RouteParamList>();

const options: StackNavigationOptions = {
  headerShown: false,
};

export const BuyForMe = () => (
  <Stack.Navigator screenOptions={options} initialRouteName={Routes.BuyForMe}>
    <Stack.Screen name={Routes.BuyForMe} component={BuyForMeStack} />
  </Stack.Navigator>
);
