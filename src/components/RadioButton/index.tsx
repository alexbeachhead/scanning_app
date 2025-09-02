import {colors} from '@utils/constants';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from '../Text';

import {useStyles} from './styles';

export const RadioButton = ({
  selected,
  onPress,
  children,
  secondText,
}: {
  selected: boolean;
  onPress: () => void;
  children: React.ReactNode;
  secondText?: string;
}) => {
  const styles = useStyles();

  return (
    <TouchableOpacity
      style={[styles.radioContainer, {backgroundColor: selected ? `${colors.secondaryGold}80` : 'transparent'}]}
      onPress={onPress}>
      <View
        style={[
          styles.radioOuter,
          {
            borderColor: selected ? colors.primaryBlack : colors.primaryBlack,
            borderWidth: selected ? 5 : 1.5,
          },
        ]}>
        {selected && <View style={styles.radioInner} />}
      </View>
      <View style={{flex: 1}}>
        <Text variant="body" size={16} style={[styles.radioText]}>
          {children}
        </Text>
        {secondText && (
          <Text variant="body" size={16} color={selected ? 'warning300' : 'foreground'}>
            {secondText}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
