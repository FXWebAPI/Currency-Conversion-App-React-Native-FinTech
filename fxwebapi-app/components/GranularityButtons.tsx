import React from 'react';
import { View } from 'react-native';
import { UIChartBtn } from './ChartButtons';
import { BaseChartData } from '../ws';

interface GranularityButtonsProps {
  values: ReadonlyArray<{label: string, value: BaseChartData['granularity']}>
  activeValue: string;
  onPress: (value: BaseChartData['granularity']) => void;
}

const GranularityButtons = (props: GranularityButtonsProps) => {
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      {props.values.map(({label, value}, i) =>
        <UIChartBtn onPress={() => props.onPress(value)} label={label}
          active={props.activeValue === value} key={i} />
      )}
    </View>
  )
}

export { GranularityButtons };
