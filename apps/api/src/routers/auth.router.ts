import express from 'express';
import { register, login, user, logout } from '../controllers/auth.controller';

const router = express.Router();

router.get('/user', user);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

export const authRouter = router;
