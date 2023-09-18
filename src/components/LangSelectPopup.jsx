import React from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-native-elements';
import {StyleSheet, Text, View} from 'react-native';
import {Menu, MenuItem} from 'react-native-material-menu';

import {setAppLanguage} from '../redux/actions/data/AppConfigActions';

class LangSelectPopup extends React.PureComponent {
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

  onLanguageChoose = lang => {
    this.props.setAppLanguage(lang);
    this.hideMenu();
  };

  icon = (
    <Button
      buttonStyle={styles.langBtn}
      title={' '}
      icon={{
        name: 'language',
        type: 'font-awesome',
        size: 27,
        color: 'white',
      }}
      onPress={this.showMenu}
    />
  );

  render() {
    return (
      <Menu
        ref={this.setMenuRef}
        anchor={this.icon}
        style={styles.popupContainer}>
        <MenuItem
          textStyle={styles.textStyle}
          onPress={() => this.onLanguageChoose('lv')}>
          Latviešu
        </MenuItem>
        <MenuItem
          textStyle={styles.textStyle}
          onPress={() => this.onLanguageChoose('en')}>
          English
        </MenuItem>
        <MenuItem
          textStyle={styles.textStyle}
          onPress={() => this.onLanguageChoose('ru')}>
          Русский
        </MenuItem>
      </Menu>
    );
  }
}

const actions = {
  setAppLanguage,
};

export default connect(null, actions)(LangSelectPopup);

const styles = StyleSheet.create({
  langBtn: {
    borderRadius: 0,
    backgroundColor: '#144774',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  popupContainer: {
    marginTop: 0,
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  textStyle: {
    color: '#144774',
    fontWeight: 'bold',
  },
});
