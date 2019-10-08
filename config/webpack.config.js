'use strict';

const Path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const dist = Path.join(__dirname, '../dist');

module.exports = {
  entry: [
    Path.resolve(__dirname, '../src/app.module'),
    Path.resolve(__dirname, './polyfills'),
  ],
  output: {
    path: dist,
    publicPath: '/',
    filename: '[name].[hash].js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      "window.jQuery": "jquery",
      $: require.resolve('jquery'),
      jQuery: require.resolve('jquery')
    }),
    new CleanWebpackPlugin([dist], { root: Path.resolve(__dirname, '..') }),
    new CopyWebpackPlugin([
      { from: Path.resolve(__dirname, '../public'), to: 'public' }
    ]),
    new CopyWebpackPlugin([
      { from: Path.resolve(__dirname, '../assets'), to: 'assets' }
    ]),
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, '../src/index.ejs')
    })
  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        }
      },
      {
        test: /\.html$/,
        loader: 'ng-cache-loader?prefix=[dir]/[dir]'
      }
    ]
  },
};
