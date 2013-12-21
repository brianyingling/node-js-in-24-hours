var fork = require('child_process').fork;
var child = fork(__dirname + '/child.js');

child.on('message', function(msg) {
  console.log('parent process received message: ', msg);
});

child.send({message: 'Hello child!'});