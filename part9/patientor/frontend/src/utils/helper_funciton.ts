export const getYearMonthDate = (date: Date): string => {
  const yearMonthDate = date
    ? `${date.getFullYear().toString()}/${date.getMonth().toString()}/${date
        .getDate()
        .toString()}`
    : "";
  return yearMonthDate;
};
