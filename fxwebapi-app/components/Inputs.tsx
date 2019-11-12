import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { input, colors } from '../styles';
import { MaterialIcons } from '@expo/vector-icons';

interface UIInputProps {
    label: string,
    value: string,
    type: string,
    onChangeText: (text: string) => void;
}

const UIInput = (props: UIInputProps) => {
    const [ focused, setFocused ] = useState(false);
    const [ hidden, setHidden ] = useState(true);

    return (
        <View style={[
            input.container,
            focused ? input.containerFocus : {}
        ]}>
            {
            !focused && props.value ? null : 
            <Text style={[
                input.labelBase,
                focused ? input.labelFocus : {}
            ]}>
                {props.label}
            </Text>
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
