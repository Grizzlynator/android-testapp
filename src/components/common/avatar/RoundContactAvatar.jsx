import {Avatar} from 'react-native-elements';
import React from 'react';

export const RoundContactAvatar = props => {
  const {size, title, source, favorite, onPress} = props;
  return (
    <Avatar
      size={size}
      rounded
      title={title[0]}
      onPress={() => onPress()}
      onEditPress={() => onPress()}
      showEditButton
      editButton={
        favorite
          ? {...avatarStarIcon, color: 'gold'}
          : {...avatarStarIcon, color: '#8d8d8d'}
      }
      activeOpacity={0.7}
      source={source}
    />
  );
};

const avatarStarIcon = {
  name: 'star',
  type: 'material',
  underlayColor: 'rgba(255,255,255,0)',
  size: 55,
  style: {
    paddingTop: 0,
    backgroundColor: null,
    borderWidth: 0,
    elevation: 0,
  },
};
