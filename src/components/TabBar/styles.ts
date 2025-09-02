import { withStyles } from "@utils/hocs/withStyles";
import { Platform } from "react-native";

export const useStyles = withStyles(({ colors, insets, spacing }) => ({
  container: {
    height: 51 + insets.bottom + (Platform.OS === "android" ? spacing.s : 0),
    flexDirection: "row",
    backgroundColor: colors.neutral0,
    justifyContent: "space-between",
  },
  itemWrapper: {
    alignItems: "center",
    gap: 4,
    paddingTop: 10,
    flex: 1,
  },
  itemText: {
    fontWeight: "500",
    fontSize: 10,
    lineHeight: 15,
    color: colors.neutral600,
  },
  activeText: {
    color: colors.blue500,
  },
}));
