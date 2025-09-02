import {createStackNavigator, StackNavigationOptions} from '@react-navigation/stack';
import {Routes} from '../utils/constants/navigation';
import {CreateParcelStack} from '../screens';

import {RouteParamList} from '../types';

const Stack = createStackNavigator<RouteParamList>();

const options: StackNavigationOptions = {
  headerShown: false,
};

export const CreateParcel = () => (
  <Stack.Navigator screenOptions={options} initialRouteName={Routes.CreateParcelEmpty}>
    <Stack.Screen name={Routes.CreateParcelEmpty} component={CreateParcelStack} />
  </Stack.Navigator>
);
