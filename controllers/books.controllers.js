import cloudinary from 'cloudinary';
import multer from 'multer';
import Sequelize from 'sequelize';
import { sequelize } from '../models/user';
import BookModel from '../models/book';

const Book = BookModel(sequelize, Sequelize.DataTypes);

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
