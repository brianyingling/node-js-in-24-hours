
// Create the Express web framework and assign it to 
// app variable
// create a server using the HTTP module and pass the app
// to it.
// Then create a socket.io module instance and have it listen
// to the server instance.
var express = require('express');
var app     = express();
var server  = require('http').createServer(app);
var io      = require('socket.io').listen(server);


var nicknames = [];

// Set the app's port to 3000
app.set('port', 3000);

// return the index.html in the app's root directory
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

// create sockets
io.sockets.on('connection', function(socket) {

  socket.on('nickname', function(data) {
    console.log('Server received the following nickname: ' + data);
    nicknames.push(data);
  });
});

// Have the server listen to the assigned port
server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
