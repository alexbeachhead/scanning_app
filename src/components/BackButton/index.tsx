import { Pressable } from "react-native";
import { Icon } from "@components";
import { useNavigation } from "@react-navigation/native";

import { useStyles } from "./styles";

interface IProps {
  onGoBack?: () => void;
}

export const BackButton = ({ onGoBack }: IProps) => {
  const styles = useStyles();

  const { goBack } = useNavigation();

  const handleBack = () => {
    if (onGoBack) {
      onGoBack();

      return;
    }

    goBack();
  };

  return (
    <Pressable onPress={handleBack} style={styles.backContainer}>
      <Icon name={"arrowLeft"} />
    </Pressable>
  );
};
