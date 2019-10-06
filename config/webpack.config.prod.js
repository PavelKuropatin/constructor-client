'use strict';

const Path = require('path');
const Webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.config.js');

module.exports = merge(common, {
	mode: 'production',
	devtool: 'source-map',
	stats: 'errors-only',
	optimization: {
		minimize: true
	},
	node: {
		fs: 'empty',
		tls: 'empty',
		net: 'empty'
	}
	plugins: [
		new Webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		// compiling mode “scope hoisting”
		new Webpack.optimize.ModuleConcatenationPlugin(),
		new MiniCssExtractPlugin({
			filename: 'bundle.css'
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
				test: /\.(js)$/,
				exclude: /(node_modules|bower_components)/,
				use: ['ng-annotate-loader', 'babel-loader']
			},
			{
				test: /\.s?css/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				]
			}
		]
	}
});
