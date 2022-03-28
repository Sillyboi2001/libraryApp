"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.books = exports.Book = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _user = require("./user");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const books = (sequelize, DataTypes) => {
  class Book extends _sequelize.default.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {// define association here
    }

  }

  Book.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    author: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    price: DataTypes.STRING,
    fileUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Book'
  });
  Book.User = Book.belongsTo((0, _user.Users)(sequelize, DataTypes), {
    foreignKey: 'userId'
  });
  return Book;
};

exports.books = books;
const Book = books(_user.sequelize, _sequelize.default.DataTypes);
exports.Book = Book;