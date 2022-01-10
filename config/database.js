import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelizeConnection = ({ password, database, username }) => new Sequelize({
  host: 'localhost',
  dialect: 'postgres',
  password,
  database,
  username,
});

export const db = {
  Sequelize,
  sequelize: sequelizeConnection,
};

export default sequelizeConnection;
