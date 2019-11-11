import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { UIBtn } from './components/Buttons';

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
    <View style={styles.container}>
      <Text style={{
        fontFamily: 'Pangram'
      }}>Open up App.tsx to test working on your app!</Text>
      <UIBtn type='secondary' size='lg' title='Lorem ipsum'></UIBtn>
    </View>
    : null
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
