
/**
 * Module dependencies.
 */

var express = require('express');
var routes  = require('./routes');
var user    = require('./routes/user');
var http    = require('http');
var path    = require('path');

var app     = express();
var server  = require('http').createServer(app);
var io      = require('socket.io').listen(server);

var twitter = require('ntwitter');

var beer  = 0,
    wine  = 0,
    total = 0;

var twit = new twitter({
  consumer_key: process.env.LOVE_OR_HATE_TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.LOVE_OR_HATE_TWITTER_CONSUMER_SEC,
  access_token_key: process.env.LOVE_OR_HATE_TOKEN_KEY,
  access_token_secret: process.env.LOVE_OR_HATE_TOKEN_SEC
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var twitter = require('ntwitter');

  var twit = new twitter({
    consumer_key: process.env.LOVE_OR_HATE_TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.LOVE_OR_HATE_TWITTER_CONSUMER_SEC,
    access_token_key: process.env.LOVE_OR_HATE_TOKEN_KEY,
    access_token_secret: process.env.LOVE_OR_HATE_TOKEN_SEC
  });

  twit.stream('statuses/filter', {track: ['beer', 'wine']}, function(stream) {
    stream.on('data', function(data) {

      // change data based on what we receive from the stream
      var text = data.text.toLowerCase();

      if (text.indexOf('beer') !== -1) {
        beer++;
        total++;
      }

      if(text.indexOf('wine') !== -1) {
        wine++;
        total++;
      }

      // now emit a tweet event for our front end to pick up
      io.sockets.volatile.emit('tweet', {
        user: data.user,
        text: data.text,
        location: data.user.location,
        beer: (beer/total) * 100,
        wine: (wine/total) * 100,
        total: total
      });
    });
  });






app.get('/', routes.index);
app.get('/users', user.list);

app.get('/users/:id', user.show);





server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
