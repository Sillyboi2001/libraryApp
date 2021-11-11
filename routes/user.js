import express from 'express';
import bodyParser from 'body-parser';
import { createUser, login } from '../controllers/routes.controllers';

const router = express.Router();
router.use(bodyParser.json());

router.post('/register', createUser);
router.post('/login', login);

export default router;
