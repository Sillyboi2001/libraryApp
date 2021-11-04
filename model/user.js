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

export default users;
