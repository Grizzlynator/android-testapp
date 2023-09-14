export const query = (data, regexString, resultCount) => {
  let maxSize = resultCount;
  const dataToShow = [];
  let regex;

  try {
    regex = new RegExp(regexString, 'i');
  } catch (e) {
    return dataToShow;
  }

  for (let index = 0; index < data.length; index++) {
    const item = data[index];
    const result = item.match(regex);
    if (result !== null) {
      dataToShow.push(result.input);
      maxSize--;
      if (maxSize === 0) break;
    }
  }
  return dataToShow;
};

export const contain = (objects, objectParam, objectValue) => {
  for (let i = 0; i < objects.length; i++) {
    const object = objects[i];
    if (object[objectParam] === objectValue) return i;
  }
  return -1;
};
