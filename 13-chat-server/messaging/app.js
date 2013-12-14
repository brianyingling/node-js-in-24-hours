// Create the Express framework & assign it to app variable
// Create a server using HTTP module & pass app to it
// Create a Socket.IO module instance and have it listen
// to the server instance.

var express = require('express');
var routes  = require('./routes');
var app     = module.exports = express.createServer();
var io      = require('socket.io').listen(app);

var nicknames = [];

app.set('port', 3000);


io.sockets.on('connection', function (socket) {

  socket.on('nickname', function (data, callback) {
    // false if the name already exists
    debugger;
    console.log(data);
    if (nicknames.indexOf(data) != -1) {
      callback(false);
    } else {
      callback(true);
      nicknames.push(data);
      socket.nickname = data;
      console.log('Nicknames: ' + nicknames);
      io.sockets.emit('nicknames', nicknames);
      socket.broadcast.emit('announcement', {
        nick: 'system',
        message: data + ' connected'
      });
    }
  });

  socket.on('user message', function (data) {
    io.sockets.emit('user message', {
      nick: socket.nickname,
      message: data
    });
  });

  socket.on('disconnect', function () {
    console.log('----- GOTTTTTTT HEEEERREEE ---');
    if (!socket.nickname) return;
    if (nicknames.indexOf(socket.nickname) > -1) {
      nicknames.splice(nicknames.indexOf(socket.nickname), 1);
    }
    console.log('Nicknames: ' + nicknames);
    socket.broadcast.emit('announcement', {
      nick: 'system',
      message: socket.nickname + ' disconnected'
    });
    io.sockets.emit('nicknames', nicknames);
  });
});

app.configure(function () {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  // app.use(require('stylus').middleware({src: __dirname + '/public'}));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.get('/', routes.index);


app.listen(3000, function () {
  console.log('Server listening on port ' + app.get('port'));
});
