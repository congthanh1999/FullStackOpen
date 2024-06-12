import { HospitalEntry } from "../../types";

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({
  entry,
}) => {
  return <div>criteria: {entry.discharge.criteria}</div>;
};

export default HospitalEntryDetails;
