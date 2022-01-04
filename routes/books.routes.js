import express from 'express';
import {
  upload, createBook, modifyBookInfo, getAllBooks, getBookById, uploadImageCover,
} from '../controllers/books.controllers';
import verifyToken from '../auth/jwtAuthentication';

const bookRoutes = express.Router();

bookRoutes.post('/api/books', verifyToken, upload.single('bookFile'), createBook);
bookRoutes.get('/api/books', getAllBooks);
bookRoutes.get('/api/books/:id', getBookById);
bookRoutes.put('/api/books/:id', upload.single('bookFile'), modifyBookInfo);
bookRoutes.put('/api/books/:id/imageCover', upload.single('img'), uploadImageCover);

export default bookRoutes;
