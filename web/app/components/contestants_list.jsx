'use strict';

var React = require('react');
var Contestant = require('./contestant.jsx');
var storage = sessionStorage;

var ContestantsList = React.createClass({
  getInitialState: function() {
    return {
      customUrl: storage && storage.getItem('customUrl')
    };
  },

  render: function() {
    var app = this.props.app;
    var config = app.config;
    var contestants = config.contestants;

    var children = contestants.map(function(c) {
      return (<Contestant key={c.name + '__' + c.version} app={app} data={c} />);
    });

    return (
      <div className="list-group">
        {children}
        <div key="custom_url" className="list-group-item">
          <h4 className="list-group-item-heading">Custom URL</h4>
          <div className="input-group">
            <input type="text" className="form-control" placeholder="http://www.example.com" ref="customUrl" value={this.state.customUrl} onChange={this.changeCustomUrl} />
            <span className="input-group-btn">
              <button className="btn btn-default" type="button" onClick={this.openCustomUrl}>Open</button>
            </span>
          </div>
        </div>
      </div>
    );
  },

  changeCustomUrl: function(event) {
    var url = event.target.value;
    this.setState({customUrl: url});
    if (storage) {
      storage.setItem('customUrl', url);
    }
  },

  openCustomUrl: function(e) {
    e.preventDefault();
    var url = this.refs.customUrl.getDOMNode().value;
    this.props.app.openBenchmark(url);
  }
});

module.exports = ContestantsList;
