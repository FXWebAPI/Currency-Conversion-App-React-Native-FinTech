import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { View } from 'react-native';
import LoginScreen from './screens/LoginScreen';

export default function App() {
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const loadAssets = async () => {
      await Font.loadAsync({
        'Pangram': require('./assets/fonts/Pangram-Regular.otf'),
      });
      setLoading(false);
    };

    loadAssets();
  }, []);

  return (
    !loading ?
    <View style={{
      flex: 1
    }}>
      <LoginScreen />
    </View>
    : null
  );
}
