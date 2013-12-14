// Create the Express framework & assign it to app variable
// Create a server using HTTP module and pass app to it
// Create a Socket.io module instance and have it listen
// to the server instance.

var express = require('express');
var app     = express();
var server  = require('http').createServer(app);
var io      = require('socket.io').listen(server);

var nicknames = [];

app.set('port', 3000);

app.get('/', function (req,res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {

  socket.on('nickname', function (data, callback) {
    if (nicknames.indexOf(data) != -1) {
      callback(false);
    } else {
      callback(true);
      nicknames.push(data);
      socket.nickname = data;
      console.log('Nicknames are ' + nicknames);
    }
  });

  socket.on('disonnect', function (data) {
    console.log(data + " disconnecting...");
    if (!socket.nickname) return;
    if (nicknames.indexOf(socket.nickname > -1))
      nicknames.splice(socket.nickname, 1);

    console.log('Nicknames: ' + nicknames);
  });
});

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
