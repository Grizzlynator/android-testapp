import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import _ from 'lodash';

export default class SideButton extends React.Component {
  isSideLeft = () => {
    const {side} = this.props;
    return _.isEqual(side, 'left');
  };

  render() {
    const {mainContainer, leftPosition, rightPosition} = styles;
    const sidePosition = this.isSideLeft() ? leftPosition : rightPosition;

    const {onPress, icon, color} = this.props;

    return (
      <TouchableOpacity
        style={[mainContainer, sidePosition, {backgroundColor: color}]}
        onPress={() => onPress()}>
        {icon}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    height: 54,
    width: 25,
  },
  rightPosition: {
    top: '50%',
    marginTop: -27,
    paddingLeft: 7,
    right: 0,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
  },
  leftPosition: {
    top: '50%',
    marginTop: -27,
    paddingRight: 7,
    left: 0,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
});
