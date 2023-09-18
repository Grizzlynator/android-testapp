import React from 'react';
import {StyleSheet, View, ImageBackground, Keyboard, Text} from 'react-native';
import {connect} from 'react-redux';
import {Button} from 'react-native-elements';

import LoginInput from '../components/common/input/LoginInput';

import {updateLoginFormInput} from '../redux/actions/LoginFormActions';
import {signIn, signInAsGuest} from '../redux/actions/AuthActions';
import i18n from '../translations';
import LangSelectPopup from '../components/LangSelectPopup';

class SignInScreen extends React.Component {
  static navigationOptions = {
    cardStyle: {backgroundColor: '#d8d8d8'},
    headerShown: false,
  };

  componentDidUpdate = () => {
    const {signedIn, navigation} = this.props;
    if (signedIn) {
      navigation.navigate('Load');
    }
  };

  onGuestBtnPress = () => {
    const {signInAsGuest} = this.props;
    signInAsGuest();
  };

  onLoginBtnPress = () => {
    const {loginName, password} = this.props.loginForm;
    const {signIn} = this.props;
    signIn(loginName, password);
    Keyboard.dismiss();
  };

  render = () => {
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../../image/bgs.jpeg')}
          resizeMethod={'scale'}
          resizeMode={'cover'}
          style={styles.headerBackground}>
          <View>
            <LangSelectPopup />
          </View>
        </ImageBackground>

        <View style={{flex: 7}}>
          <View style={{paddingTop: '10%'}}>
            {this.renderLoginNameInput()}
            <View style={{height: '15%'}} />
            {this.renderPasswordInput()}
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            {this.renderLoginButton()}
            {this.renderGuestButton()}
          </View>
        </View>
      </View>
    );
  };

  renderLoginNameInput = () => {
    const {updateLoginFormInput, loginForm} = this.props;
    const {loginName} = loginForm;
    return (
      <LoginInput
        label={i18n.t('username')}
        icon="user"
        value={loginName}
        onChange={changedValue =>
          updateLoginFormInput('loginName', changedValue)
        }
      />
    );
  };

  renderPasswordInput = () => {
    const {updateLoginFormInput, loginForm} = this.props;
    const {password} = loginForm;
    return (
      <LoginInput
        label={i18n.t('password')}
        icon="lock"
        value={password}
        secure={true}
        onChange={changedValue =>
          updateLoginFormInput('password', changedValue)
        }
      />
    );
  };

  renderLoginButton = () => {
    const {loading} = this.props.loginForm;
    return (
      <Button
        title={i18n.t('signIn').toUpperCase()}
        loading={loading}
        titleStyle={{fontSize: 16}}
        containerStyle={styles.loginBtnContainer}
        buttonStyle={styles.loginBtnStyle}
        onPress={this.onLoginBtnPress}
      />
    );
  };

  renderGuestButton = () => {
    const {loading} = this.props.loginForm;
    return (
      <Button
        containerStyle={styles.guestBtnContainer}
        titleStyle={styles.guestBtnTitle}
        title={i18n.t('signInAsGuest')}
        type="clear"
        onPress={this.onGuestBtnPress}
        disabled={loading}
      />
    );
  };
}

const mapStateToProps = state => {
  const {loginForm, appConfig, profile} = state;
  return {
    language: appConfig.language,
    loginForm: loginForm,
    signedIn: appConfig.signedIn,
    deviceToken: appConfig.deviceToken,
    profile: profile,
  };
};

const actions = {
  signIn,
  signInAsGuest,
  updateLoginFormInput,
};

export default connect(mapStateToProps, actions)(SignInScreen);

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: 20,
    color: 'gray',
  },
  cardContainer: {
    marginTop: '25%',
    marginBottom: 10,
    borderRadius: 20,
    elevation: 3,
  },
  loginBtnContainer: {
    paddingVertical: 5,
    elevation: 3,
    width: '75%',
    backgroundColor: '#144774',
  },
  loginBtnStyle: {
    backgroundColor: '#144774',
    borderRadius: 25,
  },
  guestBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  guestBtnTitle: {
    fontSize: 16,
  },
  logoImg: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  headerBackground: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 3,
    backgroundColor: '#144774',
  },
});
