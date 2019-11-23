import React from 'react';
import { TouchableOpacity, GestureResponderEvent, Text } from 'react-native';
import { colors, text } from '../styles';

interface UIChartBtnProps {
  onPress: (event: GestureResponderEvent) => void;
  active?: boolean;
  label: string;
}

const UIChartBtn = (props: UIChartBtnProps) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Text style={{
        ...text.smallText,
        ...(props.active ? {
          fontWeight: '500',
          borderBottomColor: colors.btnPrimary,
          borderBottomWidth: 2
        } : {
          color: colors.inactiveIcons
        }),
        paddingHorizontal: 16,
        paddingVertical: 10
      }}>{props.label}</Text>
    </TouchableOpacity>
  )
}

export { UIChartBtn };
