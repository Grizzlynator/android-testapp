import React from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {ListItem, SearchBar, Avatar} from 'react-native-elements';
import _ from 'lodash';
import {connect} from 'react-redux';
// import {withNavigationFocus} from '@react-navigation/compat';

import {LoadingWindow, Partition} from '../../components/common';
import {
  fetchContactDetails,
  fetchContacts,
} from '../../redux/actions/data/ContactsActions';
import WarningWindow from '../../components/WarningWindow';
import i18n from '../../translations';
import {updateContactFilter} from '../../redux/actions/ContactsListFilterActions';
import {contactsServiceImgURL} from '../../configs/URL';

class AllContactsScreen extends React.Component {
  static navigationOptions = ({}) => {
    return {title: i18n.t('all')};
  };

  onContactPress = contact => {
    const {fetchContactDetails, navigation} = this.props;
    fetchContactDetails(contact._id);
    navigation.navigate('ContactDetailsScreen', {contactID: contact._id});
  };

  // willFocusSubscription = this.props.navigation.addListener(
  //   'willFocus',
  //   payload => {
  //     console.log('willFocusSubscription language: ', this.props.language);
  //     const {contacts, fetchContacts, language} = this.props;
  //     if (_.isEqual(contacts, [])) fetchContacts(language);
  //   },
  // );

  componentDidMount = () => {
    console.log('AllContactsScreen componentDidMount');
    console.log('AllContactsScreen componentDidMount props.navigation -> ', this.props.navigation);
    this.onFocusCall = this.props.navigation.addListener('focus', () => {
      const {contacts, fetchContacts, language} = this.props;
      console.log('componentDidMount language: ', language);
      if (_.isEqual(contacts, [])) {
        fetchContacts(language);
      }
    });
  };

  // TODO remove comment
  // componentWillUnmount = () => {
  //   console.log('componentWillUnmount');
  //   this.onFocusCall.remove();
  // };

  renderOnFetchError = () => {
    const {fetchContacts, language} = this.props;
    const explanatory = i18n.t('pressToRetry');
    const message = i18n.t('networkRequestFailed');
    return (
      <WarningWindow
        message={message}
        explanatory={explanatory}
        onPress={() => fetchContacts(language)}
      />
    );
  };

  renderOnListEmpty = () => {
    const {messageOnListEmpty} = this.props;
    return <WarningWindow message={messageOnListEmpty} />;
  };

  // componentDidMount() {
  //   this.fetchContacts();
  // }

  render() {
    const {loading, error, filteredContacts} = this.props;
    if (loading) {
      return <LoadingWindow />;
    }
    if (error) {
      return this.renderOnFetchError(error);
    }

    return (
      <SafeAreaView style={{flex: 1}}>
        <FlatList
          keyExtractor={item => item._id}
          data={filteredContacts}
          renderItem={this.renderItem}
          ListEmptyComponent={() => this.renderOnListEmpty()}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderSearchBar}
        />
      </SafeAreaView>
    );
  }

  renderSearchBar = () => {
    const {updateContactFilter, filter} = this.props;
    return (
      <SearchBar
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInput}
        placeholder={i18n.t('search') + '...'}
        onChangeText={text => updateContactFilter(text)}
        value={filter}
      />
    );
  };

  renderItem = ({item}) => {
    const position = item.position ? _.capitalize(item.position) : null;
    return (
      <TouchableOpacity key={item.id} onPress={() => this.onContactPress(item)}>
        <ListItem containerStyle={{paddingVertical: 13}}>
          <ListItem.Content>
            <Avatar rounded {...this.renderLeftAvatar(item)} />
            <ListItem.Title>
              {item.firstName + ' ' + item.lastName}
            </ListItem.Title>
            <ListItem.Subtitle>{position}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron size={30} color="#e4e3f1" />
        </ListItem>
      </TouchableOpacity>
    );
  };

  renderLeftAvatar = contact => {
    const imgUrl = contactsServiceImgURL + contact.photoId + 'p.jpg';
    return {
      source: {uri: imgUrl},
      title: contact.firstName[0],
      size: 45,
    };
  };

  renderSeparator = () => {
    return <Partition height={3} color={'#e4e3f1'} />;
  };
}

const mapStateToProps = state => {
  const {contacts, contactsScreen, appConfig} = state;
  return {
    language: appConfig.language,
    messageOnListEmpty: contactsScreen.messageOnListEmpty,
    loading: contacts.contactList.loading,
    error: contacts.contactList.error,
    contacts: contacts.contactList.data,
    filteredContacts: contactsScreen.dataToShow,
    filter: contactsScreen.filter,
  };
};

const actions = {
  fetchContacts,
  fetchContactDetails,
  updateContactFilter,
};

export default connect(mapStateToProps, actions)(AllContactsScreen);
// export default connect(
//   mapStateToProps,
//   actions,
// )(withNavigationFocus(AllContactsScreen));

const styles = StyleSheet.create({
  searchBarContainer: {
    backgroundColor: 'rgb(228,227,241)',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  searchBarInput: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
