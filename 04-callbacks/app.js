var fs    = require('fs'),
    http  = require('http');

http.get({host:'shapeshed.com'}, function(res) {
  console.log('Got a response from shapeshed.com');
}).on('error', function(e) {
  console.log('there was an error from shapeshed: '+ e);
});

fs.readFile('file1.txt', 'utf8', function(err, data) {
  if (err) throw err;
  console.log('file 1 read');
});

http.get({host:'www.bbc.co.uk'}, function(res) {
  console.log('Got a response from the bbc');
});

fs.readFile('file2.txt', 'utf8', function(err, data) {
  if (err) throw err;
  console.log('file 2 read');
});