var http = require('http');

var data   = '',
    tweets = '';

var options = {
  host: 'https://api.twitter.com/1.1/search/tweets.json',
  port: 80,
  path: '/search.json?q=%23node.js'
};

var request = http.get(options, function (res) {
  
  res.on('data', function (chunk) {
    data += chunk;
  });

  res.on('end', function() {
    var tweets = JSON.parse(data);
    console.log(tweets);
    for (var i = 0; i < tweets.results.length; i++) {
      console.log(tweets.results[i].text);
    }
  });

  res.on('error', function (e) {
    console.error('There was an error:', e);
  });

});