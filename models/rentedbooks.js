import Sequelize from 'sequelize';
import { sequelize, Users } from './user';
import { books } from './book';

export const rentBook = (sequelize, DataTypes) => {
  class rentedbooks extends Sequelize.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  rentedbooks.init({
    bookReturned: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'rentedbooks',
  });
  rentedbooks.User = rentedbooks.belongsTo(Users(sequelize, DataTypes), { through: 'borrow', foreignKey: 'userId' });
  rentedbooks.books = rentedbooks.belongsTo(books(sequelize, DataTypes), { through: 'borrow', foreignKey: 'bookId' });
  return rentedbooks;
};

export const rentBooks = rentBook(sequelize, Sequelize.DataTypes);
