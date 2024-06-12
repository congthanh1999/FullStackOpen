import { Entry } from "../../types";
import HealthCheckEntryDetails from "./HealthCheckEntryDetails";
import HospitalEntryDetails from "./HospitalEntryDetails";
import OccupationalHealthcareEntryDetails from "./OccupationalHealthcareEntryDetails";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  let content;
  switch (entry.type) {
    case "HealthCheck":
      content = <HealthCheckEntryDetails entry={entry} />;
      break;
    case "OccupationalHealthcare":
      content = <OccupationalHealthcareEntryDetails entry={entry} />;
      break;
    case "Hospital":
      content = <HospitalEntryDetails entry={entry} />;
      break;
    default:
      return;
  }

  return (
    <div className="entry-details">
      <div>{entry.date}</div>
      <div>{entry.description}</div>
      {content}
      <div>diagnoses by {entry.specialist}</div>
    </div>
  );
};

export default EntryDetails;
