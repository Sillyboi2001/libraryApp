"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.user = exports.sequelize = exports.Users = void 0;

var _sequelize = require("sequelize");

var _database = _interopRequireDefault(require("../config/database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sequelize = (0, _database.default)();
exports.sequelize = sequelize;

const Users = (sequelize, DataTypes) => {
  class User extends _sequelize.Sequelize.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {// define association here
    }

  }

  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User'
  });
  return User;
};

exports.Users = Users;
const user = Users(sequelize, _sequelize.Sequelize.DataTypes);
exports.user = user;