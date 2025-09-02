import {withStyles} from '@utils/hocs/withStyles';

export const useStyles = withStyles(({colors}) => ({
  container: {
    height: 52,
    backgroundColor: colors.background,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    flexDirection: 'row',
  },
  modalInnerContainer: {
    // height: "100%",
    backgroundColor: colors.foreground,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 40,
  },
}));
