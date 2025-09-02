import { FlatList, Pressable, TouchableOpacity, View } from "react-native";
import { Icon, Text } from "@components";
import { useEffect, useState } from "react";
import { colors } from "@utils/constants";

import { useStyles } from "./styles";
import { Modal } from "../Modal";

interface IProps {
  title: string;
  itemsList: string[];
  onSelect: (index: number | null) => void;
  disabled?: boolean;
  loadData?: () => Promise<any>;
  value: number | null;
  light?: boolean;
}

export const SelectorInput = ({
  title,
  itemsList,
  onSelect,
  disabled = false,
  loadData,
  value = null,
  light = false,
}: IProps) => {
  const styles = useStyles();

  const [modalVisible, setModalVisible] = useState(false);

  const [selectedItem, setSelectedItem] = useState<null | number>(null);

  useEffect(() => {
    setSelectedItem(value);
  }, [value]);

  const handleSelectItem = (index: number) => {
    setSelectedItem((prev) => (prev === index ? null : index));

    if (selectedItem === index) {
      setSelectedItem(null);
      onSelect(null);
    } else {
      setSelectedItem(index);
      onSelect(index);
      setModalVisible(false);
    }
  };

  const renderItem = ({ item, index }: { item: string; index: number }) => (
    <Pressable style={styles.itemContainer} onPress={() => handleSelectItem(index)}>
      <Text variant="Body/Medium/16" color="neutral600">
        {item}
      </Text>
      {index === selectedItem ? <Icon name={"check"} /> : <View />}
    </Pressable>
  );

  const handleOpenModal = async () => {
    if (!disabled && loadData) {
      loadData && (await loadData());
      setModalVisible(true);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.container, light && { backgroundColor: colors.common.neutral0 }, disabled && { backgroundColor: colors.common.disabled }]}
        onPress={handleOpenModal}
      >
        <Text
          variant="Body/Medium/16"
          color={typeof selectedItem === "number" ? "neutral900" : "neutral600"}
        >
          {typeof selectedItem === "number" ? itemsList[selectedItem] : title}
        </Text>
        <Icon name={"arrowRight"} />
      </TouchableOpacity>
      <Modal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <FlatList data={itemsList} renderItem={renderItem} style={styles.modalInnerContainer} />
      </Modal>
    </>
  );
};
