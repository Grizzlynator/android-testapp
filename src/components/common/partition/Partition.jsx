import React from 'react';
import {View} from 'react-native';

export const Partition = ({height = 10, color = 'gray'}) => {
  return <View style={{height: height, backgroundColor: color}} />;
};
