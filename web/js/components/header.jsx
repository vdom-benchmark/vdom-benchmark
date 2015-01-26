'use strict';

var React = require('react');

var Header = React.createClass({
  render: function() {
    var model = this.props.model;

    var child;
    if (model.state === 'initial') {
      child = (<p>Config File is Missing</p>);
    } else if (model.state === 'loading-config') {
      child = (<p>Loading Config...</p>);
    } else if (model.state === 'ready') {
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