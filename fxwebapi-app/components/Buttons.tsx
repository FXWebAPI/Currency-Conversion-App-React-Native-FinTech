import React from 'react';
import { TouchableOpacity, Text, GestureResponderEvent } from 'react-native';
import { buttons, buttonText } from '../styles';
import { MaterialIcons } from '@expo/vector-icons';

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

interface UIAddRoundProps {
  size: number;
  rotate?: string;
  fill: string;
  color: string;
  onPress?: () => void;
}

const UIAddRound = (props: UIAddRoundProps) => (
  <TouchableOpacity style={{
    backgroundColor: props.fill,
    width: props.size,
    height: props.size,
    borderRadius: 100,
    transform: [{ rotate: props.rotate || '0deg' }]
  }} onPress={props.onPress}>
    <MaterialIcons
      name='add'
      size={props.size / 2}
      color={props.color}
      style={{
        padding: props.size / 4
      }}
    />
  </TouchableOpacity>
);


export { UIBtn, UIAddRound };
