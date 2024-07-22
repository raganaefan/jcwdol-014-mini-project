import { Role } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

export async function OrganizerGuard(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.user.role !== Role.ORGANIZER) {
    return res.status(401).send('Unauthorized');
  }

  next();
}
