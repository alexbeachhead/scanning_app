import { TextStyle } from "react-native";

export type Size = "xxl" | "xl" | "l" | "m" | "s" | "xs" | "xxs";
export type Weight = "regular" | "medium" | "bold";

export const typography = {
  sizes: ["xxl", "xl", "l", "m", "s", "xs", "xxs"] as Size[],
  size: {
    xxl: 34,
    xl: 24,
    l: 20,
    m: 16,
    s: 14,
    xs: 12,
    xxs: 10,
  } as Record<Size, number>,
  weight: {
    regular: "400",
    medium: "500",
    bold: "700",
  } as Record<Weight, TextStyle["fontWeight"]>,
  height: {
    xxl: 44.2,
    xl: 31.2,
    l: 26,
    m: 24,
    s: 21,
    xs: 18,
    xxs: 15,
  },
};
