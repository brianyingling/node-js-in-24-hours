var fs = require('fs');
var readStream  = fs.ReadStream('names.txt');
var writeStream = fs.WriteStream('out.txt');

readStream.pipe(writeStream);
