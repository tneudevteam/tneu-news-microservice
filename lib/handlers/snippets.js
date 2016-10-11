const log = require('../log');
const NewsSnippets = require('../db/news-snippets');
const paramsParser = require('../params-parser');

function snippets(request, response, next) {
  const sinceParam = request.params.since;
  const limit = paramsParser.parseLimit(request.params.limit);
  const skip = paramsParser.parseSkip(request.params.skip);
  const since = paramsParser.parseSince(sinceParam);

  const logBase = `[snippets][limit:${limit}]`;
  const sinceLog = sinceParam ? `[since:${sinceParam}]` : '';
  log.info(`${logBase}${sinceLog}[request]`);

  NewsSnippets
    .find({date: {$gt: since}}, limit, skip)
    .then(snippets => {
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

module.exports = snippets;
