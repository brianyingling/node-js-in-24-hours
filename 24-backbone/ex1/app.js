var express  = require('express'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/backbone_tasks');

var Schema    = mongoose.Schema;
var ObjectId  = Schema.ObjectId;

var Task = new Schema({
  task:     {type: String},
  details:  {type: String}
});

var Task = mongoose.model('Task', Task);

var app = module.exports = express.createServer();

app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(express.errorHandler({dumpExceptions:true, showStack:true}) );

app.get('/', function (req, res) {
  res.render('index.jade', {
    layout: false
  });
});

app.get('/api/tasks', function (req, res) {
  Task.tasks.find().sort({$natural:-1}, function (err, tasks) {
    res.json(tasks);
  });
});

app.get('/api/tasks/:id', function (req, res) {
  Task.tasks.findOne({_id:Task.ObjectId(req.params.id)}, function (err, task) {
    res.json(task);
  });
});

app.put('/api/tasks/:id', function (req, res) {
  Task.tasks.update(
    {_id: Task.ObjectId(req.params.id)},
    {$set: {title: req.body.title}}, function (err, task) {
      res.json(200);
    });
  });

app.del('/api/tasks/:id', function (req, res) {
  Task.tasks.remove({_id: Task.ObjectId(req.params.id)}, function (err) {
    res.send(200);
  });
});

app.listen(3000);
console.log('Server listening on http://localhost:3000');

