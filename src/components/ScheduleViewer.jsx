import React from 'react';
import {Text, View, SectionList, StyleSheet, Platform} from 'react-native';
import {connect} from 'react-redux';
import {useHeaderHeight} from '@react-navigation/elements';
import {Linking} from 'react-native';
import _ from 'lodash';

import {fetchScheduleEvents} from '../redux/actions/data/ScheduleActions';
import {LoadingWindow, MessageWindow} from './common';
import {Event, Header, Room, Section} from './time-table';
import {
  // HEADER_HEIGHT,
  STATUS_BAR_HEIGHT,
  WINDOW_HEIGHT,
} from '../device/Screen';
import {unixToString} from '../workers/UnixTimestampService';
import {withCapitalLetter} from '../helpers/StringHelpers';
import WarningWindow from './WarningWindow';
import i18n from '../translations';

const filterWasChanged = (prop1, prop2) => {
  return !_.isEqual(prop1.filter, prop2.filter);
};

const onEmptyListMessage = filter => {
  const {fromDate, toDate} = filter;
  const format = 'MMMM Do YYYY';
  const from = withCapitalLetter(unixToString(fromDate, format));
  const to = withCapitalLetter(unixToString(toDate, format));
  return _.isEqual(from, to) ? from : from + ' - ' + to;
};

class ScheduleViewer extends React.Component {
  fetchSchedule() {
    const {filter, language} = this.props;
    this.props.fetchScheduleEvents(filter, language);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const {isFocused} = this.props.navigation;
    return isFocused();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('SCHEDULE VIEWER - UPDATED <<<<-------');
    if (filterWasChanged(this.props, prevProps)) {
      this.fetchSchedule();
    }
  }

  componentDidMount() {
    // console.log('ScheduleView componentDidMount');
    // console.log(
    //   'ScheduleView componentDidMount props.navigation => ',
    //   this.props.navigation,
    // );
    const {schedule} = this.props;
    this.onFocusCall = this.props.navigation.addListener('willFocus', () => {
      console.log('ScheduleView onFocusCall');
      this.fetchSchedule();
    });
    console.log('------ ScheduleView filter: ', this.props.filter);
    console.log('------ ScheduleView props before if: ', this.props.schedule);
    // if (_.isEqual(schedule, [])) {
    //   this.fetchSchedule();
    // }
    this.fetchSchedule();
    console.log('------ ScheduleView props: ', this.props.schedule);
  }

  render = () => {
    const {loading, schedule, error} = this.props;

    if (loading) {
      return <LoadingWindow />;
    }
    if (error) {
      return this.renderErrorMessage(error);
    }

    return (
      <SectionList
        showsVerticalScrollIndicator={false}
        sections={schedule}
        renderItem={({item, index}) => this.renderEvent({...item, index})}
        renderSectionHeader={({section}) => this.renderHeader(section.title)}
        ItemSeparatorComponent={this.renderSeparator}
        keyExtractor={(item, index) => index}
        ListEmptyComponent={() => this.renderIfListIsEmpty()}
      />
    );
  };

  renderEvent = event => {
    return (
      <Event type={event.type} key={event.index}>
        <Section style={eventStyle.timeSectionStyle}>
          <Text style={eventStyle.eventTimeTextStyle}>{event.time}</Text>
          {event.room && <Room>{event.room}</Room>}
        </Section>
        <Section style={{flex: 1}}>
          <Text style={eventStyle.eventNameTextStyle}>{event.name}</Text>
          <View style={{marginTop: 2}}>
            <Text style={eventStyle.addInfoTextStyle}>{event.lecturer}</Text>
          </View>
          <Text
            nativeID={'groups'}
            style={[eventStyle.addInfoTextStyle, {marginTop: 5}]}>
            {event.groups.map(item => item + ' ')}
          </Text>
          {event.comment !== '' && (
            <Text
              nativeID={'comment'}
              style={[
                commentStyle[event.type],
                {color: event.link ? 'darkblue' : null},
              ]}
              onPress={() =>
                event.link ? Linking.openURL(event.link[0]) : null
              }>
              {event.comment}
            </Text>
          )}
        </Section>
      </Event>
    );
  };

  renderIfListIsEmpty = () => {
    const HEADER_HEIGHT = useHeaderHeight();
    const height = WINDOW_HEIGHT - STATUS_BAR_HEIGHT - HEADER_HEIGHT;
    const explanatory = onEmptyListMessage(this.props.filter);
    return (
      <MessageWindow
        containerStyle={{
          height: height,
          backgroundColor: Platform.OS === 'ios' ? 'white' : '#EAEAEA',
        }}
        message={i18n.t('noEventsFount')}
        explanatory={explanatory}
      />
    );
  };

  renderErrorMessage = message => {
    const explanatory = i18n.t('pressToRetry');
    return (
      <WarningWindow
        message={message}
        explanatory={explanatory}
        onPress={() => this.fetchSchedule()}
      />
    );
  };

  renderHeader = title => <Header weekDay={title} />;

  renderSeparator = () => <View style={eventStyle.separatorStyle} />;
}

const actions = {
  fetchScheduleEvents,
};

function mapStateToProps(state) {
  const {schedule, appConfig, scheduleFilter} = state;
  const {group, room, lecturer, fromDate, toDate} = scheduleFilter;
  const filter = {group, room, lecturer, fromDate, toDate};

  return {
    filter: filter,
    language: appConfig.language,
    loading: schedule.loading,
    schedule: schedule.events,
    error: schedule.error,
  };
}

// export default connect(
//   mapStateToProps,
//   actions,
// )(withNavigationFocus(ScheduleViewer));
export default connect(mapStateToProps, actions)(ScheduleViewer);

const eventStyle = StyleSheet.create({
  timeSectionStyle: {justifyContent: 'center', alignItems: 'center'},
  eventTimeTextStyle: {fontSize: 21, fontWeight: '700', color: '#676767'},
  eventNameTextStyle: {fontSize: 17, fontWeight: '700', color: '#144774'},
  addInfoTextStyle: {color: '#676767', fontSize: 15},
  separatorStyle: {height: 1, width: '100%', backgroundColor: '#C8C8C8'},
});

const commentStyle = StyleSheet.create({
  normal: {marginTop: 2},
  problem: {fontWeight: '700', color: 'rgba(255,3,12,1)'},
  remote: {fontWeight: '700', color: 'rgba(255,250,0,0.27)'},
});
