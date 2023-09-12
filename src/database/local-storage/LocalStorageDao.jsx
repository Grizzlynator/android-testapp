import AsyncStorage from '@react-native-community/async-storage';

const throwErrorIfPropIsNotSupported = (item, propKey) => {
  const errorMessage = 'Local storage. Unable to update unintended property';
  if (!item.hasOwnProperty(propKey)) {
    throw new Error(errorMessage);
  }
};

class LocalStorageDao {
  constructor(key) {
    this._key = key;
  }

  overwrite = async object => {
    const json = JSON.stringify(object);
    await AsyncStorage.setItem(this._key, json);
  };

  get = async () => {
    const json = await AsyncStorage.getItem(this._key);
    if (json === null) {
      return null;
    }
    return JSON.parse(json);
  };

  cleanStorage = async () => {
    await AsyncStorage.removeItem(this._key);
  };

  updateProps = async propsToUpdate => {
    const item = await this.get();
    const propsToUpdateKeys = Object.keys(propsToUpdate);
    propsToUpdateKeys.forEach(key => throwErrorIfPropIsNotSupported(item, key));
    const updatedItem = {
      ...item,
      ...propsToUpdate,
    };
    await this.overwrite(updatedItem);
    return updatedItem;
  };
}

export default LocalStorageDao;
