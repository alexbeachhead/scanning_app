import {NavigationContainer} from '@react-navigation/native';
import {LoadingProvider} from '../providers';
import {Stacks} from '../utils/constants/navigation';
import {createStackNavigator} from '@react-navigation/stack';

import {RouteParamList} from '../types';

import {Tabs} from './Tabs';

export const Navigation = () => {
  const AppStack = createStackNavigator<RouteParamList>();
  const options = {
    headerShown: false,
    header: () => null,
  };

  return (
    <LoadingProvider loading={false}>
      <NavigationContainer>
        <AppStack.Navigator screenOptions={options}>
          <AppStack.Screen name={Stacks.Tabs} component={Tabs} />
        </AppStack.Navigator>
      </NavigationContainer>
    </LoadingProvider>
  );
};
