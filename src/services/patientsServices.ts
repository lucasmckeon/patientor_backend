import { patientData } from '../../data/patient';
import { Patient, NonSensitivePatientData, NewPatient } from '../types/types';
import { v1 as uuid } from 'uuid';
const getPatients = (): Patient[] => patientData;
const getNonSensitivePatientData = (): NonSensitivePatientData[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  });
};
const findById = (id: string): Patient | undefined =>
  patientData.find((p) => p.id === id);
const addPatients = (newPatient: NewPatient) => {
  const identifiedPatient = { ...newPatient, id: uuid() };
  patientData.push(identifiedPatient);
  return identifiedPatient;
};

export { getPatients, addPatients, getNonSensitivePatientData, findById };
