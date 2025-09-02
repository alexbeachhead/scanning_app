import { Text as RNText, TextProps } from "react-native";
import { PropsWithChildren } from "react";
import { useColors } from "@utils/hooks/useColors";
import { colors } from "@utils/constants";

import { TextVariant, useStyles } from "./styles";

interface IProps extends PropsWithChildren {
  variant: TextVariant;
  color?: keyof typeof colors.common;
  center?: boolean;
  style?: TextProps["style"];
  numberOfLines?: number;
  onPress?: () => void;
}

export const Text = ({
  children,
  variant,
  color = "primaryTextColor",
  center = false,
  style,
  numberOfLines = undefined,
  onPress,
}: IProps) => {
  const styles = useStyles();
  const colors = useColors();

  return (
    <RNText
      style={[
        { color: colors.common[color] },
        center && { textAlign: "center" },
        styles[variant],
        style,
      ]}
      numberOfLines={numberOfLines}
      onPress={onPress}
    >
      {children}
    </RNText>
  );
};
