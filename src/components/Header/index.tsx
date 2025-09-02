import React, {JSX} from 'react';
import {View} from 'react-native';

import {Icon} from '../Icon';
import {Spacer} from '../Spacer';
import {Text} from '../Text';
import {useStyles} from './styles';

interface IProps {
  leftSide?: unknown;
  title?: string | JSX.Element;
  rightSide?: unknown;
  centerTitle?: string;
  error?: boolean;
}

export const Header = ({leftSide, title = '', rightSide, centerTitle, error}: IProps) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.leftSide}>{leftSide}</View>
        <Text variant="Headline/Medium/28">{centerTitle}</Text>
        <View style={styles.rightSide}>{rightSide}</View>
      </View>
      <Spacer size="xs" />
      {title && (
        <View style={styles.errorContainer}>
          <Text variant="Headline/Medium/28">{title}</Text>
          {error && <Icon name="error" />}
        </View>
      )}
      <Spacer size="xs" />
    </View>
  );
};
