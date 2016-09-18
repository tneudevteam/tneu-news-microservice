const restify = require('restify');
const log = require('./lib/log');
const server = restify.createServer({
  name: 'news-microservice',
  log
});

const snippetsHandler = require('./lib/handlers/snippets');
const articleHandler = require('./lib/handlers/article');

server.pre(restify.pre.userAgentConnection());

server.use(restify.queryParser());
server.use(restify.throttle({
  burst: 10,
  rate: 3,
  ip: true
}));

server.get('/snippets/:page?', snippetsHandler);
server.get('/article', articleHandler);

server.listen(9191, () => {
  log.info('%s has been started at %s', server.name, server.url);
});
