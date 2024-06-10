import { DiaryEntry } from "../types";

interface DiaryEntriesProps {
  diaryEntries: DiaryEntry[];
}

const DiaryEntries = (props: DiaryEntriesProps) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {props.diaryEntries.map((entry, idx) => {
        return (
          <div key={idx}>
            <h3>{entry.date}</h3>
            <div>
              visibility: {entry.visibility} <br />
              weather: {entry.weather} <br />
              commment: {entry.comment}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DiaryEntries;
