import React from 'react';
import {View, StyleSheet} from 'react-native';

const Section = props => {
  return (
    <View style={[styles.sectionStlyle, props.style]}>{props.children}</View>
  );
};

export {Section};

const styles = StyleSheet.create({
  sectionStlyle: {
    paddingRight: 15,
  },
});
