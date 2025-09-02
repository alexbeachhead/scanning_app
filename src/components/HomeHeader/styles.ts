import {withStyles} from '@utils/hocs/withStyles';
import {Platform} from 'react-native';

export const useStyles = withStyles(({insets, spacing}) => ({
  container: {
    height: Platform.OS === 'ios' ? 92 + insets.top / 2 : 92 + insets.top,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    marginTop: spacing.l * 2,
  },
  segmentContentContainer: {
    justifyContent: 'center',
  },
  leftSegment: {
    alignItems: 'flex-start',
  },
  rightSegment: {
    alignItems: 'flex-end',
  },
  appIcon: {
    width: 73,
    height: 73,
    marginRight: -14,
    marginTop: -14,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: -16,
  },
}));
