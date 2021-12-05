import { Sequelize } from 'sequelize';
import sequelizeConnection from '../config/database';

const { USER, DATABASE, PASSWORD } = process.env;
const sequelize = sequelizeConnection({
  username: USER, database: DATABASE, password: PASSWORD,
});

export const users = sequelize.define('users', {
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
});

export const books = sequelize.define('books', {
  title: Sequelize.STRING,
  price: Sequelize.STRING,
  coverImageUrl: Sequelize.STRING,
  author: Sequelize.STRING,
});

users.belongsToMany(books, { through: 'bookUsers' });
books.belongsToMany(users, { through: 'bookUsers' });

(async () => {
  await sequelize.sync({ force: true });
})();
