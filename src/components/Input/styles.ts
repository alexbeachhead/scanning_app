import {withStyles} from '@utils/hocs/withStyles';

export const useStyles = withStyles(({spacing, colors}) => ({
  container: {
    flexGrow: 1,
  },
  containerError: {},
  inputContainer: {
    height: 52,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderRadius: 50,
    overflow: 'hidden',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.m,
    position: 'relative',
    paddingBottom: 4,
    borderWidth: 1,
    borderColor: colors.primaryBlack,
  },
  input: {
    fontSize: 16,
    lineHeight: 22.4,
    fontWeight: '500',
    fontFamily: 'Inter-Regular',
    backgroundColor: 'transparent',
    color: colors.primaryBlack,
    zIndex: 1,
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    // textTransform: "uppercase",
    // textAlignVertical: "bottom",
    padding: 0,
    // Web-specific styles to remove default focus outline
    outline: 'none',
    '&:focus': {
      outline: 'none',
      border: 'none',
      boxShadow: 'none',
    },
  },
  inputUnfocused: {
    height: '100%',
  },
  inputFocused: {
    height: '50%',
  },
  inputError: {
    backgroundColor: colors.newDanger500,
  },
  placeholder: {
    position: 'absolute',
    left: spacing.m,
    color: colors.warning300,
    zIndex: 10,
    marginTop: -4,
    fontSize: 16,
    lineHeight: 22.4,
    fontWeight: '500',
    fontFamily: 'Inter-Regular',
  },
  errorText: {
    color: colors.newDanger50,
    fontSize: 14,
    lineHeight: 19.6,
    fontWeight: '500',
    fontFamily: 'Inter-Regular',
    maxWidth: '90%',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
    paddingVertical: 2.5,
  },
}));
