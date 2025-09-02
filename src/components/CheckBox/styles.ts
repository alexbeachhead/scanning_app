import {withStyles} from '@utils/hocs';

export const useStyles = withStyles(({colors}) => ({
  checkbox: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.primaryBlack,
  },
  checkedContainer: {
    backgroundColor: colors.secondaryGold,
    borderColor: colors.secondaryGold,
    borderWidth: 0,
  },
  uncheckedContainer: {
    backgroundColor: 'transparent',
  },
}));
