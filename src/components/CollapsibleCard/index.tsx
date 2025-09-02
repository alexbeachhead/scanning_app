import {useState} from 'react';
import {Pressable, View} from 'react-native';
import {Divider} from '../Divider';
import {Spacer} from '../Spacer';
import {Text} from '../Text';

import {Icon} from '../Icon';
import {useStyles} from './styles';

interface CollapsibleCardProps {
  title: string;
  phone?: string;
  city?: string;
  address?: string;
  onEyePress?: () => void;
  onTrashPress?: () => void;
}

export const CollapsibleCard = ({title, phone, city, address, onEyePress, onTrashPress}: CollapsibleCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const styles = useStyles();

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={[styles.container]}>
      <Pressable onPress={toggleExpand} style={styles.header}>
        <Text variant="Body/Medium/16" color="content1">
          {title}
        </Text>
        <Icon name={isExpanded ? 'arrowUp' : 'arrowDown'} />
      </Pressable>

      {isExpanded && (
        <View style={styles.content}>
          <Spacer size={12} />
          {phone && (
            <View style={styles.row}>
              <Text variant="Body/Regular/16" color="content4">
                Телефон
              </Text>
              <Text variant="Body/Regular/16" color="content1">
                {phone}
              </Text>
            </View>
          )}
          <Spacer size={8} />
          {city && (
            <View style={styles.row}>
              <Text variant="Body/Regular/16" color="content4">
                Город
              </Text>
              <Text variant="Body/Regular/16" color="content1">
                {city}
              </Text>
            </View>
          )}
          <Spacer size={8} />
          {address && (
            <View style={styles.row}>
              <Text variant="Body/Regular/16" color="content4">
                Адрес
              </Text>
              <Text variant="Body/Regular/16" color="content1" style={{flex: 1, textAlign: 'right'}}>
                {address}
              </Text>
            </View>
          )}
          <Spacer size={12} />
          <Divider />
          <Spacer size={12} />
          <View style={styles.rowCenter}>
            <Icon name="eye" onPress={onEyePress} />
            <Icon name="trash" onPress={onTrashPress} />
          </View>
        </View>
      )}
    </View>
  );
};
