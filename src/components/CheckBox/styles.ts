import { withStyles } from "@utils/hocs";

export const useStyles = withStyles(({ colors }) => ({
  checkbox: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.iconColor,
  },
  checkedContainer: {
    backgroundColor: colors.mainRed,
    borderColor: colors.mainRed,
    borderWidth: 0,
  },
  uncheckedContainer: {
    backgroundColor: "transparent",
  },
}));
