// import {BlurView} from '@react-native-community/blur';
// import LottieView from 'lottie-react-native';
import {colors} from '@utils/constants';
import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Text} from '../Text';

import {useStyles} from './styles';

interface Props {
  loading?: boolean;
}

export const Loading = ({loading = true}: Props) => {
  const styles = useStyles();

  if (!loading) return null;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ActivityIndicator size="large" color={colors.foreground} />
        <Text variant="body" size={14} style={styles.text} color="foreground">
          Loading...
        </Text>
      </View>
    </View>
  );
};
