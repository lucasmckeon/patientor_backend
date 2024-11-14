import {
  entrySchema,
  healthCheckEntrySchema,
  hospitalEntrySchema,
  newPatientSchema,
  occupationalHealthcareRatingSchema,
  patientSchema,
} from '../utils';
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
type NonSensitivePatientData = Omit<Patient, 'ssn' | 'entries'>;
type Entry = z.infer<typeof entrySchema>;
type HealthCheckEntry = z.infer<typeof healthCheckEntrySchema>;
type OccupationalHealthcareEntry = z.infer<
  typeof occupationalHealthcareRatingSchema
>;
type HospitalEntry = z.infer<typeof hospitalEntrySchema>;
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

type NewEntry = UnionOmit<Entry, 'id'>;
export {
  Diagnosis,
  Patient,
  NonSensitivePatientData,
  NewPatient,
  Gender,
  Entry,
  NewEntry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  HospitalEntry,
};
