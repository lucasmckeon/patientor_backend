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

type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
};

type NewPatient = Omit<Patient, 'id'>;

type NonSensitivePatientData = Omit<Patient, 'ssn'>;

export { Diagnosis, Patient, NonSensitivePatientData, NewPatient, Gender };
