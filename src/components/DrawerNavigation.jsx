import React from 'react';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import _ from 'lodash';

import i18n from '../translations';
import {
  DrawerItemList,
  getDrawerStatusFromState,
} from '@react-navigation/drawer';

import {fetchNews, unmarkAsReadAll} from '../redux/actions/data/NewsActions';
import {signOut} from '../redux/actions/AuthActions';
// import { DrawerNavigatorItems } from 'react-navigation-drawer';
import {
  hideNavigationButton,
  showNavigationButton,
} from '../redux/actions/NavigationButtonActions';
import {cleanUpNotifierProfileData} from '../redux/actions/NotificationActions';

class DrawerNavigation extends React.Component {
  fetchNews = () => {
    const {language, fetchNews} = this.props;
    fetchNews(language);
  };

  onNavigationTabPress = ({route, focused}) => {
    const {routeName} = route;
    console.log('route name: ', routeName);
    this.runOnTabPressActions(routeName);
    this.props.navigation.navigate(routeName);
  };

  runOnTabPressActions = routeName => {
    switch (routeName) {
      case 'News':
        this.fetchNews();
        this.props.navigation.navigate('DrawerClose');
        break;
    }
  };

  onSignOutBtnPress = () => {
    console.log('--SignOut---');
    const {signOut, unmarkAsReadAll, cleanUpNotifierProfileData} = this.props;
    cleanUpNotifierProfileData();
    unmarkAsReadAll();
    signOut();
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    // console.log('nextProps: ', JSON.stringify(nextProps));
    const {language: currLang, navigation} = this.props;
    const {language: nextLang} = nextProps;

    const isLangChanged = !_.isEqual(currLang, nextLang);
    // const { isDrawerOpen: willBeOpen } = nextProps.navigation.state;
    const drawerStatus = getDrawerStatusFromState(navigation.getState());
    const willBeOpen = drawerStatus === 'open' ? true : false;
    // const isStateChanged = willBeOpen !== navigation.state.isDrawerOpen;
    const isStateChanged =
      willBeOpen !== getDrawerStatusFromState(navigation.getState());

    return willBeOpen || isLangChanged || isStateChanged;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {hideNavigationButton, showNavigationButton, signedIn} = this.props;
    const {navigation} = this.props;
    // const { isDrawerOpen } = navigation.state;
    const isDrawerOpen =
      getDrawerStatusFromState(navigation.getState()) === 'open' ? true : false;

    isDrawerOpen ? hideNavigationButton() : showNavigationButton();
    // TODO uncomment
    // if (!signedIn) navigation.navigate('Auth');
  }

  render() {
    // console.log('DrawerNavigation props: ', JSON.stringify(this.props));
    const {descriptors: items, profile} = this.props;
    // const itemsToShow =
    //   profile.status === 'guest'
    //     ? items.filter(item => item.key !== 'Notifications')
    //     : items;

    return (
      <SafeAreaView
        style={styles.containerStyle}
        forceInset={{top: 'always', horizontal: 'never'}}>
        {this.renderHeader()}
        <ScrollView style={{paddingTop: 8}}>
          <DrawerItemList
            {...this.props}
            // items={itemsToShow}
            // items={items}
            activeTintColor={'#144774'}
            itemsContainerStyle={{}}
            iconContainerStyle={styles.iconItemContainer}
            getLabel={scene => this.renderItemLabel(scene)}
            onItemPress={props => this.onNavigationTabPress(props)}
          />
        </ScrollView>
        {this.renderSignOutBtn()}
      </SafeAreaView>
    );
  }

  renderItemLabel = scene => {
    const {getLabel} = this.props;
    const {focused} = scene;

    const itemTextStyle = {
      color: scene.tintColor,
      fontWeight: focused ? 'bold' : '300',
    };

    return (
      <View style={{flexDirection: 'row'}}>
        <View style={{padding: 12, flexDirection: 'row'}}>
          <Text style={itemTextStyle}>
            {i18n.t(getLabel(scene).toLowerCase())}
          </Text>
        </View>
        {this.renderLabelRightIcon(scene)}
      </View>
    );
  };

  renderLabelRightIcon = scene => {
    const {getLabel} = this.props;

    switch (getLabel(scene)) {
      case 'News':
        break;
      case 'Notifications':
        break;
    }
  };

  renderSignOutBtn = () => {
    return (
      <TouchableOpacity
        onPress={() => this.onSignOutBtnPress()}
        style={styles.signOutBtnContainer}>
        <View style={styles.iconItemContainer}>
          <Icon name="log-out" size={21} color="black" />
        </View>
        <View>
          <Text>{i18n.t('signOut')}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderHeader = () => {
    const {status} = this.props.profile;

    return (
      <ImageBackground
        source={require('../../image/bgs.jpeg')}
        resizeMode={'stretch'}
        style={profileBlockStyle.imageBackground}>
        <View style={styles.logoImgContainer}>
          <Image
            source={require('../../image/logo_white.png')}
            resizeMode={'contain'}
            style={styles.logoImg}
          />
        </View>

        {status === 'guest'
          ? this.renderGuestProfileInfo()
          : this.renderProfileInfo()}
      </ImageBackground>
    );
  };

  renderProfileInfo = () => {
    const {profileText, nameText} = profileBlockStyle;
    const {displayName, email, group, status} = this.props.profile;
    return (
      <View style={profileBlockStyle.container}>
        <Text style={[profileText, nameText]}>{displayName}</Text>
        <Text style={profileText}>Email: {email}</Text>
      </View>
    );
  };

  renderGuestProfileInfo = () => {
    const {profileText, nameText} = profileBlockStyle;
    return (
      <View style={profileBlockStyle.container}>
        <Text style={[profileText, nameText]}>
          {/* {i18n.t('youAreSignedAsGuest')} */}
          {i18n.t('youAreSignedAsGuest')}
        </Text>
      </View>
    );
  };
}

const actions = {
  cleanUpNotifierProfileData,
  hideNavigationButton,
  showNavigationButton,
  unmarkAsReadAll,
  fetchNews,
  signOut,
};

const mapStateToProps = state => {
  const {appConfig, profile, news, notifier} = state;

  return {
    profile: profile,
    signedIn: appConfig.signedIn,
    language: appConfig.language,
    hasUnreadMessages: news.hasUnreadMessages,
  };
};

export default connect(mapStateToProps, actions)(DrawerNavigation);

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  iconItemContainer: {
    marginLeft: 20,
    marginRight: 20,
  },
  signOutBtnContainer: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    flexDirection: 'row',
  },
  logoImgContainer: {
    marginTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    height: 80,
    paddingHorizontal: 5,
  },
  logoImg: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
});

const profileBlockStyle = StyleSheet.create({
  imageBackground: {
    justifyContent: 'flex-end',
    backgroundColor: 'green',
  },
  container: {
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: 5,
  },
  profileText: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 1,
  },
  nameText: {
    fontSize: 16,
    paddingBottom: 3,
  },
});
