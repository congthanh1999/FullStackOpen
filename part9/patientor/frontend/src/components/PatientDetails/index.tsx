import { Patient, Diagnosis } from "../../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import EntryList from "./EntryList";
import Entryform from "./Entryform";

interface Props {
  patient?: Patient | null;
  diagnoses: Diagnosis[];
}

const PatientDetails = (props: Props) => {
  if (!props.patient) return <div>patient not found</div>;

  return (
    <div>
      <Entryform patient={props.patient} diagnoses={props.diagnoses} />
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
        <EntryList entries={props.patient.entries} />
      </div>
    </div>
  );
};

export default PatientDetails;
