var cluster = require('cluster');
var http    = require('http');
var cpus    = 2;

if (cluster.isMaster ) {
  console.log('Master process started with PID: ', process.pid);

  for (var i = 0; i < cpus; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker) {
    console.log('Worker with PID: '+ worker.process.pid+ ' died');
    cluster.fork();
  });
}
else {
  console.log('Worker process started with PID', process.pid);
  http.createServer(function (req, res) {
    req.writeHead(200, {'Content-Type':'text/plain'});
    res.end('Hello World\n');
  }).listen(3000);
}
