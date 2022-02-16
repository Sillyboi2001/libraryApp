import cloudinary from 'cloudinary';
import multer from 'multer';
import { Book, books } from '../models/book';
import { checkValidUser } from './user.controllers';
import { rentBooks } from '../models/rentedbooks';

export const upload = multer({ dest: 'public/files' });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const createBook = async (req, res) => {
  try {
    const bookUpload = await cloudinary.uploader.upload(req.file.path);
    await Book.create({
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      imageUrl: req.body.imageUrl,
      fileUrl: bookUpload.url,
      price: req.body.price,
      userId: req.user.id,
    }, {
      include: [{
        association: Book.User,
      }],
    });
    return res.status(200).json({
      message: 'Success',
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Failed to create Book',
    });
  }
};

export const getAllBooks = async (req, res) => {
  const books = await Book.findAll({
    attributes: ['title', 'author', 'id', 'price'],
  });
  if (books) return res.status(200).json(books);
  return res.status(500).json("Couldn't get books");
};

export const getBookById = async (req, res) => {
  const { id } = req.params;
  const item = await Book.findOne({
    where: { id },
  });
  if (!item) return res.status(404).send('Book not found');
  return res.status(200).send(item);
};

export const modifyBookInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const updateBook = await cloudinary.uploader.upload(req.file.path);
    const objectToUpdate = {
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      fileUrl: updateBook.url,
      price: req.body.price,
    };
    Book.update(objectToUpdate, { where: { id } })
      .then((result) => res.status(200).json({
        result,
        message: 'Book info updated successfully',
        book: updateBook.url,
      }));
  } catch (err) {
    return res.status(500).json('Fail to update info');
  }
};

export const uploadImageCover = async (req, res) => {
  try {
    const { id } = req.params;
    const uploadFile = await cloudinary.uploader.upload(req.file.path);
    const imageToUpdate = {
      imageUrl: uploadFile.url,
    };
    Book.update(imageToUpdate, { where: { id } })
      .then((result) => res.status(200).json({
        result,
        message: uploadFile.url,
      }));
  } catch (err) {
    return res.status(500).json('Fail to upload image');
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    await Book.destroy({ where: { id } });
    return res.status(200).json({
      message: 'Book has been deleted successfully',
      id: req.params.id,
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

export const rentBook = async (req, res) => {
  try {
    const { id } = req.body;
    const userId = req.user.id;
    const userData = {
      userId,
      newId: req.params.userId,
    };
    checkValidUser(res, userData);
    const bookAvailable = await Book.findOne({ where: { id } });
    if (!bookAvailable) return res.status(200).json('Book not found');
    const borrowedBook = await rentBooks.findOne({ where: { bookReturned: false, bookId: id } });
    if (borrowedBook) {
      return res.status(400).json('This book has been borrowed');
    }
    await rentBooks.create({
      bookId: id,
      userId,
      bookReturned: false,
    });
    return res.status(200).json('This book has been rented successfully');
  } catch (err) {
    return res.status(500).json('An error occured');
  }
};

export const returnBook = async (req, res) => {
  try {
    const userId = req.user.id;
    const userData = {
      userId,
      newId: req.params.userId,
    };
    checkValidUser(res, userData);
    const returnABook = {
      updatedAt: Date.now(),
      bookReturned: true,
    };
    await rentBooks.update(returnABook, {
      where:
      { bookId: req.body.bookId, bookReturned: false, userId },
    })
      .then((result) => res.status(200).json({
        result,
        message: 'Book has been returned successfully',
      }));
  } catch (err) {
    return res.status(500).json('An error occured while trying to return the book');
  }
};

export const bookNotReturned = async (req, res) => {
  try {
    const userId = req.user.id;
    const userData = {
      userId,
      newId: req.params.userId,
    };
    checkValidUser(res, userData);
    const unreturnedBooks = await rentBooks.findAll({
      attributes: ['id', 'bookReturned', 'bookId'],
      where: {
        bookReturned: req.query.bookReturned,
        userId,
      },
    });
    return res.status(200).json({ unreturnedBooks });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
