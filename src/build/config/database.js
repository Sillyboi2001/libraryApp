"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.db = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var sequelizeConnection = function sequelizeConnection() {
  return new _sequelize["default"](process.env.DATABASE_URL);
};

var db = {
  Sequelize: _sequelize["default"],
  sequelize: sequelizeConnection
};
exports.db = db;
var _default = sequelizeConnection;
exports["default"] = _default;