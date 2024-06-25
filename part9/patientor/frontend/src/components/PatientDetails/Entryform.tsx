import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { DateRangePicker } from "react-date-range";
import patientEntriesService from "../../services/patientEntries";
import { Diagnosis, Entry, HealthCheckRating, Patient } from "../../types";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

interface Props {
  patient: Patient;
  diagnoses: Diagnosis[];
  setPatientEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
}

interface ExtendedEntryFormProps {
  type: "HealthCheck" | "OccupationalHealthcare" | "Hospital";
  healthCheckRating: number;
  setHealthCheckRating: React.Dispatch<React.SetStateAction<number>>;
  employerName: string;
  setEmployerName: React.Dispatch<React.SetStateAction<string>>;
}

const ExtendedEntryForm = (props: ExtendedEntryFormProps) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(startDate.getTime() + 24 * 60 * 60 * 1000)
  );

  const selectionRange = {
    startDate,
    endDate,
    key: "selection",
  };

  const handleSelectRating = (event: SelectChangeEvent<number>) => {
    props.setHealthCheckRating(Number(event.target.value));
  };

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  let content;

  switch (props.type) {
    case "HealthCheck":
      content = (
        <Select value={props.healthCheckRating} onChange={handleSelectRating}>
          {Object.entries(HealthCheckRating)
            .filter(([key, value]) => typeof value === "number")
            .map(([key, value]) => (
              <MenuItem key={key} value={value}>
                {value}: {key}
              </MenuItem>
            ))}
        </Select>
      );
      break;
    case "OccupationalHealthcare":
      content = (
        <>
          <TextField
            value={props.employerName}
            label="Employer name"
            fullWidth
            onChange={(event) => props.setEmployerName(event.target.value)}
          ></TextField>
          <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
        </>
      );
  }

  return content;
};

const Entryform = (props: Props) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<number>(
    HealthCheckRating.Healthy
  );
  const [employerName, setEmployerName] = useState<string>("");

  const handleAddEntry = async (event: SyntheticEvent) => {
    event.preventDefault();

    const savedEntry = await patientEntriesService.create(props.patient.id, {
      description,
      date,
      specialist,
      diagnosisCodes,
      healthCheckRating,
    });

    props.setPatientEntries((prev) => [...prev, savedEntry]);

    setDescription("");
    setDate("");
    setSpecialist("");
  };

  const handleDiagnosisCodeChange = (
    event: SelectChangeEvent<string[]>
  ): void => {
    let codes: string[] = [...diagnosisCodes];
    codes = codes.concat(event.target.value);
    setDiagnosisCodes(codes);
  };

  return (
    <div>
      <form onSubmit={handleAddEntry}>
        <TextField
          label="description"
          fullWidth
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <TextField
          label="date"
          fullWidth
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <TextField
          label="specialist"
          fullWidth
          value={specialist}
          onChange={(event) => setSpecialist(event.target.value)}
        />
        <Select
          label="diagnosis codes"
          fullWidth
          onChange={handleDiagnosisCodeChange}
          value={diagnosisCodes.length ? diagnosisCodes : ""}
          renderValue={(diagnosisCodes: string[]) =>
            diagnosisCodes.length ? (
              diagnosisCodes.join(", ")
            ) : (
              <em>nothing selected</em>
            )
          }
        >
          {props.diagnoses.map((d) => (
            <MenuItem key={d.code} value={d.code}>
              {d.code}: {d.name}
            </MenuItem>
          ))}
        </Select>
        <ExtendedEntryForm
          type={"OccupationalHealthcare"}
          healthCheckRating={healthCheckRating}
          setHealthCheckRating={setHealthCheckRating}
          employerName={employerName}
          setEmployerName={setEmployerName}
        />
        <br />
        <Button type="submit" variant="contained">
          Add
        </Button>
      </form>
    </div>
  );
};

export default Entryform;
