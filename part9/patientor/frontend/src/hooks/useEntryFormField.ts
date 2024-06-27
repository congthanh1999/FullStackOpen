import { SyntheticEvent, useState } from "react";
import {
  BaseEntryWithoutId,
  Diagnosis,
  Entry,
  EntryWithoutId,
  HealthCheckRating,
  HospitalEntry,
} from "../types";
import { getYearMonthDate } from "../utils/helper_funciton";
import { Range, RangeKeyDict } from "react-date-range";
import { SelectChangeEvent } from "@mui/material";
import patientEntriesService from "../services/patientEntries";
import { TogglableHandle } from "../components/Togglable";

const useEntryFormField = () => {
  const [entryType, setEntryType] = useState<Entry["type"]>("HealthCheck");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    Array<Diagnosis["code"]>
  >([]);
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
    criteria: "",
  });

  const onEntryTypeChange = (event: SelectChangeEvent) => {
    setEntryType(event.target.value as Entry["type"]);
  };

  const onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const onDateChange = (date: Date) => {
    setDate(date);
  };

  const onSpecialistChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpecialist(event.target.value);
  };

  const onDiagnosisCodesChange = (
    event: SelectChangeEvent<typeof diagnosisCodes>
  ) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  };

  const onHealthCheckRating = (event: SelectChangeEvent<number>) => {
    setHealthCheckRating(event.target.value as number);
  };

  const onEmployerNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmployerName(event.target.value);
  };

  const onDateRangeChange = (ranges: RangeKeyDict) => {
    setDateRange({
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
      key: "selection",
    });
  };

  const onDischargeDateChange = (date: Date) => {
    setDischarge((prev) => ({ ...prev, date: getYearMonthDate(date) }));
  };

  const onDischargeCriteriaChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDischarge((prev) => ({ ...prev, criteria: event.target.value }));
  };

  const handleAddEntry = async (
    event: SyntheticEvent,
    patientId: string,
    setPatientEntries: React.Dispatch<React.SetStateAction<Entry[]>>,
    togglableButtonRef: React.RefObject<TogglableHandle>
  ) => {
    event.preventDefault();

    const newBaseEntry: BaseEntryWithoutId = {
      description,
      date: getYearMonthDate(date),
      specialist,
      diagnosisCodes,
    };

    let newEntry: EntryWithoutId | undefined;

    switch (entryType) {
      case "HealthCheck":
        newEntry = {
          ...newBaseEntry,
          type: "HealthCheck",
          healthCheckRating,
        };
        break;
      case "OccupationalHealthcare":
        newEntry = {
          ...newBaseEntry,
          type: "OccupationalHealthcare",
          employerName,
          sickLeave: {
            startDate: getYearMonthDate(dateRange.startDate as Date),
            endDate: getYearMonthDate(dateRange.endDate as Date),
          },
        };
        break;
      case "Hospital":
        newEntry = {
          ...newBaseEntry,
          type: "Hospital",
          discharge,
        };
        break;
      default:
        break;
    }

    const savedEntry = await patientEntriesService.create(patientId, newEntry);

    setPatientEntries((prev) => [...prev, savedEntry]);

    setEntryType("HealthCheck");
    setDescription("");
    setDate(new Date());
    setSpecialist("");
    setDiagnosisCodes([]);
    setDischarge({
      date: getYearMonthDate(new Date()),
      criteria: "",
    });
    setHealthCheckRating(HealthCheckRating.Healthy);
    setEmployerName("");
    setDateRange({
      startDate: date,
      endDate: new Date(date.getTime() + 24 * 60 * 60 * 1000),
      key: "selection",
    });

    if (togglableButtonRef.current !== null) {
      togglableButtonRef.current.handleToggleVisible();
    }
  };

  return {
    entryType,
    description,
    date,
    specialist,
    diagnosisCodes,
    healthCheckRating,
    employerName,
    dateRange,
    discharge,
    onEntryTypeChange,
    onDescriptionChange,
    onDateChange,
    onSpecialistChange,
    onDiagnosisCodesChange,
    onHealthCheckRating,
    onEmployerNameChange,
    onDateRangeChange,
    onDischargeDateChange,
    onDischargeCriteriaChange,
    handleAddEntry,
  };
};

export default useEntryFormField;
