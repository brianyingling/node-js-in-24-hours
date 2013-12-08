var vows   = require('vows'),
    assert = require ('assert'),
    fs     = require('fs');

vows.describe('Comparing strings').addBatch({
  'when comparing the same strings': {
    topic: 'hello',
    'they should be equal': function(topic) {
      assert.strictEqual(topic, 'hello');
    }
  },
  'when comparing different strings': {
    topic: 'hello',
    'they should not be equal': function(topic) {
      assert.notStrictEqual(topic, 'there');
    }
  }
}).run();

vows.describe('Async testing').addBatch({
  'When using a fs stat on a file': {
    topic: function() {
      fs.stat('test.txt', this.callback);
    },
    'it should be present': function(err, stat) {
      assert.strictEqual(err, null);
    },
    'it should not be empty':function(err, stat) {
      assert.notStrictEqual(stat.size, 0);
    }
  }
}).run();