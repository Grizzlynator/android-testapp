import React from 'react';
import {StyleSheet} from 'react-native';
import {HeaderButton} from './common';

export default function HeaderDrawerMenuButton(props) {
  return (
    <HeaderButton
      iconSize={28}
      containerStyle={styles.buttonContainer}
      onPress={() => props.onPress()}
      featherIconName={'menu'}
    />
  );
}
const styles = StyleSheet.create({
  buttonContainer: {
    marginLeft: 11,
  },
});
