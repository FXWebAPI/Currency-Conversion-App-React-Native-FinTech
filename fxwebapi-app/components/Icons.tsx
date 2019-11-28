import React from 'react';
import { SvgProps } from 'react-native-svg';

interface UIIconProps extends SvgProps {
  name: string,
  size: number
};

const getIcon = (name: string) => {
  switch (name) {
    case 'spot-icon': return require('../assets/icons/spot_icon.svg');
    default: return require('../assets/icons/none.svg');
  }
}; 

export default function UIIcons(props: UIIconProps) {
  let Icon = getIcon(props.name).default;
  console.log(props.color);

  return (
    <Icon {...props} width={props.size} height={props.size}/>
  );
};