import React from 'react';
import {WebView} from 'react-native-webview';
import HeaderTitle from '../../components/HeaderTitle';
import {Text, StyleSheet, View} from 'react-native';

// class NewsDetailsScreen extends Component {
//   static navigationOptions = ({}) => {
//     return {headerTitle: <HeaderTitle title={'news'} />};
//   };
//
//   renderLoadingIndicator = () => {
//     return (
//       <View style={styles.loadingContainer}>
//         <Text>Loading</Text>
//       </View>
//     );
//   };
//
//   render() {
//     const {navigation} = this.props;
//     const link = navigation.getParam('link');
//     return (
//       <WebView
//         source={{uri: link}}
//         renderLoading={() => this.renderLoadingIndicator()}
//         startInLoadingState
//       />
//     );
//   }
// }
const navigationOptions = ({}) => {
  return {headerTitle: <HeaderTitle title={'news'} />};
};

const renderLoadingIndicator = () => {
  return (
    <View style={styles.loadingContainer}>
      <Text>Loading</Text>
    </View>
  );
};
const NewsDetailsScreen = props => {
  const {link} = props.route.params;
  console.log('props:', link);
  // const link = route.getParam('link');
  return (
    <WebView
      source={{uri: link}}
      renderLoading={() => renderLoadingIndicator()}
      startInLoadingState
    />
  );
};
export default NewsDetailsScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    padding: 10,
  },
});
