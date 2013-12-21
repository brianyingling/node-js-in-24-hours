var App = {};

App.Task = Backbone.Model.extend({
  idAttribute: "_id"
});

App.Tasks = Backbone.Collection.extend({
  model: App.Task,
  url: '/api/tasks'
});

App.TasksView = Backbone.View.extend({
  el: $('#tasks'),
  events: {
    'submit form':'createTask'
  },
  initialize: function() {
    var self = this;
    this.task_form      = _.template($('#task_form').html() );
    this.tasks_template = _.template($('#tasks_template').html() );
    this.task_template  = _.template($('#task_template').html() );
    this.collection.bind('reset', this.render, this);
    this.collection.fetch({
      success: function(data) {
        self.render();
      }
    });
  },
  render: function() {
    console.log(this.collection.models[0].get('title'));
    $(this.el).html(this.tasks_template({
      task_form:     this.task_form,
      tasks:         this.collection.models,
      task_template: this.task_template
    }));
  },
  createTask: function(e) {
    e.preventDefault();
    $taskTitle = $('.task-title').val();
    tasks.create({ title: $taskTitle }, {
      success: function(task) {
        $('#tasks ul').prepend('<li data-id='+task.id+'>'+ $taskTitle );
        $('.task-title').val(' ');
      }
    });

  }
});

App.init = function() {
  // tasks = new App.Tasks();
  new App.TasksView({collection: tasks});
};