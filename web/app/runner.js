'use strict';

/**
 * IFrame Runner
 */
function Runner(iframeContainer) {
  this.iframeContainer = iframeContainer;
  this.running = false;
  this.iframe = null;
  this.currentId = 0;
  this.currentIterations = 10;
}

Runner.prototype.handleReadyMessage = function(e) {
  if (this.running === true && this.currentId === parseInt(e.data.id)) {
    this.iframe.contentWindow.postMessage({
      type: 'run',
      data: {
        iterations: this.currentIterations
      }
    }, '*');
  }
};

Runner.prototype.handleReportMessage = function(e) {
  if (this.running === true && this.currentId === parseInt(e.data.id)) {
    this.iframeContainer.removeChild(this.iframe);
    this.iframe = null;
    this.running = false;
  }
};

Runner.prototype.run = function(id, url, iterations) {
  if (this.running === true) {
    return;
  }

  this.currentId = id;
  this.currentIterations = iterations;
  this.iframe = document.createElement('iframe');
  this.iframe.src = url;
  this.running = true;
  this.iframeContainer.appendChild(this.iframe);
};

module.exports = Runner;