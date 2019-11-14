import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated } from 'react-native';
import { input, colors } from '../styles';
import { MaterialIcons } from '@expo/vector-icons';

interface UIInputProps {
  label: string,
  value: string,
  type: string,
  onChangeText: (text: string) => void;
}

const UIInput = (props: UIInputProps) => {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(true);
  const placeholderTop = new Animated.Value(22);

  useEffect(() => {
    Animated.spring(placeholderTop, {
      toValue: focused ? 9 : 22,
    }).start();
  }, [focused]);

  return (
    <View style={[
      input.container,
      focused ? input.containerFocus : {}
    ]}>
      {
        !focused && props.value ? null :
          <Animated.Text style={{
            ...input.labelBase,
            ...(focused ? input.labelFocus : {}),
            top: placeholderTop
          }}>
            {props.label}
          </Animated.Text>
      }
      <TextInput
        value={props.value}
        onChangeText={props.onChangeText}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[
          input.base,
          focused ? input.focus : {}
        ]}
        secureTextEntry={props.type === 'password' && hidden}
      />
      {
        props.type !== 'password' ? null :
          <TouchableOpacity style={{
            position: 'absolute',
            right: 10,
            marginVertical: 20,
          }} onPress={() => setHidden(!hidden)}>
            <MaterialIcons name='remove-red-eye' size={24} style={{
              color: hidden ? colors.inactiveIcons : colors.darkIcons
            }} />
          </TouchableOpacity>
      }
    </View>
  )
}

export { UIInput };
