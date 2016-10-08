const news = require('tneu-news');

const log = require('../log');

function snippets(request, response, next) {
  const page = request.params.page || 1;
  const logBase = `[snippets][page:${page}]`;

  log.info(`${logBase}[request]`);

  news.getSnippets(page)
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

module.exports = snippets;
