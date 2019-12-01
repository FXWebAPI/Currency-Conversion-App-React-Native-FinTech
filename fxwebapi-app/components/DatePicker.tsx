import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleProp, ViewStyle, View, Text, TouchableOpacity } from 'react-native';
import Icon from './Icon';
import { colors } from '../styles';

interface DatePickerProps {
  date?: Date;
  onChange: (event: any, date: Date) => any;
  style?: StyleProp<ViewStyle>;
  text?: string;
};

function DatePicker(props: DatePickerProps) {
  const [show, setShow] = useState(false);

  console.log(props.date, !props.date);

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
      <Text>{!props.date ? props.text || 'Expire' : props.date}</Text>
      <Icon name='callendar_icon' size={24} color={colors.inactiveIcons} />
      {show ? <DateTimePicker
        value={props.date || new Date()}
        mode='date'
        onChange={(e, d) => {
          setShow(false);
          props.onChange(e, d);
        }}
      /> : null}
    </TouchableOpacity>
  );
};

export { DatePicker };