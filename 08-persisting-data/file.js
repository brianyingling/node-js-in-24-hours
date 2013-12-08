var fs    = require('fs');
var data  = "Some data I want to write to a file";

fs.writeFile('file.txt', data, function(err) {
  if (err)
    throw err;
  else
    console.log('Wrote data to file.txt');

});
