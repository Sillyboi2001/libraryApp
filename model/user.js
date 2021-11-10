import { Sequelize } from 'sequelize';
import sequelizeConnection from '../config/database';

const { USER, DATABASE, PASSWORD } = process.env;
const sequelize = sequelizeConnection({
  username: USER, database: DATABASE, password: PASSWORD,
});

const users = sequelize.define('users', {
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
});

(async () => {
  await sequelize.sync({ force: true });
  // Code here
})();

export default users;
