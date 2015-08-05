'use strict';

var React = require('react');

var Contestant = React.createClass({
  render: function() {
    var app = this.props.app;
    var data = this.props.data;
    var runButtonClassName = 'btn btn-default' + (app.runner.running ? ' disabled' : '');

    return (
      <div className="list-group-item">
        <h4 className="list-group-item-heading"><a href={data.url} target="_blank">{data.name}</a></h4>
        <div className="btn-group btn-group-xs">
          <button type="button" className={runButtonClassName} onClick={this.run}>Run</button>
          <button type="button" className="btn btn-default" onClick={this.open}>Open</button>
        </div>
      </div>
    );
  },

  run: function(e) {
    e.preventDefault();
    this.props.app.runBenchmark(this.props.data.benchmarkUrl, 10);
  },

  open: function(e) {
    e.preventDefault();
    this.props.app.openBenchmark(this.props.data.benchmarkUrl);
  }
});

module.exports = Contestant;
