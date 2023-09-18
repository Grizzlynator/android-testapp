import React, {useEffect} from 'react';
import {connect, useSelector, useDispatch} from 'react-redux';
import {StyleSheet, Text, View} from 'react-native';
import {showNavigationButton} from '../redux/actions/NavigationButtonActions';
import {requestUserPermission} from '../services/notifierService';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function LoadingScreen(props) {
  const appstate = useSelector(state => state.appConfig);

  const dispatch = useDispatch();

  useEffect(() => {
    const {signedIn, navigation} = props;
    const pageToOpen = signedIn ? onSignedIn() : onSignedOut();
    // console.log('-----------props: ', props);
    // console.log('-----------signedIn: ', signedIn);
    // console.log('-----------navigation: ', navigation);
    // navigation.navigate('App');
    navigation.navigate(pageToOpen);
  });

  const onSignedIn = () => {
    const {showNavigationButton, userStatus} = props;
    // console.log('onSignedIn props: ', props);
    // console.log('userStatus: ', userStatus);
    if (userStatus !== 'guest') {
      requestUserPermission();
    }
    showNavigationButton();
    return 'App';
  };

  const onSignedOut = () => {
    return 'Auth';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Authentication</Text>
      <Text style={styles.subTitleText}>Please wait</Text>
    </View>
  );
}

const mapStateToProps = state => {
  const {appConfig, profile} = state;
  return {
    userStatus: profile.status,
    signedIn: appConfig.signedIn,
  };
};

const actions = {
  showNavigationButton,
};

export default connect(mapStateToProps, actions)(LoadingScreen);

const styles = StyleSheet.create({
  titleText: {fontSize: 18},
  subTitleText: {fontSize: 13},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
