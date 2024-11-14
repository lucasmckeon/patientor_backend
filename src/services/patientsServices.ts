import { patientData } from '../../data/patient';
import {
  Patient,
  NonSensitivePatientData,
  NewPatient,
  Entry,
  NewEntry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from '../types/types';
import { v1 as uuid } from 'uuid';
import {
  assertNever,
  healthCheckEntrySchema,
  hospitalEntrySchema,
  occupationalHealthcareRatingSchema,
} from '../utils';
const getPatients = (): Patient[] => patientData;
const getNonSensitivePatientData = (): NonSensitivePatientData[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  });
};
const findById = (id: string): Patient | undefined =>
  patientData.find((p) => p.id === id);
const addPatients = (newPatient: NewPatient) => {
  const identifiedPatient = { ...newPatient, id: uuid(), entries: [] };
  patientData.push(identifiedPatient);
  return identifiedPatient;
};
const addEntryToPatient = (patientId: string, newEntry: NewEntry): Entry => {
  const patient = findById(patientId);
  switch (newEntry.type) {
    case 'HealthCheck': {
      const healthCheckEntry: HealthCheckEntry = healthCheckEntrySchema.parse({
        id: uuid(),
        ...newEntry,
      });
      patient?.entries.push(healthCheckEntry);
      return healthCheckEntry;
    }
    case 'Hospital': {
      const hospitalEntry: HospitalEntry = hospitalEntrySchema.parse({
        id: uuid(),
        ...newEntry,
      });
      patient?.entries.push(hospitalEntry);
      return hospitalEntry;
    }
    case 'OccupationalHealthcare': {
      const occupationalHealthcareEntry: OccupationalHealthcareEntry =
        occupationalHealthcareRatingSchema.parse({
          id: uuid(),
          ...newEntry,
        });
      patient?.entries.push(occupationalHealthcareEntry);
      return occupationalHealthcareEntry;
    }
    default:
      return assertNever(newEntry);
  }
};
export {
  getPatients,
  addPatients,
  getNonSensitivePatientData,
  findById,
  addEntryToPatient,
};
