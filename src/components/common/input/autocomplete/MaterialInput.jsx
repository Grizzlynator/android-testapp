import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Platform} from 'react-native';
import {Input} from 'react-native-elements';

import Autocomplete from '../../react-native-autocomplete-input';
import {query} from '../../../../helpers/ArrayHelpers';

class MaterialInput extends Component {
  constructor(props) {
    super(props);
    this.state = {dataToShow: []};
    this.fieldRef = React.createRef();
  }

  onItemClick = item => {
    const {onListItemClick} = this.props;
    if (onListItemClick !== undefined) {
      onListItemClick(item);
    }
    this.setState({dataToShow: []});
  };

  onChangeText = text => {
    const {onChangeText} = this.props;
    if (onChangeText !== undefined) {
      onChangeText(text);
    }
    this.makeQuery(text);
  };

  makeQuery = text => {
    const {data} = this.props;
    const resultCount = Platform.OS === 'ios' ? 5 : 10;
    let dataToShow = query(data, '\\b' + text, resultCount);
    if (text === '') {
      // TODO ??????
      // dataToShow = {};
      dataToShow = [];
    }
    this.setState({dataToShow});
  };

  render = () => {
    const {containerStyle} = this.props;
    return (
      <View style={[styles.mainContainer, containerStyle]}>
        <View style={styles.autocompleteContainer}>
          <View
            style={[styles.autocompleteWrapper, {zIndex: this.props.zIndex}]}>
            <Autocomplete
              flatListProps={{
                keyExtractor: (item, index) => item,
                // keyExtractor: (_, idx) => idx.toString(),
                renderItem: item => this.renderListItem(item),
                // renderItem: ({item}) => (
                //   <TouchableOpacity onPress={() => this.onItemClick(item)}>
                //     <Text style={{padding: 8}}>{item}</Text>
                //   </TouchableOpacity>
                // ),
              }}
              renderTextInput={this.renderTextInput}
              listContainerStyle={styles.listItemContainer}
              inputContainerStyle={styles.inputContainer}
              containerStyle={styles.autocompleteContainer}
              data={this.state.dataToShow}
            />
          </View>
        </View>
      </View>
    );
  };

  renderTextInput = () => {
    const {label, value, onFocus, error} = this.props;
    if (this.fieldRef.current !== null) {
      this.fieldRef.current.setValue(value);
    }

    return (
      <Input
        placeholder={label}
        value={value}
        onChangeText={this.onChangeText}
        onFocus={onFocus}
        onBlur={() => this.setState({dataToShow: []})}
        containerStyle={inputStyles.container}
        errorMessage={error}
        errorStyle={{marginTop: 0}}
        inputStyle={inputStyles.input}
        inputContainerStyle={inputStyles.inputContainer}
      />
    );
  };

  renderListItem = props => {
    return (
      <TouchableOpacity onPress={() => this.onItemClick(props.item)}>
        <Text style={{padding: 8}}>{props.item}</Text>
      </TouchableOpacity>
    );
  };
}

export default MaterialInput;

const styles = StyleSheet.create({
  mainContainer: {height: 58},
  autocompleteContainer: {},
  listItemContainer: {
    maxHeight: 121,
    marginHorizontal: Platform.OS === 'ios' ? 10 : 0,
    marginTop: Platform.OS === 'ios' ? -6 : 0,
  },
  inputContainer: {
    height: 58,
    borderColor: 'rgba(255,255,255,0)',
  },
  autocompleteWrapper: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 3,
  },
});

const inputStyles = StyleSheet.create({
  container: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  inputContainer: {
    paddingVertical: 5,
    backgroundColor: '#f4f4f4',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    paddingLeft: 10,
  },
  input: {
    fontSize: 15,
  },
});
