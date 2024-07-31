import express from 'express';
import { verifyToken } from '@/middleware/verifyToken';
import { OrganizerGuard } from '@/middleware/organizerGuard';
import {
  createReview,
  createTransaction,
  getTransactionsByOrganizerId,
  getTransactionsByUserId,
} from '@/controllers/transaction.controller';

const router = express.Router();

router.post('/event', verifyToken, createTransaction);
router.get(
  '/stats/:organizerId',
  verifyToken,
  OrganizerGuard,
  getTransactionsByOrganizerId,
);
router.get('/user-transaction/:id', verifyToken, getTransactionsByUserId);
router.post('/reviews', verifyToken, createReview);

export const transactionRouter = router;
