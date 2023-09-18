import {showMessage} from 'react-native-flash-message';

export const showInfoMsg = (message, description = null) => {
  showMessage({
    position: 'top',
    message: message,
    description: description,
    type: 'info',
    hideOnPress: true,
    icon: {icon: 'info', position: 'left'},
    duration: 3300,
  });
};

export const showErrorMsg = (message, description = null) => {
  showMessage({
    position: 'top',
    message: message,
    description: description,
    type: 'danger',
    hideOnPress: true,
    icon: {icon: 'danger', position: 'left'},
    duration: 3300,
  });
};

export const showWarnMsg = (message, description = null) => {
  showMessage({
    position: 'top',
    message: message,
    description: description,
    type: 'warning',
    hideOnPress: true,
    icon: {icon: 'warning', position: 'left'},
    duration: 3300,
  });
};

export const showSuccessMsg = (message, description = null) => {
  showMessage({
    position: 'top',
    message: message,
    description: description,
    type: 'success',
    hideOnPress: true,
    icon: {icon: 'success', position: 'left'},
    duration: 3300,
  });
};
