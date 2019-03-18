"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _runShell = _interopRequireDefault(require("./runShell"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = async () => {
  await (0, _runShell.default)("babel", "--watch", "src", "--out-dir", "lib", {
    env: { ...process.env,
      BABEL_ENV: "development"
    }
  });
};

exports.default = _default;