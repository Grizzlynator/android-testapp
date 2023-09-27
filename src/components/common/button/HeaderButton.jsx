import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

export const HeaderButton = ({
  containerStyle,
  iconSize = 25,
  featherIconName,
  color = 'black',
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, containerStyle]}>
        <Icon name={featherIconName} size={iconSize} color={color} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 9,
  },
});
