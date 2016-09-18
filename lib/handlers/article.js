const news = require('tneu-news');

const log = require('../log');

function article(request, response, next) {
  const link = request.query.link;

  log.info('[get][article]', {link});

  news.getArticle(link)
    .then(article => {
      response.charSet('utf-8');
      response.json(article);
      next();
    })
    .catch(error => {
      log.error('[get][snippets]', {link, error});
      next(error);
    });
}

module.exports = article;
