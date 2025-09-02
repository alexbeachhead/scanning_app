import { PropsWithChildren } from "react";
import { Animated, View } from "react-native";
import RNModal from "react-native-modal";

import { useStyles } from "./styles";
import { Icon } from "../Icon";
import { Text } from "../Text";

interface IProps {
  visible: boolean;
  onClose: () => void;
  backgroundColor?: string;
  title: string;
  subtitle: string;
}

const ANIMATION_DURATION = 300;

export const ModalSuccess = ({
  visible,
  onClose,
  backgroundColor,
  title = "Success",
  subtitle = "Everything is done!",
}: PropsWithChildren<IProps>) => {
  const styles = useStyles();

  return (
    <RNModal
      isVisible={visible}
      animationIn={"slideInUp"}
      animationOut={"slideOutDown"}
      animationInTiming={ANIMATION_DURATION}
      animationOutTiming={ANIMATION_DURATION * 2}
      useNativeDriverForBackdrop={false}
      backdropTransitionOutTiming={0}
      onBackdropPress={onClose}
      style={styles.container}
      swipeDirection={["down"]}
      onSwipeComplete={onClose}
      propagateSwipe={true}
      scrollTo={() => {}}
      scrollOffset={1}
      {...{}}
    >
      <Animated.View
        style={[styles.modal, !!backgroundColor && { backgroundColor: backgroundColor }]}
      >
        <View style={styles.header} />
        <Icon name="checkSuccess" width={44} height={44} />
        <View style={styles.textContainer}>
          <Text variant="Title/Semibold/20" center>
            {title}
          </Text>
          <Text variant="Body/Regular/16" color="secondaryTextColor" center>
            {subtitle}
          </Text>
        </View>
      </Animated.View>
    </RNModal>
  );
};
