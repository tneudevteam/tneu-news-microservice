const restify = require('restify');
const server = restify.createServer();

server.pre(restify.pre.userAgentConnection());
server.pre(restify.pre.sanitizePath());

server.use(restify.throttle({
  burst: 10,
  rate: 3,
  ip: true
}));

function respond(request, response, next) {
  response.send('hello ' + request.params.name);
  next();
}

server.get('/hello/:name', respond);

server.listen(9191, () => {
  console.log('%s listening at %s', server.name, server.url);
});
