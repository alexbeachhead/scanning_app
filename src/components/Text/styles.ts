import {withStyles} from '@utils/hocs/withStyles';
import {TextStyle} from 'react-native';

export type TextVariant = 'header' | 'body' | 'navigation';

type TextStyles = Record<TextVariant, TextStyle>;

export const useStyles = withStyles(
  () =>
    ({
      header: {
        // fontSize: 20,
        fontWeight: '500',
        fontFamily: 'Alegreya-Regular',
      },
      body: {
        // fontSize: 12,
        fontWeight: '400',
        fontFamily: 'Inter-Regular',
      },
      navigation: {
        // fontSize: 12,
        fontWeight: '400',
        fontFamily: 'AlegreyaSansSC-Regular',
      },
    }) as TextStyles,
);
