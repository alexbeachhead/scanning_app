import {withStyles} from '@utils/hocs/withStyles';

export const useStyles = withStyles(({colors, spacing}) => ({
  container: {
    backgroundColor: colors.foreground,
    borderRadius: 16,
    overflow: 'hidden',
    padding: spacing.m,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.m,
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.l,
  },
}));
