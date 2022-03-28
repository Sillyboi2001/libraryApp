import express from 'express';
import {
  upload, createBook, modifyBookInfo, getAllBooks, getBookById, uploadImageCover,
  rentBook, returnBook, bookNotReturned, deleteBook,
} from '../controllers/books.controllers';
import verifyToken from '../auth/jwtAuthentication';

const bookRoutes = express.Router();

bookRoutes.post('/api/books', upload.single('bookFile'), verifyToken, createBook);
bookRoutes.get('/api/books', verifyToken, getAllBooks);
bookRoutes.get('/api/books/:id', verifyToken, getBookById);
bookRoutes.put('/api/books/:id', upload.single('bookFile'), verifyToken, modifyBookInfo);
bookRoutes.put('/api/books/:id/imageCover', upload.single('img'), verifyToken, uploadImageCover);
bookRoutes.post('/api/users/:userId/books', verifyToken, rentBook);
bookRoutes.put('/api/users/:userId/books', verifyToken, returnBook);
bookRoutes.get('/api/users/:userId/books', verifyToken, bookNotReturned);
bookRoutes.delete('/api/books/:id', verifyToken, deleteBook);

export default bookRoutes;
