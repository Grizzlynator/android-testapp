import {Dimensions} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const AppDraweOptions = () => ({
  drawerType: 'back',
  headerShown: false,
  drawerStyle: {
    backgroundColor: 'white',
    width: SCREEN_WIDTH * 0.7,
  },
});

export default AppDraweOptions;
