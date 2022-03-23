import cloudinary from 'cloudinary';
import multer from 'multer';
import { Book } from '../models/book';
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
      err,
    });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll({
      attributes: ['title', 'author', 'id', 'price'],
    });
    if (books) return res.status(200).json({ books });
  } catch (err) {
    return res.status(400).json({ err });
  }
};

export const getBookById = async (req, res) => {
  const { id } = req.params;
  const item = await Book.findOne({
    where: { id },
  });
  if (!item) return res.status(404).send('Book not found');
  return res.status(200).json({ item });
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
      }));
  } catch (err) {
    return res.status(400).json({ message: 'Fail to update info' });
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
        message: 'Success',
      }));
  } catch (err) {
    return res.status(400).json({ message: 'Fail to upload image' });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    await Book.destroy({ where: { id } });
    return res.status(200).json({ message: 'Book has been deleted successfully' });
  } catch (err) {
    return res.status(404).json({ message: 'Book not found' });
  }
};

export const rentBook = async (req, res) => {
  try {
    const { id } = req.body;
    const { id: userId } = req.user;
    const userData = {
      userId,
      newId: req.params.userId,
    };
    checkValidUser(res, userData);
    const availableBook = await Book.findOne({ where: { id } });
    if (!availableBook) return res.status(404).json({ message: 'Book not found' });
    const borrowedBook = await rentBooks.findOne({ where: { bookReturned: false, bookId: id } });
    if (borrowedBook) {
      return res.status(400).json({ message: 'This book has been borrowed' });
    }
    await rentBooks.create({
      bookId: id,
      userId,
      bookReturned: false,
    });
    return res.status(200).json({ message: 'This book has been rented successfully' });
  } catch (err) {
    return res.status(500).send({ err });
  }
};

export const returnBook = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const userData = {
      userId,
      newId: req.params.userId,
    };
    checkValidUser(res, userData);
    const returnABook = {
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
    return res.status(500).json({ err });
  }
};

export const bookNotReturned = async (req, res) => {
  try {
    const { id: userId } = req.user;
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
