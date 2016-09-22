var path = require('path');

module.exports = {
  SRC: path.resolve(__dirname, 'src'),
  APP: path.resolve(__dirname, 'src/app.js'),
  ASSETS: path.resolve(__dirname, 'src/assets'),
  BUILD: path.resolve(__dirname, 'build'),
  NODE_MODULES: path.resolve(__dirname, 'node_modules'),
  COMPONENTS: path.resolve(__dirname, 'src/app/components'),
  ROUTES: path.resolve(__dirname, 'src/app/routes')
};
