import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {ListItem as Item, Icon, Avatar} from 'react-native-elements';

export const CheckListItem = ({props, checkProps, onPress, name, checked}) => {
  // console.log('Item props: ', props);
  // console.log('Item checkProps: ', checkProps);
  const {checkedIcon, uncheckedIcon, iconColor} = checkProps;
  const {key, subtitle, icon, leftAvatar} = props;
  const {containerStyle, contentContainerStyle} = props;

  return (
    <TouchableOpacity key={key} onPress={onPress}>
      {/* <Item
        style={style.optionItemStyle}
        containerStyle={containerStyle}
        contentContainerStyle={contentContainerStyle}
        title={name}
        leftIcon={icon}
        subtitle={subtitle}
        leftAvatar={leftAvatar}
        rightIcon={checked ? checkedIcon : uncheckedIcon}
      /> */}
      <Item style={style.optionItemStyle}>
        {/* <Icon {...icon} /> */}
        {icon}
        <Item.Content style={contentContainerStyle}>
          {leftAvatar && <Avatar {...leftAvatar} />}
          {name && <Item.Title>{name}</Item.Title>}
          {subtitle && <Item.Subtitle>{subtitle}</Item.Subtitle>}
        </Item.Content>
        {checked ? checkedIcon : uncheckedIcon}
      </Item>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  optionItemStyle: {
    marginTop: 2,
    color: '#ffffff',
  },
});
