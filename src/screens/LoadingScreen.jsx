import React, {useEffect} from 'react';
import {connect, useSelector, useDispatch} from 'react-redux';
import {StyleSheet, Text, View} from 'react-native';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function LoadingScreen(props) {
  const appstate = useSelector(state => state.appConfig);
  console.log('appConfig state: ', appstate);

  const dispatch = useDispatch();

  useEffect(() => {
    const {signedIn, navigation} = props;
    // console.log('signedIn: ', signedIn);
    // console.log('navigation: ', navigation);
    navigation.navigate('App');
  });

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Authentication</Text>
      <Text style={styles.subTitleText}>Please wait</Text>
    </View>
  );
}

export default connect()(LoadingScreen);

const styles = StyleSheet.create({
  titleText: {fontSize: 18},
  subTitleText: {fontSize: 13},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
