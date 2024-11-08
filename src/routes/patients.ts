import express from 'express';
import { NewPatient, NonSensitivePatientData, Patient } from '../types/types';
import { Response } from 'express';
import {
  addPatients,
  findById,
  getNonSensitivePatientData,
} from '../services/patientsServices';
import { toNewPatient } from '../utils';
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
patientsRouter.post('/', (req, res) => {
  console.log('POST: ', req.body);
  try {
    const newPatient: NewPatient = toNewPatient(req.body);
    const patient = addPatients(newPatient);
    res.json(patient);
  } catch {
    res.status(422).send({ error: 'Invalid patient data' });
    return;
  }
});

export { patientsRouter };
