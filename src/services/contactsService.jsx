/**
 *
 * @param {Array<Contacts>} contacts array
 * @param {String} regexp - contact full name path.
 * @param {Number} limit - max count of contacts to return
 */

export const query = async (contacts, regexp, limit) => {
  const dataToShow = [];
  let regex;

  try {
    regex = new RegExp(regexp, 'i');
  } catch (e) {
    return [];
  }

  for (let index = 0; index < contacts.length; index++) {
    const item = contacts[index].firstName + contacts[index].lastName;
    const result = item.match(regex);
    if (result !== null) {
      const copy = {...contacts[index]};
      dataToShow.push(copy);
      limit--;
      if (limit === 0) {
        break;
      }
    }
  }

  return dataToShow;
};
