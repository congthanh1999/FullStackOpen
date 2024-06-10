import { DiaryEntry, NewDiaryEntry } from "../types";
import axios from "axios";

const baseUrl = "/api/diaries";

const getAll = async () => {
  const res = await axios.get<DiaryEntry[]>(baseUrl);
  return res.data;
};

const create = async (newEntry: NewDiaryEntry) => {
  const res = await axios.post<DiaryEntry>(baseUrl, newEntry);
  return res.data;
};

export default { getAll, create };
