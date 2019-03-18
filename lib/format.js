"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _runShell = _interopRequireDefault(require("./runShell"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = async ({
  subcmd
}) => {
  console.log("eslint js");
  await (0, _runShell.default)("./node_modules/.bin/eslint", "--color", "--fix", "src");

  if (subcmd === "add") {
    await (0, _runShell.default)("git add -u");
  }
};

exports.default = _default;