import { withStyles } from "@utils/hocs/withStyles";

export const useStyles = withStyles(({ spacing, colors }) => ({
  container: {
    borderRadius: 16,
    padding: spacing.s,

    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundColor: colors.common.mainRed,
    width: 6,
    height: 6,
    borderRadius: 6,
    position: "absolute",
    top: 14,
    right: 13,
  },
}));
