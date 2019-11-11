import React from 'react';
import { TouchableOpacity, Text, GestureResponderEvent } from 'react-native';
import { buttons, buttonText } from '../styles';

interface UIBtnProps {
    title: string;
    type: 'primary' | 'secondary';
    size: 'lg' | 'md' | 'sm';
    disabled?: boolean;
    width?: number;
    onPress?: (event: GestureResponderEvent) => void;
}

const UIBtn = (props: UIBtnProps) => {
    const userStyle = props.width ? { width: props.width } : null;
    return (
        <TouchableOpacity style={[
            buttons.base,
            buttons[props.type],
            buttons[props.size],
            userStyle
        ]} onPress={props.onPress}>
            <Text style={[buttonText[props.type], buttonText[props.size]]}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export { UIBtn };