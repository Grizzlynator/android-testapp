import _ from 'lodash';

export const isEveryPropEmpty = object => {
  return _.values(object).every(_.isEmpty);
};

export const findNotEmptyProp = object => {
  const keys = Object.keys(object);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (!_.isEmpty(object[key])) {
      return {[key]: object[key]};
    }
  }

  return {};
};

export const getKeyByValue = (object, value) => {
  const result = Object.keys(object).find(key => object[key] === value);
  return _.isUndefined(result) ? '' : result;
};
