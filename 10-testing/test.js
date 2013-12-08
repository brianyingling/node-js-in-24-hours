var assert = require('assert');

// should pass
assert.strictEqual('hello','hello');

// should fail
assert.notStrictEqual('hello','there');

assert.notStrictEqual('0', false);

// using nodeunit

exports.firstTest = function(test) {
  test.expect(1);
  test.strictEqual('hello','hello');
  test.done();
};

exports.secondTest = function(test) {
  test.expect(2);
  test.notStrictEqual('hello','there');
  test.done();
};
  
exports.thirdTest = function(test) {
  test.expect(3);
  test.strictEqual('0',null);
  test.done();
};


// For debugging, install:
// Node Inspector globally and finish Ch. 9
// 

// For testing, install:
// nodeunit globally and finish ch. 10
// run: nodeunit test