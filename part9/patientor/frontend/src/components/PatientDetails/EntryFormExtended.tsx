import { MenuItem, Select, TextField } from "@mui/material";
import { Calendar, DateRangePicker } from "react-date-range";
import { HealthCheckRating } from "../../types";

const EntryFormExtended = (props) => {
  let content;

  switch (props.entryFormFields.entryType) {
    case "HealthCheck":
      content = (
        <Select
          value={props.entryFormFields.healthCheckRating}
          onChange={props.entryFormFields.onHealthCheckRaingChange}
        >
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
            value={props.entryFormFields.employerName}
            label="Employer name"
            fullWidth
            onChange={props.entryFormFields.onEmployerNameChange}
          ></TextField>
          <DateRangePicker
            ranges={[props.entryFormFields.dateRange]}
            onChange={props.entryFormFields.handleSelectDateRange}
          />
        </>
      );
      break;
    case "Hospital":
      content = (
        <>
          <Calendar
            date={new Date(props.entryFormFields.discharge.date)}
            onChange={(date: Date) =>
              props.entryFormFields.onDiagnosisCodesChange(date)
            }
          />
          <TextField
            value={props.entryFormFields.discharge.criteria}
            label="Criteria"
            fullWidth
            onChange={props.entryFormFields.onDischargeCriteriaChange}
          />
        </>
      );
      break;
    default:
      break;
  }

  return content;
};

export default EntryFormExtended;
