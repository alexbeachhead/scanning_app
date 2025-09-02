import {withStyles} from '@utils/hocs/withStyles';

export const useStyles = withStyles(({colors}) => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  step: {
    flex: 1,
    height: 6,
    borderRadius: 3,
  },
  previousStep: {
    backgroundColor: colors.primary,
  },
  activeStep: {
    backgroundColor: colors.content4,
  },
  inactiveStep: {
    backgroundColor: colors.content3,
  },
}));
