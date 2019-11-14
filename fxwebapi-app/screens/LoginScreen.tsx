import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { UIBtn } from '../components/Buttons';
import { UICheckbox } from '../components/Checkbox';
import { UIInput } from '../components/Inputs';
import { UIFlagPicker } from '../components/FlagPicker';
import { text, colors } from '../styles';

const languages = [
  {value: 'en', label: 'EN', image: '../images/flags/united-kingdom.png'},
  {value: 'pl', label: 'PL', image: '../images/flags/republic-of-poland.png'}
];
const flagImages = [
  (props) => <Image source={require('../images/flags/united-kingdom.png')} {...props} />,
  (props) => <Image source={require('../images/flags/republic-of-poland.png')} {...props} />
]

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTOS, setAgreeTOS] = useState(true);
  const [language, setLanguage] = useState({value: 'en', pos: 0});

  return (
    <View style={styles.container}>
      <UIFlagPicker 
        onValueChange={(value, pos) => setLanguage({value, pos})}
        selectedValue={language.value}
        image={flagImages[language.pos]}
        items={languages}
      />
      <Text style={[
        text.h1,
        {
          textAlign: 'left',
          alignSelf: 'stretch',
          paddingVertical: 24
        }
      ]}>Login to Trade</Text>
      <UIInput label='Email or user name' value={username} type='text'
        onChangeText={(text) => setUsername(text)} />
      <UIInput label='password' value={password} type='password'
        onChangeText={(text) => setPassword(text)} />
      <TouchableOpacity style={{
        flex: 0,
        flexDirection: 'row',
        marginTop: 18,
        marginBottom: 35,
        alignContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'flex-start'
      }} onPress={() => setAgreeTOS(!agreeTOS)}>
        <UICheckbox checked={agreeTOS} onPress={() => setAgreeTOS(!agreeTOS)} />
        <Text style={[
          text.p,
          {
            textAlign: 'left',
            paddingLeft: 11
          }
        ]}>I agree on Terms and Conditions</Text>
      </TouchableOpacity>
      <UIBtn type='primary' size='lg' title='Sign in' style={{
        alignSelf: 'stretch',
        width: 'auto'
      }}></UIBtn>

      <TouchableOpacity style={{
        marginTop: 24,
        alignSelf: 'flex-start'
      }}>
        <Text style={[
          text.p,
          {
            color: colors.inactiveIcons,
            textAlign: 'left',
          }
        ]}>Forgot password?</Text>
      </TouchableOpacity>
    </View>
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