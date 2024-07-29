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

export default async function getPointDiscount(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }

  try {
    const now = new Date();

    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        discountCoupon: {
          where: {
            expiredAt: {
              gt: now,
            },
          },
        },
        PointHistory: {
          where: {
            expiredAt: {
              gt: now,
            },
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const totalDiscount = user.discountCoupon.reduce(
      (acc, coupon) => acc + coupon.discount,
      0,
    );
    const totalPoints = user.PointHistory.reduce(
      (acc, point) => acc + point.points,
      0,
    );

    res.status(200).json({ totalDiscount, totalPoints });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
