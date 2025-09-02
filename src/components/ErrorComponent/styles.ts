import {withStyles} from '@utils/hocs/withStyles';

export const useStyles = withStyles(({colors}) => ({
  errorContainer: {
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    gap: 8,
  },
  textContainer: {flex: 1, alignItems: 'flex-start'},
  newBtn: {
    backgroundColor: colors.danger,
    padding: 8,
    borderRadius: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  errorEmptyBtn: {
    padding: 8,
    borderRadius: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    gap: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));
