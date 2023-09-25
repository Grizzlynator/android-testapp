export default (url, option, timeout = 7000) => {
  return Promise.race([
    fetch(url, option),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeout),
    ),
  ]);
};
