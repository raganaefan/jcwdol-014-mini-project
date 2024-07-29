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
