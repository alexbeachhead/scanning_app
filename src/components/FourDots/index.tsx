import React from 'react';
import {View} from 'react-native';
import {useStyles} from './styles';

export const FourDots = ({activeIndex}: {activeIndex: number}) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <View style={[styles.dot, activeIndex === 0 && styles.activeDot]} />
      <View style={[styles.dot, activeIndex === 1 && styles.activeDot]} />
      <View style={[styles.dot, activeIndex === 2 && styles.activeDot]} />
      <View style={[styles.dot, activeIndex === 3 && styles.activeDot]} />
      <View style={[styles.dot, activeIndex === 4 && styles.activeDot]} />
    </View>
  );
};
