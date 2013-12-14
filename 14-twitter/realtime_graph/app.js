var express = require('express'),
    app     = express(),
    twitter = require('ntwitter'),
    server  = require('http').createServer(app),
    io      = require('socket.io').listen(server);
    
var love  = 0,
    hate  = 0,
    total = 0;

server.listen(3000);

var twit = new twitter({
  consumer_key: process.env.LOVE_OR_HATE_TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.LOVE_OR_HATE_TWITTER_CONSUMER_SEC,
  access_token_key: process.env.LOVE_OR_HATE_TOKEN_KEY,
  access_token_secret: process.env.LOVE_OR_HATE_TOKEN_SEC
});

twit.stream('statuses/filter', {track: ['love', 'hate']}, function(stream) {
  stream.on('data', function(data) {

    var text = data.text.toLowerCase();
    
    if (text.indexOf('love') !== -1) {
      love++;
      total++;
    }

    if (text.indexOf('hate') !== -1) {
      hate++;
      total++;
    }

    io.sockets.volatile.emit('tweet', {
      user: data.user.screen_name,
      text: data.text,
      love: (love/total) * 100,
      hate: (hate/total) * 100,
      total: total
    });
  });
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
