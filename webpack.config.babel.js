import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpackBase, { paths, indexHtml } from './webpack.base.babel';
import config from './config';

export default {
  ...webpackBase,

  entry: [
    'webpack/hot/dev-server',
    paths.ENTRY
  ],

  devtool: config.devTool || 'source-map',

  devServer: {
    contentBase: paths.BUILD,
    port: config.port
  },

  module: {
    ...webpackBase.module,
    loaders: webpackBase.module.loaders.concat([{
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap')
    }])
  },

  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    new HtmlWebpackPlugin({ bundle: false, templateContent: indexHtml }),
    new ExtractTextPlugin('style', 'style.[hash].min.css')
  ]
};
