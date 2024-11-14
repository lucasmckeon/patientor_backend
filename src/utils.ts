import { Gender } from './types/types';
import { z } from 'zod';

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

const baseEntrySchema = z.object({
  id: z.string(),
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const healthCheckEntrySchema = baseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

const occupationalHealthcareRatingSchema = baseEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  sickLeave: z
    .object({
      startDate: z.string(),
      endDate: z.string(),
    })
    .optional(),
  employerName: z.string(),
});

const hospitalEntrySchema = baseEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: z.object({
    date: z.string(),
    criteria: z.string(),
  }),
});

const entrySchema = z.union([
  healthCheckEntrySchema,
  occupationalHealthcareRatingSchema,
  hospitalEntrySchema,
]);

const patientSchema = z.object({
  id: z.string(),
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(entrySchema).default([]),
});

const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

const assertNever = (value: never) => {
  throw new Error(`Unexpected value: ${value}`);
};

export {
  newPatientSchema,
  patientSchema,
  entrySchema,
  healthCheckEntrySchema,
  occupationalHealthcareRatingSchema,
  hospitalEntrySchema,
  assertNever,
};
