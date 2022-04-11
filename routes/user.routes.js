import express from 'express';
import { createUser, login } from '../controllers/user.controllers';

const userRoutes = express.Router();

userRoutes.post('/api/users/signup', createUser);
userRoutes.post('/api/users/signin', login);

export default userRoutes;
