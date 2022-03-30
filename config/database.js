import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelizeConnection = () => new Sequelize(process.env.DATABASE_URL1, { dialect: process.env.DIALECT});

export const db = {
  Sequelize,
  sequelize: sequelizeConnection,
};

export default sequelizeConnection;
