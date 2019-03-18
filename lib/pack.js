"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _runShell = _interopRequireDefault(require("./runShell"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = async () => {
  await (0, _runShell.default)("webpack", "--config", _path.default.resolve(__dirname, "webpack/prod.webpack.config.js"), "--color");
};

exports.default = _default;