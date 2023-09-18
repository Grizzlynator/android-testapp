import React from 'react';
import {connect, useSelector} from 'react-redux';
import _ from 'lodash';
import FloatingAction from './floating-action/src/FloatingAction';
import Icon from 'react-native-vector-icons/MaterialIcons';

import i18n from '../translations';
import NavigationService from '../workers/NavigationService';
import {showSelector} from '../redux/actions/NavigationButtonSelectorActions';
import {
  changeNavigationButtonMode,
  navigationButtonUpdateActions,
  saveNavigationActions,
} from '../redux/actions/NavigationButtonActions';

const FloatingNavigationButtons = props => {
  // useSelector(store => store.appConfig.language);
  const {toggle, isVisible, mode} = useSelector(
    state => state.navigationButton,
  );
  const {language} = useSelector(state => state.appConfig);

  const actionsToRender = [
    {
      position: 1,
      text: i18n.t('news'),
      icon: <Icon name="newspaper" size={21} color={'white'} />,
      name: 'News',
      buttonSize: 45,
      textStyle: {fontSize: 16},
    },
    {
      position: 2,
      text: i18n.t('schedule'),
      icon: <Icon name="calendar-month" size={21} color={'white'} />,
      name: 'Schedule',
      buttonSize: 45,
      textStyle: {fontSize: 16},
    },
    {
      position: 3,
      text: i18n.t('settings'),
      icon: <Icon name="settings" size={21} color={'white'} />,
      name: 'Settings',
      buttonSize: 45,
      textStyle: {fontSize: 16},
    },
  ];

  const handleOnRegularButtonPress = props => {
    console.log('handleOnRegularButtonPress props: ', props);
    // NavigationService.navigate(props.name);
    NavigationService.navigate(props);
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
        position={'right'}
        isOpen={true}
        ref={ref => (this.floatingAction = ref)}
        buttonSize={60}
        actions={actionsToRender}
        visible={isVisible}
        // visible={true}
        showBackground={true}
        onPressItemClose={true}
        iconHeight={20}
        iconWidth={20}
        // onPressItem={props => onPressItem(props)}
        onPressItem={props => handleOnRegularButtonPress(props)}
      />
    );
  };

  return renderNavigationButtonInRegularMode();
};

const mapStateToProps = state => {
  const {navigationButton} = state;
  const {language} = state.appConfig;

  return {
    language: language,
    toggle: navigationButton.toggle,
    // actions: navigationButton.actions,
    isVisible: navigationButton.isVisible,
    mode: navigationButton.mode,
  };
};

const actions = {
  saveNavigationActions,
  navigationButtonUpdateActions,
  changeNavigationButtonMode,
  showSelector,
};

// export default connect(mapStateToProps, actions)(FloatingNavigationButtons);
export default connect(null, actions)(FloatingNavigationButtons);

// export default FloatingNavigationButtons;
