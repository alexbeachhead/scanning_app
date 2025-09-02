import {withStyles} from '@utils/hocs/withStyles';

export const useStyles = withStyles(({spacing, colors}) => ({
  container: {
    flexDirection: 'row',
    gap: spacing.s,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: `${colors.secondaryGold}40`,
  },
  activeDot: {
    backgroundColor: colors.secondaryGold,
  },
}));
