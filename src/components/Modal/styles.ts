import {withStyles} from '@utils/hocs/withStyles';

export const useStyles = withStyles(({colors, height, insets, width}) => ({
  container: {
    margin: 0,
    justifyContent: width > 736 ? 'center' : 'flex-end',
  },
  fullscreen: {
    height: width > 736 ? 876 : height - insets.top,
    width: width > 736 ? 375 : '100%',
    alignSelf: 'center',
  },
  modal: {
    maxHeight: height - insets.top,
    backgroundColor: colors.foreground,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 8,
    paddingBottom: insets.bottom || 16,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerContainer: {
    paddingTop: 8,
    paddingBottom: 24,
  },
  header: {
    width: 32,
    height: 3,
    borderRadius: 3,
    backgroundColor: colors.secondaryDarkGrey,
  },
  crossContainer: {
    width: '100%',
    paddingTop: 8,
  },
}));
