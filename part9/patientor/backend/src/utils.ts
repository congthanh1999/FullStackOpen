import {
  BaseEntryWithoutId,
  Diagnosis,
  EntryWithoutId,
  Gender,
  HealthCheckRating,
  HospitalEntry,
  NewPatientEntry,
  SickLeave,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isNumber = (number: unknown): number is number => {
  return typeof number === "number" || number instanceof Number;
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
    throw new Error("Incorrect or missing name");
  }

  return name;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation) || !occupation) {
    throw new Error("Incorrect or missing occupation");
  }

  return occupation;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn) || !ssn) {
    throw new Error("Incorrect or missing ssn");
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
    throw new Error("incorrect gender" + gender);
  }

  return gender;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatientEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: [],
    };

    return newPatientEntry;
  }

  throw new Error("Incorrect data: a field missing");
};

const parseDescription = (desc: unknown): string => {
  if (!desc || !isString(desc)) {
    throw new Error("Incorrect or missing description");
  }

  return desc;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }

  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((v) => v)
    .includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!isNumber(rating) || !isHealthCheckRating(rating)) {
    throw new Error("incorrect or missing healthCheckRating");
  }

  return rating;
};

const parseEmployerName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing employerName");
  }

  return name;
};

const isSickLeave = (object: object): object is SickLeave => {
  return "startDate" in object && "endDate" in object;
};

const parseSickLeave = (object: unknown): SickLeave => {
  if (
    !object ||
    !isSickLeave(object) ||
    !("startDate" in object) ||
    !("endDate" in object)
  ) {
    throw new Error("Incorrect or missing sickLeave");
  }

  return {
    startDate: parseDate(object.startDate),
    endDate: parseDate(object.endDate),
  };
};

const isDischarge = (
  discharge: object
): discharge is HospitalEntry["discharge"] => {
  return "date" in discharge && "criteria" in discharge;
};

const parseDischarge = (discharge: unknown): HospitalEntry["discharge"] => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error("incorrect or missing discharge");
  }

  return discharge;
};

const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing object");
  }

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "diagnosisCodes" in object
  ) {
    const newBaseEntry: BaseEntryWithoutId = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object),
    };

    let newEntry: EntryWithoutId;

    if ("healthCheckRating" in object) {
      newEntry = {
        ...newBaseEntry,
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };

      return newEntry;
    }

    if ("employerName" in object && "sickLeave" in object) {
      newEntry = {
        ...newBaseEntry,
        type: "OccupationalHealthcare",
        employerName: parseEmployerName(object.employerName),
        sickLeave: parseSickLeave(object.sickLeave),
      };

      return newEntry;
    }

    if ("discharge" in object) {
      newEntry = {
        ...newBaseEntry,
        type: "Hospital",
        discharge: parseDischarge(object.discharge),
      };

      return newEntry;
    }
  }

  throw new Error("Incorrect data: a field missing");
};

export default { toNewPatientEntry, toNewEntry };
