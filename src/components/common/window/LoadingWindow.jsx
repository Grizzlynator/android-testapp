import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

export const LoadingWindow = () => {
  return (
    <View style={windowStyle}>
      <ActivityIndicator size="large" color="#144774" />
    </View>
  );
};

const windowStyle = StyleSheet.create({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
});
