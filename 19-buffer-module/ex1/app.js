var fs = require('fs');


fs.readFile('file.txt', function(err, data) {
  if (err) throw err;
  console.log(data);
});


fs.readFile('file.txt', 'utf8', function(err, data) {
  if (err) throw err;
  console.log(data);
});

// example 3
var buffer = new Buffer([85]);
var toStr  = buffer.toString('utf8');
console.log(toStr);

// example 4
var buffer = new Buffer(8);
buffer.write('c','utf8');
console.log(buffer);