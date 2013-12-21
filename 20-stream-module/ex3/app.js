var fs     = require('fs');
var stream = fs.ReadStream('names.txt');

stream.setEncoding('utf8');

var data = '';

stream.on('data', function(chunk) {
  data += chunk;
  console.log('read some data');
});

stream.on('close', function() {
  console.log('all the data is read');
  console.log(data);
});
