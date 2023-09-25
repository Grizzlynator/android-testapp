import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {withNavigationFocus} from '@react-navigation/compat';

// import {withNavigationFocus} from 'react-navigation';

import {LoadingWindow} from '../components/common';
import WarningWindow from '../components/WarningWindow';
import HeaderTitle from '../components/HeaderTitle';
import ScheduleRangePopup from '../components/ScheduleRangePopup';

import {switchPage} from '../redux/actions/screen/ScheduleScreenActions';
import {fetchScheduleItems} from '../redux/actions/data/ScheduleActions';
import Icon from 'react-native-vector-icons/FontAwesome';

import i18n from '../translations';
import ScheduleViewer from '../components/ScheduleViewer';
import SideButton from '../components/common/button/SideButton';

class ScheduleScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerRight: <ScheduleRangePopup />,
      headerTitle: <HeaderTitle title={'schedule'} />,
    };
  };

  onLeftButtonPress = () => {
    const {shift, range} = this.props.page;
    this.props.switchPage(range, shift - 1);
  };

  onRightButtonPress = () => {
    const {shift, range} = this.props.page;
    this.props.switchPage(range, shift + 1);
  };

  // willFocusSubscription = this.props.navigation.addListener(
  //   'willFocus',
  //   payload => {
  //     const {itemsError, fetchScheduleItems} = this.props;
  //     if (itemsError) {
  //       fetchScheduleItems();
  //     }
  //   },
  // );

  componentDidMount() {
    // console.log('ScheduleScreen componentDidMount');
    // console.log(
    //   'ScheduleScreen componentDidMount props.navigation => ',
    //   this.props.navigation,
    // );
    this.onFocusCall = this.props.navigation.addListener('focus', () => {
      const {itemsError, fetchScheduleItems} = this.props;
      if (itemsError) {
        fetchScheduleItems();
      }
    });
    fetchScheduleItems();
  }

  didBlurSubscription = this.props.navigation.addListener(
    'didBlur',
    payload => {
      const {switchPage, page} = this.props;
      switchPage(page.range, 0);
    },
  );

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const {props} = this;
    return (
      props.filterError !== nextProps.filterError ||
      props.itemsError !== nextProps.itemsError ||
      props.loading !== nextProps.loading
    );
  }

  render = () => {
    const {loading, filterError, itemsError} = this.props;
    if (loading) {
      return <LoadingWindow />;
    }
    if (filterError || itemsError) {
      return this.renderErrorMessage();
    }

    const leftBtnIcon = <Icon name="angle-left" size={30} color="black" />;
    const rightBtnIcon = <Icon name="angle-right" size={30} color="black" />;

    return (
      <View style={{flex: 1}}>
        <ScheduleViewer navigation={this.props.navigation} />
        <SideButton
          side={'left'}
          onPress={this.onLeftButtonPress}
          color={'rgba(0,0,0,0.1)'}
          icon={leftBtnIcon}
        />
        <SideButton
          side={'right'}
          onPress={this.onRightButtonPress}
          color={'rgba(0,0,0,0.1)'}
          icon={rightBtnIcon}
        />
      </View>
    );
  };

  renderErrorMessage = () => {
    const {itemsError, filterError} = this.props;
    return itemsError
      ? this.renderOnServiceDataError()
      : this.renderOnFilterError();
  };

  renderOnFilterError = () => {
    const {navigation} = this.props;
    return (
      <WarningWindow
        message={i18n.t('filterNotDefined')}
        explanatory={i18n.t('pressToDefinedFilter')}
        onPress={() => navigation.navigate('ScheduleFilterScreen')}
      />
    );
  };

  renderOnServiceDataError = () => {
    const {fetchScheduleItems} = this.props;
    return (
      <WarningWindow
        message={i18n.t('serviceDataUpdateFail')}
        explanatory={i18n.t('checkAnaPress')}
        onPress={() => fetchScheduleItems()}
      />
    );
  };
}

const actions = {
  fetchScheduleItems,
  switchPage,
};

const mapStateToProps = state => {
  const {scheduleFilter, scheduleItems, scheduleScreen} = state;
  return {
    loading: scheduleItems.loading,
    filterError: scheduleFilter.error,
    itemsError: scheduleItems.error,
    page: scheduleScreen.page,
  };
};

export default connect(
  mapStateToProps,
  actions,
)(withNavigationFocus(ScheduleScreen));
// export default connect(mapStateToProps, actions)(ScheduleScreen);

const styles = {
  errorMessage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButton: {
    marginRight: 11,
    padding: 7,
  },
  overlay: {backgroundColor: 'rgba(0,0,0,0.0)'},
};
