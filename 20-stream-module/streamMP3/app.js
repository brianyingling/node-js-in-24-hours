var http = require('http');
var fs   = require('fs');

http.createServer(function (req, res) {
  mp3 =  'danosongs.com-rapidarc.mp3';
  stat = fs.statSync(mp3);

  res.writeHead(200,
    {'Content-Type':'audio/mpeg',
     'Content-Length':stat.size
   });

  var readStream = fs.createReadStream(mp3);
  readStream.pipe(response);

}).listen(3001);