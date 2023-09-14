export const TextAbstract = (text, length) => {
  if (text == null) {
    return '';
  }
  if (text.length <= length) {
    return text;
  }
  text = text.substring(0, length);
  const last = text.lastIndexOf(' ');
  text = text.substring(0, last);
  return text + '...';
};

export const withCapitalLetter = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
