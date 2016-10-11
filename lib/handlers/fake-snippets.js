const _ = require('lodash');
const randomExt = require('random-ext');

const log = require('../log');
const NewsSnippets = require('../db/news-snippets');
const paramsParser = require('../params-parser');

function fakeSnippets(request, response, next) {
  const sinceDate = paramsParser.parseSince(request.params.since);
  const limit = _.random(1, 5);
  const skip = _.random(0, 5400);

  NewsSnippets
    .find({}, limit, skip)
    .then(snippets => {
      snippets.map(snippet => {
        snippet.date = randomExt.date(new Date(), sinceDate);
      });

      response.charSet('utf-8');
      response.json(snippets);
    })
    .catch(error => {
      log.error(`${logBase}[error:${error.message}]`);
      response.json(error);
    })
    .then(() => {
      next();
    });
}

module.exports = fakeSnippets;
