var http = require('http');

var obj = {
  name: "Officer",
  surname: "Dribble"
};

var json = JSON.stringify(obj);
console.log('JavaScript to JSON');
console.log(json);

var parsedJson = JSON.parse(json);
console.log('JSON to JavaScript obj');
console.log(parsedJson);

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type':'application/json'});
  res.end(JSON.stringify(obj));
}).listen(3000, '127.0.0.1');

console.log('Server listening on 127.0.0.1');