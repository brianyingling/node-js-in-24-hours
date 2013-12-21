var EventEmitter = require('events').EventEmitter;
var pingPong = new EventEmitter();

setTimeout(function() {
  console.log('Emitting ping');
  pingPong.emit('ping');
}, 2000);

pingPong.on('ping', function() {
  console.log('received ping');
  console.log('sending pong');
  setTimeout(function() {
    pingPong.emit('pong');
  }, 2000);
});

pingPong.on('pong', function() {
  console.log('received pong');
  setTimeout(function() {
    pingPong.emit('ping');
  });
});

var logPing = function() {
  console.log('second ping listener got ping');
};

setTimeout(function () {
  console.log('Adding second listener.');
  pingPong.on('ping', logPing);
}, 4000);

setTimeout(function() {
  console.log('Removing second listener');
  pingPong.removeListener('ping', logPing);
}, 12000);


