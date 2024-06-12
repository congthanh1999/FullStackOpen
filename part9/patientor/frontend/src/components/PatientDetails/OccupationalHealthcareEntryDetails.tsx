import React from "react";
import { OccupationalHealthcareEntry } from "../../types";

const OccupationalHealthcareEntryDetails: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  return <div>{entry.employerName}</div>;
};

export default OccupationalHealthcareEntryDetails;
