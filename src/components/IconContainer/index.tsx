import {colors} from '@utils/constants';
import {useMemo} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Icon} from '../Icon';

import {useStyles} from './styles';

type Props = {
  name?: IconName;
  onPress?: () => void;
  type: 'white' | 'grey' | 'lightRed' | 'red' | 'disabled';
  filter?: boolean;
  children?: React.ReactNode;
  small?: boolean;
};

export const IconContainer = ({name, onPress, type, filter, children, small}: Props) => {
  const styles = useStyles();

  const backgroundColor = useMemo(() => {
    switch (type) {
      case 'white':
        return colors.foreground;
      case 'grey':
        return colors.background;
      case 'lightRed':
        return colors.danger900;
      case 'red':
        return colors.danger;
      case 'disabled':
        return colors.content3;
    }
  }, [type]);

  const width = useMemo(() => (small ? 44 : 52), [small]);

  const height = useMemo(() => (small ? 44 : 52), [small]);

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, {backgroundColor, width, height}]}>
      {filter && <View style={filter ? styles.active : null} />}
      {children || <Icon name={name as IconName} />}
    </TouchableOpacity>
  );
};
