"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sequelize = exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _database = _interopRequireDefault(require("./config/database"));

var _user = _interopRequireDefault(require("./routes/user.routes"));

var _books = _interopRequireDefault(require("./routes/books.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const sequelize = (0, _database.default)();
exports.sequelize = sequelize;
const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use((0, _morgan.default)('dev'));
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
}));
app.use(_bodyParser.default.json());
app.use(_user.default);
app.use(_books.default);
var _default = app;
exports.default = _default;