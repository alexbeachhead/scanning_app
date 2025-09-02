import { View } from "react-native";
import React, { JSX } from "react";

import { useStyles } from "./styles";
import { Text } from "../Text";
import { Spacer } from "../Spacer";
import { Icon } from "../Icon";

interface IProps {
  leftSide?: any;
  title?: string | JSX.Element;
  rightSide?: any;
  centerTitle?: string;
  error?: boolean;
}

export const Header = ({ leftSide, title = "", rightSide, centerTitle, error }: IProps) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.leftSide}>{leftSide}</View>
        <Text variant="Headline/Medium/28">{centerTitle}</Text>
        <View style={styles.rightSide}>{rightSide}</View>
      </View>
      <Spacer size={"xs"} />
      {title && (
        <View style={styles.errorContainer}>
          <Text variant="Headline/Medium/28">{title}</Text>
          {error && <Icon name={"error"} />}
        </View>
      )}
      <Spacer size={"xs"} />
    </View>
  );
};
