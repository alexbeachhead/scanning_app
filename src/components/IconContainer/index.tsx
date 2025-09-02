import { Icon } from "@components";
import { TouchableOpacity, View } from "react-native";
import { useMemo } from "react";
import { colors } from "@utils/constants";

import { useStyles } from "./styles";

type Props = {
  name?: IconName;
  onPress?: () => void;
  type: "white" | "grey" | "lightRed" | "red" | "disabled";
  filter?: boolean;
  children?: React.ReactNode;
  small?: boolean;
};

export const IconContainer = ({ name, onPress, type, filter, children, small }: Props) => {
  const styles = useStyles();

  const backgroundColor = useMemo(() => {
    switch (type) {
      case "white":
        return colors.common.neutral0;
      case "grey":
        return colors.common.mainBackground;
      case "lightRed":
        return colors.common.lightRed;
      case "red":
        return colors.common.mainRed;
      case "disabled":
        return colors.common.disabled;
    }
  }, [type]);

  const width = useMemo(() => (small ? 44 : 52), [small]);

  const height = useMemo(() => (small ? 44 : 52), [small]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { backgroundColor, width, height }]}
    >
      {filter && <View style={filter ? styles.active : null} />}
      {children || <Icon name={name as IconName} />}
    </TouchableOpacity>
  );
};
