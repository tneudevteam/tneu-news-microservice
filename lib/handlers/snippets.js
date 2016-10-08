const log = require('../log');
const NewsSnippets = require('../db/news-snippets');

const defaultLimit = 10;
const defaultSkip = 0;
const defaultDate = new Date('2000-01-01T00:00:00.000Z');

function snippets(request, response, next) {
  const limitParam = request.params.limit;
  const sinceParam = request.params.since;
  const skipParam = request.params.skip;
  const limit = parseLimitParam(limitParam);
  const skip = parseSkipParam(skipParam);
  const since = parseSinceParam(sinceParam);

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
      log.error(`${logBase}[error:${error.message}]`);
      response.json(error);
    })
    .then(() => {
      next();
    });
}

function parseLimitParam(limitParam) {
  if (!limitParam) {
    return defaultLimit;
  }

  const parsedLimit = parseInt(limitParam, 10);
  if (parsedLimit > 100) {
    return 100;
  }

  if (parsedLimit <= 0) {
    return defaultLimit;
  }

  return parsedLimit;
}

function parseSinceParam(sinceParam) {
  if (!sinceParam) {
    return defaultDate;
  }

  const parsedDate = new Date(sinceParam);
  if (isNaN(parsedDate.getTime())) {
    return defaultDate;
  }

  return parsedDate;
}

function parseSkipParam(skipParam) {
  if (!skipParam) {
    return defaultSkip;
  }

  const parsedSkip = parseInt(skipParam, 10);
  if (!parsedSkip || parsedSkip <= 0) {
    return defaultDate
  }

  return parsedSkip;
}

module.exports = snippets;
