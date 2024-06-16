import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import patientEntriesService from "../../services/patientEntries";
import { Diagnosis, Patient } from "../../types";

interface Props {
  patient: Patient;
  diagnoses: Diagnosis[];
}

const Entryform = (props: Props) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [show, setShow] = useState<boolean>(false);

  const handleAddEntry = (event: SyntheticEvent): void => {
    event.preventDefault();

    // patientEntriesService.create(props.patient.id, {
    //   description,
    //   date,
    //   specialist,
    //   diagnosisCodes,
    // });

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

        <Button type="submit" variant="contained">
          Add
        </Button>
      </form>
    </div>
  );
};

export default Entryform;
