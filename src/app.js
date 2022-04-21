import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import sequelizeConnection from '../src/config/database';
import userRoutes from '../src/routes/user.routes';
import bookRoutes from '../src/routes/books.routes';

dotenv.config();

export const sequelize = sequelizeConnection();
const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(userRoutes);
app.use(bookRoutes);

app.get('/', (req, res) => res.status(200).json({ message: 'Welcome to rent book Api' }));

export default app;
