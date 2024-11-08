import { newPatientSchema, patientSchema } from '../utils';
import { z } from 'zod';
type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

enum Gender {
  male = 'male',
  female = 'female',
  other = 'other',
}

type Patient = z.infer<typeof patientSchema>;
type NewPatient = z.infer<typeof newPatientSchema>;
type NonSensitivePatientData = Omit<Patient, 'ssn'>;

export { Diagnosis, Patient, NonSensitivePatientData, NewPatient, Gender };
