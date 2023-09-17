import React, {Component} from 'react';
import {Input} from 'react-native-elements';
import {StyleSheet} from 'react-native';

class LoginInput extends Component {
  render() {
    const {placeholder, label, icon, value, onChange, secure} = this.props;
    return (
      <Input
        placeholder={placeholder}
        onChangeText={onChange}
        label={label}
        value={value}
        secureTextEntry={secure}
        labelStyle={styles.labelStyles}
        inputContainerStyle={styles.inputContainerStyle}
        rightIcon={{type: 'font-awesome', color: '#144774', name: icon}}
      />
    );
  }
}

const styles = StyleSheet.create({
  labelStyles: {
    color: '#144774',
    paddingLeft: 20,
  },
  inputContainerStyle: {
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: '#144774',
  },
});
export default LoginInput;
