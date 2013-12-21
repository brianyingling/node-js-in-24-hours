var connect = require('connect'),
    http    = require('http');


var app = connect()
            .use(nineToFive)
            .use(helloWorld);


function nineToFive(req, res, next) {
  var hour = new Date().getHours();
  if (hour < 9 || hour > 17) {
    res.writeHead(503, {'Content-Type':'text/plain'});
    res.end('Sorry, we are closed. Come back between the hours of 9 to 5.');
  }
  else{
    next();
  }
}

function helloWorld(req, res) {
  res.writeHead(200, {'Content-Type':'text/plain'});
  res.end('Hello world!\n');
}

http.Server(app).listen(3000);
console.log('Server running...');