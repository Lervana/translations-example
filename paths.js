const path = require('path');

module.exports = {
  HTML_FILE: path.join(path.resolve('example/_build'), 'index.html'),
  BUILD_DIR: path.resolve('statics'),
  FRONTEND_DIR: path.resolve('example/frontend'),
  ENTRY_PATH: path.resolve('example/frontend/index'),
  HTML_PATH: path.resolve('example/frontend/index.html'),
  NODE_MODULES_PATH: path.resolve('node_modules'),
  PUBLIC_PATH: '/'
};
