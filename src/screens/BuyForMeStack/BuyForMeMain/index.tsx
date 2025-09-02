import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {View} from 'react-native';

import {HomeHeader} from '../../../components/HomeHeader';
import {KeyboardContainerScroll} from '../../../components/KeyboardContainerScroll';

import {useStyles} from './styles';

export const BuyForMeStack = () => {
  const styles = useStyles();
  const {setOptions} = useNavigation();

  useEffect(() => {
    setOptions({
      header: () => <HomeHeader title="Купи за меня" />,
    });
  }, []);

  return (
    <View style={styles.container}>
      <KeyboardContainerScroll></KeyboardContainerScroll>
    </View>
  );
};
