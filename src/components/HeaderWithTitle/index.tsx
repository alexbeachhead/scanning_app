import React from 'react';
import {View} from 'react-native';

import {HomeHeader} from '../HomeHeader';
import {Text} from '../Text';
import {useStyles} from './styles';

interface IProps {
  title?: string;
}

export const HeaderWithTitle = ({title}: IProps) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <HomeHeader />
      <Text variant="Title/Semibold/20" color="neutral900" style={styles.title}>
        {title}
      </Text>
    </View>
  );
};
