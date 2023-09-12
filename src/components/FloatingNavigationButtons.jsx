import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {FloatingAction} from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/MaterialIcons';

import NavigationService from '../services/NavigationService';

const appActions = [
  {
    text: 'Filter Settings',
    // icon: require('./images/ic_accessibility_white.png'),
    name: 'bt_filtersettings',
    position: 2,
  },
  {
    text: 'Schedule',
    // icon: require('./images/ic_language_white.png'),
    name: 'bt_schedule',
    position: 1,
  },
];

const FloatingNavigationButtons = () => {
  const actionsToRender = appActions;

  const handleOnRegularButtonPress = props => {
    NavigationService.navigate(props.name);
  };

  const renderNavigationButtonInRegularMode = () => {
    return renderRegularButton(name => handleOnRegularButtonPress(name));
  };

  const renderRegularButton = onPressItem => {
    // const {actions, isVisible} = this.props;
    // this.actionsToShow = actions.map(action => {
    //   const act = {...availableActions[action.key]};
    //   act.text = i18n.t(act.text.toLowerCase());
    //   return act;
    // });

    return (
      <FloatingAction
        // floatingIcon={<Icon name="explore" size={58} color="white" />}
        color={'#143e69'}
        isOpen={true}
        ref={ref => (this.floatingAction = ref)}
        buttonSize={60}
        actions={actionsToRender}
        // visible={isVisible}
        visible={true}
        showBackground={true}
        onPressItemClose={true}
        onPressItem={props => onPressItem(props)}
      />
    );
  };
  return renderNavigationButtonInRegularMode();
};

export default connect()(FloatingNavigationButtons);
