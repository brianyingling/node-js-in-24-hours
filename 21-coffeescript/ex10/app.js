// Generated by CoffeeScript 1.6.3
(function() {
  var Marvin, Robot, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Robot = (function() {
    function Robot() {}

    Robot.prototype.makingTea = function() {
      return console.log('I am making tea.');
    };

    return Robot;

  })();

  Marvin = (function(_super) {
    var marvin, robot;

    __extends(Marvin, _super);

    function Marvin() {
      _ref = Marvin.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Marvin.prototype.makingTea = function() {
      console.log('I am Marvin.');
      return Marvin.__super__.makingTea.apply(this, arguments);
    };

    robot = new Robot;

    robot.makingTea();

    marvin = new Marvin;

    marvin.makingTea();

    return Marvin;

  })(Robot);

}).call(this);
