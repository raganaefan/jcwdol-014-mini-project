import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

export const getTransactionsByOrganizerId = async (
  req: Request,
  res: Response,
) => {
  const { organizerId } = req.params;

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        Event: {
          organizerId: Number(organizerId),
        },
      },
      select: {
        amount: true,
        createdAt: true,
        Event: {
          select: {
            organizerId: true,
            eventName: true,
            category: true,
          },
        },
        User: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    if (transactions.length === 0) {
      return res
        .status(404)
        .json({ message: 'No transactions found for this organizer.' });
    }

    return res.status(200).json({ data: transactions });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

export const getTransactionsByUserId = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: Number(id),
      },
      select: {
        amount: true,
        createdAt: true,
        Event: {
          select: {
            eventName: true,
            description: true,
            category: true,
            location: true,
            id: true,
          },
        },
        User: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    if (transactions.length === 0) {
      return res
        .status(404)
        .json({ message: 'No transactions found for this user.' });
    }

    return res.status(200).json({ data: transactions });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

export const createReview = async (req: Request, res: Response) => {
  const { eventId, rating, comment } = req.body;
  const userId = (req as any).user.id;

  if (!eventId || rating === undefined || !comment) {
    return res
      .status(400)
      .json({ message: 'Event ID, rating, and comment are required' });
  }

  try {
    const review = await prisma.review.create({
      data: {
        userId,
        eventId,
        rating,
        comment,
      },
    });
    return res.status(201).json({ ok: true, data: review });
  } catch (error) {
    console.error('Error creating review:', error);
    return res
      .status(500)
      .json({ ok: false, message: 'Internal server error' });
  }
};

export const getReviewsByEventId = async (req: Request, res: Response) => {
  const { eventId } = req.params;

  try {
    const reviews = await prisma.review.findMany({
      where: {
        eventId: Number(eventId),
      },
      include: {
        User: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (reviews.length === 0) {
      return res
        .status(404)
        .json({ message: 'No reviews found for this event' });
    }

    return res.status(200).json({ ok: true, data: reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return res
      .status(500)
      .json({ ok: false, message: 'Internal server error' });
  }
};

export const getReviewsByUserId = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;

  try {
    const reviews = await prisma.review.findMany({
      where: {
        userId: Number(userId),
      },
      include: {
        Event: {
          select: {
            eventName: true,
          },
        },
      },
    });

    if (reviews.length === 0) {
      return res
        .status(404)
        .json({ message: 'No reviews found for this user' });
    }

    return res.status(200).json({ ok: true, data: reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return res
      .status(500)
      .json({ ok: false, message: 'Internal server error' });
  }
};
