var fs = require('fs');
var readStream  = fs.ReadStream('names.txt');
var writeStream = fs.WriteStream('out.txt');

readStream.setEncoding('utf8');

readStream.on('data', function(chunk) {
  writeStream.write(chunk);
});

readStream.on('close', function() {
  writeStream.end();
});

