import {withStyles} from '@utils/hocs/withStyles';

export const useStyles = withStyles(({colors, spacing}) => ({
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.primaryBlack,
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.content4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.xs,
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 6,
  },
  radioText: {
    flex: 1,
    color: colors.primaryBlack,
  },
  radioGroup: {
    marginVertical: spacing.m,
  },
}));
