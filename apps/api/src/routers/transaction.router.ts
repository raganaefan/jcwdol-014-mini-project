import express from 'express';
import { verifyToken } from '@/middleware/verifyToken';
import { OrganizerGuard } from '@/middleware/organizerGuard';
import {
  createTransaction,
  getTransactionsByOrganizerId,
} from '@/controllers/transaction.controller';

const router = express.Router();

router.post('/event', verifyToken, createTransaction);
router.get(
  '/stats/:organizerId',
  verifyToken,
  OrganizerGuard,
  getTransactionsByOrganizerId,
);

export const transactionRouter = router;
