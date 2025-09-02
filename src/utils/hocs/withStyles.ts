import {spacing} from '@utils/constants/spacing';
import {typography} from '@utils/constants/typography';
import {useColors} from '@utils/hooks/useColors';
import {useMemo} from 'react';
import {ImageStyle, Platform, StyleProp, TextStyle, useColorScheme, useWindowDimensions, ViewStyle} from 'react-native';
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context';

interface StyleParams {
  insets: EdgeInsets;
  width: number;
  height: number;
  isDarkTheme: boolean;
  colors: ReturnType<typeof useColors>;
  spacing: typeof spacing;
  typography: typeof typography;
}

type NamedStyle<T> = {[P in keyof T]: StyleProp<ViewStyle | TextStyle | ImageStyle>};

type StyleCallback<T> = (params: StyleParams) => NamedStyle<T>;

export const withStyles =
  <T>(styles: StyleCallback<T>) =>
  () => {
    const colors = useColors();
    const rawInsets = useSafeAreaInsets();
    const isDarkTheme = useColorScheme() === 'dark';
    const {width, height} = useWindowDimensions();

    // Ensure proper bottom insets across platforms to prevent button cutoff
    const insets = useMemo(() => {
      let minBottomInset = 0; // Default minimum padding

      // Adjust based on platform and screen size
      if (Platform.OS === 'web') {
        // For web mobile simulation, ensure adequate bottom spacing
        console.log(123);

        if (width <= 768) {
          minBottomInset = 68; // Extra padding for mobile web
        }
      }

      return {
        ...rawInsets,
        bottom: Math.max(rawInsets.bottom, minBottomInset),
      };
    }, [rawInsets, width]);

    return useMemo(
      () => styles({width, height, insets, isDarkTheme, colors, spacing, typography}),
      [width, height, insets, isDarkTheme, colors],
    );
  };
