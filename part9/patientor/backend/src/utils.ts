import { Gender, NewPatientEntry } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseName = (name: unknown): string => {
  if (!isString(name) || !name) {
    throw new Error("Incorrect for missing name");
  }

  return name;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation) || !occupation) {
    throw new Error("Incorrect for missing occupation");
  }

  return occupation;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn) || !ssn) {
    throw new Error("Incorrect for missing ssn");
  }

  return ssn;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("incorrect or missing date");
  }

  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("incorrect gender");
  }

  return gender;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  //   console.log(object);
  //   const newPatientEntry: NewPatientEntry = {
  //     name: "thanh",
  //     occupation: "SE",
  //     gender: "male",
  //     ssn: "1234557",
  //     dateOfBirth: "1999-02-10",
  //   };
  if (!object || typeof object !== "object") {
    throw new Error("incorrect or missing object");
  }

  if (
    "name" in object &&
    "dateObBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatientEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateObBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };

    return newPatientEntry;
  }

  throw new Error("Incorrect data: a field missing");
};

export default toNewPatientEntry;
