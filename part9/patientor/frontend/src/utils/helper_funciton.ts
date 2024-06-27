export const getYearMonthDate = (date: Date): string => {
  const yearMonthDate = date
    ? `${date.getFullYear().toString()}/${date.getMonth().toString()}/${date
        .getDate()
        .toString()}`
    : "";
  return yearMonthDate;
};

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
