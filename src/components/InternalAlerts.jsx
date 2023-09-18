import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {connect} from 'react-redux';

class InternalAlerts extends Component {
  render() {
    return (
      <FlashMessage
        position="bottom"
        floating={true}
        style={styles.alertContainer}
      />
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const actions = {};

export default connect(mapStateToProps, actions)(InternalAlerts);

const styles = StyleSheet.create({
  alertContainer: {
    alignItems: 'center',
    alignSelf: 'center',
  },
});
