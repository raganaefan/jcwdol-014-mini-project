import express from 'express';
import { register, login, user } from '../controllers/auth.controller';

const router = express.Router();

router.get('/user', user);
router.post('/register', register);
router.post('/login', login);

export const authRouter = router;
