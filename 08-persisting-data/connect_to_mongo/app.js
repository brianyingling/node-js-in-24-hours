
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

// connect to db
mongoose.connect('mongodb://localhost/test');

var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Task = new Schema({
  task:    String,
  details: String
});
var Task = mongoose.model('Task', Task);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: 'aefaerEWREZDCVAEWR33443Q4Z'}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/tasks', function(req, res) {
  Task.find({}, function(err, docs) {
    res.render('tasks/index', {
      title: 'Todo index view',
      docs: docs
    });
  });
});

app.get('/tasks/new', function(req, res) {
  res.render('tasks/new.jade', {
    title: 'New Task'
  });
});

app.post('/tasks', function(req, res) {
  var task = new Task(req.body.task);
  task.save(function(err){
    if (err) {
      // req.flash('error', "There is an error.");
      res.redirect('/tasks/new');
    }
    else {
      // req.flash('info', 'Task saved.');
      res.redirect('/tasks');
    }
  });
});

app.get('/tasks/:id/edit', function(req, res) {
  Task.findById(req.params.id, function(err, doc) {
    res.render('tasks/edit', {
      title: 'Edit Task View',
      task: doc,
      details: doc.details
    });
  });
});

app.put('/tasks/:id', function(req, res) {
  Task.findById(req.params.id, function(err, doc) {
    doc.task    = req.body.task.task;
    doc.details = req.body.task.details;
    doc.save(function(err) {
      if (err)
        throw err;
      else
        res.redirect('/tasks');
    });
  });
});

app.del('/tasks/:id', function(req, res) {
  Task.findById(req.params.id, function(err, doc) {
    if (!doc) return next(new NotFound('Document Not Found'));
    doc.remove(function() {
      res.redirect('/tasks');
    });
  });
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
