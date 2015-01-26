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
  [transformers.removeLast(250)]
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

g.addGroup([50, 0], [
  [transformers.skip, transformers.insertLast(10)]
]);

g.addGroup([5, 0], [
  [transformers.skip, transformers.insertLast(100)]
]);

window.generateBenchmarkData = function(config) {
  return {
    units: g.generate()
  };
};
