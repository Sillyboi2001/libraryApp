import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = ({ password, database, username }) => {
  try {
    const connection = new Sequelize({
      host: 'localhost',
      dialect: 'postgres',
      password,
      database,
      username,
    });
    connection.authenticate();
    console.log('Connection has been established successfully');
  } catch (error) {
    console.log('Unable to connect to the database:', error);
  }
};

export default sequelize;
