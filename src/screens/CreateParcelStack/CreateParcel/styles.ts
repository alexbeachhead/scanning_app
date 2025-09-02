import { withStyles } from "@utils/hocs/withStyles";

export const useStyles = withStyles(({ colors, spacing }) => ({
  container: {
    flex: 1,
    backgroundColor: colors.mainBackground,
    paddingHorizontal: spacing.m,
  },
  navigationContainer: {
    backgroundColor: colors.neutral0,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 16,
  },
  rowCenterGap: { flexDirection: "row", alignItems: "center", gap: 8 },
}));
