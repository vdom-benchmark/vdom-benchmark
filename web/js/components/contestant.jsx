'use strict';

var React = require('react');

var Contestant = React.createClass({
  render: function() {
    var data = this.props.data;
    var title = data.name;
    var url = data.url;

    return (
      <div className="list-group-item">
        <h4 className="list-group-item-heading"><a href={url}>{title}</a></h4>
        <button type="button" className="btn btn-default" onClick={this.open}>Open</button>
      </div>
    );
  },

  open: function(e) {
    e.preventDefault();
    var w = window.open(this.props.data.benchmarkUrl, '_blank');
  }
});

module.exports = Contestant;
