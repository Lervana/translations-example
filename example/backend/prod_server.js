const paths = require('../../paths');
const express = require('express');
const server = require('./server');
const PORT = 4000;

function getProdServer() {
  console.log('Creating web server');
  console.log(`Statics directory: ${paths.BUILD_DIR}`);

  const server = express();
  server.use(express.static(paths.BUILD_DIR, { maxAge: '30d' }));
  server.get('/', (req, res)=> {
    res.sendFile(paths.HTML_FILE);
  });
  return server;
}

function start() {
  return server.startServer(getProdServer(), PORT)
}

start();
