"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadImageCover = exports.upload = exports.returnBook = exports.rentBook = exports.modifyBookInfo = exports.getBookById = exports.getAllBooks = exports.deleteBook = exports.createBook = exports.bookNotReturned = void 0;

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _multer = _interopRequireDefault(require("multer"));

var _book = require("../models/book");

var _user = require("./user.controllers");

var _rentedbooks = require("../models/rentedbooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var upload = (0, _multer["default"])({
  dest: 'public/files'
});
exports.upload = upload;

_cloudinary["default"].config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

var createBook = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var bookUpload;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _cloudinary["default"].uploader.upload(req.file.path);

          case 3:
            bookUpload = _context.sent;
            _context.next = 6;
            return _book.Book.create({
              title: req.body.title,
              description: req.body.description,
              author: req.body.author,
              imageUrl: req.body.imageUrl,
              fileUrl: bookUpload.url,
              price: req.body.price,
              userId: req.user.id
            }, {
              include: [{
                association: _book.Book.User
              }]
            });

          case 6:
            return _context.abrupt("return", res.status(200).json({
              message: 'Success'
            }));

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(500).json({
              err: _context.t0
            }));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));

  return function createBook(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createBook = createBook;

var getAllBooks = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var books;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _book.Book.findAll({
              attributes: ['title', 'author', 'id', 'price']
            });

          case 3:
            books = _context2.sent;

            if (!books) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(200).json({
              books: books
            }));

          case 6:
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(400).json({
              err: _context2.t0
            }));

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));

  return function getAllBooks(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getAllBooks = getAllBooks;

var getBookById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var id, item;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.next = 3;
            return _book.Book.findOne({
              where: {
                id: id
              }
            });

          case 3:
            item = _context3.sent;

            if (item) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", res.status(404).send('Book not found'));

          case 6:
            return _context3.abrupt("return", res.status(200).json({
              item: item
            }));

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getBookById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getBookById = getBookById;

var modifyBookInfo = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var id, updateBook, objectToUpdate;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            id = req.params.id;
            _context4.next = 4;
            return _cloudinary["default"].uploader.upload(req.file.path);

          case 4:
            updateBook = _context4.sent;
            objectToUpdate = {
              title: req.body.title,
              description: req.body.description,
              author: req.body.author,
              fileUrl: updateBook.url,
              price: req.body.price
            };

            _book.Book.update(objectToUpdate, {
              where: {
                id: id
              }
            }).then(function (result) {
              return res.status(200).json({
                result: result,
                message: 'Book info updated successfully'
              });
            });

            _context4.next = 12;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", res.status(400).json({
              message: 'Fail to update info'
            }));

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 9]]);
  }));

  return function modifyBookInfo(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.modifyBookInfo = modifyBookInfo;

var uploadImageCover = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var id, uploadFile, imageToUpdate;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            id = req.params.id;
            _context5.next = 4;
            return _cloudinary["default"].uploader.upload(req.file.path);

          case 4:
            uploadFile = _context5.sent;
            imageToUpdate = {
              imageUrl: uploadFile.url
            };

            _book.Book.update(imageToUpdate, {
              where: {
                id: id
              }
            }).then(function (result) {
              return res.status(200).json({
                result: result,
                message: 'Success'
              });
            });

            _context5.next = 12;
            break;

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](0);
            return _context5.abrupt("return", res.status(400).json({
              message: 'Fail to upload image'
            }));

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 9]]);
  }));

  return function uploadImageCover(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.uploadImageCover = uploadImageCover;

var deleteBook = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var id;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            id = req.params.id;
            _context6.next = 4;
            return _book.Book.destroy({
              where: {
                id: id
              }
            });

          case 4:
            return _context6.abrupt("return", res.status(200).json({
              message: 'Book has been deleted successfully'
            }));

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);
            return _context6.abrupt("return", res.status(404).json({
              message: 'Book not found'
            }));

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 7]]);
  }));

  return function deleteBook(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.deleteBook = deleteBook;

var rentBook = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var id, userId, userData, availableBook, borrowedBook;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            id = req.body.id;
            userId = req.user.id;
            userData = {
              userId: userId,
              newId: req.params.userId
            };
            (0, _user.checkValidUser)(res, userData);
            _context7.next = 7;
            return _book.Book.findOne({
              where: {
                id: id
              }
            });

          case 7:
            availableBook = _context7.sent;

            if (availableBook) {
              _context7.next = 10;
              break;
            }

            return _context7.abrupt("return", res.status(404).json({
              message: 'Book not found'
            }));

          case 10:
            _context7.next = 12;
            return _rentedbooks.rentBooks.findOne({
              where: {
                bookReturned: false,
                bookId: id
              }
            });

          case 12:
            borrowedBook = _context7.sent;

            if (!borrowedBook) {
              _context7.next = 15;
              break;
            }

            return _context7.abrupt("return", res.status(400).json({
              message: 'This book has been borrowed'
            }));

          case 15:
            _context7.next = 17;
            return _rentedbooks.rentBooks.create({
              bookId: id,
              userId: userId,
              bookReturned: false
            });

          case 17:
            return _context7.abrupt("return", res.status(200).json({
              message: 'This book has been rented successfully'
            }));

          case 20:
            _context7.prev = 20;
            _context7.t0 = _context7["catch"](0);
            return _context7.abrupt("return", res.status(500).send({
              err: _context7.t0
            }));

          case 23:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 20]]);
  }));

  return function rentBook(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.rentBook = rentBook;

var returnBook = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var userId, userData, returnABook;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            userId = req.user.id;
            userData = {
              userId: userId,
              newId: req.params.userId
            };
            (0, _user.checkValidUser)(res, userData);
            returnABook = {
              bookReturned: true
            };
            _context8.next = 7;
            return _rentedbooks.rentBooks.update(returnABook, {
              where: {
                bookId: req.body.bookId,
                bookReturned: false,
                userId: userId
              }
            }).then(function (result) {
              return res.status(200).json({
                result: result,
                message: 'Book has been returned successfully'
              });
            });

          case 7:
            _context8.next = 12;
            break;

          case 9:
            _context8.prev = 9;
            _context8.t0 = _context8["catch"](0);
            return _context8.abrupt("return", res.status(500).json({
              err: _context8.t0
            }));

          case 12:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 9]]);
  }));

  return function returnBook(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.returnBook = returnBook;

var bookNotReturned = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var userId, userData, unreturnedBooks;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            userId = req.user.id;
            userData = {
              userId: userId,
              newId: req.params.userId
            };
            (0, _user.checkValidUser)(res, userData);
            _context9.next = 6;
            return _rentedbooks.rentBooks.findAll({
              attributes: ['id', 'bookReturned', 'bookId'],
              where: {
                bookReturned: req.query.bookReturned,
                userId: userId
              }
            });

          case 6:
            unreturnedBooks = _context9.sent;
            return _context9.abrupt("return", res.status(200).json({
              unreturnedBooks: unreturnedBooks
            }));

          case 10:
            _context9.prev = 10;
            _context9.t0 = _context9["catch"](0);
            return _context9.abrupt("return", res.status(500).json({
              err: _context9.t0
            }));

          case 13:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 10]]);
  }));

  return function bookNotReturned(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

exports.bookNotReturned = bookNotReturned;