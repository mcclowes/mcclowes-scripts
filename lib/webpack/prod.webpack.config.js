"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var R = _interopRequireWildcard(require("ramda"));

var _copyWebpackPlugin = _interopRequireDefault(require("copy-webpack-plugin"));

var _uglifyjsWebpackPlugin = _interopRequireDefault(require("uglifyjs-webpack-plugin"));

var _coreWebpack = _interopRequireWildcard(require("./core.webpack.config"));

var _webpack = _interopRequireDefault(require("webpack"));

var _webpackBundleAnalyzer = require("webpack-bundle-analyzer");

var bundleAnalyzerPlugin = new _webpackBundleAnalyzer.BundleAnalyzerPlugin({
  analyzerMode: "static",
  openAnalyzer: false
});
var hashModuleIdsPlugin = new _webpack.default.HashedModuleIdsPlugin();
var uglifyJsPlugin = new _uglifyjsWebpackPlugin.default({
  uglifyOptions: {
    minimize: false,
    ecma: 8,
    compress: {
      warnings: false,
      comparisons: false
    },
    output: {
      comments: false,
      ascii_only: true
    }
  },
  parallel: true,
  cache: true,
  sourceMap: true
});
var environmentVariablesPlugin = new _webpack.default.DefinePlugin({
  "process.env": {
    NODE_ENV: "\"production\""
  }
});
module.exports = R.pipe(R.assoc("bail", true), //addConfig('mode', 'production'),
(0, _coreWebpack.addConfig)('plugins', hashModuleIdsPlugin), (0, _coreWebpack.addConfig)('plugins', bundleAnalyzerPlugin), (0, _coreWebpack.addConfig)('plugins', uglifyJsPlugin), (0, _coreWebpack.addConfig)('plugins', environmentVariablesPlugin), (0, _coreWebpack.addConfig)('plugins', new _copyWebpackPlugin.default(["public"])), (0, _coreWebpack.addConfig)('externals', 'child_process'), (0, _coreWebpack.addConfig)('externals', 'fs'))(_coreWebpack.default);