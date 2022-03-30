import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelizeConnection = () => new Sequelize('postgres://postgres:silas2001@localhost:5432/E-library');

export const db = {
  Sequelize,
  sequelize: sequelizeConnection,
};

export default sequelizeConnection;
