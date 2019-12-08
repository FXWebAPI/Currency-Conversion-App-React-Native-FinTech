import React from 'react';
import { NavigationStackScreenProps } from "react-navigation-stack";
import { View, TouchableOpacity, Text } from "react-native";
import { MaterialIcons, EvilIcons } from '@expo/vector-icons';
import { colors, text } from '../styles';
import { UIBtn } from '../components/Buttons';

interface OrderInfoScreenProps extends NavigationStackScreenProps { };

export default function OrderInfoScreen(props: OrderInfoScreenProps) {
  const data = props.navigation.getParam('data', {});
  // Replace with button object/callback ? 
  data.date && data.title ? null : props.navigation.pop();

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#FFF',
    }}>
      <TouchableOpacity style={{
        position: 'absolute',
        left: 0,
        top: 0,
        padding: 16
      }} onPress={() => props.navigation.popToTop()}>
        <MaterialIcons name='close' size={24} />
      </TouchableOpacity>

      <View style={{
        flex: 0,
        flexDirection: 'column',
        alignContent: 'flex-start',
        padding: 16,
        paddingLeft: 72
      }}>
        <Text style={{ ...text.hAlt }}>{data.title}</Text>
        <Text style={{ ...text.p, color: colors.inputLabel }}>{data.date}</Text>
      </View>

      <View>
        {Object.keys(data).map((key) =>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            paddingVertical: 12
          }} key={key}>
            <Text style={{
              ...text.p,
              fontWeight: '500'
            }}>{key}</Text>
            <Text style={{
              ...text.p
            }}>{data[key]}</Text>
          </View>
        )}
      </View>

      {
        data.buttonTitle && data.onPress ?
          <UIBtn type={data.buttonType ? 'secondary' : 'primary'} size='lg' title={data.buttonTitle} style={{
            position: 'absolute',
            bottom: 32,
            paddingVertical: 32,
            alignSelf: 'center'
          }} onPress={data.onPress} /> : null
      }

    </View>
  );
};