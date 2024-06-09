import { v1 as uuid } from "uuid";

import patients from "../../../data/patients";

import { NonSensitivePatients, Patient, NewPatientEntry } from "../types";

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatients[] => {
  return patients.map(({ id, name, occupation, gender, dateOfBirth }) => ({
    id,
    name,
    occupation,
    gender,
    dateOfBirth,
  }));
};

const addPatient = (newPatientEntry: NewPatientEntry): Patient => {
  const newPatient: Patient = {
    ...newPatientEntry,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuid(),
  };

  patients.concat(newPatient);
  return newPatient;
};

export default { getNonSensitivePatients, getPatients, addPatient };
