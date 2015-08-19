'use strict';

var React = require('react');

var Header = React.createClass({
  render: function() {
    var app = this.props.app;

    var child;
    if (app.state === 'initial') {
      child = (<p>Config File is Missing</p>);
    } else if (app.state === 'loading-config') {
      child = (<p>Loading Config...</p>);
    } else if (app.state === 'loading-tests') {
      child = (<p>Loading Tests...</p>);
    } else if (app.state === 'ready') {
      child = (<p>Comparing performance of the diff/patch operations in various virtual dom libraries.</p>);
    }

    return (
      <div className="jumbotron">
        <div className="container">
          <h1>Virtual DOM Benchmark</h1>
          {child}
        </div>
      </div>
    );
  }
});

module.exports = Header;