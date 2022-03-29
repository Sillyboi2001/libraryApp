"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = exports.createUser = exports.checkValidUser = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user = require("../models/user");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var oldUser, salt, hashedPassword, newUser, payload, token;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _user.user.findOne({
              where: {
                email: req.body.email
              }
            });

          case 3:
            oldUser = _context.sent;

            if (!oldUser) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(409).json({
              message: 'User Already Exist. Please Login'
            }));

          case 6:
            _context.next = 8;
            return _bcrypt["default"].genSalt();

          case 8:
            salt = _context.sent;
            _context.next = 11;
            return _bcrypt["default"].hash(req.body.password, salt);

          case 11:
            hashedPassword = _context.sent;
            _context.next = 14;
            return _user.user.create({
              username: req.body.username,
              email: req.body.email,
              password: hashedPassword
            });

          case 14:
            newUser = _context.sent;
            payload = {
              username: newUser.username,
              id: newUser.id
            };
            token = _jsonwebtoken["default"].sign(payload, process.env.SECRET_KEY);
            return _context.abrupt("return", res.status(200).json({
              token: token,
              message: 'User created Successfully'
            }));

          case 20:
            _context.prev = 20;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(500).json({
              message: 'Failed to create user'
            }));

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 20]]);
  }));

  return function createUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createUser = createUser;

var login = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body, email, password, result, comparePassword, username, id, token;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body = req.body, email = _req$body.email, password = _req$body.password;

            if (email && password) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              message: 'User input required'
            }));

          case 4:
            _context2.next = 6;
            return _user.user.findOne({
              where: {
                email: email
              }
            });

          case 6:
            result = _context2.sent;
            _context2.next = 9;
            return _bcrypt["default"].compare(password, result.password);

          case 9:
            comparePassword = _context2.sent;

            if (!(result && comparePassword)) {
              _context2.next = 14;
              break;
            }

            username = result.username, id = result.id;
            token = _jsonwebtoken["default"].sign({
              username: username,
              id: id
            }, process.env.SECRET_KEY);
            return _context2.abrupt("return", res.status(200).json({
              token: token,
              message: 'Login successful'
            }));

          case 14:
            return _context2.abrupt("return", res.status(404).json({
              message: 'Invalid Credentials'
            }));

          case 17:
            _context2.prev = 17;
            _context2.t0 = _context2["catch"](0);
            res.status(500).json({
              message: "User doesn't exist. Please signup"
            });

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 17]]);
  }));

  return function login(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.login = login;

var checkValidUser = function checkValidUser(res, userData) {
  if (Number(userData.userId) !== Number(userData.newId)) {
    throw 'Invalid user id supplied'; // eslint-disable-line
  }
};

exports.checkValidUser = checkValidUser;