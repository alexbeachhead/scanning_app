import React, { useState } from "react";
import { TouchableOpacity, Text, View, ViewStyle, ImageStyle, StyleProp, TextStyle } from "react-native";
import * as Icons from "@assets/icons";

import { Icon } from "../Icon";
import { useStyles, useTypeStyles, useTypeTextStyles } from "./styles";

type ButtonType = "primary" | "secondary" | "text";

interface CustomButtonProps {
  text: string;
  type?: ButtonType;
  disabled?: boolean;
  onPress: () => void;
  leftIcon?: keyof typeof Icons;
  rightIcon?: keyof typeof Icons;
  style?: StyleProp<ViewStyle | TextStyle | ImageStyle>;
}

export const Button: React.FC<CustomButtonProps> = ({
  text,
  type = "primary",
  disabled = false,
  onPress,
  leftIcon,
  rightIcon,
  style,
}) => {
  const styles = useStyles();
  const typeStyles = useTypeStyles();
  const typeTextStyles = useTypeTextStyles();
  const [pressed, setPressed] = useState(false);

  const handlePressIn = () => setPressed(true);
  const handlePressOut = () => setPressed(false);

  return (
    <TouchableOpacity
      style={[
        styles.button,
        typeStyles[type],
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={styles.buttonContent}>
        {leftIcon && <Icon name={leftIcon} />}
        <Text
          style={[
            styles.text,
            typeTextStyles[type],
            pressed && !disabled && styles.pressedText,
            disabled && styles.disabledText,
          ]}
        >
          {text}
        </Text>
        {rightIcon && <Icon name={rightIcon} />}
      </View>
    </TouchableOpacity>
  );
};
