import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Sequelize from 'sequelize';
import sequelizeConnection from '../config/database';
import UserModel from '../models/user';

const { USER, DATABASE, PASSWORD } = process.env;

export const sequelize = sequelizeConnection({
  username: USER, database: DATABASE, password: PASSWORD,
});

const user = UserModel(sequelize, Sequelize.DataTypes);

export const createUser = async (req, res) => {
  try {
    const oldUser = await user.findOne({ where: { email: req.body.email } });
    if (oldUser) {
      res.status(409).send('User Already Exist. Please Login');
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = await user.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const payload = { username: newUser.username, id: newUser.id };
    const token = jwt.sign(payload, process.env.SECRET_KEY);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).send('Failed to create new user');
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    res.status(400).send('User input required');
  }
  const result = await user.findOne({ where: { email } });
  if (result && await bcrypt.compare(password, result.password)) {
    const { username, id } = result;
    const token = jwt.sign({ username, id }, process.env.SECRET_KEY);
    res.status(200).json({ token });
  } else {
    res.status(404).json('Invalid Credentials');
  }
};
