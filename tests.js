(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var generator = require('vdom-benchmark-generator');
var transformers = generator.transformers;
var Generator = generator.Generator;

var g = new Generator();
g.addGroup([500], [
  [transformers.reverse],
  [transformers.shuffle],
  [transformers.insertFirst(1)],
  [transformers.insertLast(1)],
  [transformers.removeFirst(1)],
  [transformers.removeLast(1)],
  [transformers.moveFromEndToStart(1)],
  [transformers.moveFromStartToEnd(1)],
  [transformers.removeLast(500)],
  [transformers.removeFirst(250)],
  [transformers.removeLast(250)],
  [transformers.skip]
]);

g.addGroup([250], [
  [transformers.insertFirst(250)],
  [transformers.insertLast(250)]
]);

g.addGroup([50, 10], [
  [transformers.reverse, transformers.skip],
  [transformers.shuffle, transformers.skip],
  [transformers.insertFirst(1), transformers.skip],
  [transformers.insertLast(1), transformers.skip],
  [transformers.removeFirst(1), transformers.skip],
  [transformers.removeLast(1), transformers.skip],
  [transformers.moveFromEndToStart(1), transformers.skip],
  [transformers.moveFromStartToEnd(1), transformers.skip]
]);

g.addGroup([5, 100], [
  [transformers.reverse, transformers.skip],
  [transformers.shuffle, transformers.skip],
  [transformers.insertFirst(1), transformers.skip],
  [transformers.insertLast(1), transformers.skip],
  [transformers.removeFirst(1), transformers.skip],
  [transformers.removeLast(1), transformers.skip],
  [transformers.moveFromEndToStart(1), transformers.skip],
  [transformers.moveFromStartToEnd(1), transformers.skip]
]);

g.addGroup([10, 10, 5], [
  [transformers.reverse, transformers.skip, transformers.skip],
  [transformers.shuffle, transformers.skip, transformers.skip],
  [transformers.insertFirst(1), transformers.skip, transformers.skip],
  [transformers.insertLast(1), transformers.skip, transformers.skip],
  [transformers.removeFirst(1), transformers.skip, transformers.skip],
  [transformers.removeLast(1), transformers.skip, transformers.skip],
  [transformers.moveFromEndToStart(1), transformers.skip, transformers.skip],
  [transformers.moveFromStartToEnd(1), transformers.skip, transformers.skip]
]);

g.addGroup([10, 1, 10, 5], [
  [transformers.reverse, transformers.skip, transformers.skip, transformers.skip],
  [transformers.shuffle, transformers.skip, transformers.skip, transformers.skip],
  [transformers.insertFirst(1), transformers.skip, transformers.skip, transformers.skip],
  [transformers.insertLast(1), transformers.skip, transformers.skip, transformers.skip],
  [transformers.removeFirst(1), transformers.skip, transformers.skip, transformers.skip],
  [transformers.removeLast(1), transformers.skip, transformers.skip, transformers.skip],
  [transformers.moveFromEndToStart(1), transformers.skip, transformers.skip, transformers.skip],
  [transformers.moveFromStartToEnd(1), transformers.skip, transformers.skip, transformers.skip]
]);

g.addGroup([50, 0], [
  [transformers.skip, transformers.insertLast(10)]
]);

g.addGroup([5, 0], [
  [transformers.skip, transformers.insertLast(100)]
]);


window.benchmarkTests = function(config) {
  return g.generate();
};

},{"vdom-benchmark-generator":2}],2:[function(require,module,exports){
'use strict';

var generator = require('./lib/generator');

module.exports = {
  Generator: generator.Generator,
  createNode: generator.createNode,
  NodeFlags: require('./lib/node_flags'),
  transformers: require('./lib/transformers')
};

},{"./lib/generator":3,"./lib/node_flags":4,"./lib/transformers":5}],3:[function(require,module,exports){
'use strict';

function createNode(key, flags, children) {
  if (flags === void 0) flags = 0;
  if (children === void 0) children = null;

  return {
    key: key,
    flags: 0,
    children: children
  };
}

function generateNodes(nodes, transformers, depth) {
  if (transformers === void 0) transformers = null;
  if (depth === void 0) depth = 0;

  var i;
  var result = [];
  var count = nodes[depth];

  if (depth === (nodes.length - 1)) { // max depth
    for (i = 0; i < count; i++) {
      result.push(createNode(i, 0, null));
    }
  } else {
    for (i = 0; i < count; i++) {
      result.push(createNode(i, 0, generateNodes(nodes, transformers, depth + 1)));
    }
  }

  if (transformers != null) {
    transformers[depth].fn(result);
  }

  return result;
}

function Generator() {
  this.groups = [];
}

Generator.prototype.addGroup = function(nodes, transformers) {
  this.groups.push({
    nodes: nodes,
    transformers: transformers
  });
};

Generator.prototype.generate = function() {
  var i, j;
  var group;
  var transformers;
  var a, b;
  var namePrefix;
  var units = [];

  for (i = 0; i < this.groups.length; i++) {
    group = this.groups[i];
    a = generateNodes(group.nodes);
    namePrefix = JSON.stringify(group.nodes) + ' ';

    for (j = 0; j < group.transformers.length; j++) {
      transformers = group.transformers[j];
      b = generateNodes(group.nodes, transformers);

      units.push({
        name: namePrefix + JSON.stringify(transformers.map(function(t) { return t.name; })),
        data: {
          a: a,
          b: b
        }
      });
    }
  }

  return units;
};

module.exports = {
  Generator: Generator,
  createNode: createNode
};

},{}],4:[function(require,module,exports){
'use strict';

module.exports = {
  component: 1,
  style: 1 << 1,
  attribute: 1 << 2,
  classes: 1 << 3
};

},{}],5:[function(require,module,exports){
'use strict';

var createNode = require('./generator').createNode;

var skip = {
  name: 'skip',
  fn: function(c) {}
};

var reverse = {
  name: 'reverse',
  fn: function(c) { c.reverse(); }
};

var shuffle = {
  name: 'shuffle',
  fn: function(c) {
    var i = c.length;
    var r;
    var tmp;

    while (i !== 0) {
      r = Math.floor(Math.random() * (i--));

      tmp = c[i];
      c[i] = c[r];
      c[r] = tmp;
    }
  }
};

function insertFirst(n) {
  return {
    name: 'insertFirst(' + n.toString() + ')',
    fn: function (c) {
      for (var i = 0; i < n; i++) {
        c.unshift(createNode(c.length));
      }
    }
  };
};

function insertLast(n) {
  return {
    name: 'insertLast(' + n.toString() + ')',
    fn: function (c) {
      for (var i = 0; i < n; i++) {
        c.push(createNode(c.length));
      }
    }
  };
};

function removeFirst(n) {
  return {
    name: 'removeFirst(' + n.toString() + ')',
    fn: function (c) {
      for (var i = 0; i < n; i++) {
        c.shift();
      }
    }
  };
}

function removeLast(n) {
  return {
    name: 'removeLast(' + n.toString() + ')',
    fn: function (c) {
      for (var i = 0; i < n; i++) {
        c.pop();
      }
    }
  };
}

function moveFromEndToStart(n) {
  return {
    name: 'moveFromEndToStart(' + n.toString() + ')',
    fn: function (c) {
      for (var i = 0; i < n; i++) {
        c.unshift(c.pop());
      }
    }
  };
}

function moveFromStartToEnd(n) {
  return {
    name: 'moveFromStartToEnd(' + n.toString() + ')',
    fn: function (c) {
      for (var i = 0; i < n; i++) {
        c.push(c.shift());
      }
    }
  };
}

module.exports = {
  skip: skip,
  reverse: reverse,
  shuffle: shuffle,
  insertFirst: insertFirst,
  insertLast: insertLast,
  removeFirst: removeFirst,
  removeLast: removeLast,
  moveFromEndToStart: moveFromEndToStart,
  moveFromStartToEnd: moveFromStartToEnd
};

},{"./generator":3}]},{},[1])


//# sourceMappingURL=tests.js.map