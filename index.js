require('./lib/cron');

const log = require('./lib/log');
const restify = require('restify');
const server = restify.createServer({name: 'news-microservice', log});

const snippetsUpdateHandler = require('./lib/handlers/snippets-update');
const snippetsHandler = require('./lib/handlers/snippets');
const articleHandler = require('./lib/handlers/article');

server.pre(restify.pre.userAgentConnection());
server.use(restify.queryParser());
server.use(restify.throttle({
  burst: 10,
  rate: 3,
  ip: true
}));
server.use(restify.CORS());

server.get('/snippets-update', snippetsUpdateHandler);
server.get('/snippets', snippetsHandler);
server.get('/article', articleHandler);

server.listen(9191, () => {
  log.info('%s has been started at %s', server.name, server.url);
});
