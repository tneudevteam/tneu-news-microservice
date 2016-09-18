const news = require('tneu-news');

const log = require('../log');

function snippets(request, response, next) {
  const page = request.params.page;

  log.info('[get][snippets]', {page});

  news.getSnippets(page)
    .then(snippets => {
      response.charSet('utf-8');
      response.json(snippets);
    })
    .catch(error => {
      log.error('[get][snippets]', {page});
      response.json(error);
    })
    .then(() => {
      next();
    });
}

module.exports = snippets;
