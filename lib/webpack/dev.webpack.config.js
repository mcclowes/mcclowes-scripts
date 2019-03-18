"use strict";

var _coreWebpack = _interopRequireWildcard(require("./core.webpack.config"));

var _webpack = _interopRequireDefault(require("webpack"));

var R = _interopRequireWildcard(require("ramda"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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