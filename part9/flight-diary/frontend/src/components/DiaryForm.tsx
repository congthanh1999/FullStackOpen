import { useState } from "react";
import { DiaryEntry, Visibility, Weather, NewDiaryEntry } from "../types";
import diaryService from "../services/diaryService";

interface DiaryFormProps {
  setDiaryEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
}

const DiaryForm = (props: DiaryFormProps) => {
  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Good);
  const [weather, setWeather] = useState<Weather>(Weather.Cloudy);
  const [comment, setComment] = useState<string>("");

  const onDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setDate(event.target.value);
  };

  const onVisibilityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const visibility = Object.values(Visibility).find(
        (v) => v.toString() === event.target.value
      );
      if (visibility) {
        setVisibility(visibility);
      }
    }
  };

  const onWeatherChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const weather = Object.values(Weather).find(
        (v) => v.toString() === event.target.value
      );
      if (weather) {
        setWeather(weather);
      }
    }
  };

  const handleAddDiaryEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    // const newEntry: NewDiaryEntry = {
    //   date,
    //   visibility,
    //   weather,
    //   comment,
    // };
    const newEntry: NewDiaryEntry = {
      date: date,
      visibility: visibility,
      weather: weather,
      comment: comment,
    };

    const addedEntry = await diaryService.create(newEntry);

    setComment("");

    props.setDiaryEntries((prev) => [...prev, addedEntry]);
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={handleAddDiaryEntry}>
        <label htmlFor="date">date</label>
        <input
          type="date"
          id="date"
          placeholder="yyyy-mm-dd"
          value={date}
          onChange={onDateChange}
        />
        <br />
        <label htmlFor="visibility">visibility</label>
        <select value={visibility} onChange={onVisibilityChange}>
          {Object.values(Visibility).map((v) => (
            <option key={v.toString()} value={v}>
              {v.toString()}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="weather">weather</label>
        <select value={weather} onChange={onWeatherChange}>
          {Object.values(Weather).map((v) => (
            <option key={v.toString()} value={v}>
              {v.toString()}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="comment">comment</label>
        <input
          type="text"
          id="comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <br />
        <input type="submit" value="add" />
      </form>
    </div>
  );
};

export default DiaryForm;
