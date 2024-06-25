import { MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import {
  Calendar,
  DateRangePicker,
  Range,
  RangeKeyDict,
} from "react-date-range";
import { HealthCheckRating, HospitalEntry } from "../../types";
import { getYearMonthDate } from "../../utils/helper_funciton";

interface ExtendedEntryFormProps {
  type: "HealthCheck" | "OccupationalHealthcare" | "Hospital";
  healthCheckRating: number;
  setHealthCheckRating: React.Dispatch<React.SetStateAction<number>>;
  employerName: string;
  setEmployerName: React.Dispatch<React.SetStateAction<string>>;
  dateRange: Range;
  setDateRange: React.Dispatch<React.SetStateAction<Range>>;
  discharge: HospitalEntry["discharge"];
  setDischarge: React.Dispatch<
    React.SetStateAction<HospitalEntry["discharge"]>
  >;
}

const EntryFormExtended = (props: ExtendedEntryFormProps) => {
  const selectionRange = {
    startDate: props.dateRange.startDate,
    endDate: props.dateRange.endDate,
    key: "selection",
  };

  const handleSelectRating = (event: SelectChangeEvent<number>) => {
    props.setHealthCheckRating(Number(event.target.value));
  };

  const handleSelectDateRange = (ranges: RangeKeyDict) => {
    props.setDateRange({
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
      key: "selection",
    });
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
          <DateRangePicker
            ranges={[selectionRange]}
            onChange={handleSelectDateRange}
          />
        </>
      );
      break;
    case "Hospital":
      content = (
        <>
          <Calendar
            date={new Date(props.discharge.date)}
            onChange={(date: Date) => {
              props.setDischarge((prev) => {
                return {
                  ...prev,
                  date: getYearMonthDate(date),
                };
              });
            }}
          />
          <TextField
            value={props.discharge.criteria}
            label="Criteria"
            fullWidth
            onChange={(event) => {
              props.setDischarge((prev) => {
                return {
                  ...prev,
                  criteria: event.target.value,
                };
              });
            }}
          />
        </>
      );
  }

  return content;
};

export default EntryFormExtended;
