import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {View} from 'react-native';
import {HomeHeader} from '../../../components/HomeHeader';
import {KeyboardContainerScroll} from '../../../components/KeyboardContainerScroll';

import {useStyles} from './styles';

export const MyParcelsStack = () => {
  const styles = useStyles();
  const {setOptions} = useNavigation();

  useEffect(() => {
    setOptions({
      header: () => <HomeHeader title="Мои посылки" />,
    });
  }, []);

  return (
    <KeyboardContainerScroll>
      <View style={styles.container}></View>
    </KeyboardContainerScroll>
  );
};
