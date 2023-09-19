import React from 'react';
import {StyleSheet} from 'react-native';
import Menu, {MenuItem} from 'react-native-material-menu';
import {connect} from 'react-redux';
// import {withNavigationFocus} from 'react-navigation';

import i18n from '../translations';
import {HeaderButton} from './common';
import {switchPage} from '../redux/actions/screen/ScheduleScreenActions';

class ScheduleRangePopup extends React.PureComponent {
  _menu = null;

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  onRangeSelect = range => {
    const {switchPage} = this.props;
    switchPage(range, 0);
    this.hideMenu();
  };

  icon = (
    <HeaderButton
      containerStyle={styles.button}
      featherIconName={'more-vertical'}
      onPress={this.showMenu}
    />
  );

  render() {
    return (
      <Menu
        ref={this.setMenuRef}
        button={this.icon}
        style={styles.popupContainer}>
        <MenuItem onPress={() => this.onRangeSelect('day')}>
          {i18n.t('day')}
        </MenuItem>
        <MenuItem onPress={() => this.onRangeSelect('week')}>
          {i18n.t('week')}
        </MenuItem>
        <MenuItem onPress={() => this.onRangeSelect('month')}>
          {i18n.t('month')}
        </MenuItem>
      </Menu>
    );
  }
}

const actions = {
  switchPage,
};

// export default connect(null, actions)(withNavigationFocus(ScheduleRangePopup));
export default connect(null, actions)(ScheduleRangePopup);

const styles = StyleSheet.create({
  popupContainer: {
    marginTop: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  button: {marginRight: 11},
});
