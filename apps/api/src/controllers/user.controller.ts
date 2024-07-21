import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findUserId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userData = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        points: true,
        referral: true,
        discountCoupon: {
          select: {
            id: true,
            discount: true,
            expiredAt: true,
            createdAt: true,
          },
        },
      },
    });

    return res.status(200).json({ ok: true, message: 'User found!', userData });
  } catch (error) {}
};
