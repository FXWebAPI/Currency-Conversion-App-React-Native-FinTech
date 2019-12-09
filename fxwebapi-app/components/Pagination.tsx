import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { } from 'react-native-gesture-handler';
import { colors, text } from '../styles';

interface UIPaginationProps {
  currentPage: number;
  pagesMax: number;
  onPageChange: (page: number) => void;
}

const UIPagination = (props: UIPaginationProps) => {
  let minN = Math.max(props.currentPage - 3, 0);
  let maxN = Math.min(minN - props.currentPage + 3, props.pagesMax);
  const disabledPrev = minN === 0;
  const disabledNext = maxN === props.pagesMax;
  const colorPrev = disabledPrev ? colors.inactiveIcons : colors.textPrimary;
  const colorNext = disabledNext ? colors.inactiveIcons : colors.textPrimary;
  let pages: Array<number> = [];
  for (let i = minN; i <= maxN; i++) pages.push(i);


  return (
    <View style={{
      flex: 0,
      flexDirection: 'row',
      alignItems: 'center'
    }}>
      <TouchableOpacity style={{
        padding: 4
      }} onPress={disabledPrev ? () => null : () => props.onPageChange(0)}>
        <MaterialIcons name='skip-previous' size={24} color={colorPrev} />
      </TouchableOpacity>
      <TouchableOpacity style={{
        padding: 4,
        scaleX: -1
      }} onPress={disabledPrev ? () => null : () => props.onPageChange(props.currentPage - 1)}>
        <MaterialIcons name='play-arrow' size={24} color={colorPrev} />
      </TouchableOpacity>

      {pages.map((page) =>
        <TouchableOpacity
          style={{
            flex: 0,
            width: 32,
            height: 32,
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 4,
            backgroundColor: page === props.currentPage ? colors.btnPrimary : 'transparent',
            borderRadius: 16
          }}
          onPress={page !== props.currentPage ? () => props.onPageChange(page) : null}
          key={page}
        >
          <Text style={{
            ...text.p,
            fontWeight: '500',
            color: page === props.currentPage ? '#FFF' : colors.textPrimary
          }}>{page+1}</Text>
        </TouchableOpacity>
      )
      }

      <TouchableOpacity style={{
        padding: 4
      }} onPress={disabledNext ? () => null : () => props.onPageChange(props.currentPage + 1)}>
        <MaterialIcons name='play-arrow' size={24} color={colorNext} />
      </TouchableOpacity>
      <TouchableOpacity style={{
        padding: 4
      }} onPress={disabledNext ? () => null : () => props.onPageChange(props.pagesMax)}>
        <MaterialIcons name='skip-next' size={24} color={colorNext} />
      </TouchableOpacity>
    </View >
  );
};

export { UIPagination };