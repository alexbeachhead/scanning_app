import { PropsWithChildren, useEffect, useState } from "react";
import { Animated, Pressable, StyleProp, View, ViewStyle } from "react-native";
import RNModal, { Direction, ModalProps } from "react-native-modal";
import { useAppSelector } from "@store";
import { LoadingProvider } from "@providers";

import { useStyles } from "./styles";
import { Icon } from "../Icon";
import { KeyboardContainer } from "../KeyboardContainer";

interface IProps {
  visible: boolean;
  onClose: () => void;
  backgroundColor?: string;
  fullscreen?: boolean;
  withCross?: boolean;
  withKeyboard?: boolean;
  withBackdrop?: boolean;
  stylesGet?: StyleProp<ViewStyle>;
  withSwipe?: boolean;
  barClose?: boolean;
}

const ANIMATION_DURATION = 300;

export const Modal = ({
  visible,
  onClose,
  children,
  backgroundColor,
  fullscreen = true,
  withCross = false,
  withKeyboard = true,
  withBackdrop = true,
  stylesGet,
  withSwipe = true,
  barClose = false,
}: PropsWithChildren<IProps>) => {
  const styles = useStyles();

  const { loading: authLoading } = useAppSelector((store) => store.auth);

  const [loadingVisible, setLoadingVisible] = useState(true);

  useEffect(() => {
    setLoadingVisible(authLoading);
  }, [authLoading]);

  const handleKeyboard = () => {
    if (withKeyboard) {
      return <KeyboardContainer>{children}</KeyboardContainer>;
    } else {
      return children;
    }
  };

  const commonOptions: Partial<ModalProps> = {
    animationInTiming: ANIMATION_DURATION,
    animationOutTiming: ANIMATION_DURATION * 2,
    useNativeDriverForBackdrop: false,
    backdropTransitionOutTiming: 0,
    style: styles.container,
    propagateSwipe: true,
    scrollOffset: 1,
    statusBarTranslucent: true,
  };

  const withSwipeOptions = {
    swipeDirection: ["down"] as unknown as Direction,
  };

  return (
    <RNModal
      style={stylesGet}
      isVisible={visible}
      animationIn={"slideInUp"}
      animationOut={"slideOutDown"}
      onBackdropPress={onClose}
      backdropColor={withBackdrop ? undefined : "transparent"}
      onSwipeComplete={onClose}
      {...commonOptions}
      {...{}}
      {...(withSwipe ? withSwipeOptions : {})}
    >
      <Animated.View
        style={[
          fullscreen && styles.fullscreen,
          styles.modal,
          !!backgroundColor && { backgroundColor: backgroundColor },
        ]}
      >
        {!withCross ? (
          <Pressable style={styles.headerContainer} onPress={barClose ? () => onClose() : () => null}>
            <View style={styles.header} />
          </Pressable>
        ) : (
          <View style={styles.crossContainer}>
            <Pressable onPress={onClose}>
              <Icon name={"crossDark"} />
            </Pressable>
          </View>
        )}
        {handleKeyboard()}
      </Animated.View>
      <RNModal
        isVisible={loadingVisible}
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        onBackdropPress={() => setLoadingVisible(false)}
        backdropColor={"transparent"}
        onSwipeComplete={() => setLoadingVisible(false)}
        {...commonOptions}
        {...{}}
      >
        <LoadingProvider loading={loadingVisible} />
      </RNModal>
    </RNModal>
  );
};
