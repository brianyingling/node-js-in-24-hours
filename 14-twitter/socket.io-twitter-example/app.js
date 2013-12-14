var express = require('express'),
    app     = express(),
    twitter = require('ntwitter'),
    server  = require('http').createServer(app),
    io      = require('socket.io').listen(server);

server.listen(3000);

var twit = new twitter({
  consumer_key:       '2HtZlsnBTpIbIx3hkmFWig',
  consumer_secret:    'K0b4NbbP6A9pGitEEQUVWHjRWVZs5SOy7DrSEneq7Q',
  access_token_key:   '356897373-YNzkEvweA2nndv4oS2ZovAv4eeSZTINWb0PLdSAK',
  access_token_secret:'SGvFcxVZpG8K8ENeQ30IMrToPzglemS8GyKDpreGThQMJ'
});

twit.stream('statuses/filter', {track: ['love', 'hate']}, function(stream) {
  stream.on('data', function(data) {
    io.sockets.volatile.emit('tweet', {
      user: data.user.screen_name,
      text: data.text
    });
  });
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

