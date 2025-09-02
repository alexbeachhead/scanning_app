import {withStyles} from '@utils/hocs/withStyles';
import {Platform} from 'react-native';

export const useStyles = withStyles(({colors, insets, spacing}) => ({
  container: {
    height: 51 + (Platform.OS === 'android' ? spacing.s : Platform.OS === 'ios' ? insets.bottom : 10),
    flexDirection: 'row',
    backgroundColor: colors.primaryWhite,
    justifyContent: 'space-between',
  },
  itemWrapper: {
    alignItems: 'center',
    gap: 4,
    paddingTop: 15,
    flex: 1,
  },
  itemText: {
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 15,
    color: colors.content4,
  },
  activeText: {
    color: colors.primary,
  },
}));
