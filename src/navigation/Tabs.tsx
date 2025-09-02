import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Stacks } from "../utils/constants/navigation";
import { useCallback } from "react";
import { TabBar } from "../components";

import { MyParcels } from "./MyParcels";
import { BuyForMe } from "./BuyForMe";
import { MyBalance } from "./MyBalance";
import { Profile } from "./Profile";

export const Tabs = () => {
  const Tabs = createBottomTabNavigator();

  const options = {
    headerShown: false,
  };
  const EmptyComponent = () => <></>;


  const renderBottomBar = useCallback((props: BottomTabBarProps) => <TabBar {...props} />, []);

  return (
    <Tabs.Navigator tabBar={renderBottomBar} screenOptions={options}>
      <Tabs.Screen name={Stacks.MyParcels} component={MyParcels} />
      <Tabs.Screen name={Stacks.BuyForMe} component={BuyForMe} />
      <Tabs.Screen name={Stacks.CreateParcelEmpty} component={EmptyComponent} />
      <Tabs.Screen name={Stacks.MyBalance} component={MyBalance} />
      <Tabs.Screen name={Stacks.Profile} component={Profile} />
    </Tabs.Navigator>
  );
};
