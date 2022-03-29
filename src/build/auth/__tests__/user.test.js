"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userToken1 = exports.userToken = void 0;

var _supertest = _interopRequireDefault(require("supertest"));

var _globals = require("@jest/globals");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var userToken = {};
exports.userToken = userToken;
var userToken1 = {};
exports.userToken1 = userToken1;
(0, _globals.describe)('Post endpoints', function () {
  (0, _globals.it)('Should create a new user', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var res, token;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _supertest["default"])(_app["default"]).post('/api/users/signup').send({
              username: 'killermine',
              email: 'mike@gmail.com',
              password: 'nekky'
            });

          case 2:
            res = _context.sent;
            token = res.body.token;
            userToken.token = token;
            userToken.userId = _jsonwebtoken["default"].decode(userToken.token).id;
            (0, _globals.expect)(res.status).toEqual(200);
            (0, _globals.expect)(res.body).toEqual({
              message: 'User created Successfully',
              token: token
            });

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
});
(0, _globals.it)('Should create a new user', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  var res, token;
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _supertest["default"])(_app["default"]).post('/api/users/signup').send({
            username: 'Kindness',
            email: 'kindness@gmail.com',
            password: 'nekky'
          });

        case 2:
          res = _context2.sent;
          token = res.body.token;
          userToken1.token = token;
          userToken1.userId = _jsonwebtoken["default"].decode(userToken1.token).id;
          (0, _globals.expect)(res.status).toEqual(200);
          (0, _globals.expect)(res.body).toEqual({
            message: 'User created Successfully',
            token: token
          });

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})));
(0, _globals.it)('Should check if a user exists', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
  var res;
  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _supertest["default"])(_app["default"]).post('/api/users/signup').send({
            username: 'killermine',
            email: 'mike@gmail.com',
            password: 'nekky'
          });

        case 2:
          res = _context3.sent;
          (0, _globals.expect)(res.status).toEqual(409);
          (0, _globals.expect)(res.body).toEqual({
            message: 'User Already Exist. Please Login'
          });

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3);
})));
(0, _globals.it)('Should throw an error if input is empty', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
  var res;
  return regeneratorRuntime.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _supertest["default"])(_app["default"]).post('/api/users/signup').send({});

        case 2:
          res = _context4.sent;
          (0, _globals.expect)(res.status).toEqual(500);
          (0, _globals.expect)(res.body).toEqual({
            message: 'Failed to create user'
          });

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee4);
})));
(0, _globals.it)('Should login a user', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
  var res, token;
  return regeneratorRuntime.wrap(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _supertest["default"])(_app["default"]).post('/api/users/signin').send({
            email: 'mike@gmail.com',
            password: 'nekky'
          });

        case 2:
          res = _context5.sent;
          token = res.body.token;
          userToken.token = token;
          (0, _globals.expect)(res.status).toEqual(200);
          (0, _globals.expect)(res.body).toEqual({
            message: 'Login successful',
            token: token
          });

        case 7:
        case "end":
          return _context5.stop();
      }
    }
  }, _callee5);
})));
(0, _globals.it)('User should input his login credentials', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
  var res;
  return regeneratorRuntime.wrap(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return (0, _supertest["default"])(_app["default"]).post('/api/users/signin').send({});

        case 2:
          res = _context6.sent;
          (0, _globals.expect)(res.status).toEqual(400);
          (0, _globals.expect)(res.body).toEqual({
            message: 'User input required'
          });

        case 5:
        case "end":
          return _context6.stop();
      }
    }
  }, _callee6);
})));
(0, _globals.it)('should validate a user credentials', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
  var res;
  return regeneratorRuntime.wrap(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return (0, _supertest["default"])(_app["default"]).post('/api/users/signin').send({
            email: 'mike@gmail.com',
            password: 'ninie'
          });

        case 2:
          res = _context7.sent;
          (0, _globals.expect)(res.status).toEqual(404);
          (0, _globals.expect)(res.body).toEqual({
            message: 'Invalid Credentials'
          });

        case 5:
        case "end":
          return _context7.stop();
      }
    }
  }, _callee7);
})));
(0, _globals.it)("should return an error message when a user doesn't exist", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
  var res;
  return regeneratorRuntime.wrap(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return (0, _supertest["default"])(_app["default"]).post('/api/users/signin').send({
            email: 'nna@gmail.com',
            password: 'minny'
          });

        case 2:
          res = _context8.sent;
          (0, _globals.expect)(res.status).toEqual(500);
          (0, _globals.expect)(res.body).toEqual({
            message: "User doesn't exist. Please signup"
          });

        case 5:
        case "end":
          return _context8.stop();
      }
    }
  }, _callee8);
})));