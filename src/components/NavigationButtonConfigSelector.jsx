import ModalSelector from 'react-native-modal-selector';
import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';

import {hideSelector} from '../redux/actions/NavigationButtonActions';
import {navigationButtonUpdateActions} from '../redux/actions/NavigationButtonActions';
import i18n from '../translations';

class NavigationButtonActionSelector extends Component {
  onModalClose = () => {
    const {hideSelector} = this.props;
    hideSelector();
  };

  onChange = selected => {
    const {navigationButtonUpdateActions} = this.props;
    const selectedActionKey = selected.key;
    const {configurableItem} = this.props;
    const newAction = {key: selectedActionKey, index: configurableItem.index};
    navigationButtonUpdateActions(newAction);
  };

  render() {
    const {isVisible} = this.props;

    return (
      <ModalSelector
        cancelText={i18n.t('cancel')}
        optionStyle={{backgroundColor: '#e7e7e8'}}
        optionContainerStyle={{backgroundColor: '#E7E7E8'}}
        cancelContainerStyle={{backgroundColor: '#E7E7E8'}}
        overlayStyle={{
          flex: 1,
          padding: '5%',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0)',
        }}
        optionTextStyle={{color: 'black'}}
        // visible={isVisible}
        visible={false}
        animationType={'fade'}
        customSelector={<View />}
        backdropPressToClose={true}
        touchableActiveOpacity={0.9}
        onModalClose={() => this.onModalClose()}
        onChange={selected => this.onChange(selected)}
        data={[
          {key: 'News', label: i18n.t('news')},
          {key: 'Schedule', label: i18n.t('schedule')},
          {key: 'Contacts', label: i18n.t('contacts')},
          {key: 'Settings', label: i18n.t('settings')},
          {key: 'ScheduleFilter', label: i18n.t('scheduleFilter')},
        ]}
      />
    );
  }
}

const mapStateToProps = state => {
  const {navigationButtonConfig, appConfig} = state;
  return {
    language: appConfig.language,
    // isVisible: navigationButtonConfig.isVisible,
    // configurableItem: navigationButtonConfig.configurableItem,
  };
};

const actions = {
  hideSelector,
  navigationButtonUpdateActions,
};

export default connect(
  mapStateToProps,
  actions,
)(NavigationButtonActionSelector);
