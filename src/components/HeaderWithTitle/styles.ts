import {withStyles} from '@utils/hocs/withStyles';

export const useStyles = withStyles(({colors, insets, spacing}) => ({
  container: {
    height: 94 + insets.top,
    backgroundColor: colors.neutral100_1,
  },
  segmentContentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.m,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
}));
