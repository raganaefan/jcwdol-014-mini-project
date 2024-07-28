import express from 'express';
import {
  createEvent,
  createTransaction,
  getEvents,
  getEventsById,
  getEventsByOrganizerId,
  updateEvent,
  uploadImage,
} from '@/controllers/event.controller';
import { verifyToken } from '@/middleware/verifyToken';
import { OrganizerGuard } from '@/middleware/organizerGuard';
import { uploader } from '@/middleware/uploader';

const router = express.Router();

const upload = uploader('file-', 'uploads/');

router.get('/', getEvents);
router.get(
  '/organizer/:organizerId',
  verifyToken,
  OrganizerGuard,
  getEventsByOrganizerId,
);
router.post('/', verifyToken, OrganizerGuard, createEvent);
router.post('/transaction', verifyToken, createTransaction);
router.post('/upload', upload.single('file'), uploadImage);
router.get('/:id', verifyToken, getEventsById);
router.put('/update/:id', updateEvent);

export const eventRouter = router;
