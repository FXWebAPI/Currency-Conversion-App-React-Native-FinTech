import React from 'react';
import { ScrollView, View, TouchableOpacity, Text } from "react-native"
import Icon from './Icon';
import { colors, text } from '../styles';

interface FilterListProps {
  title: string,
  items: Array<JSX.Element>,
  onFilterClick?: () => void
};

const FilterList = (props: FilterListProps) => {

  return (
    <View style={{
      flex: 1,
      alignSelf: 'stretch',
      backgroundColor: '#FFF',
    }}>

      <View style={{
        padding: 16,
        backgroundColor: '#FFF',
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Text style={{
          ...text.p,
          fontWeight: '500'
        }}>{props.title}</Text>
        <TouchableOpacity onPress={props.onFilterClick} style={{
          alignSelf: 'flex-end'
        }}>
          <Icon name='filter_list_icon' size={24} color={colors.darkIcons} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{
        flex: 1,
        flexDirection: 'column',
      }}>
        {props.items}
      </ScrollView>
    </View>
  )
};

export { FilterList };