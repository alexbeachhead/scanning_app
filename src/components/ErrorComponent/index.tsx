import {colors} from '@utils/constants';
import {TouchableOpacity, View} from 'react-native';

import {Icon} from '../Icon';
import {Spacer} from '../Spacer';
import {Text} from '../Text';
import {useStyles} from './styles';

type Props = {
  title: string;
  buttonText?: string;
  onPress?: () => void;
  cancelText?: string;
  onCancelPress?: () => void;
  green?: boolean;
};

export const ErrorComponent = ({title, onPress, buttonText, cancelText, onCancelPress, green}: Props) => {
  const styles = useStyles();

  return (
    <View style={[styles.errorContainer, {backgroundColor: green ? colors.success : colors.danger}]}>
      <Icon name={green ? 'errorGreen' : 'error'} />
      <View style={styles.textContainer}>
        <Text variant="Body/Regular/16" color={green ? 'success' : 'danger'}>
          {title}
        </Text>
        {buttonText && (
          <>
            <Spacer size={8} />
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={onPress} style={styles.newBtn}>
                <Text variant="Body/Regular/16" color="foreground">
                  {buttonText}
                </Text>
              </TouchableOpacity>
              {cancelText && (
                <TouchableOpacity onPress={onCancelPress} style={styles.errorEmptyBtn}>
                  <Icon name="xClose" />
                  <Text variant="Body/Regular/16" color="danger" numberOfLines={1} style={{flex: 1}}>
                    {cancelText}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </>
        )}
      </View>
    </View>
  );
};
