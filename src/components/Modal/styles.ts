import { withStyles } from "@utils/hocs/withStyles";

export const useStyles = withStyles(({ colors, height, insets }) => ({
  container: {
    margin: 0,
    justifyContent: "flex-end",
  },
  fullscreen: {
    height: height - insets.top,
  },
  modal: {
    maxHeight: height - insets.top,
    backgroundColor: colors.neutral0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 8,
    paddingBottom: insets.bottom || 16,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  headerContainer: {
    paddingTop: 8,
    paddingBottom: 24,
  },
  header: {
    width: 32,
    height: 3,
    borderRadius: 3,
    backgroundColor: colors.neutral500,
  },
  crossContainer: {
    width: "100%",
    paddingTop: 8,
  },
}));
