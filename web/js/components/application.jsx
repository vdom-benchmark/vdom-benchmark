'use strict';

var React = require('react');
var Header = require('./header.jsx');
var ContestantsList = require('./contestants_list.jsx');
var ReportTable = require('./report_table.jsx');

var Application = React.createClass({
  render: function() {
    var model = this.props.model;
    var children;

    if (model.state === 'ready') {
      children = (
        <div>
          <ContestantsList model={model} />
          <ReportTable model={model} />
        </div>
      );
    }

    return (
      <div>
        <Header model={this.props.model} />
        <div className="container">
          {children}
        </div>
      </div>
    );
  }
});

module.exports = Application;
