import express from "express";
import patientsService from "../services/patientsService";

const entriesRouter = express.Router();

entriesRouter.get("/:id/entries", (req, res) => {
  const patient = patientsService.getPatient(req.params.id);
  res.json(patient?.entries);
});

// entriesRouter.post("/:id/entries", (req, res)=>{

// })

export default entriesRouter;
