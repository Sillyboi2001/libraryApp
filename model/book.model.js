import { Sequelize } from 'sequelize';
import sequelizeConnection from '../config/database';

const { USER, DATABASE, PASSWORD } = process.env;
const sequelize = sequelizeConnection({
  username: USER, database: DATABASE, password: PASSWORD,
});

const books = sequelize.define('books', {
  title: Sequelize.STRING,
  price: Sequelize.STRING,
  coverImageUrl: Sequelize.STRING,
  author: Sequelize.STRING,
});

(async () => {
  await sequelize.sync({ force: true });
})();

export default books;
