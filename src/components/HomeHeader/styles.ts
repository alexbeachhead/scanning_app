import { withStyles } from "@utils/hocs/withStyles";

export const useStyles = withStyles(({ colors, insets, spacing }) => ({
  container: {
    height: 92 + insets.top,
    backgroundColor: colors.mainBackground,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: spacing.m,
    alignItems: "center",
  },
  segment: {
    // width: width / 2,
    paddingTop: insets.top,
  },
  segmentContentContainer: {
    justifyContent: "center",
  },
  leftSegment: {
    alignItems: "flex-start",
  },
  rightSegment: {
    alignItems: "flex-end",
  },
}));
