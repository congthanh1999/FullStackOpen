import { Patient, Diagnosis } from "../../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import EntryList from "./EntryList";
import Entryform from "./Entryform";
import { Entry } from "../../types";
import { useState } from "react";

interface Props {
  patient: Patient;
  diagnoses: Diagnosis[];
}

const PatientDetails = (props: Props) => {
  const [patientEntry, setPatientEntries] = useState<Entry[]>(
    props.patient.entries
  );

  if (!props.patient) return <div>patient not found</div>;

  return (
    <div>
      <Entryform
        patient={props.patient}
        diagnoses={props.diagnoses}
        setPatientEntries={setPatientEntries}
      />
      <div>
        <h2>
          {props.patient.name}{" "}
          {props.patient.gender.toString() === "male" ? (
            <MaleIcon />
          ) : (
            <FemaleIcon />
          )}
        </h2>
        <div>ssn: {props.patient.ssn}</div>
        <div>occupation: {props.patient.occupation}</div>
      </div>
      <div>
        <h3>entries</h3>
        <EntryList entries={patientEntry} />
      </div>
    </div>
  );
};

export default PatientDetails;
