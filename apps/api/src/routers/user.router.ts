import express from 'express';
import { findUserId } from '@/controllers/user.controller';
import { verifyToken } from '@/middleware/verifyToken';

const router = express.Router();

router.get('/:id', verifyToken, findUserId);

export const userRouter = router;
