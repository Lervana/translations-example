const path = require('path');
const paths = require('../../paths');
const express = require('express');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

function initializeProcess() {
  const exit = ()=> {
    console.log('Caught interrupt signal');
    process.exit(0);
  };
  process.on('uncaughtException', function(err) { console.error('Uncaught exception:', err) });
  process.on('SIGINT', exit);
  process.on('SIGTERM', exit);
  process.on('SIGQUIT', exit);
}

function start(instance, port) {
  console.log('Server port ' + port);
  instance.listen(port, function(err, result) {
    if (err) console.error(`Unable to start example server:`, err);
    else console.log('Server up');
  });
}

function startServer(server, PORT) {
  initializeProcess();
  start(server, PORT);
}

module.exports = {
  startServer: startServer
};
