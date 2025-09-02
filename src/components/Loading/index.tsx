// import {BlurView} from '@react-native-community/blur';
// import LottieView from 'lottie-react-native';
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
        <ActivityIndicator size="large" color="#007AFF" />
        <Text variant="Body/Regular/14" style={styles.text}>
          Loading...
        </Text>
      </View>
    </View>
  );
};
