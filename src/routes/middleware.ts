import { NextFunction, Request, Response } from 'express';
import { newPatientSchema } from '../utils';
import { z } from 'zod';

const newPatientMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(422).send({ error: error.issues });
  } else {
    next(error);
  }
};

export { newPatientMiddleware, errorMiddleware };
