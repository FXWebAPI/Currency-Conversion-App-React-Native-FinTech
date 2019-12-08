import React, { useState } from 'react';
import { TextInputMask } from 'react-native-masked-text';
import { View, Text } from 'react-native';
import { colors } from '../styles';

interface CurrencyInputProps {
  type: string;
  currencySymbol?: '€' | '$' | '£';
  value: string;
  onChange: (text: string, rawText: string) => any;
  disabled?: boolean;
  color?: string;
}

const CurrencyInput = (props: CurrencyInputProps) => {
  const [ focused, setFocused ] = useState(false);
  let options;
  if (props.currencySymbol) {
    options = {
      precision: 2,
      separator: '.',
      delimiter: ',',
      unit: props.currencySymbol,
    };
  }
  else {
    options = {
      precision: 5,
      separator: '.',
      delimiter: ',',
      unit: '',
    }
  }
  

  return (
    <View style={{
      flex: 0,
      flexDirection: 'row',
      position: 'relative'
    }}>
      <TextInputMask
        type='money'
        options={options}
        value={props.value}
        placeholder={'0'}
        includeRawValueInChangeText
        onChangeText={(text, rawText) => props.onChange(text, rawText)}
        style={{
          fontSize: 40,
          fontFamily: 'Pangram',
          color: colors.textPrimary,
          backgroundColor: focused ? colors.inputFocused : (props.color || '#E5E8EB'),
          flex: 1,
          padding: 16,
          alignSelf: 'stretch',
          textAlign: 'right',
          borderRadius: 4,
        }}
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
        editable={!props.disabled}
      />
      <Text style={{
        position: 'absolute',
        top: 12,
        left: 12,
        fontSize: 14,
        color: '#949494',
        fontFamily: 'Roboto'
      }}>{props.type}</Text>
    </View>
  );
};

export { CurrencyInput };