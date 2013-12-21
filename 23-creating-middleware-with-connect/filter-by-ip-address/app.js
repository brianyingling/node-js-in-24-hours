var connect = require('connect'),
    http    = require('http');

var app = connect()
            .use(filterByIp([]) )
            .use(helloWorld);


function filterByIp(ips) {
  var ips = ips || [];

  return function (req, res, next) {
    if (ips.indexOf(req.connection.remoteAddress) == -1 ) {
      res.writeHead(503,{'Content-Type':'text/plain'});
      res.end('Sorry, you can\'t access this page.');
    } else {
      next();
    }
  };
}

function helloWorld(req, res) {
  res.writeHead(200, {'Content-Type':'text/plain'});
  res.end('Hello World!\n');
}


http.Server(app).listen(3000);
console.log('Server running...');