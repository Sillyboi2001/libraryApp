"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _globals = require("@jest/globals");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _app = _interopRequireDefault(require("../app"));

var _user = require("./user.test");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const file = `${__dirname}/filesfolder/test.pdf`;
const file2 = `${__dirname}/filesfolder/download.jpeg`;
(0, _globals.describe)('Post endpoints', () => {
  (0, _globals.it)('Block access if no token is passed in', async () => {
    const res = await (0, _supertest.default)(_app.default).post('/api/books').set('content-type', 'multipart/form-data').set('authorization', '').field('title', 'The rich also cry').field('description', 'A story that shows the suffering of the rich').field('author', 'Silasmanas').field('price', '$10').attach('bookFile', file);
    (0, _globals.expect)(res.status).toEqual(401);
    (0, _globals.expect)(res.body).toEqual({
      message: 'Invalid login'
    });
  });
});
(0, _globals.it)('Should block access if an invalid token is passed in', async () => {
  const res = await (0, _supertest.default)(_app.default).post('/api/books').set('content-type', 'multipart/form-data').set('authorization', 'nvffgh').field('title', 'The rich also cry').field('description', 'A story that shows the suffering of the rich').field('author', 'Silasmanas').field('price', '$10').attach('bookFile', file);
  (0, _globals.expect)(res.status).toEqual(401);
  (0, _globals.expect)(res.body).toEqual({
    message: 'Invalid token'
  });
});
(0, _globals.it)('Should create a book', async () => {
  const res = await (0, _supertest.default)(_app.default).post('/api/books').set('content-type', 'multipart/form-data').set('authorization', _user.userToken.token).field('title', 'The rich also cry').field('description', 'A story that shows the suffering of the rich').field('author', 'Silasmanas').field('price', '$10').attach('bookFile', file);
  (0, _globals.expect)(res.status).toEqual(200);
  (0, _globals.expect)(res.body).toEqual({
    message: 'Success'
  });
});
(0, _globals.it)('Create a book', async () => {
  const res = await (0, _supertest.default)(_app.default).post('/api/books').set('content-type', 'multipart/form-data').set('authorization', _user.userToken.token).field('title', 'The lion king').field('description', 'A story of a young lion cub').field('author', 'Silasmanas').field('price', '$5').attach('bookFile', file);
  (0, _globals.expect)(res.status).toEqual(200);
  (0, _globals.expect)(res.body).toEqual({
    message: 'Success'
  });
});
(0, _globals.it)('Get all books', async () => {
  const res = await (0, _supertest.default)(_app.default).get('/api/books').set('authorization', _user.userToken.token);
  const {
    books
  } = res.body;
  (0, _globals.expect)(res.status).toEqual(200);
  (0, _globals.expect)(res.body).toEqual({
    books
  });
});
(0, _globals.it)('Get a book by id', async () => {
  const res = await (0, _supertest.default)(_app.default).get('/api/books/1').set('authorization', _user.userToken.token);
  const {
    item
  } = res.body;
  (0, _globals.expect)(res.body).toEqual({
    item
  });
  (0, _globals.expect)(res.status).toEqual(200);
});
(0, _globals.it)('modify a book info', async () => {
  const res = await (0, _supertest.default)(_app.default).put('/api/books/1').set('content-type', 'multipart/form-data').set('authorization', _user.userToken.token).field('title', 'The rich also cry').field('description', 'A story that shows the suffering of the rich').field('author', 'Nicolas').field('price', '$15').attach('bookFile', file);
  const {
    result
  } = res.body;
  (0, _globals.expect)(res.status).toEqual(200);
  (0, _globals.expect)(res.body).toEqual({
    message: 'Book info updated successfully',
    result
  });
});
(0, _globals.it)("Can't modify a book info", async () => {
  const res = await (0, _supertest.default)(_app.default).put('/api/books/1').set('content-type', 'multipart/form-data').set('authorization', _user.userToken.token).field('title', 'The rich also cry').field('description', 'A story that shows the suffering of the rich').field('author', 'Nicolas').field('price', '$15');
  (0, _globals.expect)(res.status).toEqual(400);
  (0, _globals.expect)(res.body).toEqual({
    message: 'Fail to update info'
  });
});
(0, _globals.it)('Upload a book cover image', async () => {
  const res = await (0, _supertest.default)(_app.default).put('/api/books/1/imageCover').set('content-type', 'multipart/form-data').set('authorization', _user.userToken.token).attach('img', file2);
  const {
    result
  } = res.body;
  (0, _globals.expect)(res.status).toEqual(200);
  (0, _globals.expect)(res.body).toEqual({
    message: 'Success',
    result
  });
});
(0, _globals.it)("Can't upload a book cover image when the file is absent", async () => {
  const res = await (0, _supertest.default)(_app.default).put('/api/books/1/imageCover').set('content-type', 'multipart/form-data').set('authorization', _user.userToken.token).field('title', 'The rich also cry').field('description', 'A story that shows the suffering of the rich').field('author', 'Nicolas').field('price', '$15');
  (0, _globals.expect)(res.status).toEqual(400);
  (0, _globals.expect)(res.body).toEqual({
    message: 'Fail to upload image'
  });
});
(0, _globals.it)('Delete a book by id', async () => {
  const res = await (0, _supertest.default)(_app.default).delete('/api/books/3').set('authorization', _user.userToken.token);
  (0, _globals.expect)(res.status).toEqual(200);
  (0, _globals.expect)(res.body).toEqual({
    message: 'Book has been deleted successfully'
  });
});
(0, _globals.it)('User should rent a book', async () => {
  const res = await (0, _supertest.default)(_app.default).post(`/api/users/${_user.userToken1.userId}/books`).set('authorization', _user.userToken1.token).send({
    id: 2
  });
  (0, _globals.expect)(res.status).toEqual(200);
  (0, _globals.expect)(res.body).toEqual({
    message: 'This book has been rented successfully'
  });
});
(0, _globals.it)('Should check an unavalilable book', async () => {
  const res = await (0, _supertest.default)(_app.default).post(`/api/users/${_user.userToken1.userId}/books`).set('authorization', _user.userToken1.token).send({
    id: 20
  });
  (0, _globals.expect)(res.status).toEqual(404);
  (0, _globals.expect)(res.body).toEqual({
    message: 'Book not found'
  });
});
(0, _globals.it)("User can't rent a book that has been borrowed", async () => {
  const res = await (0, _supertest.default)(_app.default).post(`/api/users/${_user.userToken.userId}/books`).set('authorization', _user.userToken.token).send({
    id: 2
  });
  (0, _globals.expect)(res.status).toEqual(400);
});
(0, _globals.it)('throw an error if an invalid user id is supplied', async () => {
  const res = await (0, _supertest.default)(_app.default).post('/api/users/5/books').set('authorization', _user.userToken1.token).send({
    id: 2
  });
  const {
    err
  } = res.body;
  (0, _globals.expect)(res.status).toEqual(500);
  (0, _globals.expect)(res.body).toEqual({
    err
  });
});
(0, _globals.it)('Should get all unreturned books by a user', async () => {
  const res = await (0, _supertest.default)(_app.default).get(`/api/users/${_user.userToken1.userId}/books?bookReturned=false`).set('authorization', _user.userToken1.token);
  const {
    unreturnedBooks
  } = res.body;
  (0, _globals.expect)(res.status).toEqual(200);
  (0, _globals.expect)(res.body).toEqual({
    unreturnedBooks
  });
});
(0, _globals.it)('throw an error if an invalid user id is supplied', async () => {
  const res = await (0, _supertest.default)(_app.default).get('/api/users/10/books?bookReturned=false').set('authorization', _user.userToken1.token).send({
    id: 2
  });
  const {
    err
  } = res.body;
  (0, _globals.expect)(res.status).toEqual(500);
  (0, _globals.expect)(res.body).toEqual({
    err
  });
});
(0, _globals.it)('User should return a borrowed book', async () => {
  const res = await (0, _supertest.default)(_app.default).put(`/api/users/${_user.userToken1.userId}/books`).set('authorization', _user.userToken1.token).send({
    bookId: 2
  });
  const {
    result
  } = res.body;
  (0, _globals.expect)(res.status).toEqual(200);
  (0, _globals.expect)(res.body).toEqual({
    message: 'Book has been returned successfully',
    result
  });
});
(0, _globals.it)('throw an error if an invalid user id is supplied', async () => {
  const res = await (0, _supertest.default)(_app.default).put('/api/users/6/books').set('authorization', _user.userToken1.token).send({
    id: 2
  });
  const {
    err
  } = res.body;
  (0, _globals.expect)(res.status).toEqual(500);
  (0, _globals.expect)(res.body).toEqual({
    err
  });
});