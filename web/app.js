'use strict';

var React = require('react');
var URI = require('URIjs');
var Results = require('./app/results');
var Main = require('./app/components/main.jsx');

var config = {
  "contestants": [
    {
      "name": "cito.js",
      "url": "https://github.com/joelrich/citojs",
      "benchmarkUrl": "https://vdom-benchmark.github.io/vdom-benchmark-cito/"
    },
    {
      "name": "Bobril",
      "url": "https://github.com/Bobris/Bobril",
      "benchmarkUrl": "https://vdom-benchmark.github.io/vdom-benchmark-bobril/"
    },
    {
      "name": "React",
      "url": "http://facebook.github.io/react/",
      "benchmarkUrl": "https://vdom-benchmark.github.io/vdom-benchmark-react/"
    },
    {
      "name": "React-lite",
      "url": "https://github.com/Lucifier129/react-lite",
      "benchmarkUrl": "http://lucifier129.github.io/vdom-benchmark-react-lite/"
    },
    {
      "name": "virtual-dom",
      "url": "https://github.com/Matt-Esch/virtual-dom",
      "benchmarkUrl": "https://vdom-benchmark.github.io/vdom-benchmark-virtual-dom/"
    },
    {
      "name": "mithril",
      "url": "http://lhorie.github.io/mithril/",
      "benchmarkUrl": "https://vdom-benchmark.github.io/vdom-benchmark-mithril/"
    },
    {
      "name": "maquette",
      "url": "http://github.com/AFASSoftware/maquette/",
      "benchmarkUrl": "https://vdom-benchmark.github.io/vdom-benchmark-maquette/"
    },
    {
      "name": "dom-layer",
      "url": "https://github.com/crysalead-js/dom-layer/",
      "benchmarkUrl": "https://vdom-benchmark.github.io/vdom-benchmark-dom-layer/"
    },
    {
      "name": "Snabbdom",
      "url": "https://github.com/paldepind/snabbdom/",
      "benchmarkUrl": "https://paldepind.github.io/vdom-benchmark-snabbdom/"
    },
    {
      "name": "Deku",
      "url": "https://github.com/dekujs/deku/",
      "benchmarkUrl": "https://dekujs.github.io/vdom-benchmark/"
    },
    {
      "name": "Incremental DOM",
      "url": "https://github.com/google/incremental-dom",
      "benchmarkUrl": "https://vdom-benchmark.github.io/vdom-benchmark-idom/"
    },
    {
      "name": "InfernoJS",
      "url": "https://github.com/trueadm/inferno",
      "benchmarkUrl": "http://vdom-benchmark.github.io/vdom-benchmark-inferno/"
    },
    {
      "name": "morphdom",
      "url": "https://github.com/patrick-steele-idem/morphdom",
      "benchmarkUrl": "http://vdom-benchmark.github.io/vdom-benchmark-morphdom/"
    },
    {
      "name": "Vidom",
      "url": "https://github.com/dfilatov/vidom/",
      "benchmarkUrl": "https://dfilatov.github.io/vdom-benchmark-vidom/"
    },
    {
      "name": "kivi",
      "url": "https://github.com/localvoid/kivi",
      "benchmarkUrl": "https://vdom-benchmark.github.io/vdom-benchmark-kivi/"
    },
    {
      "name": "virtex",
      "url": "https://github.com/ashaffer/virtex",
      "benchmarkUrl": "https://ashaffer.github.io/vdom-benchmark-virtex/"
    },
    {
      "name": "set-dom",
      "url": "https://github.com/DylanPiercey/set-dom",
      "benchmarkUrl": "https://dylanpiercey.github.io/vdom-set-dom/"
    }
  ]
};

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

function Application() {
  this.config = config;
  this.tests = g.generate();
  this.results = new Results();

  this._onChangeHandler = null;
  this._nextId = 0;
}

Application.prototype.onChange = function(cb) { this._onChangeHandler = cb; };

Application.prototype.notify = function() {
  this._onChangeHandler != null && this._onChangeHandler();
};

Application.prototype.openBenchmark = function(url) {
  var id = this._nextId++;
  url = URI(url).addQuery({'type': 'window', 'id': id}).toString();
  window.open(url, '_blank');
};

Application.prototype.handleInitMessage = function(e) {
  e.source.postMessage({
    type: 'tests',
    data: this.tests
  }, e.origin);
};

Application.prototype.handleReportMessage = function(e) {
  var data = e.data;
  var report = data.data;
  this.results.update(report.name, report.version, report.samples);
  this.notify();
};

document.addEventListener('DOMContentLoaded', function(e) {
  var appContainer = document.getElementById('app');

  var app = new Application();

  // Render page and Update in when Data Model changes.
  function update() {
    React.render(React.createElement(Main, {app: app}), appContainer);
  }
  update();
  app.onChange(update);

  // Listen for Incoming Messages from Benchmark Implementations.
  window.addEventListener('message', function(e) {
    var type = e.data.type;

    if (type === 'init') {
      app.handleInitMessage(e);
    } else if (type === 'report') {
      app.handleReportMessage(e);
    }
  }, false);
}, false);
