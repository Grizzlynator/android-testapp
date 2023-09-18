import {Component} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {connect} from 'react-redux';
import {updateNetState} from '../redux/actions/AppStateActions';

class InternetAccessListener extends Component {
  componentDidMount() {
    const {updateNetState} = this.props;
    this.unsubscribe = NetInfo.addEventListener(state => {
      updateNetState({
        isConnected: state.isConnected,
      });
    });
  }

  componentWillUnmount = () => this.unsubscribe();

  render = () => null;
}

const actions = {
  updateNetState,
};

const mapStateToProps = state => {
  const {} = state;
  return {};
};

export default connect(mapStateToProps, actions)(InternetAccessListener);
