'use strict';

var React = require('react');
var Application = require('./components/application.jsx');

var DEFAULT_CONFIG_URL = 'config.js';

function Report(report) {
  this.name = report.name;
  this.version = report.version;
  this.samples = {};

  for (var i = 0; i < report.samples.length; i++) {
    var s = report.samples[i];
    this.samples[s.name] = s.data;
  }
}

Report.prototype.addSamples = function(samples) {
  for (var i = 0; i < samples.length; i++) {
    var s = samples[i];
    var v = this.samples[s.name];
    if (v === void 0) {
      this.samples[s.name] = s.data;
    } else {
      this.samples[s.name] = v.concat(s.data);
    }
  }
};

function Model() {
  this.state = 'initial';
  this.config = null;
  this.benchmarkData = null;
  this.reports = [];

  this.sampleNames = [];
  this.sampleNamesIndex = {};

  this._onChangeHandler = null;
}

Model.prototype.onChange = function(cb) { this._onChangeHandler = cb; };

Model.prototype.notify = function() {
  this._onChangeHandler != null && this._onChangeHandler();
};

Model.prototype.loadConfigFromUrl = function(url) {
  var e = document.createElement('script');
  e.src = url;
  var self = this;

  document.head.appendChild(e);

  window.benchmarkConfig = function(cfg) {
    self.config = cfg;
    self.initializeBenchmarkData();
    e.parentNode.removeChild(e);
    window.benchmarkConfig = null;
  };

  this.state = 'loading-config';
  this.notify();
};

Model.prototype.loadConfigFromFile = function(file) {
  var reader = new FileReader();
  var self = this;

  reader.onload = function(e) {
    var data = JSON.parse(reader.result);
    self.config = data;
    self.initializeBenchmarkData();
  };

  reader.readAsText(file);
  this.state = 'loading-config';
  this.notify();
};

Model.prototype.initializeBenchmarkData = function() {
  var dataConfig = this.config.data;
  var type = dataConfig.type;
  var url = dataConfig.url;
  var self = this;

  if (type === 'script') {
    var script = document.createElement('script');
    script.src = url;
    script.onload = function(e) {
      var data = window.generateBenchmarkData();
      self.benchmarkData = data;
      self.state = 'ready';
      self.notify();
    };

    document.head.appendChild(script);
  } else if (type === 'json') {
    var req = new XMLHttpRequest();
    req.onload = function(e) {
      var data = JSON.parse(req.responseText);
      self.benchmarkData = data;
      self.state = 'ready';
      self.notify();
    };
    req.open('GET', url);
    req.send();
  }

  this.state = 'loading-benchmark-data';
  this.notify();
};

Model.prototype.findReport = function(name, version) {
  for (var i = 0; i < this.reports.length; i++) {
    var report = this.reports[i];
    if (report.name === name && report.version === version) {
      return report;
    }
  }
  return null;
};

Model.prototype.updateReport = function(report) {
  var r = this.findReport(report.name, report.version);

  if (r == null) {
    this.reports.push(new Report(report));
  } else {
    r.addSamples(report.samples);
  }

  // update list of sample names
  for (var i = 0; i < report.samples.length; i++) {
    var s = report.samples[i];
    var v = this.sampleNamesIndex[s.name];
    if (v === void 0) {
      this.sampleNamesIndex[s.name] = this.sampleNames.length;
      this.sampleNames.push(s.name);
    }
  }

  this.notify();
};

document.addEventListener('DOMContentLoaded', function(e) {
  var model = new Model();

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
  model.loadConfigFromUrl(cfg);

  var appContainer = document.getElementById('app');

  // Render page and Update in when Data Model changes.
  function update() {
    React.render(React.createElement(Application, {model: model}),
                 appContainer);
  }
  update();
  model.onChange(update);

  // Listen for Incoming Messages from Benchmark Implementation windows.
  window.addEventListener('message', function(e) {
    var data = e.data;
    var type = data.type;

    if (type === 'getBenchmarkData') {
      e.source.postMessage({
        type: 'benchmarkData',
        data: model.benchmarkData
      }, e.origin);
    } else if (type === 'sendReport') {
      model.updateReport(data.data);
    }
  }, false);
}, false);
