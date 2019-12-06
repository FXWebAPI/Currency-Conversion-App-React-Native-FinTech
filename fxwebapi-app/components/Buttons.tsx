import React from 'react';
import { TouchableOpacity, Text, GestureResponderEvent, View } from 'react-native';
import { buttons, buttonText, text, colors, shadow } from '../styles';
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
      buttons[props.disabled ? 'disabled' : props.type],
      buttons[props.size],
      props.style
    ]} onPress={props.disabled ? null : props.onPress}>
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
  shadow?: boolean;
}

const UIAddRound = (props: UIAddRoundProps) => (
  <TouchableOpacity style={{
    backgroundColor: props.fill,
    width: props.size,
    height: props.size,
    borderRadius: 100,
    transform: [{ rotate: props.rotate || '0deg' }],
    ...(props.shadow ? shadow.base : {})
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

interface UIBtnToggleProps {
  left: string;
  right: string;
  selected: boolean;
  onPress: (selected: boolean) => void;
}

const UIBtnToggleStyles = [
  {
    backgroundColor: colors.btnPrimary,
    color: colors.btnText,
    borderWidth: 1,
    borderColor: colors.btnPrimary,
  },
  {
    backgroundColor: colors.btnText,
    borderColor: colors.btnPrimary,
    borderWidth: 1,
    color: colors.btnPrimary
  }
];

const UIBtnToggle = (props: UIBtnToggleProps) => (
  <View style={{
    flex: 0,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 16
  }}>
    <TouchableOpacity onPress={() => props.onPress(true)}>
      <Text style={{
        ...text.p,
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        ...(props.selected ? UIBtnToggleStyles[0] : UIBtnToggleStyles[1])
      }}>{props.left}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => props.onPress(false)}>
      <Text style={{
        ...text.p,
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        ...(props.selected ? UIBtnToggleStyles[1] : UIBtnToggleStyles[0])
      }}>{props.right}</Text>
    </TouchableOpacity>
  </View>
);

export { UIBtn, UIAddRound, UIBtnToggle, UIBtnToggleProps };
