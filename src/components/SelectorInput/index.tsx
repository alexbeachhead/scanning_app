import {colors} from '@utils/constants';
import {useEffect, useState} from 'react';
import {FlatList, Pressable, TouchableOpacity, View} from 'react-native';
import {Icon} from '../Icon';
import {Text} from '../Text';

import {Modal} from '../Modal';
import {useStyles} from './styles';

interface IProps {
  title: string;
  itemsList: string[];
  onSelect: (index: number | null) => void;
  disabled?: boolean;
  loadData?: () => Promise<unknown>;
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
    setSelectedItem(prev => (prev === index ? null : index));

    if (selectedItem === index) {
      setSelectedItem(null);
      onSelect(null);
    } else {
      setSelectedItem(index);
      onSelect(index);
      setModalVisible(false);
    }
  };

  const renderItem = ({item, index}: {item: string; index: number}) => (
    <Pressable style={styles.itemContainer} onPress={() => handleSelectItem(index)}>
      <Text variant="Body/Medium/16" color="content4">
        {item}
      </Text>
      {index === selectedItem ? <Icon name="check" /> : <View />}
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
        style={[
          styles.container,
          light && {backgroundColor: colors.foreground},
          disabled && {backgroundColor: colors.content3},
        ]}
        onPress={handleOpenModal}>
        <Text variant="Body/Medium/16" color={typeof selectedItem === 'number' ? 'content1' : 'content4'}>
          {typeof selectedItem === 'number' ? itemsList[selectedItem] : title}
        </Text>
        <Icon name="arrowRight" />
      </TouchableOpacity>
      <Modal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <FlatList data={itemsList} renderItem={renderItem} style={styles.modalInnerContainer} />
      </Modal>
    </>
  );
};
