import cloudinary from 'cloudinary';
import multer from 'multer';
import { books } from '../model/user';

export const upload = multer({ dest: 'public/files' });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const fileUpload = (req, res) => {
  const file = {
    image: req.file.path,
  };
  cloudinary.uploader.upload(file.image)
    .then((result) => {
      books.create({
        title: req.body.title,
        price: req.body.price,
        coverImageUrl: result.url,
        author: result.public_id,
      });
      res.status(200).json({
        message: 'Success',
        url: result.url,
      });
    }).catch((error) => {
      res.status(500).json({
        message: 'Error',
        error,
      });
    });
};

export const findAll = async (req, res) => {
  const book = await books.findAll({
    attributes: ['title', 'author', 'id', 'price'],
  });
  res.json({ book });
};

export const findById = async (req, res) => {
  const { id } = req.params;
  const book = await books.findOne({
    where: { id },
  });
  if (book === null) {
    res.status(404).send('Book not found');
  } else {
    res.status(200).send(book);
  }
};

export const modifyBookInfo = (req, res) => {
  const { id } = req.params;
  const objectToUpdate = {
    title: req.body.title,
    price: req.body.price,
  };
  books.update(objectToUpdate, { where: { id } }).then((book) => {
    res.status(200).send(book);
  }).catch((err) => {
    res.status(500).send(err);
  });
};
