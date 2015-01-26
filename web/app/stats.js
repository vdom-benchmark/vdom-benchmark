'use strict';

function filterOutliers(items) {
  var copy = items.slice(0);

  copy.sort(function(a, b) { return a - b; });

  var q1 = copy[Math.floor((copy.length / 4))];
  var q3 = copy[Math.ceil((copy.length * (3 / 4)))];
  var iqr = q3 - q1;

  var max = q3 + (iqr * 1.5);
  var min = q1 - (iqr * 1.5);

  var filteredValues = copy.filter(function(x) {
    return (x < max) && (x > min);
  });

  return filteredValues;
}

function mean(items) {
  return items.reduce(function(a, b) { return a + b; }) / items.length;
}

function min(items) { return Math.min.apply(Math, items); }
function max(items) { return Math.max.apply(Math, items); }

function stdev(items) {
  var m = mean(items);

  var variance = mean(items.map(function(i) {
    var diff = i - m;
    return diff * diff;
  }));

  return Math.sqrt(variance);
}

module.exports = {
  filterOutliers: filterOutliers,
  mean: mean,
  min: min,
  max: max,
  stdev: stdev
};
