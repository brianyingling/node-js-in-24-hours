process.on('message', function(msg) {
  console.log('child process received message: ', msg);
});

process.send({ message:"Hello parent!" });