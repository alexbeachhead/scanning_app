import { View, TouchableOpacity } from "react-native";
import { colors } from "@utils/constants";

import { useStyles } from "./styles";
import { Icon } from "../Icon";
import { Spacer } from "../Spacer";
import { Text } from "../Text";

type Props = {
  title: string;
  buttonText?: string;
  onPress?: () => void;
  cancelText?: string;
  onCancelPress?: () => void;
  green?: boolean;
};

export const ErrorComponent = ({
  title,
  onPress,
  buttonText,
  cancelText,
  onCancelPress,
  green,
}: Props) => {
  const styles = useStyles();

  return (
    <View
      style={[
        styles.errorContainer,
        { backgroundColor: green ? colors.common.lightGreenInfo : colors.common.lightRed },
      ]}
    >
      <Icon name={green ? "errorGreen" : "error"} />
      <View style={styles.textContainer}>
        <Text variant="Body/Regular/16" color={green ? "mainGreen" : "mainRed"}>
          {title}
        </Text>
        {buttonText && (
          <>
            <Spacer size={8} />
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={onPress} style={styles.newBtn}>
                <Text variant="Body/Regular/16" color="neutral0">
                  {buttonText}
                </Text>
              </TouchableOpacity>
              {cancelText && (
                <>
                  <TouchableOpacity onPress={onCancelPress} style={styles.errorEmptyBtn}>
                    <Icon name="xClose" />
                    <Text
                      variant="Body/Regular/16"
                      color="mainRed"
                      numberOfLines={1}
                      style={{ flex: 1 }}
                    >
                      {cancelText}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </>
        )}
      </View>
    </View>
  );
};
