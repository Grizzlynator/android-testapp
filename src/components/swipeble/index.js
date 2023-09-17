import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {FlatList} from 'react-native-gesture-handler';

//  To toggle LTR/RTL uncomment the next line
// I18nManager.allowRTL(true);

import GmailStyleSwipeableRow from './GmailStyleSwipeableRow';

const SwipeableRow = ({props, item, index, onDelete}) => {
  const {news} = props;

  return (
    <GmailStyleSwipeableRow index={index} onSwipeLeft={onDelete}>
      <View style={styles.rectButton} onPress={() => alert(item.from)}>
        <Text style={styles.fromText}>{item.from}</Text>
        <Text numberOfLines={3} style={styles.messageText}>
          {news[index].description}
        </Text>
        <Text style={styles.dateText}>{item.when}</Text>
      </View>
    </GmailStyleSwipeableRow>
  );
};

export default class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          from: 'Registrations for Intake NOW OPEN!',
          when: '3:11 PM',
          message:
            'The Transport and Telecommunication Institute (TSI) ADMISSION HAS BEGUN to bachelor s, master s, and doctoral study programs for the academic year 2020/2021. TSI offers 18 STUDY PROGRAMS, full-time...',
        },
        {
          from: 'Aramis',
          when: '11:46 AM',
          message:
            'Regarding to the emergency situation in the World, TSI has prepared a special offer for those who want to study and cannot come by the beginning of the semester and are ready to start studies in a...',
        },
        {
          from: 'Athos',
          when: '6:06 AM',
          message:
            'Sed non arcu ullamcorper, eleifend velit eu, tristique metus. Duis id sapien eu orci varius malesuada et ac ipsum. Ut a magna vel urna tristique sagittis et dapibus augue. Vivamus non mauris a turpis auctor sagittis vitae vel ex. Curabitur accumsan quis mauris quis venenatis.',
        },
        {
          from: 'Porthos',
          when: 'Yesterday',
          message:
            'Vivamus id condimentum lorem. Duis semper euismod luctus. Morbi maximus urna ut mi tempus fermentum. Nam eget dui sed ligula rutrum venenatis.',
        },
      ],
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('updated');
  }

  render() {
    return (
      <FlatList
        data={this.state.data}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({item, index}) => (
          <SwipeableRow
            props={this.props}
            item={item}
            index={index}
            onDelete={() => {
              const newData = this.state.data.filter(x => x.from !== item.from);
              this.setState({data: newData});
            }}
          />
        )}
        keyExtractor={(item, index) => `message ${index}`}
      />
    );
  }
}

const styles = StyleSheet.create({
  rectButton: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  separator: {
    backgroundColor: 'rgb(200, 199, 204)',
    height: StyleSheet.hairlineWidth,
  },
  fromText: {
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  messageText: {
    color: '#999',
    backgroundColor: 'transparent',
  },
  dateText: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 20,
    top: 10,
    color: '#999',
    fontWeight: 'bold',
  },
});

const DATA = [
  {
    from: 'Registrations for Intake NOW OPEN!',
    when: '3:11 PM',
    message:
      'The Transport and Telecommunication Institute (TSI) ADMISSION HAS BEGUN to bachelor s, master s, and doctoral study programs for the academic year 2020/2021. TSI offers 18 STUDY PROGRAMS, full-time...',
  },
  {
    from: 'Aramis',
    when: '11:46 AM',
    message:
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus hendrerit ligula dignissim maximus aliquet. Integer tincidunt, tortor at finibus molestie, ex tellus laoreet libero, lobortis consectetur nisl diam viverra justo.',
  },
  {
    from: 'Athos',
    when: '6:06 AM',
    message:
      'Sed non arcu ullamcorper, eleifend velit eu, tristique metus. Duis id sapien eu orci varius malesuada et ac ipsum. Ut a magna vel urna tristique sagittis et dapibus augue. Vivamus non mauris a turpis auctor sagittis vitae vel ex. Curabitur accumsan quis mauris quis venenatis.',
  },
  {
    from: 'Porthos',
    when: 'Yesterday',
    message:
      'Vivamus id condimentum lorem. Duis semper euismod luctus. Morbi maximus urna ut mi tempus fermentum. Nam eget dui sed ligula rutrum venenatis.',
  },
];
