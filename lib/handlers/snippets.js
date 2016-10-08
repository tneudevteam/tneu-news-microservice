const log = require('../log');
const NewsSnippets = require('../db/news-snippets');

const defaultLimit = 10;
const defaultDate = new Date('2000-01-01T00:00:00.000Z');

function snippets(request, response, next) {
  const limitParam = request.params.limit;
  const sinceParam = request.params.since;
  const limit = parseLimitParam(limitParam);
  const since = parseSinceParam(sinceParam);

  const logBase = `[snippets][limit:${limit}]`;
  const sinceLog = sinceParam ? `[since:${sinceParam}]` : '';
  log.info(`${logBase}${sinceLog}[request]`);

  NewsSnippets
    .find({date: {$gt: since}}, limit)
    .then(snippets => {
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

function parseLimitParam(limit) {
  if (!limit) {
    return defaultLimit;
  }

  const parsedLimit = parseInt(limit, 10);
  if (parsedLimit > 100) {
    return 100;
  }

  if (parsedLimit <= 0) {
    return defaultLimit;
  }

  return parsedLimit;
}

function parseSinceParam(since) {
  if (!since) {
    return defaultDate;
  }

  const parsedDate = new Date(since);
  if (isNaN(parsedDate.getTime())) {
    return defaultDate;
  }

  return parsedDate;
}

module.exports = snippets;
