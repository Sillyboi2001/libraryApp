import express from 'express';
import dotenv from 'dotenv';
import sequelizeConnection from './config/database';
import router from './routes/user';

dotenv.config();

const { USER, DATABASE, PASSWORD } = process.env;
export const sequelize = sequelizeConnection({
  username: USER, database: DATABASE, password: PASSWORD,
});
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

export default app;
