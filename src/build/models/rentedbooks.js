"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rentBooks = exports.rentBook = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _user = require("./user");

var _book = require("./book");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const rentBook = (sequelize, DataTypes) => {
  class rentedbooks extends _sequelize.default.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {// define association here
    }

  }

  ;
  rentedbooks.init({
    bookReturned: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'rentedbooks'
  });
  rentedbooks.User = rentedbooks.belongsTo((0, _user.Users)(sequelize, DataTypes), {
    through: 'borrow',
    foreignKey: 'userId'
  });
  rentedbooks.books = rentedbooks.belongsTo((0, _book.books)(sequelize, DataTypes), {
    through: 'borrow',
    foreignKey: 'bookId'
  });
  return rentedbooks;
};

exports.rentBook = rentBook;
const rentBooks = rentBook(_user.sequelize, _sequelize.default.DataTypes);
exports.rentBooks = rentBooks;