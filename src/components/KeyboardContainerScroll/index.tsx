import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { PropsWithChildren } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export const KeyboardContainerScroll = ({ children }: PropsWithChildren) => (
  <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  </KeyboardAwareScrollView>
);
