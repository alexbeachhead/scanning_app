import {useColors} from '@utils/hooks/useColors';
import {PropsWithChildren} from 'react';
import {Text as RNText, TextProps} from 'react-native';

import {colors} from '@utils/constants';
import {TextVariant, useStyles} from './styles';

interface IProps extends PropsWithChildren {
  variant: TextVariant;
  color?: keyof typeof colors;
  center?: boolean;
  style?: TextProps['style'];
  numberOfLines?: number;
  onPress?: () => void;
  size: number;
}

export const Text = ({
  children,
  variant,
  color = 'primaryBlack',
  center = false,
  style,
  numberOfLines = undefined,
  onPress,
  size,
}: IProps) => {
  const styles = useStyles();
  const colorValues = useColors();

  return (
    <RNText
      style={[{color: colorValues[color], fontSize: size}, center && {textAlign: 'center'}, styles[variant], style]}
      numberOfLines={numberOfLines}
      onPress={onPress}>
      {children}
    </RNText>
  );
};
