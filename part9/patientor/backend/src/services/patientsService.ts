import { v1 as uuid } from "uuid";

import patients from "../../../data/patients";

import { NonSensitivePatient, Patient, NewPatientEntry } from "../types";

const getPatients = (): Patient[] => {
  return patients;
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find(
    (patient) => patient.id.toString() === id.toString()
  );
  return patient;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(
    ({ id, name, occupation, gender, dateOfBirth, entries }) => ({
      id,
      name,
      occupation,
      gender,
      dateOfBirth,
      entries,
    })
  );
};

const getPatient = (id: string): Patient | undefined => {
  return findById(id);
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

export default { getNonSensitivePatients, getPatients, addPatient, getPatient };
