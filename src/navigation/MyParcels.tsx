import {createStackNavigator, StackNavigationOptions} from '@react-navigation/stack';
import {Routes} from '../utils/constants/navigation';
import {MyParcelsStack} from '../screens';

import { RouteParamList } from "../types";

const Stack = createStackNavigator<RouteParamList>();

const options: StackNavigationOptions = {
  headerShown: false,
};

export const MyParcels = () => (
  <Stack.Navigator screenOptions={options} initialRouteName={Routes.MyParcels}>
    <Stack.Screen name={Routes.MyParcels} component={MyParcelsStack} />
  </Stack.Navigator>
);
