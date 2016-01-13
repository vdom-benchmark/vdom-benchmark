'use strict';

var React = require('react');

var Contestant = React.createClass({
  render: function() {
    var data = this.props.data;

    return (
      <div className="list-group-item">
        <h4 className="list-group-item-heading"><a href={data.url} target="_blank">{data.name}</a></h4>
        <div className="btn-group btn-group-xs">
          <button type="button" className="btn btn-default" onClick={this.open}>Open</button>
        </div>
      </div>
    );
  },

  open: function(e) {
    e.preventDefault();
    this.props.app.openBenchmark(this.props.data.benchmarkUrl);
  }
});

module.exports = Contestant;
