import { Icon } from "@components";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import { useEffect, useState } from "react";

import { useStyles } from "./styles";

export const CheckBox = ({
  onChange,
  checkedInitial = false,
  style,
}: {
  onChange: (val: boolean) => void;
  checkedInitial?: boolean;
  style?: StyleProp<ViewStyle>;
}) => {
  const styles = useStyles();
  const [checked, setChecked] = useState(checkedInitial);

  const handleChange = () => {
    setChecked(!checked);
    onChange(!checked);
  };

  useEffect(() => {
    setChecked(checkedInitial);
  }, [checkedInitial]);

  return (
    <Pressable
      onPress={handleChange}
      style={[
        style,
        styles.checkbox,
        checked ? styles.checkedContainer : styles.uncheckedContainer,
      ]}
    >
      {checked && <Icon name={"checkBoxMark"} width={30} height={30} />}
    </Pressable>
  );
};
