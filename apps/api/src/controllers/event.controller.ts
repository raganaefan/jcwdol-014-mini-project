import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createEvent = async (req: Request, res: Response) => {
  const {
    eventName,
    description,
    price,
    date,
    organizerId,
    location,
    time,
    availSeats,
    category,
    imageUrl,
  } = req.body;

  try {
    const event = await prisma.event.create({
      data: {
        eventName,
        description,
        price,
        date: new Date(date),
        location,
        time,
        availSeats,
        category,
        imageUrl, // Ensure this is correctly set
        organizer: {
          connect: { id: Number(organizerId) },
        },
      },
    });

    res.status(201).json({ ok: true, data: event });
  } catch (error: any) {
    console.error('Error creating event:', error);
    res.status(500).json({
      ok: false,
      message: 'Failed to create event',
      error: error.message,
    });
  }
};

export const uploadImage = (
  req: Request & { file?: Express.Multer.File },
  res: Response,
) => {
  if (!req.file) {
    return res.status(400).json({ ok: false, message: 'No file uploaded' });
  }

  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  console.log('Image uploaded:', imageUrl); // Add this line for debugging
  res.status(200).json({ ok: true, url: imageUrl });
};

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany();
    return res.status(200).send({ ok: true, message: 'success', data: events });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  const { eventId, amount } = req.body;
  const userId = req.user.id as number;

  try {
    const transaction = await prisma.transaction.create({
      data: {
        eventId,
        userId,
        amount,
      },
    });
    res.status(201).json({ ok: true, data: transaction });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getEventsByOrganizerId = async (req: Request, res: Response) => {
  const { organizerId } = req.params;

  try {
    const events = await prisma.event.findMany({
      where: {
        organizerId: Number(organizerId),
      },
    });

    if (events.length === 0) {
      return res
        .status(404)
        .json({ message: 'No events found for this organizer.' });
    }

    return res.status(200).json({ data: events });
  } catch (error) {
    console.error('Error fetching events:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

export const getEventsById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const events = await prisma.event.findUnique({ where: { id: Number(id) } });

    if (!events) {
      return res.status(404).json({ message: 'No events found' });
    }

    return res.status(200).json({ data: events });
  } catch (error) {
    console.error('Error fetching events:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const eventData = req.body;

  try {
    const updatedEvent = await prisma.event.update({
      where: { id: Number(id) },
      data: eventData,
    });
    res.status(200).json(updatedEvent);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
