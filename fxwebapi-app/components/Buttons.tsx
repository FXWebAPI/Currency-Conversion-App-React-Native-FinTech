import React from 'react';
import { TouchableOpacity, Text, GestureResponderEvent } from 'react-native';
import { buttons, buttonText } from '../styles';

interface UIBtnProps {
  title: string;
  type: 'primary' | 'secondary';
  size: 'lg' | 'md' | 'sm';
  disabled?: boolean;
  style?: Object;
  onPress?: (event: GestureResponderEvent) => void;
}

const UIBtn = (props: UIBtnProps) => {
  return (
    <TouchableOpacity style={[
      buttons.base,
      buttons[props.type],
      buttons[props.size],
      props.style
    ]} onPress={props.onPress}>
      <Text style={[buttonText[props.type], buttonText[props.size]]}>{props.title}</Text>
    </TouchableOpacity>
  )
}

export { UIBtn };
