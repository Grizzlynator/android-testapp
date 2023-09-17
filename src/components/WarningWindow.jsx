import React from 'react';
import {OpacityMessageWindow} from './common';

const WarningWindow = ({message, explanatory, onPress, containerStyle}) => {
  return (
    <OpacityMessageWindow
      containerStyle={containerStyle}
      style={styles.errorMessage}
      message={message}
      explanatory={explanatory}
      onPress={onPress}
    />
  );
};

export default WarningWindow;

const styles = {
  errorMessage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
};
