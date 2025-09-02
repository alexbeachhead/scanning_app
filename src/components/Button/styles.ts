import { withStyles } from "@utils/hocs/withStyles";

export const useStyles = withStyles(({ colors }) => ({
  button: {
    borderRadius: 16,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: 50,
    maxHeight: 50,
    maxWidth: "100%",
    flexGrow: 1,
    borderWidth: 1,
    borderColor: colors.mainRed,
    width: "100%",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  icon: {
    marginHorizontal: 5,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500",
    fontFamily: "Gilroy-Medium",
  },
  pressed: {
    opacity: 0.6,
  },
  disabled: {
    backgroundColor: colors.mainRed,
    opacity: 0.5,
  },
  disabledText: {
    // color: colors.alpha500,
  },
  pressedText: {
    opacity: 0.6,
  },
}));

export const useTypeStyles = withStyles(({ colors }) => ({
  primary: {
    backgroundColor: colors.mainRed,
  },
  secondary: {
    backgroundColor: "transparent",
  },
  text: {
    backgroundColor: "transparent",
  },
}));

export const useTypeTextStyles = withStyles(({ colors }) => ({
  primary: {
    color: colors.neutral0,
  },
  secondary: {
    color: colors.mainRed,
  },
  text: {
    color: colors.mainRed,
  },
}));
