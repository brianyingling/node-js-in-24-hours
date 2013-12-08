var fs = require('fs');

fs.readFile('file.txt', 'utf8', function(err, data) {
  if (err)
    throw err;
  else
    console.log(data);
});