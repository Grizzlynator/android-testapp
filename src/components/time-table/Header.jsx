import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Header = props => {
  const {weekDay, date} = props;
  return (
    <View style={headerStyle.container}>
      <Text style={[headerStyle.text]}>{weekDay}</Text>
      <Text style={[headerStyle.text, {textAlign: 'right'}]}>{date}</Text>
    </View>
  );
};

export {Header};

const headerStyle = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 20,
    paddingVertical: 6,
    backgroundColor: '#144774',
    flexDirection: 'row',
  },
  text: {
    fontWeight: '700',
    color: 'white',
    fontSize: 15,
  },
});
