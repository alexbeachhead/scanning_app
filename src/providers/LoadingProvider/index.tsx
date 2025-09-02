import React, {PropsWithChildren} from 'react';
import {View} from 'react-native';
import {Loading} from '../../components/Loading';

import {useStyles} from './styles';

interface IProps extends PropsWithChildren {
  loading: boolean;
}

export const LoadingProvider = ({children, loading}: IProps) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      {children}
      {loading && <Loading />}
    </View>
  );
};
