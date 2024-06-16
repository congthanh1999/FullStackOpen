import express from "express";
import patientsService from "../services/patientsService";
import utils from "../utils";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
  res.json(
    patientsService.getPatients() || patientsService.getNonSensitivePatients()
  );
});

patientsRouter.get("/:id", (req, res) => {
  const patient = patientsService.getPatient(req.params.id.toString());
  res.json(patient);
});

patientsRouter.post("/", (req, res) => {
  try {
    const newPatientEntry = utils.toNewPatientEntry(req.body);
    const addedPatientEntry = patientsService.addPatient(newPatientEntry);
    res.json(addedPatientEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default patientsRouter;
