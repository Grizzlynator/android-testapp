import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

const Room = props => {
  return (
    <View style={style.container}>
      <Icon name="home" color="#676767" type="material" size={19} />
      <Text style={style.roomText}>{props.children}</Text>
    </View>
  );
};

export {Room};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roomText: {
    marginLeft: 5,
    fontSize: 15,
    color: '#676767',
    fontWeight: '500',
  },
});
