import express from 'express';
import getPointDiscount, { findUserId } from '@/controllers/user.controller';
import { verifyToken } from '@/middleware/verifyToken';

const router = express.Router();

router.get('/:id', verifyToken, findUserId);
router.get('/getDiscountAndPoints/:id', getPointDiscount);

export const userRouter = router;
