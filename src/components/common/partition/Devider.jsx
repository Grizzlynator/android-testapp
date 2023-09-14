import React from 'react';
import {View} from 'react-native';

const Divider = props => {
  const {height} = props;
  return <View style={{height: height}} />;
};

export default Divider;
