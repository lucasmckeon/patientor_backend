import express from 'express';
import { Diagnosis } from '../types/types';
import { Response } from 'express';
import diagnoses from '../../data/diagnoses';
const diagnosesRouter = express.Router();
diagnosesRouter.get('/', (_req, res: Response<Diagnosis[]>) => {
  res.json(diagnoses);
});
export { diagnosesRouter };
