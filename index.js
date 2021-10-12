import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database';

dotenv.config();
const { USER, DATABASE, PASSWORD } = process.env;
sequelize({ username: USER, database: DATABASE, password: PASSWORD });

const app = express();
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
