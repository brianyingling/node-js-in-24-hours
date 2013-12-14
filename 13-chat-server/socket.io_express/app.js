var express    = require('express'),
        app    = express(),
        server = require('http').createServer(app),
        io     = require('socket.io').listen(server);

app.set('port', 3000);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket) {
  socket.emit('welcome', {text: 'Oh Hai! U R Connected'});
});

server.listen(app.get('port'), function() {
  console.log('Express server listening on port '+app.get('port'));
});