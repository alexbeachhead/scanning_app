import { withStyles } from "@utils/hocs/withStyles";

export const useStyles = withStyles(({ colors, spacing }) => ({
  container: {
    flex: 1,
    backgroundColor: colors.mainBackground,
    paddingHorizontal: spacing.m,
    paddingBottom: spacing.m,
    justifyContent: "space-between",
    gap: 16,
  },
  navigationContainer: {
    backgroundColor: colors.neutral0,
    padding: 16,
    borderRadius: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  divider: {
    height: 1,
    backgroundColor: colors.neutral200,
    marginVertical: 16,
  },
}));
