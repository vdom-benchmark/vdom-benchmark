'use strict';

var React = require('react');
var Header = require('./header.jsx');
var ContestantsList = require('./contestants_list.jsx');
var ResultsTable = require('./results_table.jsx');

var Main = React.createClass({
  render: function() {
    var app = this.props.app;
    var children;

    if (app.state === 'ready') {
      children = (
        <div>
          <ContestantsList app={app} />
          <ResultsTable app={app} />
        </div>
      );
    }

    return (
      <div>
        <Header app={app} />
        <div className="container">
          <div className="alert alert-warning" role="alert">
            <a className="alert-link" href="https://localvoid.github.io/uibench/" title="UI Benchmark">>> New benchmark for Component-based UI libraries.</a>
          </div>
        </div>
        <div className="container">
          {children}
        </div>
      </div>
    );
  }
});

module.exports = Main;
