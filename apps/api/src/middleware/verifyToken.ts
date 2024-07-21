import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user: {
        id: Number;
        email: string;
      };
    }
  }
}

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authorizationHeader = req.headers['authorization'];
  if (!authorizationHeader) {
    return res.status(401).send('Unauthorized');
  }

  const token = authorizationHeader.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const verifiedUser = jwt.verify(token, 'SECRET_KEY') as JwtPayload & {
      id: Number;
      email: string;
    };

    if (!verifiedUser) {
      return res.status(401).send('Unauthorized');
    }

    req.user = {
      id: verifiedUser.id,
      email: verifiedUser.email,
    };

    next();
  } catch (error) {
    return res.status(401).send('Unauthorized');
  }
}
