import React from 'react';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import FloatingAction from './floating-action/src/FloatingAction';
import Icon from 'react-native-vector-icons/MaterialIcons';

import i18n from '../translations';
import NavigationService from '../services/NavigationService';

const FloatingNavigationButtons = () => {
  useSelector(store => store.appConfig.language);
  const actionsToRender = [
    {
      position: 1,
      text: i18n.t('news'),
      icon: <Icon name="newspaper" size={21} color={'white'} />,
      name: 'News',
      buttonSize: 45,
      textStyle: {fontSize: 16},
    },{
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
        // visible={isVisible}
        visible={true}
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

// export default connect()(FloatingNavigationButtons);
export default FloatingNavigationButtons;
