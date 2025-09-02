import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {View} from 'react-native';

import {BackButton, Header, KeyboardContainerScroll} from '../../components';
import {useStyles} from './styles';

export const MyBalanceStack = () => {
  const styles = useStyles();
  const {setOptions} = useNavigation();

  useEffect(() => {
    setOptions({
      header: () => <Header leftSide={<BackButton onGoBack={() => {}} />} title="Мой баланс" />,
    });
  }, []);

  return (
    <KeyboardContainerScroll>
      <View style={styles.container}></View>
    </KeyboardContainerScroll>
  );
};
