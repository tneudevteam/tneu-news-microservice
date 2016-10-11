const news = require('tneu-news');

const log = require('../log');

function article(request, response, next) {
  const link = request.query.link;
  const logBase = `[article][link:${link}]`;

  log.info(`${logBase}[request]`);

  news.getArticle(link)
    .then(article => {
      response.charSet('utf-8');
      response.json(article);
      next();
    })
    .catch(error => {
      log.error(`${logBase}[error:${error.message}]`, error);
      next({error});
    });
}

module.exports = article;
