import React from 'react';
import {Keyboard} from 'react-native';
import {connect} from 'react-redux';
import {
  hideNavigationButton,
  showNavigationButton,
} from '../redux/actions/NavigationButtonActions';

class KeyboardListener extends React.Component {
  onKeyboardShow = () => {
    const {hideNavigationButton} = this.props;
    hideNavigationButton();
  };

  onKeyBoardHide = () => {
    const {showNavigationButton, signedIn} = this.props;
    if (signedIn) {
      showNavigationButton();
    }
  };

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.onKeyboardShow,
    );

    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.onKeyBoardHide,
    );
  }

  render() {
    return null;
  }
}

const actions = {
  showNavigationButton,
  hideNavigationButton,
};

const mapStateToProps = state => {
  const {appConfig} = state;
  return {
    signedIn: appConfig.signedIn,
  };
};

export default connect(mapStateToProps, actions)(KeyboardListener);
