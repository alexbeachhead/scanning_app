import React, {useEffect} from 'react';
import {ImageBackground, Platform, StyleSheet, useWindowDimensions, View} from 'react-native';
import ImageBackgroundS from '../../../assets/background.png';

interface WebBackgroundProps {
  children: React.ReactNode;
  onLayout?: () => void;
}

export const WebBackground: React.FC<WebBackgroundProps> = ({children, onLayout}) => {
  if (Platform.OS === 'web') {
    const {width, height} = useWindowDimensions();

    useEffect(() => {
      onLayout?.();
    }, []);

    return (
      <View style={{width, height, overflow: 'hidden'}}>
        <ImageBackground style={{width, height}} source={ImageBackgroundS} resizeMode="cover">
          {children}
        </ImageBackground>
      </View>
    );
  }

  return (
    <ImageBackground style={styles.background} source={ImageBackgroundS} resizeMode="cover" onLayout={onLayout}>
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});
