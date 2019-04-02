"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _coreWebpack = _interopRequireWildcard(require("./core.webpack.config"));

var _uglifyjsWebpackPlugin = _interopRequireDefault(require("uglifyjs-webpack-plugin"));

var R = _interopRequireWildcard(require("ramda"));

var _webpackBundleAnalyzer = require("webpack-bundle-analyzer");

var _copyWebpackPlugin = _interopRequireDefault(require("copy-webpack-plugin"));

var _webpack = _interopRequireDefault(require("webpack"));

var vendorChunkPlugins = [new _webpack.default.optimize.CommonsChunkPlugin({
  name: "vendor",
  minChunks: Infinity
})];
var manifestChunkPlugin = new _webpack.default.optimize.CommonsChunkPlugin({
  name: "manifest",
  minChunks: Infinity
});
var bundleAnalyzerPlugin = new _webpackBundleAnalyzer.BundleAnalyzerPlugin({
  analyzerMode: "static",
  openAnalyzer: false
});
var hashModuleIdsPlugin = new _webpack.default.HashedModuleIdsPlugin();
var uglifyJsPlugin = new _uglifyjsWebpackPlugin.default({
  uglifyOptions: {
    ecma: 8,
    compress: {
      warnings: false,
      comparisons: false
    },
    mangle: {
      safari10: true
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
module.exports = R.pipe.apply(R, [R.assoc("bail", true), (0, _coreWebpack.addPlugin)(hashModuleIdsPlugin), (0, _coreWebpack.addPlugin)(bundleAnalyzerPlugin), (0, _coreWebpack.addPlugin)(uglifyJsPlugin), (0, _coreWebpack.addPlugin)(environmentVariablesPlugin), (0, _coreWebpack.addPlugin)((0, _copyWebpackPlugin.default)(["public"]))].concat((0, _toConsumableArray2.default)(vendorChunkPlugins.map(_coreWebpack.addPlugin)), [(0, _coreWebpack.addPlugin)(manifestChunkPlugin)]))(_coreWebpack.default);