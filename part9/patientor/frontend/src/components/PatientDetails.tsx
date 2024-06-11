import { Patient } from "../types";

interface Props {
  patient: Patient;
}

const PatientDetails = (props: Props) => {
  return (
    <div>
      <h2>{props.patient.name}</h2>
      <div>ssn: {props.patient.ssn}</div>
      <div>occupation: {props.patient.occupation}</div>
    </div>
  );
};

export default PatientDetails;
