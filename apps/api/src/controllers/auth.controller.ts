import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { compare, genSalt, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, role, referral } = req.body;

  const referralCode = Math.random().toString(36).substring(2, 10);
  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);
  // const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Check if the email is already registered
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        referral: referralCode,
      },
    });

    if (referral) {
      const referrer = await prisma.user.findUnique({ where: { referral } });
      if (referrer) {
        await prisma.referral.create({
          data: {
            referredBy: referrer.id,
            userId: user.id,
          },
        });
        await prisma.user.update({
          where: { id: referrer.id },
          data: {
            points: { increment: 10000 },
          },
        });
      }
    }

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).send({
        message: 'failed',
        data: 'invalid email or password',
      });
    }

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).send({
        message: 'failed',
        data: 'invalid email or password',
      });
    }

    const jwtPayload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user?.role,
    };
    const token = await sign(jwtPayload, 'SECRET_KEY', { expiresIn: '1h' });

    return res.status(200).send({
      message: 'success',
      data: user,
      token: token,
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

export const user = async (req: Request, res: Response) => {
  const userData = await prisma.user.findMany();

  return res.status(200).send(userData);
};
