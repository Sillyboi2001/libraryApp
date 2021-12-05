import express from 'express';
import { upload, fileUpload, findAll, findById, modifyBookInfo } from '../controllers/books.controllers';

const bookRoutes = express.Router();

bookRoutes.post('/api/books', upload.single('img'), fileUpload);
bookRoutes.get('/api/books', findAll);
bookRoutes.get('/api/books/:id', findById);
bookRoutes.put('/api/books/:id', modifyBookInfo);

export default bookRoutes;
