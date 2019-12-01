import React, { useState } from 'react';
import { View, Text, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { text } from '../styles';

interface DropdownProps {
  activeValue: string;
  values: Array<{ label: string, value: string }> | ReadonlyArray<{ label: string, value: string }>;
  onValueChange: (value: string, index: number) => void;
  style?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  textItemStyle?: StyleProp<TextStyle>;
  itemContainerStyle?: StyleProp<ViewStyle>;
};

function Dropdown(props: DropdownProps) {
  const [displayOptions, setDisplayOptions] = useState(false);
  const activeLabel = props.values.find(({ label, value }) => value === props.activeValue).label;

  return (
    <>
      <TouchableOpacity
        style={[{
          flex: 0,
          alignContent: 'center',
          alignItems: 'center',
          flexDirection: 'row'
        }, props.containerStyle]}
        onPress={() => setDisplayOptions(!displayOptions)}
      >
        <Text style={props.style}>{activeLabel}</Text>
        <MaterialIcons
          name={displayOptions ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={24}
          color='#A9A9A9'
        />
      </TouchableOpacity>
      {displayOptions ?
        <View style={[{
          position: 'absolute',
          top: '100%',
          left: 0,
          width: '100%',
          zIndex: 100,
          backgroundColor: '#EEE',
          alignContent: 'center',
          alignItems: 'center',
        },
        props.itemContainerStyle
        ]}>
          {[...props.values].map(({ value, label }, index: number) =>
            <TouchableOpacity
              onPress={() => {
                setDisplayOptions(false);
                props.onValueChange(value, index);
              }}
              style={props.itemStyle}
              key={index}
            >
              <Text style={props.textItemStyle}>{label}</Text>
            </TouchableOpacity>
          )}
        </View>
        : null
      }
    </>
  );
};

const UIDropdown = (props: DropdownProps) => (
  <Dropdown
    activeValue={props.activeValue}
    values={props.values}
    onValueChange={props.onValueChange}
    containerStyle={{
      borderBottomColor: '#BBBBBB',
      borderBottomWidth: 1,
      flex: 0,
      position: 'relative',
      flexDirection: 'row',
    }}
    style={{
      paddingVertical: 18,
      ...text.regular
    }}
    textItemStyle={{
      padding: 10
    }}
  />
)
export { Dropdown, UIDropdown };