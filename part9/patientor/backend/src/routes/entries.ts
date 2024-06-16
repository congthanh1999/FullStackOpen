import express from "express";
import patientsService from "../services/patientsService";
import utils from "../utils";

const entriesRouter = express.Router();

entriesRouter.get("/:id/entries", (req, res) => {
  const patient = patientsService.getPatient(req.params.id);
  res.json(patient?.entries);
});

entriesRouter.post("/:id/entries", (req, res) => {
  try {
    const newEntry = utils.toNewEntry(req.body);
    const addedEntry = patientsService.addEntry(newEntry, req.params.id);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage: string = "something is wrong";
    if (error instanceof Error) {
      errorMessage += "Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default entriesRouter;
