import React, { useState } from 'react';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { StyleProp, ViewStyle, View, Text, TouchableOpacity } from 'react-native';
import Icon from './Icon';
import { colors, text } from '../styles';

interface DatePickerProps {
  date?: Date;
  onChange: (date: Date) => any;
  style?: StyleProp<ViewStyle>;
  text?: string;
  mode?: 'date' | 'datetime' | 'time';
};

function DatePicker(props: DatePickerProps) {
  const [show, setShow] = useState(false);

  return (
    <TouchableOpacity style={[
      {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderBottomColor: colors.inactiveIcons,
        borderBottomWidth: 1
      }
      , props.style]}
      onPress={() => setShow(true)}
    >
      <Text style={{
        ...text.regular
      }}>{!props.date ? props.text || 'Expire' : props.date.toISOString().split('T')[0]}</Text>
      <Icon name='callendar_icon' size={24} color={colors.inactiveIcons} />
      <DateTimePicker
        date={props.date || new Date()}
        isVisible={show}
        onCancel={() => setShow(!show)}
        onConfirm={(d: Date) => {
          props.onChange(d);
          setShow(false);
        }}
        minimumDate={new Date()}
        mode={props.mode ? props.mode : 'date'}
      />
    </TouchableOpacity>
  );
};

export { DatePicker };