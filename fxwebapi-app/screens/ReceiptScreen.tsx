import React from 'react';
import { NavigationStackScreenProps } from "react-navigation-stack";
import { View, TouchableOpacity, Text } from "react-native";
import { MaterialIcons, EvilIcons } from '@expo/vector-icons';
import { colors, text } from '../styles';
import { UIBtn } from '../components/Buttons';

interface ReceiptScreenProps extends NavigationStackScreenProps { };

export default function ReceiptScreen(props: ReceiptScreenProps) {
  const data = JSON.parse(JSON.stringify(props.navigation.getParam('data', {})));
  const buttonText = props.navigation.getParam('buttonText', 'Back');

  return (
    <View style={{
      flex: 1, 
      backgroundColor: '#FFF',
    }}>
      <TouchableOpacity style={{
        position: 'absolute',
        right: 0,
        top: 0,
        padding: 16
      }} onPress={() => props.navigation.popToTop()}>
        <MaterialIcons name='close' size={24} />
      </TouchableOpacity>

      <EvilIcons name='check' color={colors.btnPrimary} size={48} style={{
        paddingTop: 24,
        paddingBottom: 16, alignSelf: 'center'
      }} />
      <Text style={{ ...text.hAlt, paddingBottom: 20, alignSelf: 'center' }}>Transaction completed</Text>

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

      <UIBtn type='primary' size='lg' title={buttonText} style={{
        position: 'absolute',
        bottom: 32,
        paddingVertical: 32,
        alignSelf: 'center'
      }} onPress={() => props.navigation.pop()} />
    </View>
  );
};