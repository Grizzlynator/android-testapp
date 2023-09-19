import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import {LoadingWindow, Partition} from '../../components/common';
import _ from 'lodash';
import {connect} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import i18n from '../../translations';

import {
  addContactToFavorites,
  fetchContactDetails,
  removeContactFromFavorites,
} from '../../redux/actions/data/ContactsActions';

import {RoundContactAvatar} from '../../components/common/avatar/RoundContactAvatar';
import HeaderTitle from '../../components/HeaderTitle';
import WarningWindow from '../../components/WarningWindow';
import {contactsServiceImgURL, contactsServiceURL} from '../../configs/URL';

class ContactsDetailsScreen extends Component {
  static navigationOptions = ({}) => {
    return {
      headerTitle: <HeaderTitle title={'contacts'} />,
    };
  };

  onAvatarClick = () => {
    const {addContactToFavorites, removeContactFromFavorites, route} =
      this.props;
    const {contact, favoriteContactList} = this.props;
    // const contactID = this.props.navigation.getParam('contactID');
    const {contactID} = route.params;

    const isAlreadyFavorite =
      favoriteContactList.contactsID.includes(contactID);

    isAlreadyFavorite
      ? removeContactFromFavorites(contactID)
      : addContactToFavorites(contact);
  };

  onContactItemClick = item => {
    Clipboard.setString(item.value);
    showMessage({
      message: 'Copied to clipboard',
      backgroundColor: 'rgba(51,51,51,0.79)',
      type: 'info',
    });
  };

  render() {
    const {loading, error, contact, favoriteContactList, route} = this.props;

    if (loading) {
      return <LoadingWindow />;
    }
    if (error) {
      return this.renderOnFetchError(error);
    }

    // const contactID = navigation.getParam('contactID');
    const {contactID} = route.params;
    const isAlreadyFavorite =
      favoriteContactList.contactsID.includes(contactID);

    const contactDetailsList = [
      {title: 'Structure', value: contact.structure},
      {title: 'Email', value: contact.email},
      {title: 'Phone', value: contact.phone},
      {title: 'Cabinet', value: contact.audit},
    ];

    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.headerContainer}>
          <View style={{marginTop: 15}}>
            <RoundContactAvatar
              favorite={isAlreadyFavorite}
              size="xlarge"
              title={'Contact Title'}
              onPress={() => this.onAvatarClick()}
              source={{uri: contactsServiceImgURL + contact.photoId + '.png'}}
            />
          </View>
          <Text style={styles.title}>
            {contact.firstName + ' ' + contact.lastName}
          </Text>
          <Text>{_.capitalize(contact.position)}</Text>
        </View>
        <View>
          <FlatList
            data={contactDetailsList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderItem}
            // ItemSeparatorComponent={this.renderSeparator}
          />
        </View>
      </SafeAreaView>
    );
  }

  renderOnFetchError = () => {
    const {navigation, fetchContactDetails, route} = this.props;
    // const contactID = navigation.getParam('contactID');
    const {contactID} = route.params;
    const explanatory = 'Press to retry.';
    return (
      <WarningWindow
        message={'Contact details fetch fail.'}
        explanatory={explanatory}
        onPress={() => fetchContactDetails(contactID)}
      />
    );
  };

  _renderItem = ({item}) => {
    const title = _.lowerCase(item.title);
    const listItemJSX = (
      // <ListItem
      //   title={i18n.t(title)}
      //   subtitle={item.value}
      //   containerStyle={styles.listItemContainer}
      //   titleStyle={styles.listItemTitle}
      //   subtitleStyle={styles.listItemSubtitle}
      //   rightIcon={() => <Icon name="copy" size={30} color="#e4e3f1" />}
      //   onPress={() => this.onContactItemClick(item)}
      // />
      <ListItem bottomDivider onPress={() => this.onContactItemClick(item)}>
        <ListItem.Content>
          <ListItem.Title style={styles.listItemTitle}>
            <Text>{i18n.t(title)}</Text>
          </ListItem.Title>
          <ListItem.Subtitle style={styles.listItemSubtitle}>
            <Text>{item.value}</Text>
          </ListItem.Subtitle>
        </ListItem.Content>
        <Icon name="copy" size={30} color="#e4e3f1" />
      </ListItem>
    );
    // return _.isEmpty(item.value) ? null : listItemJSX;
    return _.isEmpty(item.value) ? null : listItemJSX;
  };

  get renderItem() {
    return this._renderItem;
  }

  set renderItem(value) {
    this._renderItem = value;
  }

  renderSeparator = ({leadingItem}) => {
    const separatorJSX = <Partition height={3} color={'#e4e3f1'} />;
    return _.isEmpty(leadingItem.value) ? null : separatorJSX;
  };
}

const actions = {
  addContactToFavorites,
  removeContactFromFavorites,
  fetchContactDetails,
};

const mapStateToProps = state => {
  // console.log('contact detail: ', JSON.stringify(state));
  const {contacts} = state;
  return {
    favoriteContactList: contacts.favoriteContactList,
    contact: contacts.contact.data,
    loading: contacts.contact.loading,
    error: contacts.contact.error,
  };
};

export default connect(mapStateToProps, actions)(ContactsDetailsScreen);

const styles = StyleSheet.create({
  listItemContainer: {
    paddingVertical: 5,
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginTop: 15,
  },
  listItemTitle: {
    fontSize: 14,
    color: '#76777a',
  },
  listItemSubtitle: {
    fontSize: 16,
    color: '#1d1d1d',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  imgContainer: {
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },
  starIcon: {
    right: -10,
    bottom: -10,
    height: 45,
    width: 45,
    position: 'absolute',
    zIndex: 10,
  },
});
