var express = require('express');
var app = module.exports = express();

var rebels = [
    {name: 'Han Solo'},
    {name: 'Luke Skywalker'},
    {name: 'Princess Leia'},
    {name: 'C-3PO'}
];

app.get('/', function(req, res, next) {
  res.send(rebels);
});

app.use(express.errorHandler({dumpExceptions:true, showStack:true}));

app.listen(3000);
console.log('Express server running on localhost:3000');