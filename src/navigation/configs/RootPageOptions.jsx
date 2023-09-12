import React from 'react';
import HeaderDrawerMenuButton from '../../components/HeaderDrawerMenuButton';

const RootPageOptions = ({navigation}) => {
  return {
    headerLeft: () => <HeaderDrawerMenuButton navigation={navigation} />,
  };
};

export default RootPageOptions;
