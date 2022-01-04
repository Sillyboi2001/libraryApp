import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) { res.status(401).send('Invalid login'); }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) { res.status(403).send('Invalid token'); }
    req.user = user;
    next();
  });
};

export default verifyToken;
