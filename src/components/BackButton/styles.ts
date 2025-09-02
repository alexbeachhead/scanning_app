import { withStyles } from "@utils/hocs/withStyles";

export const useStyles = withStyles(({ colors }) => ({
  backContainer: {
    height: "100%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  backText: {
    color: colors.neutral0,
    fontSize: 16,
    lineHeight: 20.48,
    fontWeight: "500",
  },
}));
