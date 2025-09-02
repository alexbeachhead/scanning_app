import { Sizes } from "@utils/constants";
import { withStyles } from "@utils/hocs/withStyles";

export const useStyles = withStyles(({ colors, spacing }) => ({
  container: {
    flex: 1,
    backgroundColor: colors.mainBackground,
    paddingHorizontal: spacing.m,
    paddingBottom: spacing.m,
  },
  emptyDeclarantsContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: Sizes.height * 0.1,
  },
  btn: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
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
