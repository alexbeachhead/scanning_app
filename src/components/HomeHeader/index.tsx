import {useNavigation} from '@react-navigation/native';
import {Image, Pressable, View} from 'react-native';

import {Text} from '../Text';
import {useStyles} from './styles';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import AppIcon from '../../../assets/appIcon.png';
import {ArrowLeft} from '../Icon/CustomIcon';

interface IProps {
  title?: string;
  subtitle?: string;
  withBackButton?: boolean;
}

export const HomeHeader = ({title, subtitle, withBackButton = false}: IProps) => {
  const styles = useStyles();

  const {goBack} = useNavigation();

  return (
    <View style={styles.container}>
      {withBackButton && (
        <Pressable style={styles.backButton} onPress={goBack}>
          <ArrowLeft color="black" />
        </Pressable>
      )}

      <View style={styles.segmentContentContainer}>
        <Text variant="header" size={28} color="secondaryDarkGrey">
          {title}
        </Text>
        <Text variant="body" size={20} color="secondaryDarkGrey">
          {subtitle}
        </Text>
      </View>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <Image source={AppIcon} style={styles.appIcon} />
    </View>
  );
};
