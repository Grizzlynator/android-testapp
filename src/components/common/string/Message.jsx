import React from 'react';
import {Text, View} from 'react-native';

export const Message = props => {
  const {message, style, color} = props;
  return (
    <View style={style}>
      <Text style={{color}}>{message}</Text>
    </View>
  );
};
