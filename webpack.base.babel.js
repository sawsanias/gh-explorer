import fs from 'fs';
import path from 'path';

export const paths = {
  SRC: path.resolve(__dirname, 'src'),
  ENTRY: path.resolve(__dirname, 'src/app.js'),
  ASSETS: path.resolve(__dirname, 'src/assets'),
  BUILD: path.resolve(__dirname, 'build'),
  NODE_MODULES: path.resolve(__dirname, 'node_modules'),
  COMPONENTS: path.resolve(__dirname, 'src/app/components'),
  ROUTES: path.resolve(__dirname, 'src/app/routes')
};

export const indexHtml = fs.readFileSync(path.resolve(__dirname, paths.SRC, 'index.html'), 'utf8');

export default {

  resolve: {
    root: [paths.NODE_MODULES, paths.SRC, paths.COMPONENTS, paths.ROUTES]
  },

  output: {
    path: paths.BUILD,
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: [paths.SRC]
      },
      {
        test: /\.json$/,
        loaders: ['json'],
        include: [paths.SRC]
      }
    ],
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint',
        include: [paths.SRC],
        exclude: /node_modules/
      }
    ]
  }
};
