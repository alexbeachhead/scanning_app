import {Icon} from '@components';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useAppDispatch} from '@store';
import {Stacks} from '@utils/constants/navigation';
import {useState} from 'react';
import {Pressable, View} from 'react-native';

import {useStyles} from './styles';

interface Props extends BottomTabBarProps {}

// Define the icon names that are actually used
type IconName =
  | 'boxActive'
  | 'boxInactive'
  | 'shoppingCartActive'
  | 'shoppingCartInactive'
  | 'plusActive'
  | 'plusInactive'
  | 'balanceActive'
  | 'balanceInactive'
  | 'userActive'
  | 'userInactive';

interface Tab {
  activeIcon: IconName;
  inactiveIcon: IconName;
}

const tabs: Record<string, Tab> = {
  [Stacks.MyParcels]: {
    activeIcon: 'boxActive',
    inactiveIcon: 'boxInactive',
  },
  [Stacks.BuyForMe]: {
    activeIcon: 'shoppingCartActive',
    inactiveIcon: 'shoppingCartInactive',
  },
  [Stacks.CreateParcelEmpty]: {
    activeIcon: 'plusActive',
    inactiveIcon: 'plusInactive',
  },
  [Stacks.MyBalance]: {
    activeIcon: 'balanceActive',
    inactiveIcon: 'balanceInactive',
  },
  [Stacks.Profile]: {
    activeIcon: 'userActive',
    inactiveIcon: 'userInactive',
  },
};

export const TabBar = ({state, navigation}: Props) => {
  const {routes} = state;
  const styles = useStyles();
  const dispatch = useAppDispatch();

  const [activeTab, setActiveTab] = useState(state.routes[0].key);

  const getTab = (key: string, routeName: string): [IconName] => {
    const tab = tabs[routeName];

    const icon = key === activeTab ? tab.activeIcon : tab.inactiveIcon;

    return [icon];
  };

  const renderTab = ({key, name}: (typeof routes)[number]) => {
    const [icon] = getTab(key, name);

    const onTabPress = () => {
      if (name === 'CREATE_PARCEL_EMPTY_STACK') {
        setActiveTab(Stacks.MyParcels);
        // TODO: Implement CreateParcel navigation when the stack exists
        // navigation.navigate(Stacks.CreateParcel);
        // TODO: Implement these thunks when user profile features are added
        // dispatch(getUserInfoThunk());
        // dispatch(getUserAdditionalInfoThunk());
        // dispatch(getAgreementThunk());
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
