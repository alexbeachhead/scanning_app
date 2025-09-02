import { spacing } from "@utils/constants/spacing";
import { View } from "react-native";

interface IProps {
  isHorizontal?: boolean;
  size: keyof typeof spacing | number;
}

export const Spacer = ({ size, isHorizontal = true }: IProps) => (
  <View
    style={
      isHorizontal
        ? {
            width: "100%",
            height: typeof size === "number" ? size : spacing[size],
          }
        : {
            height: "100%",
            width: typeof size === "number" ? size : spacing[size],
          }
    }
  />
);
