import {colors} from '@utils/constants';
import React from 'react';
import {Dimensions, Platform, StyleSheet, Text, View} from 'react-native';

interface WebContainerProps {
  children: React.ReactNode;
}

const MOBILE_WIDTH = 375; // Standard mobile width (iPhone X/11/12/13 width)
const MOBILE_HEIGHT = 812; // Standard mobile height (iPhone X/11/12/13 height)

export const WebContainer: React.FC<WebContainerProps> = ({children}) => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  // On native mobile platforms (iOS/Android), always use mobile container
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    return <View style={styles.mobileContainer}>{children}</View>;
  }

  // On web with small screens, use mobile container with web-specific overrides
  if (Platform.OS === 'web' && screenWidth <= MOBILE_WIDTH) {
    return (
      <View
        style={[
          styles.mobileContainer,
          Platform.OS === 'web' && {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            overflow: 'visible' as any,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            minHeight: '100vh' as any,
          },
        ]}>
        {children}
      </View>
    );
  }

  // On larger web screens but simulating mobile (like browser dev tools)
  // or on tablets in portrait mode, use scrollable frame
  const isMobileSimulation = Platform.OS === 'web' && screenWidth <= 768;

  const dynamicFrameStyle = isMobileSimulation
    ? {
        ...styles.mobileFrameScrollable,
        ...(Platform.OS === 'web' && {
          maxHeight: Math.min(screenHeight * 0.95, screenHeight - 40),
        }),
      }
    : styles.mobileFrame;

  // On larger screens, center the mobile-sized app
  return (
    <View style={styles.webContainer}>
      <View style={dynamicFrameStyle}>
        <View style={styles.statusBar} />
        {children}
      </View>
      <View style={styles.webInfo}>
        <Text style={styles.webInfoText}>Himfluence - Habit Tracker</Text>
        <Text style={styles.webInfoSubtext}>Web Version</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...(Platform.OS === 'web' &&
      ({
        minHeight: '100vh',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)),
  },
  mobileFrame: {
    width: MOBILE_WIDTH,
    height: MOBILE_HEIGHT,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
    // Web-specific shadow
    ...(Platform.OS === 'web' &&
      ({
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)),
  },
  mobileFrameScrollable: {
    width: MOBILE_WIDTH,
    minHeight: MOBILE_HEIGHT,
    backgroundColor: colors.background,
    borderRadius: 20,
    overflow: 'visible',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
    // Web-specific properties
    ...(Platform.OS === 'web' &&
      ({
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        overflowY: 'auto',
        maxHeight: '90vh',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)),
  },
  mobileContainer: {
    flex: 1,
  },
  statusBar: {
    width: '100%',
  },
  webInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
  webInfoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  webInfoSubtext: {
    fontSize: 14,
    color: '#666',
  },
});
