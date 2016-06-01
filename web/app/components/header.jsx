'use strict';

var React = require('react');

var Header = React.createClass({
  render: function() {
     return (
      <div className="jumbotron">
        <div className="container">
          <h1>Virtual DOM Benchmark</h1>
          <p>
            This benchmark has some serious flaws, and the only thing that it tests is a <a href="https://facebook.github.io/react/docs/reconciliation.html">children reconciliation algorithm</a>.
          </p>
          <p>
            This tool is useful only for virtual dom library authors, so they can try to optimize this algorithm. To
            other people I wouldn't recommend to make any conclusions about performance of any libraries in this
            benchmark, because in a real application, DOM operations will be significantly slower, and most of the time
            difference between libraries will be way much smaller, except for some cases when some libraries try to
            reduce the number of DOM operations (yes, all this nonsense about minimum number of DOM ops that everyone
            is talking about when they describe virtual dom libraries is a lie).
          </p>
          <p>
            There is a much better <a href="https://localvoid.github.io/uibench/">benchmark</a> that creates render
            trees with components, attributes, styles, classes and flushes DOM changes before updates. It is also a bad
            benchmark with its own flaws, but it is way much better than this one.
          </p>
        </div>
      </div>
    );
  }
});

module.exports = Header;