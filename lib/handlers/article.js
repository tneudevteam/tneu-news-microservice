const news = require('tneu-news');

function snippets(request, response, next) {
  const link = request.query.link;

  news.getArticle(link)
    .then(article => {
      response.charSet('utf-8');
      response.json(article);
      next();
    })
    .catch(error => {
      console.log(error);
      next(error);
    });
}

module.exports = snippets;
