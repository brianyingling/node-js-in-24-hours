var spawn = require('child_process').spawn;
var ping  = spawn('ping', ['bbc.co.uk']);

ping.stdout.setEncoding('utf-8');
ping.stdout.on('data', function(data) {
  console.log(data);
});