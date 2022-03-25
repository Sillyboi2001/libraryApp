import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import sequelizeConnection from './config/database';
import userRoutes from './routes/user.routes';
import bookRoutes from './routes/books.routes';

dotenv.config();

const { USERNAME, DATABASE, PASSWORD } = process.env;
export const sequelize = sequelizeConnection({
  username: USERNAME, database: DATABASE, password: PASSWORD,
});
const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(userRoutes);
app.use(bookRoutes);

export default app;
