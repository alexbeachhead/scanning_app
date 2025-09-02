import {useNavigation} from '@react-navigation/native';
import {Pressable, View} from 'react-native';

import {IconContainer} from '../IconContainer';
import {Text} from '../Text';
import {useStyles} from './styles';

interface IProps {
  title?: string;
}

export const HomeHeader = ({title}: IProps) => {
  const styles = useStyles();

  const {navigate} = useNavigation();

  const onNotificationPress = () => {
    // TODO: Implement Notifications stack when it's added to navigation
    // navigate(Stacks.Notifications);
  };
  // const handleProfile = () => {
  //   navigate(Stacks.Profile, { screen: Stacks.Profile });
  // };

  return (
    <View style={styles.container}>
      {/* <View style={styles.segment}>
        <Pressable
          style={[styles.segmentContentContainer, styles.leftSegment]}
          onPress={handleProfile}
        >
          <Icon name={"profile"} />
        </Pressable>
      </View> */}
      <View style={styles.segment}>
        <Pressable style={styles.segmentContentContainer}>
          <Text variant="Headline/Medium/28">{title}</Text>
        </Pressable>
      </View>
      <View style={styles.segment}>
        {/* <Pressable
          style={[styles.segmentContentContainer, styles.rightSegment, styles.bellContainer]}
          onPress={handleNotifications}
        >
          <Icon name={"bell"} />
        </Pressable> */}
        <IconContainer name="bell" onPress={onNotificationPress} type="white" />
      </View>
    </View>
  );
};
