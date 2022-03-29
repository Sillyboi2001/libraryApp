"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _globals = require("@jest/globals");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _app = _interopRequireDefault(require("../app"));

var _user = require("./user.test");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv["default"].config();

var file = "".concat(__dirname, "/filesfolder/test.pdf");
var file2 = "".concat(__dirname, "/filesfolder/download.jpeg");
(0, _globals.describe)('Post endpoints', function () {
  (0, _globals.it)('Block access if no token is passed in', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var res;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _supertest["default"])(_app["default"]).post('/api/books').set('content-type', 'multipart/form-data').set('authorization', '').field('title', 'The rich also cry').field('description', 'A story that shows the suffering of the rich').field('author', 'Silasmanas').field('price', '$10').attach('bookFile', file);

          case 2:
            res = _context.sent;
            (0, _globals.expect)(res.status).toEqual(401);
            (0, _globals.expect)(res.body).toEqual({
              message: 'Invalid login'
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
});
(0, _globals.it)('Should block access if an invalid token is passed in', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  var res;
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _supertest["default"])(_app["default"]).post('/api/books').set('content-type', 'multipart/form-data').set('authorization', 'nvffgh').field('title', 'The rich also cry').field('description', 'A story that shows the suffering of the rich').field('author', 'Silasmanas').field('price', '$10').attach('bookFile', file);

        case 2:
          res = _context2.sent;
          (0, _globals.expect)(res.status).toEqual(401);
          (0, _globals.expect)(res.body).toEqual({
            message: 'Invalid token'
          });

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})));
(0, _globals.it)('Should create a book', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
  var res;
  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _supertest["default"])(_app["default"]).post('/api/books').set('content-type', 'multipart/form-data').set('authorization', _user.userToken.token).field('title', 'The rich also cry').field('description', 'A story that shows the suffering of the rich').field('author', 'Silasmanas').field('price', '$10').attach('bookFile', file);

        case 2:
          res = _context3.sent;
          (0, _globals.expect)(res.status).toEqual(200);
          (0, _globals.expect)(res.body).toEqual({
            message: 'Success'
          });

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3);
})));
(0, _globals.it)('Create a book', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
  var res;
  return regeneratorRuntime.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _supertest["default"])(_app["default"]).post('/api/books').set('content-type', 'multipart/form-data').set('authorization', _user.userToken.token).field('title', 'The lion king').field('description', 'A story of a young lion cub').field('author', 'Silasmanas').field('price', '$5').attach('bookFile', file);

        case 2:
          res = _context4.sent;
          (0, _globals.expect)(res.status).toEqual(200);
          (0, _globals.expect)(res.body).toEqual({
            message: 'Success'
          });

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee4);
})));
(0, _globals.it)('Get all books', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
  var res, books;
  return regeneratorRuntime.wrap(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _supertest["default"])(_app["default"]).get('/api/books').set('authorization', _user.userToken.token);

        case 2:
          res = _context5.sent;
          books = res.body.books;
          (0, _globals.expect)(res.status).toEqual(200);
          (0, _globals.expect)(res.body).toEqual({
            books: books
          });

        case 6:
        case "end":
          return _context5.stop();
      }
    }
  }, _callee5);
})));
(0, _globals.it)('Get a book by id', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
  var res, item;
  return regeneratorRuntime.wrap(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return (0, _supertest["default"])(_app["default"]).get('/api/books/1').set('authorization', _user.userToken.token);

        case 2:
          res = _context6.sent;
          item = res.body.item;
          (0, _globals.expect)(res.body).toEqual({
            item: item
          });
          (0, _globals.expect)(res.status).toEqual(200);

        case 6:
        case "end":
          return _context6.stop();
      }
    }
  }, _callee6);
})));
(0, _globals.it)('modify a book info', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
  var res, result;
  return regeneratorRuntime.wrap(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return (0, _supertest["default"])(_app["default"]).put('/api/books/1').set('content-type', 'multipart/form-data').set('authorization', _user.userToken.token).field('title', 'The rich also cry').field('description', 'A story that shows the suffering of the rich').field('author', 'Nicolas').field('price', '$15').attach('bookFile', file);

        case 2:
          res = _context7.sent;
          result = res.body.result;
          (0, _globals.expect)(res.status).toEqual(200);
          (0, _globals.expect)(res.body).toEqual({
            message: 'Book info updated successfully',
            result: result
          });

        case 6:
        case "end":
          return _context7.stop();
      }
    }
  }, _callee7);
})));
(0, _globals.it)("Can't modify a book info", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
  var res;
  return regeneratorRuntime.wrap(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return (0, _supertest["default"])(_app["default"]).put('/api/books/1').set('content-type', 'multipart/form-data').set('authorization', _user.userToken.token).field('title', 'The rich also cry').field('description', 'A story that shows the suffering of the rich').field('author', 'Nicolas').field('price', '$15');

        case 2:
          res = _context8.sent;
          (0, _globals.expect)(res.status).toEqual(400);
          (0, _globals.expect)(res.body).toEqual({
            message: 'Fail to update info'
          });

        case 5:
        case "end":
          return _context8.stop();
      }
    }
  }, _callee8);
})));
(0, _globals.it)('Upload a book cover image', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
  var res, result;
  return regeneratorRuntime.wrap(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return (0, _supertest["default"])(_app["default"]).put('/api/books/1/imageCover').set('content-type', 'multipart/form-data').set('authorization', _user.userToken.token).attach('img', file2);

        case 2:
          res = _context9.sent;
          result = res.body.result;
          (0, _globals.expect)(res.status).toEqual(200);
          (0, _globals.expect)(res.body).toEqual({
            message: 'Success',
            result: result
          });

        case 6:
        case "end":
          return _context9.stop();
      }
    }
  }, _callee9);
})));
(0, _globals.it)("Can't upload a book cover image when the file is absent", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
  var res;
  return regeneratorRuntime.wrap(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return (0, _supertest["default"])(_app["default"]).put('/api/books/1/imageCover').set('content-type', 'multipart/form-data').set('authorization', _user.userToken.token).field('title', 'The rich also cry').field('description', 'A story that shows the suffering of the rich').field('author', 'Nicolas').field('price', '$15');

        case 2:
          res = _context10.sent;
          (0, _globals.expect)(res.status).toEqual(400);
          (0, _globals.expect)(res.body).toEqual({
            message: 'Fail to upload image'
          });

        case 5:
        case "end":
          return _context10.stop();
      }
    }
  }, _callee10);
})));
(0, _globals.it)('Delete a book by id', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
  var res;
  return regeneratorRuntime.wrap(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return (0, _supertest["default"])(_app["default"])["delete"]('/api/books/3').set('authorization', _user.userToken.token);

        case 2:
          res = _context11.sent;
          (0, _globals.expect)(res.status).toEqual(200);
          (0, _globals.expect)(res.body).toEqual({
            message: 'Book has been deleted successfully'
          });

        case 5:
        case "end":
          return _context11.stop();
      }
    }
  }, _callee11);
})));
(0, _globals.it)('User should rent a book', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
  var res;
  return regeneratorRuntime.wrap(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return (0, _supertest["default"])(_app["default"]).post("/api/users/".concat(_user.userToken1.userId, "/books")).set('authorization', _user.userToken1.token).send({
            id: 2
          });

        case 2:
          res = _context12.sent;
          (0, _globals.expect)(res.status).toEqual(200);
          (0, _globals.expect)(res.body).toEqual({
            message: 'This book has been rented successfully'
          });

        case 5:
        case "end":
          return _context12.stop();
      }
    }
  }, _callee12);
})));
(0, _globals.it)('Should check an unavalilable book', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
  var res;
  return regeneratorRuntime.wrap(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.next = 2;
          return (0, _supertest["default"])(_app["default"]).post("/api/users/".concat(_user.userToken1.userId, "/books")).set('authorization', _user.userToken1.token).send({
            id: 20
          });

        case 2:
          res = _context13.sent;
          (0, _globals.expect)(res.status).toEqual(404);
          (0, _globals.expect)(res.body).toEqual({
            message: 'Book not found'
          });

        case 5:
        case "end":
          return _context13.stop();
      }
    }
  }, _callee13);
})));
(0, _globals.it)("User can't rent a book that has been borrowed", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
  var res;
  return regeneratorRuntime.wrap(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.next = 2;
          return (0, _supertest["default"])(_app["default"]).post("/api/users/".concat(_user.userToken.userId, "/books")).set('authorization', _user.userToken.token).send({
            id: 2
          });

        case 2:
          res = _context14.sent;
          (0, _globals.expect)(res.status).toEqual(400);

        case 4:
        case "end":
          return _context14.stop();
      }
    }
  }, _callee14);
})));
(0, _globals.it)('throw an error if an invalid user id is supplied', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
  var res, err;
  return regeneratorRuntime.wrap(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.next = 2;
          return (0, _supertest["default"])(_app["default"]).post('/api/users/5/books').set('authorization', _user.userToken1.token).send({
            id: 2
          });

        case 2:
          res = _context15.sent;
          err = res.body.err;
          (0, _globals.expect)(res.status).toEqual(500);
          (0, _globals.expect)(res.body).toEqual({
            err: err
          });

        case 6:
        case "end":
          return _context15.stop();
      }
    }
  }, _callee15);
})));
(0, _globals.it)('Should get all unreturned books by a user', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
  var res, unreturnedBooks;
  return regeneratorRuntime.wrap(function _callee16$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.next = 2;
          return (0, _supertest["default"])(_app["default"]).get("/api/users/".concat(_user.userToken1.userId, "/books?bookReturned=false")).set('authorization', _user.userToken1.token);

        case 2:
          res = _context16.sent;
          unreturnedBooks = res.body.unreturnedBooks;
          (0, _globals.expect)(res.status).toEqual(200);
          (0, _globals.expect)(res.body).toEqual({
            unreturnedBooks: unreturnedBooks
          });

        case 6:
        case "end":
          return _context16.stop();
      }
    }
  }, _callee16);
})));
(0, _globals.it)('throw an error if an invalid user id is supplied', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17() {
  var res, err;
  return regeneratorRuntime.wrap(function _callee17$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.next = 2;
          return (0, _supertest["default"])(_app["default"]).get('/api/users/10/books?bookReturned=false').set('authorization', _user.userToken1.token).send({
            id: 2
          });

        case 2:
          res = _context17.sent;
          err = res.body.err;
          (0, _globals.expect)(res.status).toEqual(500);
          (0, _globals.expect)(res.body).toEqual({
            err: err
          });

        case 6:
        case "end":
          return _context17.stop();
      }
    }
  }, _callee17);
})));
(0, _globals.it)('User should return a borrowed book', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18() {
  var res, result;
  return regeneratorRuntime.wrap(function _callee18$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.next = 2;
          return (0, _supertest["default"])(_app["default"]).put("/api/users/".concat(_user.userToken1.userId, "/books")).set('authorization', _user.userToken1.token).send({
            bookId: 2
          });

        case 2:
          res = _context18.sent;
          result = res.body.result;
          (0, _globals.expect)(res.status).toEqual(200);
          (0, _globals.expect)(res.body).toEqual({
            message: 'Book has been returned successfully',
            result: result
          });

        case 6:
        case "end":
          return _context18.stop();
      }
    }
  }, _callee18);
})));
(0, _globals.it)('throw an error if an invalid user id is supplied', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19() {
  var res, err;
  return regeneratorRuntime.wrap(function _callee19$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          _context19.next = 2;
          return (0, _supertest["default"])(_app["default"]).put('/api/users/6/books').set('authorization', _user.userToken1.token).send({
            id: 2
          });

        case 2:
          res = _context19.sent;
          err = res.body.err;
          (0, _globals.expect)(res.status).toEqual(500);
          (0, _globals.expect)(res.body).toEqual({
            err: err
          });

        case 6:
        case "end":
          return _context19.stop();
      }
    }
  }, _callee19);
})));