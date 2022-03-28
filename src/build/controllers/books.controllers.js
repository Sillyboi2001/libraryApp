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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const upload = (0, _multer.default)({
  dest: 'public/files'
});
exports.upload = upload;

_cloudinary.default.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const createBook = async (req, res) => {
  try {
    const bookUpload = await _cloudinary.default.uploader.upload(req.file.path);
    await _book.Book.create({
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
    return res.status(200).json({
      message: 'Success'
    });
  } catch (err) {
    return res.status(500).json({
      err
    });
  }
};

exports.createBook = createBook;

const getAllBooks = async (req, res) => {
  try {
    const books = await _book.Book.findAll({
      attributes: ['title', 'author', 'id', 'price']
    });
    if (books) return res.status(200).json({
      books
    });
  } catch (err) {
    return res.status(400).json({
      err
    });
  }
};

exports.getAllBooks = getAllBooks;

const getBookById = async (req, res) => {
  const {
    id
  } = req.params;
  const item = await _book.Book.findOne({
    where: {
      id
    }
  });
  if (!item) return res.status(404).send('Book not found');
  return res.status(200).json({
    item
  });
};

exports.getBookById = getBookById;

const modifyBookInfo = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const updateBook = await _cloudinary.default.uploader.upload(req.file.path);
    const objectToUpdate = {
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      fileUrl: updateBook.url,
      price: req.body.price
    };

    _book.Book.update(objectToUpdate, {
      where: {
        id
      }
    }).then(result => res.status(200).json({
      result,
      message: 'Book info updated successfully'
    }));
  } catch (err) {
    return res.status(400).json({
      message: 'Fail to update info'
    });
  }
};

exports.modifyBookInfo = modifyBookInfo;

const uploadImageCover = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const uploadFile = await _cloudinary.default.uploader.upload(req.file.path);
    const imageToUpdate = {
      imageUrl: uploadFile.url
    };

    _book.Book.update(imageToUpdate, {
      where: {
        id
      }
    }).then(result => res.status(200).json({
      result,
      message: 'Success'
    }));
  } catch (err) {
    return res.status(400).json({
      message: 'Fail to upload image'
    });
  }
};

exports.uploadImageCover = uploadImageCover;

const deleteBook = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    await _book.Book.destroy({
      where: {
        id
      }
    });
    return res.status(200).json({
      message: 'Book has been deleted successfully'
    });
  } catch (err) {
    return res.status(404).json({
      message: 'Book not found'
    });
  }
};

exports.deleteBook = deleteBook;

const rentBook = async (req, res) => {
  try {
    const {
      id
    } = req.body;
    const {
      id: userId
    } = req.user;
    const userData = {
      userId,
      newId: req.params.userId
    };
    (0, _user.checkValidUser)(res, userData);
    const availableBook = await _book.Book.findOne({
      where: {
        id
      }
    });
    if (!availableBook) return res.status(404).json({
      message: 'Book not found'
    });
    const borrowedBook = await _rentedbooks.rentBooks.findOne({
      where: {
        bookReturned: false,
        bookId: id
      }
    });

    if (borrowedBook) {
      return res.status(400).json({
        message: 'This book has been borrowed'
      });
    }

    await _rentedbooks.rentBooks.create({
      bookId: id,
      userId,
      bookReturned: false
    });
    return res.status(200).json({
      message: 'This book has been rented successfully'
    });
  } catch (err) {
    return res.status(500).send({
      err
    });
  }
};

exports.rentBook = rentBook;

const returnBook = async (req, res) => {
  try {
    const {
      id: userId
    } = req.user;
    const userData = {
      userId,
      newId: req.params.userId
    };
    (0, _user.checkValidUser)(res, userData);
    const returnABook = {
      bookReturned: true
    };
    await _rentedbooks.rentBooks.update(returnABook, {
      where: {
        bookId: req.body.bookId,
        bookReturned: false,
        userId
      }
    }).then(result => res.status(200).json({
      result,
      message: 'Book has been returned successfully'
    }));
  } catch (err) {
    return res.status(500).json({
      err
    });
  }
};

exports.returnBook = returnBook;

const bookNotReturned = async (req, res) => {
  try {
    const {
      id: userId
    } = req.user;
    const userData = {
      userId,
      newId: req.params.userId
    };
    (0, _user.checkValidUser)(res, userData);
    const unreturnedBooks = await _rentedbooks.rentBooks.findAll({
      attributes: ['id', 'bookReturned', 'bookId'],
      where: {
        bookReturned: req.query.bookReturned,
        userId
      }
    });
    return res.status(200).json({
      unreturnedBooks
    });
  } catch (err) {
    return res.status(500).json({
      err
    });
  }
};

exports.bookNotReturned = bookNotReturned;