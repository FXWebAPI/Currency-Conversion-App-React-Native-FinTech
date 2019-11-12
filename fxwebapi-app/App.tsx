import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { UIBtn } from './components/Buttons';
import { UICheckbox } from './components/Checkbox';
import { UIInput } from './components/Inputs';
import { text } from './styles';

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
      <Text style={[
        text.h1,
        {
          textAlign: 'left',
          alignSelf: 'stretch',
          paddingVertical: 24
        }
      ]}>Login to Trade</Text>
      <UIInput label='Email or user name' value='johnwilliamdoe@gmail.com' type='text' onChangeText={() => {}} />
      <UIInput label='password' value='abcdefg' type='password' onChangeText={() => {}} />
      <View style={{
        flex: 0,
        flexDirection: 'row',
        paddingTop: 18,
        paddingBottom: 35,
        alignContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'flex-start'
      }}>
        <UICheckbox checked={true} onPress={() => console.log('Pressed')} />
        <Text style={[
          text.p,
          {
            textAlign: 'left',
            paddingLeft: 11
          }
        ]}>I agree on Terms and Conditions</Text>
      </View>
      <UIBtn type='primary' size='lg' title='Sign in' style={{
        alignSelf: 'stretch',
        width: 'auto'
      }}></UIBtn>
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
    padding: 16,
  },
});
