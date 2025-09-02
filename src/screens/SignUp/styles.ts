import {withStyles} from '@utils/hocs/withStyles';
import {Platform} from 'react-native';

export const useStyles = withStyles(({spacing, insets}) => ({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.l,
    paddingBottom: Platform.OS === 'ios' ? spacing.l : spacing.l + insets.bottom,
    justifyContent: 'space-between',
    gap: 12,
  },
  textContainer: {
    paddingTop: spacing.l * 2,
    height: '75%',
  },
  appIcon: {
    width: 73,
    height: 73,
    alignSelf: 'center',
  },
  inputContainer: {
    gap: spacing.l,
  },

  title: {
    marginTop: spacing.l,
    marginBottom: spacing.m,
  },
  subtitle: {
    marginBottom: spacing.l,
  },
  question: {
    marginTop: spacing.l,
  },
  buttonContainer: {
    paddingTop: spacing.l,
  },
  btnContainer: {
    flexDirection: 'row',
    gap: spacing.l,
  },
  dotsContainer: {
    alignSelf: 'center',
    marginTop: spacing.l,
  },
  errorText: {
    paddingLeft: spacing.m,
  },
}));
