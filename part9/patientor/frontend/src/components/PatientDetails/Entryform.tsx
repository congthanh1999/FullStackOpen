import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  InputLabel,
  Input,
  FormControl,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { Calendar, Range } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import patientEntriesService from "../../services/patientEntries";
import {
  Diagnosis,
  Entry,
  HealthCheckRating,
  HospitalEntry,
  Patient,
} from "../../types";
import { getYearMonthDate } from "../../utils/helper_funciton";

import EntryFormExtended from "./EntryFormExtended";

interface Props {
  patient: Patient;
  diagnoses: Diagnosis[];
  setPatientEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
}

const Entryform = (props: Props) => {
  const [entryType, setEntryType] = useState<Entry["type"]>("HealthCheck");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<number>(
    HealthCheckRating.Healthy
  );
  const [employerName, setEmployerName] = useState<string>("");
  const [dateRange, setDateRange] = useState<Range>({
    startDate: date,
    endDate: new Date(date.getTime() + 24 * 60 * 60 * 1000),
    key: "selection",
  });
  const [discharge, setDischarge] = useState<HospitalEntry["discharge"]>({
    date: getYearMonthDate(date),
    criteria: "123",
  });

  const handleAddEntry = async (event: SyntheticEvent) => {
    event.preventDefault();

    const savedEntry = await patientEntriesService.create(props.patient.id, {
      description,
      date: getYearMonthDate(date),
      specialist,
      diagnosisCodes,
      // healthCheckRating,
      // employerName,
      // sickLeave: {
      //   startDate: dateRange.startDate,
      //   endDate: dateRange.endDate,
      // },
      discharge: {},
    });

    props.setPatientEntries((prev) => [...prev, savedEntry]);

    setDescription("");
    setDate(new Date());
    setSpecialist("");
  };

  const handleDiagnosisCodeChange = (
    event: SelectChangeEvent<string[]>
  ): void => {
    let codes: string[] = [...diagnosisCodes];
    codes = codes.concat(event.target.value);
    setDiagnosisCodes(codes);
  };

  const handleSelectDate = (date: Date) => {
    setDate(date);
  };

  return (
    <div>
      <div>
        <FormControl>
          <InputLabel id="entry">Entry types</InputLabel>
          <Select
            labelId="entry"
            label="entry"
            value={entryType}
            id="entry"
            fullWidth
            onChange={(event: SelectChangeEvent) =>
              setEntryType(event.target.value as Entry["type"])
            }
          >
            <MenuItem value={"HealthCheck"}>HealthCheck</MenuItem>
            <MenuItem value={"OccupationalHealthcare"}>
              OccupationalHealthcare
            </MenuItem>
            <MenuItem value={"Hospital"}>Hospital</MenuItem>
          </Select>
        </FormControl>
      </div>
      <form onSubmit={handleAddEntry}>
        <TextField
          label="description"
          fullWidth
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <TextField label="date" fullWidth value={getYearMonthDate(date)} />
        <Calendar date={date} onChange={handleSelectDate} />
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
        <EntryFormExtended
          type={entryType}
          healthCheckRating={healthCheckRating}
          setHealthCheckRating={setHealthCheckRating}
          employerName={employerName}
          setEmployerName={setEmployerName}
          dateRange={dateRange}
          setDateRange={setDateRange}
          discharge={discharge}
          setDischarge={setDischarge}
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
