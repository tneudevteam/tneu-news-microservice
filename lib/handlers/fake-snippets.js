const _ = require('lodash');
const randomExt = require('random-ext');
const jsonic = require('jsonic');

const log = require('../log');
const NewsSnippets = require('../db/news-snippets');
const paramsParser = require('../params-parser');

function fakeSnippets(request, response, next) {
  const sinceParam = request.params.since;
  const sinceDate = paramsParser.parseSince(sinceParam);
  const limit = _.random(1, 5);
  const skip = _.random(0, 5400);
  const logBase = `[fake-snippets][limit:${limit}]` + sinceParam ? `[since:${sinceParam}]` : '';

  log.info(`${logBase}[request]`, jsonic.stringify(request.query));

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
      log.error(`${logBase}[error:${error.message}]`, error);
      response.json({error});
    })
    .then(() => {
      next();
    });
}

module.exports = fakeSnippets;
