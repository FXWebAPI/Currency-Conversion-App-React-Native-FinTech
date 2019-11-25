import React from 'react';
import { View } from 'react-native';
import { Dropdown } from './Dropdown';
import { text } from '../styles';
import { BaseChartData } from '../ws';

interface UICurrencyPickerProps {
  onValueChange: (itemValue: BaseChartData['currencyPair'], itemPosition: number) => void,
  activeValue: BaseChartData['currencyPair'],
  values: ReadonlyArray<{label: string, value: BaseChartData['currencyPair']}>,
}

const UICurrencyPicker = (props: UICurrencyPickerProps) => {
  return (
    <View style={{
      position: 'relative',
      flex: 0,
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'center',
    }}>
      <Dropdown 
        activeValue={props.activeValue} 
        values={props.values}
        onValueChange={props.onValueChange}
        style={{
          ...text.bigTitle
        }}
        itemContainerStyle={{
          borderRadius: 4,
          marginTop: 10
        }}
        textItemStyle={{
          fontSize: 18,
          padding: 10
        }}
        itemStyle={{
          borderBottomColor: '#CCC',
          borderBottomWidth: 1,
        }}
      />
    </View>
  )
}

export { UICurrencyPicker };
