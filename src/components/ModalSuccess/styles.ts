import {withStyles} from '@utils/hocs/withStyles';

export const useStyles = withStyles(({colors, height, insets, spacing}) => ({
  container: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modal: {
    maxHeight: height - insets.top,
    backgroundColor: colors.content1,
    borderRadius: 16,
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 34,
    marginHorizontal: spacing.s,
    gap: 8,
  },
  header: {
    marginVertical: 8,
    width: 32,
    height: 3,
    borderRadius: 3,
    backgroundColor: colors.content4,
  },
  textContainer: {
    gap: 4,
  },
  text: {
    textAlign: 'center',
  },
}));
