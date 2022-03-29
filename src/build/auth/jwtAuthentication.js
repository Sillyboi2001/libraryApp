"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var verifyToken = function verifyToken(req, res, next) {
  var token = req.headers.authorization;
  if (!token) return res.status(401).json({
    message: 'Invalid login'
  });

  _jsonwebtoken["default"].verify(token, process.env.SECRET_KEY, function (err, user) {
    if (err) return res.status(401).json({
      message: 'Invalid token'
    });
    req.user = user;
    next();
  });
};

var _default = verifyToken;
exports["default"] = _default;