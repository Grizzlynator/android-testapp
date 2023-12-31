import React from 'react';
import {connect} from 'react-redux';
import {ScrollView, View} from 'react-native';

import i18n from '../../translations';
import {ListItem, Partition} from '../../components/common';
import NavigationButtonConfigSelector from '../../components/NavigationButtonConfigSelector';

function SettingsScreen(props) {
  const {navigation} = props;
  const {scheduleFilter, fastNavigation, language} = settingListProps;
  return (
    <View style={{flex: 1}}>
      {/*<NavigationButtonConfigSelector />*/}
      <ScrollView style={{height: '100%'}}>
        <Partition height={25} color={'#e7e7f3'} />
        <ListItem
          name={i18n.t('language')}
          props={language}
          onPress={() => onLanguageItemPress(navigation)}
        />
        <ListItem
          name={i18n.t('scheduleFilter')}
          props={scheduleFilter}
          onPress={() => onScheduleFilterItemPress(navigation)}
        />
        {/*<ListItem*/}
        {/*  name={i18n.t('fastNavigation')}*/}
        {/*  props={fastNavigation}*/}
        {/*  // onPress={this.onFastNavigationItemPress.bind(this)}*/}
        {/*/>*/}
      </ScrollView>
    </View>
  );
}

const onLanguageItemPress = navigation => {
  // const {navigate} = props.navigation;
  navigation.navigate('LanguagesScreen');
};

const onScheduleFilterItemPress = navigation => {
  // const {navigate} = props.navigation;
  navigation.navigate('ScheduleFilterScreen');
};

const settingListProps = {
  language: {
    key: 'language',
    icon: {name: 'language', size: 24},
  },
  scheduleFilter: {
    key: 'schedule-filter',
    icon: {name: 'filter'},
  },
  fastNavigation: {
    key: 'fast-navigation',
    icon: {name: 'navigation'},
  },
  authentication: {
    key: 'fast-navigation',
    icon: {name: 'fingerprint'},
  },
};

const mapStateToProps = state => {
  const {appConfig, settingsScreen} = state;
  return {
    language: appConfig.language,
    options: settingsScreen.optionIsOpen,
  };
};

// const action = {
//   changeNavigationButtonMode,
//   navigationButtonToggle
// };

export default connect(mapStateToProps)(SettingsScreen);
