import React from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, Platform, Keyboard} from 'react-native';
import {Button} from 'react-native-elements';

import {fetchScheduleItems} from '../../redux/actions/data/ScheduleActions';

import {LoadingWindow} from '../../components/common';
import WarningWindow from '../../components/WarningWindow';
import HeaderTitle from '../../components/HeaderTitle';
import {isEveryPropEmpty} from '../../helpers/ObjectHelpers';
import MaterialInput from '../../components/common/input/autocomplete/MaterialInput';
import {
  resetFilterForm,
  saveUserFilterIfValid,
  scheduleFilterFormInputsUpdate,
  showActiveFilter,
} from '../../redux/actions/screen/ScheduleFilterScreenActions';
import NavigationService from '../../workers/NavigationService';
import i18n from '../../translations';

class ScheduleFilterScreen extends React.Component {
  static navigationOptions = ({}) => {
    return {headerTitle: <HeaderTitle title={'scheduleFilter'} />};
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevProps.filterSaved && this.props.filterSaved) {
      // TODO remove comment
      NavigationService.navigate('ScheduleScreen');
    }
  }

  componentDidMount() {
    const {dropDownValues, fetchScheduleItems, showActiveFilter} = this.props;
    if (isEveryPropEmpty(dropDownValues)) {
      fetchScheduleItems();
    }
    showActiveFilter();
  }

  componentWillUnmount() {
    const {showActiveFilter} = this.props;
    showActiveFilter();
  }

  onFilterFormInputUpdate = (prop, value) => {
    // console.log('ScheduleFilter prop: ', prop);
    // console.log('ScheduleFilter value: ', value);
    const {scheduleFilterFormInputsUpdate} = this.props;
    scheduleFilterFormInputsUpdate({[prop]: value});
  };

  onSaveButtonPress = () => {
    const {saveUserFilterIfValid} = this.props;
    saveUserFilterIfValid();
    Keyboard.dismiss();
  };

  onResetButtonPress = () => {
    const {resetFilterForm} = this.props;
    resetFilterForm();
  };

  render = () => {
    const {serviceDataError, loading} = this.props;

    if (loading) {
      return <LoadingWindow />;
    }
    if (serviceDataError) {
      return this.renderOnServiceDataError();
    }

    return (
      <View style={styles.mainContainer}>
        {this.renderFirstRow()}
        {this.renderSecondRow()}
        {this.renderButtons()}
      </View>
    );
  };

  renderFirstRow = () => {
    const {inputValues, dropDownValues, inputsWithError} = this.props;
    const {group, room} = inputValues;
    return (
      <View style={styles.fistRowInputContainer}>
        <MaterialInput
          containerStyle={[styles.inputContainer, styles.groupInput]}
          data={dropDownValues.groups}
          error={inputsWithError.includes('group') ? 'Invalid value' : ''}
          onChangeText={text => this.onFilterFormInputUpdate('group', text)}
          onListItemClick={text => this.onFilterFormInputUpdate('group', text)}
          label={i18n.t('group')}
          value={group}
          zIndex={3}
        />

        <MaterialInput
          containerStyle={[styles.inputContainer, styles.roomInput]}
          data={dropDownValues.rooms}
          error={inputsWithError.includes('room') ? 'Invalid value' : ''}
          onChangeText={text => this.onFilterFormInputUpdate('room', text)}
          onListItemClick={text => this.onFilterFormInputUpdate('room', text)}
          label={i18n.t('room')}
          value={room}
          zIndex={3}
        />
      </View>
    );
  };

  renderSecondRow = () => {
    const {inputValues, dropDownValues, inputsWithError} = this.props;
    const {lecturer} = inputValues;
    return (
      <View style={styles.secondInputRowContainer}>
        <MaterialInput
          containerStyle={styles.inputContainer}
          error={inputsWithError.includes('lecturer') ? 'Invalid value' : ''}
          data={dropDownValues.lecturers}
          onChangeText={text => this.onFilterFormInputUpdate('lecturer', text)}
          onListItemClick={text =>
            this.onFilterFormInputUpdate('lecturer', text)
          }
          label={i18n.t('lecturer')}
          value={lecturer}
          zIndex={2}
        />
      </View>
    );
  };

  renderButtons = () => {
    const {filterSaved} = this.props;

    const resetBtnTitle = i18n.t('reset');
    const saveBtnTitle = filterSaved ? i18n.t('saved') : i18n.t('save');
    const {blueBgColor, tsiBgColor, whiteBgColor} = btnStyles;

    return (
      <View style={btnStyles.bottomBtnsContainer}>
        <Button
          title={resetBtnTitle.toUpperCase()}
          onPress={this.onResetButtonPress}
          containerStyle={[btnStyles.resetBtnContainer, btnStyles.btnShadow]}
          titleStyle={[btnStyles.btnsFont, {color: '#144774'}]}
          buttonStyle={whiteBgColor}
        />
        <Button
          title={saveBtnTitle.toUpperCase()}
          onPress={this.onSaveButtonPress}
          containerStyle={[btnStyles.saveBtnContainer, btnStyles.btnShadow]}
          titleStyle={btnStyles.btnsFont}
          buttonStyle={filterSaved ? blueBgColor : tsiBgColor}
        />
      </View>
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
  scheduleFilterFormInputsUpdate,
  saveUserFilterIfValid,
  fetchScheduleItems,
  resetFilterForm,
  showActiveFilter,
};

const mapStateToProps = state => {
  const {scheduleFilterForm, scheduleFilter, scheduleItems} = state;
  return {
    ...scheduleFilterForm,
    currentFilter: scheduleFilter,
    serviceDataError: scheduleItems.error,
    loading: scheduleItems.loading,
  };
};

export default connect(mapStateToProps, actions)(ScheduleFilterScreen);

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: 5,
    width: '95%',
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 35,
    paddingHorizontal: 25,
    marginTop: 30,
    borderColor: '#e8e8e8',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    borderRadius: 10,
  },
  fistRowInputContainer: {
    flexDirection: 'row',
    zIndex: Platform.OS === 'ios' ? 3 : undefined,
  },
  secondInputRowContainer: {
    zIndex: Platform.OS === 'ios' ? 2 : undefined,
  },
  inputContainer: {marginTop: 20},
  groupInput: {flex: 6, marginRight: 20},
  roomInput: {flex: 5},
});

const btnStyles = StyleSheet.create({
  bottomBtnsContainer: {
    flexDirection: 'row',
    marginTop: 30,
    zIndex: 1,
  },
  btnsFont: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  resetBtnContainer: {
    flex: 2,
    marginRight: 15,
  },
  saveBtnContainer: {
    flex: 3,
    elevation: 5,
  },
  btnShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  tsiBgColor: {backgroundColor: '#144774'},
  blueBgColor: {backgroundColor: '#0074f1'},
  whiteBgColor: {backgroundColor: 'white'},
});
