'use strict';

var React = require('react');
var Contestant = require('./contestant.jsx');

var ContestantsList = React.createClass({
  render: function() {
    var model = this.props.model;
    var config = model.config;
    var contestants = config.contestants;

    var children = contestants.map(function(c) {
      return (<Contestant key={c.name + '__' + c.version} model={model} data={c} />);
    });

    return (
      <div className="list-group">
        {children}
        <div key="custom_url" className="list-group-item">
          <h4 className="list-group-item-heading">Custom URL</h4>
          <div><input type="text" placeholder="http://www.example.com" ref="customUrl" /></div>
          <button type="button" className="btn btn-default" onClick={this.openCustomUrl}>Open</button>
        </div>
      </div>
    );
  },

  openCustomUrl: function(e) {
    e.preventDefault();
    var url = this.refs.customUrl.getDOMNode().value;
    window.open(url, '_blank');
  }
});

module.exports = ContestantsList;
