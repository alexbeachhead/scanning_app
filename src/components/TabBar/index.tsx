import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Stacks} from '@utils/constants/navigation';
import {useState} from 'react';
import {Pressable, View} from 'react-native';

import {Icon} from '../Icon';
import {useStyles} from './styles';

type Props = BottomTabBarProps;

// Define the icon names that are actually used

interface Tab {
  activeIcon: IconName;
  inactiveIcon: IconName;
}

const tabs: Record<string, Tab> = {
  [Stacks.GoalSetting]: {
    activeIcon: 'home',
    inactiveIcon: 'home',
  },
  [Stacks.AIChat]: {
    activeIcon: 'chat',
    inactiveIcon: 'chat',
  },
  [Stacks.HabitTracker]: {
    activeIcon: 'stats',
    inactiveIcon: 'stats',
  },

  // [Stacks.PurityStreaks]: {
  //   activeIcon: 'calendarRed',
  //   inactiveIcon: 'calendarRed',
  // },
  // [Stacks.Quotes]: {
  //   activeIcon: 'warehouse',
  //   inactiveIcon: 'warehouse',
  // },
};

export const TabBar = ({state, navigation}: Props) => {
  const {routes} = state;
  const styles = useStyles();

  const [activeTab, setActiveTab] = useState(state.routes[0].key);

  const getTab = (key: string, routeName: string): [IconName] => {
    const tab = tabs[routeName];

    const icon = key === activeTab ? tab.activeIcon : tab.inactiveIcon;

    return [icon];
  };

  const renderTab = ({key, name}: (typeof routes)[number]) => {
    const [icon] = getTab(key, name);

    const onTabPress = () => {
      if (name === Stacks.Chat) {
        navigation.navigate(Stacks.AIChat);
      } else {
        setActiveTab(key);
        navigation.navigate(name);
      }
    };

    return (
      <Pressable onPress={onTabPress} style={styles.itemWrapper} key={key}>
        <Icon name={icon} />
      </Pressable>
    );
  };

  return <View style={styles.container}>{state.routes.map(tab => renderTab(tab))}</View>;
};
