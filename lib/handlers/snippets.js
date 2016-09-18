const news = require('tneu-news');

function snippets(request, response, next) {
  const page = request.params.page;

  news.getSnippets(page)
    .then(snippets => {
      response.charSet('utf-8');
      response.json(snippets);
    })
    .catch(error => {
      response.json(error);
    })
    .then(() => {
      next();
    });
}

module.exports = snippets;
