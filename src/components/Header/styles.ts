import {withStyles} from '@utils/hocs/withStyles';

export const useStyles = withStyles(({colors, insets}) => ({
  container: {
    width: '100%',
    backgroundColor: colors.content1,
    paddingHorizontal: 16,
    paddingTop: insets.top,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 42,
  },
  leftSide: {
    height: '100%',
  },
  rightSide: {
    height: '100%',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
}));
