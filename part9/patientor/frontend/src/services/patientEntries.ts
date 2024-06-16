import axios from "axios";

import { apiBaseUrl } from "../constants";
import { Entry, EntryWithoutId } from "../types";

const baseUrl = `${apiBaseUrl}/patients`;

const create = async (patientId: string, entryObject: EntryWithoutId) => {
  const res = await axios.post<Entry>(
    `${baseUrl}/${patientId}/entries`,
    entryObject
  );
  return res.data;
};

export default { create };
