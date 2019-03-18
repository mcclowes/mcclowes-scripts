"use strict";

var _coreWebpack = _interopRequireWildcard(require("./core.webpack.config"));

var _uglifyjsWebpackPlugin = _interopRequireDefault(require("uglifyjs-webpack-plugin"));

var R = _interopRequireWildcard(require("ramda"));

var _webpackBundleAnalyzer = require("webpack-bundle-analyzer");

var _copyWebpackPlugin = _interopRequireDefault(require("copy-webpack-plugin"));

var _webpack = _interopRequireDefault(require("webpack"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const vendorChunkPlugins = [new _webpack.default.optimize.CommonsChunkPlugin({
  name: "vendor",
  minChunks: Infinity
})];
const manifestChunkPlugin = new _webpack.default.optimize.CommonsChunkPlugin({
  name: "manifest",
  minChunks: Infinity
});
const bundleAnalyzerPlugin = new _webpackBundleAnalyzer.BundleAnalyzerPlugin({
  analyzerMode: "static",
  openAnalyzer: false
});
const hashModuleIdsPlugin = new _webpack.default.HashedModuleIdsPlugin();
const uglifyJsPlugin = new _uglifyjsWebpackPlugin.default({
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
const environmentVariablesPlugin = new _webpack.default.DefinePlugin({
  "process.env": {
    NODE_ENV: "\"production\""
  }
});
module.exports = R.pipe(R.assoc("bail", true), (0, _coreWebpack.addPlugin)(hashModuleIdsPlugin), (0, _coreWebpack.addPlugin)(bundleAnalyzerPlugin), (0, _coreWebpack.addPlugin)(uglifyJsPlugin), (0, _coreWebpack.addPlugin)(environmentVariablesPlugin), (0, _coreWebpack.addPlugin)((0, _copyWebpackPlugin.default)(["public"])), ...vendorChunkPlugins.map(_coreWebpack.addPlugin), (0, _coreWebpack.addPlugin)(manifestChunkPlugin))(_coreWebpack.default);