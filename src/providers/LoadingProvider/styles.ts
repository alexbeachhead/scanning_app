import {withStyles} from '../../utils/hocs/withStyles';

export const useStyles = withStyles(({}) => ({
  container: {flex: 1},
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  contentContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },
  spinnerContainer: {
    zIndex: 11,
  },
  spinner: {width: 120, height: 120},
}));
