var connect = require('connect'),
    http    = require('http');

var app = connect()
            .use(forceDomain('127.0.0.1') )
            .use(helloWorld);

function forceDomain(domain) {
  var domain = domain || false;
  return function (req, res, next) {
    if (domain && req.headers.host != domain) {
      console.log('domain:', domain);
      console.log('req.headers.host:',req.headers.host);
      res.writeHead(301,{'Location':'http://'+domain+req.url});
      res.end();
    }
    else {
      next();
    }
  };
}

function helloWorld(req, res, next) {
  res.writeHead(200,{'Content-Type':'text/plain'});
  res.end('Hello World!\n');
}


http.Server(app).listen(3000);
console.log('Server running...');