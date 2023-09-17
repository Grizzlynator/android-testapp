import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

export const HeaderBackButton = ({style, navigation, onPress, size = 25}) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Icon name={'arrow-left'} size={size} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: 13,
  },
});
