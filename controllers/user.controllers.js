import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { user } from '../models/user';

export const createUser = async (req, res) => {
  try {
    const oldUser = await user.findOne({ where: { email: req.body.email } });
    if (oldUser) {
      return res.status(409).send('User Already Exist. Please Login');
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
    return res.status(200).json({
      token,
      message: 'User created Successfully',
    });
  } catch (err) {
    return res.status(500).send('Failed to create new user');
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    return res.status(400).send('User input required');
  }
  const result = await user.findOne({ where: { email } });
  const comparePassword = await bcrypt.compare(password, result.password);
  if (result && comparePassword) {
    const { username, id } = result;
    const token = jwt.sign({ username, id }, process.env.SECRET_KEY);
    return res.status(200).json({
      token,
      message: 'Login successful',
    });
  }
  return res.status(404).json('Invalid Credentials');
};

export const checkValidUser = (res, userData) => {
  if (Number(userData.userId) !== Number(userData.newId)) {
    return res.status(400).json('Invalid user id supplied');
  }
};
