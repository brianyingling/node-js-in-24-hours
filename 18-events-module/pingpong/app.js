var EventEmitter = require('events').EventEmitter;
var pingPong = new EventEmitter();


setTimeout(function() {
  console.log('Sending first ping...');
  pingPong.emit('ping');
}, 2000);

pingPong.on('ping', function() {
  console.log('Received ping');
  setTimeout(function() {
    console.log('Sending pong...');
    pingPong.emit('pong');
  }, 2000);
});

pingPong.on('pong', function() {
  console.log('Received pong');
  setTimeout(function() {
    console.log('Sending ping...');
    pingPong.emit('ping');
  }, 2000);
});
