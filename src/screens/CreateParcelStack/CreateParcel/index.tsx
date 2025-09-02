import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {View} from 'react-native';
import {HomeHeader} from '../../../components/HomeHeader';

import {useStyles} from './styles';

export const CreateParcelStack = () => {
  const styles = useStyles();
  const {setOptions} = useNavigation();

  useEffect(() => {
    setOptions({
      header: () => <HomeHeader title="Создать посылку" />,
    });
  }, []);

  return <View style={styles.container}></View>;
};
