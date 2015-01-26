'use strict';

var React = require('react');
var Results = require('./app/results');
var Runner = require('./app/runner');
var Main = require('./app/components/main.jsx');

var DEFAULT_CONFIG_URL = 'config.js';

/**
 * States:
 *  - initial
 *  - loading-config
 *  - loading-tests
 *  - ready
 *  - running
 */
function Application(iframeContainer) {
  this.state = 'initial';
  this.config = null;
  this.tests = null;
  this.results = new Results();
  this.runner = new Runner(iframeContainer);

  this._onChangeHandler = null;
  this._nextId = 0;
}

Application.prototype.onChange = function(cb) { this._onChangeHandler = cb; };

Application.prototype.notify = function() {
  this._onChangeHandler != null && this._onChangeHandler();
};

Application.prototype.loadConfig = function(url, cb) {
  var self = this;
  var script = document.createElement('script');
  script.src = url;

  document.head.appendChild(script);

  window.benchmarkConfig = function(cfg) {
    self.config = cfg;
    window.benchmarkConfig = null;
    cb();
  };

  this.state = 'loading-config';
  this.notify();
};

Application.prototype.loadTests = function() {
  var self = this;
  var script = document.createElement('script');
  script.src = this.config.tests;

  script.onload = function() {
    self.tests = window.benchmarkTests();
    self.state = 'ready';
    self.notify();
  };

  document.head.appendChild(script);

  this.state = 'loading-tests';
  this.notify();
};

Application.prototype.openBenchmark = function(url) {
  var id = this._nextId++;
  url = url + '?type=window&id=' + (id).toString();
  window.open(url, '_blank');
};

Application.prototype.runBenchmark = function(url, iterations) {
  var id = this._nextId++;
  url = url + '?type=iframe&id=' + (id).toString();
  this.runner.run(id, url, iterations);
};

Application.prototype.handleInitMessage = function(e) {
  e.source.postMessage({
    type: 'tests',
    data: this.tests
  }, e.origin);
};

Application.prototype.handleReadyMessage = function(e) {
  var data = e.data;
  if (data.id != null) {
    this.runner.handleReadyMessage(e);
    this.notify();
  }
};

Application.prototype.handleReportMessage = function(e) {
  var data = e.data;
  var report = data.data;
  this.results.update(report.name, report.version, report.samples);
  if (data.id != null) {
    this.runner.handleReportMessage(e);
  }
  this.notify();
};

document.addEventListener('DOMContentLoaded', function(e) {
  var appContainer = document.getElementById('app');
  var iframeContainer = document.getElementById('iframes');

  var app = new Application(iframeContainer);

  // Parse Query String.
  var qs = (function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i) {
      var p=a[i].split('=', 2);
      if (p.length == 1) {
        b[p[0]] = "";
      } else {
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
      }
    }
    return b;
  })(window.location.search.substr(1).split('&'));

  var cfg = qs['cfg'];
  if (cfg === void 0) {
    cfg = DEFAULT_CONFIG_URL;
  }
  app.loadConfig(cfg, function() {
    app.loadTests();
  });

  // Render page and Update in when Data Model changes.
  function update() {
    React.render(React.createElement(Main, {app: app}),
                 appContainer);
  }
  update();
  app.onChange(update);

  // Listen for Incoming Messages from Benchmark Implementations.
  window.addEventListener('message', function(e) {
    var type = e.data.type;

    if (type === 'init') {
      app.handleInitMessage(e);
    } else if (type === 'ready') {
      app.handleReadyMessage(e);
    } else if (type === 'report') {
      app.handleReportMessage(e);
    }
  }, false);
}, false);
