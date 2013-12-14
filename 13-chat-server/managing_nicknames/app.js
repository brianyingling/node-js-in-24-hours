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

app.set('port', 3000);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {

  socket.on('nickname', function (data) {
    console.log('Nickname received: ' + data);
    nicknames.push(data);
    socket.name = data;
    console.log("Nicknames: " + nicknames);
  });

  socket.on('disconnect', function (data) {
    console.log(data + " disconnecting...");
    if (!socket.nickname) return;
    if (nicknames.indexOf(socket.nickname > -1)) {
      nicknames.splice(nicknames.indexOf(socket.nickname), 1);
    }
    console.log("Nicknames: " + nicknames);
  });
});

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});