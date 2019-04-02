"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _coreWebpack = _interopRequireWildcard(require("./core.webpack.config"));

var _webpack = _interopRequireDefault(require("webpack"));

var R = _interopRequireWildcard(require("ramda"));

module.exports = R.pipe(R.assoc("devtool", "cheap-eval-source-map"), R.dissocPath(["entry", "vendor"]), R.assoc("devServer", {
  compress: true,
  contentBase: "./build",
  historyApiFallback: true,
  host: "0.0.0.0",
  overlay: true,
  port: _coreWebpack.packageJSON.port || 3000,
  progress: true,
  stats: "minimal"
}), R.assocPath(["output", "filename"], "static/js/[name].bundle.js"), (0, _coreWebpack.addPlugin)(new _webpack.default.NamedModulesPlugin()))(_coreWebpack.default);