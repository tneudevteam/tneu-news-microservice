const news = require('tneu-news');
const Promise = require('bluebird');

const log = require('../log');
const NewsSnippets = require('../db/news-snippets');

function snippets(request, response, next) {
  const logBase = `[snippets-update]`;

  log.info(`${logBase}[request]`);

  news.getSnippets()
    .then(snippets => {
      response.charSet('utf-8');
      response.json({triggered: true});

      return Promise.map(snippets, snippet => {
        return NewsSnippets.upsert(snippet);
      });
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
