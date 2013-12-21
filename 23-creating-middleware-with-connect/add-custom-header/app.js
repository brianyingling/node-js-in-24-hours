var connect = require('connect'),
    http    = require('http');

var app = connect()
            .use(addCustomHeader)
            .use(helloWorld);


function addCustomHeader(req, res, next) {
  res.setHeader('X-Custom-Header','My custom header');
  next();
}

function helloWorld (req, res) {
  res.writeHead(200, {'Content-Type':'text/plain'});
  res.end('Hello World!\n');
}


http.Server(app).listen(3000);
console.log('Server running...');