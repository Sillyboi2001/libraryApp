import { Sequelize } from 'sequelize';
import sequelizeConnection from '../config/database';

const { USERNAME, DATABASE, PASSWORD } = process.env;

export const sequelize = sequelizeConnection({
  username: USERNAME, database: DATABASE, password: PASSWORD,
});

export const Users = (sequelize, DataTypes) => {
  class User extends Sequelize.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

export const user = Users(sequelize, Sequelize.DataTypes);
