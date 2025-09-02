import {colors} from '@utils/constants';
import {LinearGradient} from 'expo-linear-gradient';
import React, {ReactNode} from 'react';
import {Platform, View, ViewStyle} from 'react-native';

const GradientBackground = ({
  children,
  style,
  locations,
}: {
  children: ReactNode;
  style?: ViewStyle;
  locations?: [number, number, ...number[]];
}) => {
  if (Platform.OS === 'web' && window.innerWidth > 768) {
    return (
      <View style={{height: '100%', width: '100%', ...style, backgroundColor: colors.foreground}}>{children}</View>
    );
  }
  return (
    <LinearGradient
      colors={['#D9D9D940', '#ffffff']}
      locations={locations || [0.01, 1]}
      style={{
        height: '100%',
        width: '100%',
        ...style,
      }}>
      {children}
    </LinearGradient>
  );
};

export default GradientBackground;
