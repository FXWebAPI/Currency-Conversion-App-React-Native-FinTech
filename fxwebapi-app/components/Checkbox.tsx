import React from 'react';
import { TouchableOpacity, GestureResponderEvent } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { colors } from '../styles';

interface UICheckboxProps {
    onPress: (event: GestureResponderEvent) => void;
    checked: boolean;
}

const UICheckbox = (props : UICheckboxProps) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <MaterialIcons name={props.checked ? 'check-box' : 'check-box-outline-blank'} size={24} color={colors.btnPrimary} />
        </TouchableOpacity>
    )
}


export { UICheckbox };
