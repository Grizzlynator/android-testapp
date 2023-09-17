import XMLParser from 'react-native-xml2js';

const parser = XMLParser.parseString;

export const parse = xml => {
  return new Promise((resolve, reject) => {
    parser(xml, (err, result) => {
      if (err) {
        reject(new Error('Error processing worker data.'));
      }
      resolve(result);
    });
  });
};
