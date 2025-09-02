import { withStyles } from "@utils/hocs/withStyles";
import { TextStyle } from "react-native";

export type TextVariant =
  | "Headline/Regular/28"
  | "Headline/Regular/24"
  | "Title/Regular/20"
  | "Body/Regular/16"
  | "Body/Regular/14"
  | "Caption/Regular/12"
  | "Headline/Medium/28"
  | "Headline/Medium/24"
  | "Title/Medium/20"
  | "Body/Medium/16"
  | "Body/Medium/14"
  | "Caption/Medium/12"
  | "Headline/Semibold/28"
  | "Headline/Semibold/24"
  | "Title/Semibold/20"
  | "Body/Semibold/16"
  | "Body/Semibold/14"
  | "Caption/Semibold/12";

type TextStyles = Record<TextVariant, TextStyle>;

export const useStyles = withStyles(
  ({}) =>
    ({
      "Headline/Regular/28": {
        fontSize: 28,
        lineHeight: 36.4,
        fontWeight: "400",
        fontFamily: "Gilroy-Regular",
      },
      "Headline/Regular/24": {
        fontSize: 24,
        lineHeight: 31.2,
        fontWeight: "400",
        fontFamily: "Gilroy-Regular",
      },
      "Title/Regular/20": {
        fontSize: 20,
        lineHeight: 26,
        fontWeight: "400",
        fontFamily: "Gilroy-Regular",
      },
      "Body/Regular/16": {
        fontSize: 16,
        lineHeight: 22.4,
        fontWeight: "400",
        fontFamily: "Gilroy-Regular",
      },
      "Body/Regular/14": {
        fontSize: 14,
        lineHeight: 19.6,
        fontWeight: "400",
        fontFamily: "Gilroy-Regular",
      },
      "Caption/Regular/12": {
        fontSize: 12,
        lineHeight: 18,
        fontWeight: "400",
        fontFamily: "Gilroy-Regular",
      },
      "Headline/Medium/28": {
        fontSize: 28,
        lineHeight: 36.4,
        fontWeight: "500",
        fontFamily: "Gilroy-Medium",
      },
      "Headline/Medium/24": {
        fontSize: 24,
        lineHeight: 31.2,
        fontWeight: "500",
        fontFamily: "Gilroy-Medium",
      },
      "Title/Medium/20": {
        fontSize: 20,
        lineHeight: 26,
        fontWeight: "500",
        fontFamily: "Gilroy-Medium",
      },
      "Body/Medium/16": {
        fontSize: 16,
        lineHeight: 22.4,
        fontWeight: "500",
        fontFamily: "Gilroy-Medium",
      },
      "Body/Medium/14": {
        fontSize: 14,
        lineHeight: 19.6,
        fontWeight: "500",
        fontFamily: "Gilroy-Medium",
      },
      "Caption/Medium/12": {
        fontSize: 12,
        lineHeight: 18,
        fontWeight: "500",
        fontFamily: "Gilroy-Medium",
      },
      "Headline/Semibold/28": {
        fontSize: 28,
        lineHeight: 36.4,
        fontWeight: "600",
        fontFamily: "Gilroy-SemiBold",
      },
      "Headline/Semibold/24": {
        fontSize: 24,
        lineHeight: 31.2,
        fontWeight: "600",
        fontFamily: "Gilroy-SemiBold",
      },
      "Title/Semibold/20": {
        fontSize: 20,
        lineHeight: 26,
        fontWeight: "600",
        fontFamily: "Gilroy-SemiBold",
      },
      "Body/Semibold/16": {
        fontSize: 16,
        lineHeight: 22.4,
        fontWeight: "600",
        fontFamily: "Gilroy-SemiBold",
      },
      "Body/Semibold/14": {
        fontSize: 14,
        lineHeight: 19.6,
        fontWeight: "600",
        fontFamily: "Gilroy-SemiBold",
      },
      "Caption/Semibold/12": {
        fontSize: 12,
        lineHeight: 18,
        fontWeight: "600",
        fontFamily: "Gilroy-SemiBold",
      },
    }) as TextStyles
);
