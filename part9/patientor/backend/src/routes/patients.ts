import express from "express";
import patientsService from "../services/patientsService";
import toNewPatientEntry from "../utils";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
  res.json(patientsService.getNonSensitivePatients());
});

patientsRouter.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatientEntry = patientsService.addPatient(newPatientEntry);
    res.json(addedPatientEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
  //   const { name, occupation, gender, ssn, dateOfBirth } = req.body;
  //   const newPatientEntry = patientsService.addPatient({
  //     name,
  //     occupation,
  //     gender,
  //     ssn,
  //     dateOfBirth,
  //   });

  //   res.json(newPatientEntry);
});

export default patientsRouter;
