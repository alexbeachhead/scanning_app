import {colors} from '@utils/constants';
import {View} from 'react-native';

export const Divider = () => (
  <View
    style={{
      height: 1,
      backgroundColor: colors.divider,
    }}
  />
);
