var http = require('http');

http.createServer(function (req, res) {

  res.writeHead(200, {'Content-Type':'application/json'});
  res.end('{"name":"Darth Vader","home":"Tatooine","occupation":"Dark Lord of the Sith"}');
}).listen(3000, '127.0.0.1');