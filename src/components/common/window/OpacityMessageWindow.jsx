import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

export const OpacityMessageWindow = props => {
  const {message, onPress, explanatory, containerStyle} = props;
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}>
      <Text style={styles.text}>{message}</Text>
      <Text style={styles.text}> {explanatory}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e4e3f1',
  },
  text: {
    textAlign: 'center',
    margin: 10,
    fontSize: 17,
    color: 'black',
  },
});
