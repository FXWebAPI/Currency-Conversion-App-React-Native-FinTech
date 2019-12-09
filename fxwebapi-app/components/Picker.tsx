import React, { useState } from 'react';
import { Picker, View, TouchableOpacity } from 'react-native';
import { colors } from '../styles';
import { MaterialIcons } from '@expo/vector-icons';

interface UIPickerProps {
  selectedValue: any;
  onValueChange: (itemValue: any, itemPosition: number) => void;
  items: Array<{ label: string, value: any }>;
}

const UIPicker = (props: UIPickerProps) => {
  const [active, setActive] = useState(false);
  return (
    <TouchableOpacity
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: active ? 'rgba(20, 106, 255, 0.1)' : 'transparent',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomColor: active ? 'rgba(20, 106, 255, 1)' : '#A9A9A9',
        borderBottomWidth: 1
      }}
      // onPress={() => setActive(!active)}
    >
      <Picker
        selectedValue={props.selectedValue}
        style={{
          backgroundColor: 'transparent',
          flex: 1,
          height: 56,
          padding: 0,
          margin: 0,
        }}
        onValueChange={props.onValueChange}
      >
        {
          props.items.map(({ label, value }) =>
            <Picker.Item label={label} value={value} key={value} />
          )
        }
      </Picker>
      <MaterialIcons name='keyboard-arrow-down' size={24} color={active ? colors.btnPrimary : '#A9A9A9'} style={{
        position: 'absolute',
        right: 8,
        top: 16
      }} />
    </TouchableOpacity>
  );
}

export { UIPicker };