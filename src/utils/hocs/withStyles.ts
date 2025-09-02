import {
  ImageStyle,
  StyleProp,
  TextStyle,
  useColorScheme,
  useWindowDimensions,
  ViewStyle,
} from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import { useMemo } from "react";
import { useColors } from "@utils/hooks/useColors";
import { spacing } from "@utils/constants/spacing";
import { typography } from "@utils/constants/typography";

interface StyleParams {
  insets: EdgeInsets;
  width: number;
  height: number;
  isDarkTheme: boolean;
  colors: ReturnType<typeof useColors>;
  spacing: typeof spacing;
  typography: typeof typography;
}

type NamedStyle<T> = { [P in keyof T]: StyleProp<ViewStyle | TextStyle | ImageStyle> };

type StyleCallback<T> = (params: StyleParams) => NamedStyle<T>;

export const withStyles =
  <T>(styles: StyleCallback<T>) =>
  () => {
    const colors = useColors();
    const insets = useSafeAreaInsets();
    const isDarkTheme = useColorScheme() === "dark";
    const { width, height } = useWindowDimensions();

    return useMemo(
      () => styles({ width, height, insets, isDarkTheme, colors, spacing, typography }),
      [width, height, insets, isDarkTheme, colors]
    );
  };
