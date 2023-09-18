import React from 'react';
import HeaderDrawerMenuButton from '../../components/HeaderDrawerMenuButton';

const headerButton = navigation => (
  <HeaderDrawerMenuButton onPress={navigation.openDrawer.bind(this)} />
);

const MainPageOptions = ({navigation}, title) => {
  return {
    title: title,
    headerLeft: () => headerButton(navigation)
  };
};

export default MainPageOptions;
