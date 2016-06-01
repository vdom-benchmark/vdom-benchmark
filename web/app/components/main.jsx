'use strict';

var React = require('react');
var Header = require('./header.jsx');
var ContestantsList = require('./contestants_list.jsx');
var ResultsTable = require('./results_table.jsx');

var Main = React.createClass({
  render: function() {
    var app = this.props.app;

    return (
      <div>
        <Header />
        <div className="container">
          <div>
            <ContestantsList app={app} />
            <ResultsTable app={app} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Main;
