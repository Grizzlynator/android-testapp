const convert = rawData =>
  rawData.map(n => {
    const {id, title, body, groupName, createdAt} = n;
    return {
      id,
      title,
      groupName,
      sent: createdAt,
      message: body,
    };
  });

export default {
  convert,
};
