import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {ListItem as Item, Icon} from 'react-native-elements';

export const ListItem = ({props, onPress, name}) => {
  const {key, subtitle, icon, leftAvatar, rightIcon} = props;
  return (
    <TouchableOpacity key={key} onPress={onPress}>
      <Item style={style.optionItemStyle}>
        <Icon {...icon} />
        <Item.Content style={props.containerStyle}>
          <Item.Title>{name}</Item.Title>
          {subtitle && <Item.Subtitle>{subtitle}</Item.Subtitle>}
        </Item.Content>
        <Item.Chevron />
        {rightIcon}
      </Item>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  optionItemStyle: {
    marginTop: 2,
  },
});
