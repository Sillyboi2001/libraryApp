import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import users from '../model/user';

export const createUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    users.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const user = { username: req.body.username };
    const token = jwt.sign(user, process.env.ACCESS_TOKEN);
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
  const user = await users.findOne({ where: { email } });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(user.username, process.env.ACCESS_TOKEN);
    res.status(200).json({ token });
  } else {
    res.status(404).send('Invalid Credentials');
  }
};
