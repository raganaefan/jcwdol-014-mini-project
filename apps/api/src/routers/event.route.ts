import express from 'express';
import { createEvent, getEvents } from '@/controllers/event.controller';
import { verifyToken } from '@/middleware/verifyToken';
import { OrganizerGuard } from '@/middleware/organizerGuard';

const router = express.Router();

router.post('/', verifyToken, OrganizerGuard, createEvent);
router.get('/', verifyToken, getEvents);

export const eventRouter = router;
