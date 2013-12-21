var spawn = require('child_process').spawn;
var ping  = spawn('ping', ['bbc.co.uk']);

ping.stdout.setEncoding('utf-8');
ping.stdout.on('data', function(data) {
  console.log(data);
});

ping.on('exit', function(code, signal) {
  console.log('code: '+code);
  console.log('child process was killed with a '+signal+' signal');
});

ping.kill('SIGINT');