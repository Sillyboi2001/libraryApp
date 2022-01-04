import Sequelize from 'sequelize';
import User from './user';

export default (sequelize, DataTypes) => {
  class Book extends Sequelize.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Book.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    author: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    price: DataTypes.STRING,
    fileUrl: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Book',
  });
  Book.User = Book.belongsTo(User(sequelize, DataTypes), { foreignKey: 'userId' });
  return Book;
};
