import React, {useEffect} from 'react';
import {connect, useSelector} from 'react-redux';
import {
  TouchableOpacity,
  View,
  UIManager,
  Text,
  StyleSheet,
  FlatList,
  LayoutAnimation,
  Image,
  SafeAreaView,
} from 'react-native';
import {Card} from 'react-native-elements';

// import {withNavigationFocus} from 'react-navigation';

import {fetchNews, markAsRead} from '../../redux/actions/data/NewsActions';
import {OpacityMessageWindow} from '../../components/common';
// import HeaderTitle from '../../component/HeaderTitle';
import i18n from '../../translations';
//
// import messaging from '@react-native-firebase/messaging';
import GmailStyleSwipeableRow from '../../components/swipeble/GmailStyleSwipeableRow';
import _ from 'lodash';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

function NewsScreen(props) {
  const {news, loading, error} = props;

  const renderErrorMessage = message => {
    const explanatory = i18n.t('pressToRetry');
    return (
      <OpacityMessageWindow
        style={styles.errorMessage}
        message={i18n.t('networkRequestFailed')}
        explanatory={explanatory}
        onPress={() => fetchTsiNews()}
      />
    );
  };

  const fetchTsiNews = () => {
    const {language, fetchNews: componentNewsFetch} = props;
    console.log('NewsScreen language: ', language);
    console.log('NewsScreen componentNewsFetch: ', componentNewsFetch);
    componentNewsFetch(language || 'en');
  };

  const renderOnListEmpty = () => {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{width: '100%', height: '22%', paddingLeft: 18}}>
          <Image
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: 'contain',
            }}
            source={require('../../../image/file_sleep.png')}
          />
        </View>
        <Text style={{fontSize: 18, marginTop: 5}}>No news, yet</Text>
        <Text style={{fontSize: 14, marginTop: 5, color: 'gray'}}>
          Scroll down to update
        </Text>
      </View>
    );
  };

  const renderItem = (item, index) => {
    return (
      <GmailStyleSwipeableRow
        containerStyle={{padding: 5}}
        // onDelete={() => onNewsItemDelete(item.id)}
      >
        <Card containerStyle={styles.container}>
          <TouchableOpacity
            // onPress={() => onMoreDetailsButtonPress(item.link)}
            style={{flexDirection: 'row'}}>
            <SafeAreaView style={{flex: 1}}>
              <View style={{flexDirection: 'column', flex: 9}}>
                <View>
                  <Text style={styles.cardTitleText}>{item.title}</Text>
                </View>
                <Text style={styles.newDescriptionText}>
                  {item.description}
                </Text>
              </View>
            </SafeAreaView>
          </TouchableOpacity>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{item.published}</Text>
          </View>
        </Card>
      </GmailStyleSwipeableRow>
    );
  };
  const onRefresh = () => {
    fetchTsiNews();
  };

  useEffect(() => {
    console.log('--NewsScreen is mounted--');
    // console.log('NewsScreen useEffect props: ', props);
    fetchTsiNews(props);
  }, []);
  // const {hasUnreadMessages, navigation} = props;
  // TODO uncomment
  // if (!hasUnreadMessages) navigation.navigate('Schedule');

  useSelector(state => state.appConfig.language);

  if (error) {
    return renderErrorMessage(error);
  }

  return (
    <FlatList
      contentContainerStyle={{flexGrow: 1}}
      keyExtractor={(item, index) => item.id.toString()}
      renderItem={({item, index}) => renderItem(item, index)}
      ListEmptyComponent={() => renderOnListEmpty()}
      refreshing={loading}
      onRefresh={onRefresh}
      data={news}
    />
  );
}

const mapStateToProps = state => {
  const {news, appConfig} = state;
  return {
    news: news.news,
    loading: news.loading,
    error: news.error,
    language: appConfig.language,
    markedAsReadIds: news.markedAsReadIds,
    hasUnreadMessages: news.hasUnreadMessages,
  };
};

const actions = {
  fetchNews,
  markAsRead,
};

// export default connect(
//   mapStateToProps,
//   actions,
// )(withNavigationFocus(NewsScreen));
export default connect(mapStateToProps, actions)(NewsScreen);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    borderColor: '#e8e8e8',
    borderWidth: 0,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#144774',
    lineHeight: 25,
    padding: 0,
    marginBottom: 0,
  },
  dateText: {
    fontSize: 13,
    color: 'gray',
  },
  newDescriptionText: {
    fontSize: 14,
    lineHeight: 22,
    marginTop: 5,
    textAlign: 'justify',
  },
  dateContainer: {
    marginTop: 7,
    marginRight: 5,
    alignItems: 'flex-end',
    color: '#969696',
  },
  buttonContainer: {
    flex: 1,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionContainer: {
    flex: 10,
    marginTop: 5,
  },
  noContentText: {
    fontSize: 18,
    color: 'gray',
  },
});

const customLayoutAnimation = {
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 0.7,
    duration: 550,
  },
};
