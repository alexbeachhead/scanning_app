import { withStyles } from "@utils/hocs/withStyles";

export const useStyles = withStyles(({ colors, spacing }) => ({
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.iconColor,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.xs,
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 6,
    backgroundColor: colors.mainBackground,
  },
  radioText: {
    flex: 1,
  },
  radioGroup: {
    marginVertical: spacing.m,
  },
}));
