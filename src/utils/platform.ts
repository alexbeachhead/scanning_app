import {Platform} from 'react-native';

export const isWeb = Platform.OS === 'web';
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

// Web-specific utilities
export const getWebKeyboardOffset = () => (isWeb ? 0 : 80);
export const getWebKeyboardBehavior = () => (isWeb ? 'height' : 'padding');

// Web-safe touch handling
export const getWebTouchProps = () => {
  if (isWeb) {
    return {
      onMouseDown: () => {},
      onMouseUp: () => {},
      onMouseEnter: () => {},
      onMouseLeave: () => {},
    };
  }
  return {};
};

// Web-safe animation
export const getWebAnimationConfig = () => {
  if (isWeb) {
    return {
      useNativeDriver: false,
    };
  }
  return {
    useNativeDriver: true,
  };
};
