'use strict';

function Report(name, version, samples) {
  this.name = name;
  this.version = version;
  this.samples = {};

  for (var i = 0; i < samples.length; i++) {
    var s = samples[i];
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

function Results() {
  this.reports = [];
  this.sampleNames = [];
  this.sampleNamesIndex = {};
}

Results.prototype.find = function(name, version) {
  for (var i = 0; i < this.reports.length; i++) {
    var report = this.reports[i];
    if (report.name === name && report.version === version) {
      return report;
    }
  }
  return null;
};

Results.prototype.remove = function(name, version) {
  var r = this.find(name, version);
  if (r != null) {
    this.reports.splice(this.reports.indexOf(r), 1);
  }
};

Results.prototype.update = function(name, version, samples) {
  var r = this.find(name, version);

  if (r == null) {
    this.reports.push(new Report(name, version, samples));
  } else {
    r.addSamples(samples);
  }

  // update list of sample names
  for (var i = 0; i < samples.length; i++) {
    var s = samples[i];
    var v = this.sampleNamesIndex[s.name];
    if (v === void 0) {
      this.sampleNamesIndex[s.name] = this.sampleNames.length;
      this.sampleNames.push(s.name);
    }
  }
};

module.exports = Results;