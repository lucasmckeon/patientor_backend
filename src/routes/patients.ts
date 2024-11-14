import express, { Request } from 'express';
import {
  Entry,
  NewEntry,
  NewPatient,
  NonSensitivePatientData,
  Patient,
} from '../types/types';
import { Response } from 'express';
import {
  addEntryToPatient,
  addPatients,
  findById,
  getNonSensitivePatientData,
} from '../services/patientsServices';
import { newPatientMiddleware } from './middleware';

const patientsRouter = express.Router();
patientsRouter.get('/', (_req, res: Response<NonSensitivePatientData[]>) => {
  res.json(getNonSensitivePatientData());
});
patientsRouter.get('/:id', (req, res: Response<Patient>) => {
  const id = req.params.id;
  const patient = findById(id);
  if (patient) res.json(patient);
  else res.sendStatus(404);
});
patientsRouter.post(
  '/',
  newPatientMiddleware,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    console.log('POST: ', req.body);
    const newPatient: NewPatient = req.body;
    const patient = addPatients(newPatient);
    res.json(patient);
  }
);

patientsRouter.post(
  '/:id/entries',
  (req: Request<{ id: string }, unknown, NewEntry>, res: Response<Entry>) => {
    const id = req.params.id;
    const entry = addEntryToPatient(id, req.body);
    res.json(entry);
  }
);

export { patientsRouter };
