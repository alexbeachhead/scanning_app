import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from "react-native";
import { PropsWithChildren } from "react";
import { colors } from "@utils/constants";

export const KeyboardContainer = ({ children }: PropsWithChildren) => (
  <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : undefined}
    style={{ flex: 1, backgroundColor: colors.common.neutral100_1, width: "100%" }}
    keyboardVerticalOffset={Platform.select({
      ios: 100,
      android: 80,
    })}
    enabled
  >
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);
