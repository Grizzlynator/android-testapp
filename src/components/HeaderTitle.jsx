import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import i18n from '../translations';

class HeaderTitle extends Component {
  render = () => {
    const {title} = this.props;
    return <Text style={styles.title}>{i18n.t(title)}</Text>;
  };
}

const mapStateToProps = state => {
  const {appConfig} = state;
  return {language: appConfig.language};
};

export default connect(mapStateToProps, {})(HeaderTitle);

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
    fontSize: 18,
  },
});
