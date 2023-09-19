import React from 'react';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';

const Event = props => {
  const {type} = props;
  const {containerStyle} = styles;
  return (
    <View style={[containerStyle, typeStyles[type]]}>{props.children}</View>
  );
};

export {Event};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingLeft: 15,
    paddingRight: 15,
  },
});

const typeStyles = StyleSheet.create({
  normal: {},
  problem: {backgroundColor: 'rgba(255,3,12,0.2)'},
  remote: {backgroundColor: 'rgba(255,250,0,0.27)'},
});
