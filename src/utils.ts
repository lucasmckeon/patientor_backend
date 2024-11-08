import { NewPatient, Gender, Patient } from './types/types';

const toPatient = (data: unknown): Patient => {
  if (!data || typeof data !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if (
    'id' in data &&
    'name' in data &&
    'dateOfBirth' in data &&
    'ssn' in data &&
    'gender' in data &&
    'occupation' in data
  ) {
    return {
      id: parseId(data.id),
      name: parseName(data.name),
      dateOfBirth: parseDate(data.dateOfBirth),
      ssn: parseSsn(data.ssn),
      gender: parseGender(data.gender),
      occupation: parseOccupation(data.occupation),
    };
  }
  throw Error('Missing fields');
};

const toNewPatient = (data: unknown): NewPatient => {
  if (!data || typeof data !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if (
    'name' in data &&
    'dateOfBirth' in data &&
    'ssn' in data &&
    'gender' in data &&
    'occupation' in data
  ) {
    return {
      name: parseName(data.name),
      dateOfBirth: parseDate(data.dateOfBirth),
      ssn: parseSsn(data.ssn),
      gender: parseGender(data.gender),
      occupation: parseOccupation(data.occupation),
    };
  }
  throw Error('Missing fields');
};
const parseId = (text: unknown): string => {
  if (!text || !isString(text)) throw Error('Id must be a string');
  return text;
};
const parseName = (text: unknown): string => {
  if (!text || !isString(text)) throw Error('Name must be a string');
  return text;
};
const parseDate = (text: unknown): string => {
  if (!text || !isString(text) || !isDate(text)) throw Error('Invalid date');
  return text;
};

const isGender = (text: string): text is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(text);
};

const parseGender = (text: unknown): Gender => {
  if (!text || !isString(text) || !isGender(text)) throw Error('Invalid date');
  return text;
};
const parseSsn = (text: unknown): string => {
  if (!text || !isString(text)) throw Error('SSN must be a string');
  return text;
};

const parseOccupation = (text: unknown): string => {
  if (!text || !isString(text)) throw Error('Occupation must be a string');
  return text;
};

const isDate = (text: unknown): text is Date => {
  return isString(text) && !isNaN(new Date(text).getTime());
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string';
};

export { toNewPatient, toPatient };
