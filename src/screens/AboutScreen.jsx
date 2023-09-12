import React, {Component} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {description} from '../translations/aboutScreenText';
import {getVersion} from 'react-native-device-info';
import {connect} from 'react-redux';

class AboutScreen extends Component {
  render() {
    const {language} = this.props;
    const appVersion = getVersion();
    return (
      <View style={styles.mainContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../image/devlablogo.jpg')}
            resizeMode={'contain'}
            style={styles.logoImg}
          />
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.titleText}>TSI Schedule</Text>
          <Text style={styles.appVersionText}>Version {appVersion}</Text>
          <Text numberOfLines={7} style={styles.descriptionText}>
            {description[language]}
          </Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {appConfig} = state;
  return {
    language: appConfig.language,
  };
};

export default connect(mapStateToProps, null)(AboutScreen);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logoContainer: {
    flex: 1,
    backgroundColor: 'white',
    width: '70%',
    marginTop: 20,
  },
  descriptionContainer: {
    backgroundColor: 'white',
    width: '100%',
    paddingHorizontal: 17,
    paddingTop: 20,
    flex: 2,
  },
  titleText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  descriptionText: {
    textAlign: 'center',
    paddingTop: 10,
    lineHeight: 24,
    fontSize: 16,
  },
  appVersionText: {
    textAlign: 'center',
    fontSize: 12,
    color: 'gray',
  },
  logoImg: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
});
