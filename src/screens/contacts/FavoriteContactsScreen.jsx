import React, {Component} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';
import {connect} from 'react-redux';
import {ListItem, Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';

import {LoadingWindow, Partition} from '../../components/common';
import WarningWindow from '../../components/WarningWindow';
import {
  fetchContacts,
  getContactDetails,
} from '../../redux/actions/data/ContactsActions';
import {
  // HEADER_HEIGHT,
  STATUS_BAR_HEIGHT,
  WINDOW_HEIGHT,
} from '../../device/Screen';
import {withCapitalLetter} from '../../helpers/StringHelpers';
import {contactsServiceImgURL} from '../../configs/URL';
import i18n from '../../translations';

class FavoriteContactsScreen extends Component {
  static navigationOptions = ({}) => {
    return {title: i18n.t('favorites')};
  };

  onContactPress = contact => {
    const {getContactDetails, navigation} = this.props;
    getContactDetails(contact._id);
    navigation.navigate('ContactDetailsScreen', {contactID: contact._id});
  };

  renderOnFetchError = () => {
    const explanatory = 'Press to retry.';
    const {fetchContacts} = this.props;
    return (
      <WarningWindow
        message={'Contacts fetch fail.'}
        explanatory={explanatory}
        onPress={() => fetchContacts()}
      />
    );
  };

  renderOnListEmpty = () => {
    const headerHeight = useHeaderHeight();
    // const height = WINDOW_HEIGHT - STATUS_BAR_HEIGHT - HEADER_HEIGHT * 2;
    const height = WINDOW_HEIGHT - STATUS_BAR_HEIGHT - headerHeight * 2;
    return (
      <WarningWindow
        message={i18n.t('favoriteContacts')}
        containerStyle={{height: height}}
        explanatory={i18n.t('empty')}
      />
    );
  };

  render() {
    const {loading, error, contacts} = this.props;
    if (loading) {
      return <LoadingWindow />;
    }
    if (error) {
      return this.renderOnFetchError(error);
    }

    return (
      <FlatList
        data={contacts}
        renderItem={this.renderItem}
        keyExtractor={item => item._id}
        ListEmptyComponent={() => this.renderOnListEmpty()}
        ItemSeparatorComponent={() => this.renderSeparator()}
      />
    );
  }

  renderItem = ({item}) => (
    <TouchableOpacity key={item._id} onPress={() => this.onContactPress(item)}>
      <ListItem>
        <ListItem.Content>
          <Avatar rounded {...this.renderLeftAvatar(item)} />
          <ListItem.Title>
            {item.firstName + ' ' + item.lastName}
          </ListItem.Title>
          <ListItem.Subtitle>
            {withCapitalLetter(item.position)}
          </ListItem.Subtitle>
        </ListItem.Content>
        <Icon name="chevron-right" size={30} color="#e4e3f1" />
      </ListItem>
    </TouchableOpacity>
  );

  renderLeftAvatar = contact => {
    const imgUrl = contactsServiceImgURL + contact.photoId + 'p.jpg';
    return {
      source: {uri: imgUrl},
      title: contact.firstName[0],
      size: 45,
    };
  };

  renderSeparator = () => {
    return <Partition height={2} color={'#e4e3f1'} />;
  };
}

const mapStateToProps = state => {
  const {contacts} = state;
  const {data, loading, error} = contacts.favoriteContactList;
  return {
    contacts: data,
    loading: loading,
    error: error,
  };
};

const actions = {
  fetchContacts,
  getContactDetails,
};

export default connect(mapStateToProps, actions)(FavoriteContactsScreen);
