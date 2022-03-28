"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userToken1 = exports.userToken = void 0;

var _supertest = _interopRequireDefault(require("supertest"));

var _globals = require("@jest/globals");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userToken = {};
exports.userToken = userToken;
const userToken1 = {};
exports.userToken1 = userToken1;
(0, _globals.describe)('Post endpoints', () => {
  (0, _globals.it)('Should create a new user', async () => {
    const res = await (0, _supertest.default)(_app.default).post('/api/users/signup').send({
      username: 'killermine',
      email: 'mike@gmail.com',
      password: 'nekky'
    });
    const {
      token
    } = res.body;
    userToken.token = token;
    userToken.userId = _jsonwebtoken.default.decode(userToken.token).id;
    (0, _globals.expect)(res.status).toEqual(200);
    (0, _globals.expect)(res.body).toEqual({
      message: 'User created Successfully',
      token
    });
  });
});
(0, _globals.it)('Should create a new user', async () => {
  const res = await (0, _supertest.default)(_app.default).post('/api/users/signup').send({
    username: 'Kindness',
    email: 'kindness@gmail.com',
    password: 'nekky'
  });
  const {
    token
  } = res.body;
  userToken1.token = token;
  userToken1.userId = _jsonwebtoken.default.decode(userToken1.token).id;
  (0, _globals.expect)(res.status).toEqual(200);
  (0, _globals.expect)(res.body).toEqual({
    message: 'User created Successfully',
    token
  });
});
(0, _globals.it)('Should check if a user exists', async () => {
  const res = await (0, _supertest.default)(_app.default).post('/api/users/signup').send({
    username: 'killermine',
    email: 'mike@gmail.com',
    password: 'nekky'
  });
  (0, _globals.expect)(res.status).toEqual(409);
  (0, _globals.expect)(res.body).toEqual({
    message: 'User Already Exist. Please Login'
  });
});
(0, _globals.it)('Should throw an error if input is empty', async () => {
  const res = await (0, _supertest.default)(_app.default).post('/api/users/signup').send({});
  (0, _globals.expect)(res.status).toEqual(500);
  (0, _globals.expect)(res.body).toEqual({
    message: 'Failed to create user'
  });
});
(0, _globals.it)('Should login a user', async () => {
  const res = await (0, _supertest.default)(_app.default).post('/api/users/signin').send({
    email: 'mike@gmail.com',
    password: 'nekky'
  });
  const {
    token
  } = res.body;
  userToken.token = token;
  (0, _globals.expect)(res.status).toEqual(200);
  (0, _globals.expect)(res.body).toEqual({
    message: 'Login successful',
    token
  });
});
(0, _globals.it)('User should input his login credentials', async () => {
  const res = await (0, _supertest.default)(_app.default).post('/api/users/signin').send({});
  (0, _globals.expect)(res.status).toEqual(400);
  (0, _globals.expect)(res.body).toEqual({
    message: 'User input required'
  });
});
(0, _globals.it)('should validate a user credentials', async () => {
  const res = await (0, _supertest.default)(_app.default).post('/api/users/signin').send({
    email: 'mike@gmail.com',
    password: 'ninie'
  });
  (0, _globals.expect)(res.status).toEqual(404);
  (0, _globals.expect)(res.body).toEqual({
    message: 'Invalid Credentials'
  });
});
(0, _globals.it)("should return an error message when a user doesn't exist", async () => {
  const res = await (0, _supertest.default)(_app.default).post('/api/users/signin').send({
    email: 'nna@gmail.com',
    password: 'minny'
  });
  (0, _globals.expect)(res.status).toEqual(500);
  (0, _globals.expect)(res.body).toEqual({
    message: "User doesn't exist. Please signup"
  });
});