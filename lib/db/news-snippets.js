const ObjectID = require('mongodb').ObjectID;
const log = require('../log');
const DB = require('./index');

const NewsSnippets = DB.then(db => db.collection('news_snippets'));
const logBase = '[db][news-snippets]';

function find(selector, limit, skip) {
  return NewsSnippets
    .then(collection => {
      return collection
        .find(selector, {_id: 0})
        .skip(skip)
        .limit(limit)
        .toArray();
    })
    .catch(error => {
      log.error(`${logBase}[find][error] ${error.message}`);
      return [];
    });
}

function upsert(snippet) {
  snippet._id = getSnippetID(snippet.date);

  return NewsSnippets
    .then(collection => {
      return collection.updateOne({_id: snippet._id}, snippet, {upsert: true});
    })
    .catch(error => {
      log.error(`${logBase}[insert][error] ${error.message}`);
    });
}

function getSnippetID(date) {
  return ObjectID.createFromTime(new Date(date).getTime()).toHexString();
}

module.exports = {
  find,
  upsert
};
