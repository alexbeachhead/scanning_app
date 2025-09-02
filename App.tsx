import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {Navigation} from './src/navigation';
import {store} from './src/store';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Rubik-Regular': require('./assets/fonts/Rubik-Regular.ttf'),
    'Rubik-Bold': require('./assets/fonts/Rubik-Bold.ttf'),
    'Rubik-SemiBold': require('./assets/fonts/Rubik-SemiBold.ttf'),
  });
  const onLayoutRootView = useCallback(() => {
    if (fontsLoaded) {
      // eslint-disable-next-line no-void
      void SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.flex} onLayout={onLayoutRootView}>
      <SafeAreaProvider>
        <Provider store={store}>
          <Navigation />
        </Provider>
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {flex: 1},
});
