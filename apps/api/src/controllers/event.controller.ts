import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createEvent = async (req: Request, res: Response) => {
  const { eventName, description, price, date, organizerId } = req.body;

  try {
    const events = await prisma.event.create({
      data: {
        eventName,
        description,
        price,
        date,
        organizer: {
          connect: { id: organizerId },
        },
      },
    });
  } catch (error) {
    console.error(error);
  }
};
export const getEvents = async (req: Request, res: Response) => {
  const { organizerId } = req.params;

  try {
    const events = await prisma.event.findMany({
      where: { organizerId: parseInt(organizerId) },
      include: {
        Attendee: true,
        Transaction: true,
      },
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getEventStatistics = async (req: Request, res: Response) => {
  const { organizerId, range } = req.params;

  try {
    const events = await prisma.event.findMany({
      where: { organizerId: parseInt(organizerId) },
      include: {
        Attendee: true,
        Transaction: true,
      },
    });

    const statistics = calculateStatistics(events, range);
    res.json(statistics);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

const calculateStatistics = (events: any[], range: string) => {
  // Implement your logic to calculate statistics based on the range (year, month, day)
  // Return the statistics in a format suitable for graph visualization
  // Example: [{ date: '2023-01-01', attendees: 10, transactions: 1000 }, ...]
  return [];
};
