import {
  MenuItem,
  Select,
  TextField,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useRef } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import { Diagnosis, Entry, Patient } from "../../types";
import { getYearMonthDate } from "../../utils/helper_funciton";

import Togglable, { TogglableHandle } from "../Togglable";
import useEntryFormField from "../../hooks/useEntryFormField";
import EntryFormExtended from "./EntryFormExtended";

interface Props {
  patient: Patient;
  diagnoses: Diagnosis[];
  setPatientEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
}

const EntryForm = (props: Props) => {
  const entryFormFields = useEntryFormField();
  const togglableButtonRef = useRef<TogglableHandle>(null);

  return (
    <Togglable
      label="Create entry"
      ref={togglableButtonRef}
      handleAddEntry={(event) =>
        entryFormFields.handleAddEntry(
          event,
          props.patient.id,
          props.setPatientEntries,
          togglableButtonRef
        )
      }
    >
      <div>
        <FormControl>
          <InputLabel id="entry">Entry types</InputLabel>
          <Select
            labelId="entry"
            label="entry"
            value={entryFormFields.entryType}
            id="entry"
            fullWidth
            onChange={entryFormFields.onEntryTypeChange}
          >
            <MenuItem value={"HealthCheck"}>HealthCheck</MenuItem>
            <MenuItem value={"OccupationalHealthcare"}>
              OccupationalHealthcare
            </MenuItem>
            <MenuItem value={"Hospital"}>Hospital</MenuItem>
          </Select>
        </FormControl>

        <form
          onSubmit={(event) =>
            entryFormFields.handleAddEntry(
              event,
              props.patient.id,
              props.setPatientEntries,
              togglableButtonRef
            )
          }
        >
          <TextField
            label="description"
            fullWidth
            value={entryFormFields.description}
            onChange={entryFormFields.onDescriptionChange}
          />
          <TextField
            label="date"
            fullWidth
            value={getYearMonthDate(entryFormFields.date)}
          />
          <Calendar
            date={entryFormFields.date}
            onChange={entryFormFields.onDateChange}
          />
          <TextField
            label="specialist"
            fullWidth
            value={entryFormFields.specialist}
            onChange={entryFormFields.onSpecialistChange}
          />
          <FormControl fullWidth>
            <InputLabel id="diagnosis-codes">Diagnosis codes</InputLabel>
            <Select
              labelId="diagnosis-code"
              label="diagnosis codes"
              onChange={entryFormFields.onDiagnosisCodesChange}
              value={entryFormFields.diagnosisCodes}
              multiple
              renderValue={(selected) => selected.join(", ")}
            >
              {props.diagnoses.map((d) => (
                <MenuItem key={d.code} value={d.code}>
                  {d.code}: {d.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <EntryFormExtended entryFormFields={entryFormFields} />
        </form>
      </div>
    </Togglable>
  );
};

export default EntryForm;
