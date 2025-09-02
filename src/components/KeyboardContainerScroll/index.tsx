import {PropsWithChildren} from 'react';
import {Keyboard, TouchableWithoutFeedback, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export const KeyboardContainerScroll = ({children}: PropsWithChildren) => (
  <KeyboardAwareScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{flex: 1}}>{children}</View>
    </TouchableWithoutFeedback>
  </KeyboardAwareScrollView>
);
