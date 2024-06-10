import DiaryEntries from "./components/DiaryEntries";
import DiaryForm from "./components/DiaryForm";
import diaryService from "./services/diaryService";
import { DiaryEntry } from "./types";
import { useEffect, useState } from "react";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const diaries = await diaryService.getAll();
      setDiaryEntries(diaries);
    };

    fetchData();
  }, []);
  return (
    <div>
      <DiaryForm setDiaryEntries={setDiaryEntries} />
      <DiaryEntries diaryEntries={diaryEntries} />
    </div>
  );
}

export default App;
