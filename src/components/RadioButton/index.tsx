import { View, TouchableOpacity } from "react-native";
import React from "react";
import { Text } from "@components";
import { colors } from "@utils/constants";

import { useStyles } from "./styles";

export const RadioButton = ({
  selected,
  onPress,
  children,
  secondText,
}: {
  selected: boolean;
  onPress: () => void;
  children: React.ReactNode;
  secondText?: string;
}) => {
  const styles = useStyles();

  return (
    <TouchableOpacity style={styles.radioContainer} onPress={onPress}>
      <View
        style={[
          styles.radioOuter,
          {
            borderColor: selected ? colors.common.mainRed : colors.common.iconColor,
            borderWidth: selected ? 7 : 1.5,
          },
        ]}
      >
        {selected && <View style={styles.radioInner} />}
      </View>
      <View style={{ flex: 1 }}>
        <Text variant="Body/Medium/16" style={styles.radioText}>
          {children}
        </Text>
        {secondText && (
          <Text variant="Body/Regular/14" color="secondaryTextColor">
            {secondText}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
