import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export const MessageWindow = props => {
  const {message, onPress, explanatory, containerStyle} = props;
  return (
    <View style={[styles.container, containerStyle]} onPress={onPress}>
      <Text style={styles.text}>{message}</Text>
      <Text> {explanatory}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ededed',
  },
  text: {
    textAlign: 'center',
    margin: 10,
    fontSize: 17,
  },
});
