const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const devConfig = require('./webpack.config');
const server = require('./server');
const PORT = 3000;

function getDevServer() {
  console.log('Creating web dev server');
  const devCompiler = webpack(devConfig);
  const devServerConfig = devConfig.devServer;
  return new WebpackDevServer(devCompiler, devServerConfig);
}

function start() {
  return server.startServer(getDevServer(), PORT)
}

start();
