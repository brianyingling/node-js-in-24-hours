var express = require('express'),
    app     = express(),
    twitter = require('ntwitter'),
    server  = require('http').createServer(app),
    io      = require('socket.io').listen(server);

var beer  = 0,
    wine  = 0,
    total = 0;

server.listen(3000);

var twit = new twitter({
  consumer_key: process.env.LOVE_OR_HATE_TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.LOVE_OR_HATE_TWITTER_CONSUMER_SEC,
  access_token_key: process.env.LOVE_OR_HATE_TOKEN_KEY,
  access_token_secret: process.env.LOVE_OR_HATE_TOKEN_SEC
});

twit.stream('statuses/filter', {track: ['beer','wine'], locations: [-74,40,-73,41]}, function(stream) {

  stream.on('data', function(data) {

    var location = data.user.location.toLowerCase();

    // if (location.indexOf('ny') !== -1) {
      console.log(data.user);

      var text = data.text.toLowerCase();

      if (text.indexOf('beer') !== -1) {
        beer++;
        total++;
      }

      if (text.indexOf('wine') !== -1) {
        wine++;
        total++;
      }

      // emit a tweet event
      io.sockets.volatile.emit('tweet', {
        user: data.user.screen_name,
        text: data.text,
        location: data.user.location,
        beer: (beer/total) * 100,
        wine: (wine/total) * 100,
        total: total
      });
    // }
  });
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});