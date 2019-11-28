import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { SafeAreaView, StatusBar, Platform } from 'react-native';
import Routes from './Routes';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAssets = async () => {
      await Font.loadAsync({
        'Pangram': require('./assets/fonts/Pangram-Regular.otf'),
        'CustomIcons': require('./assets/fonts/icomoon.ttf')
      });
      setLoading(false);
    };

    loadAssets();
  }, []);

  return (
    !loading ?
      <SafeAreaView style={{
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
      }}>
        <Routes />
      </SafeAreaView>
      : null
  );
}
