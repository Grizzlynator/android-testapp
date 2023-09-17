import React, {Component} from 'react';
import {StyleSheet, I18nManager} from 'react-native';

import {RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default class GmailStyleSwipeableRow extends Component {
  renderRightActions = () => <RectButton style={styles.rightAction} />;

  render() {
    const {onDelete = () => console.log('On delete function not defined')} =
      this.props;
    const {children, containerStyle} = this.props;
    return (
      <Swipeable
        containerStyle={containerStyle}
        ref={ref => (this._ref = ref)}
        friction={2}
        rightThreshold={120}
        renderRightActions={this.renderRightActions}
        onSwipeableRightOpen={onDelete}>
        {children}
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  rightAction: {
    alignItems: 'center',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
});
