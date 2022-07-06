import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelizeConnection = () => new Sequelize(process.env.DATABASE_URL);

export const db = {
  Sequelize,
  sequelize: sequelizeConnection,
};

export default sequelizeConnection;
