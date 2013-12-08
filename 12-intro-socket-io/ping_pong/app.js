var http = require('http');
var fs   = require('fs');

var server = http.createServer(function(req,res) {
  fs.readFile('./index.html', function(error, data) {
    // write the header of the response
    res.writeHead(200, {'Content-Type':'text/html'});

    // write the data -- index.html file
    res.end(data, 'utf-8');
  });
}).listen(3000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:3000');

//create socket.io and have it listen to the server
var io = require('socket.io').listen(server);

// create the socket event handlers

io.sockets.on('connection', function(socket) {
  
  // emit a pong event when receiving a ping.
  socket.on('ping', function(data) {
    console.log('Received Ping...');
    socket.emit('pong', {text: 'PONG'});
  });

  // log in console a pong event
  socket.on('pong', function(data) {
    console.log('Received Pong response...');
  });

  // send ping event every 10 secs.
  setInterval(function() {
    console.log('Sending PING to client...');
    socket.emit('ping', {text: 'ping'});
  }, 10000);

});



