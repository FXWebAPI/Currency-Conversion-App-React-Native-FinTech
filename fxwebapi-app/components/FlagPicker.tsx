import React from 'react';
import { Picker, View, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../styles';

interface UIFlagPickerProps {
  onValueChange: (itemValue: any, itemPosition: number) => void,
  selectedValue: string,
  items: { label: string, value: string, image: string }[],
  image: (props: any) => JSX.Element
}

const UIFlagPicker = (props: UIFlagPickerProps) => {
  const FlagImage = props.image;
  return (
    <View style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      right: 0,
      top: 10
    }}>
      <FlagImage style={{ width: 24, height: 24 }}/>
      <Picker
        selectedValue={props.selectedValue}
        style={{
          backgroundColor: 'transparent',
          width: 64,
          height: 30,
          padding: 0,
          margin: 0,
        }}
        itemStyle={{
          color: colors.textPrimary,
          fontSize: 16,
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
      <MaterialIcons name='keyboard-arrow-down' size={24} color='#A9A9A9' style={{
        position: 'absolute',
        right: 10,
        top: 4
      }} />
    </View>
  )
}

export { UIFlagPicker };
