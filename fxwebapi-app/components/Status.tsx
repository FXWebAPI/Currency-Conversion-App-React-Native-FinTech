import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { colors, text } from '../styles';
import { useInterval } from '../utils';

interface UIStatusProps {
  status: string,
  text: string,
  countdown: number,
  onCountdownEnd: () => void,
  infinite?: boolean,
  updating?: boolean
}

const UIStatus = (props: UIStatusProps) => {
  let [ cTime, setcTime ] = useState(props.countdown);

  useInterval(() => {
    setcTime(cTime - 1);
    if (cTime === 0) {
      props.onCountdownEnd();
      if (props.infinite) {
        setcTime(props.countdown);
      }
    }
  }, props.updating || cTime === -1 ? null : 1000);

  return (
    <View style={{
      flex: 0,
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
      marginBottom: 24
    }}>
      <View style={{
        backgroundColor: colors[props.status],
        width: 8,
        height: 8,
        borderRadius: 100,
        margin: 8
      }}></View>
      <Text style={{
        ...text.p
      }}>{props.text}{cTime}s</Text>
    </View>
  )
}

export { UIStatus };
