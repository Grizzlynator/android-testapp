import {TextAbstract} from '../helpers/StringHelpers';
import moment from 'moment';
import dateFormats from '../configs/DateFormats';

/**
 * For old news rss format;
 * @param news
 * @returns {*}
 */

export const convertOtherNews = news => {
  const newsFeed = news.items;
  return newsFeed.map(article => {
    const published = modifyPublishedDate(article.published);
    const description = modifyDescription(article.description);
    return {
      id: article.id,
      title: article.title,
      published: published,
      description: description,
      link: article.links[0].url,
    };
  });
};

const modifyDescription = description => {
  let desc = description.replace(/<\/?[^>]+(>|$)/g, '');
  desc = desc.replace(/(\r\n|\n|\r)/gm, ' ');
  desc = desc.replace(/&nbsp;/g, ' ');
  desc = desc.replace('&#8220;', '"').replace('&#8221;', '"');
  return TextAbstract(desc, 200);
};

const modifyPublishedDate = publishedDate => {
  const dateObj = new Date(publishedDate);
  const momentObj = moment(dateObj);
  return momentObj.format(dateFormats.news);
};
