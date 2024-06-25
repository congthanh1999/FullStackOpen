import axios from "axios";

import { apiBaseUrl } from "../constants";
import { Entry } from "../types";

const baseUrl = `${apiBaseUrl}/patients`;

const create = async (patientId: string, entryObject: unknown) => {
  const res = await axios.post<Entry>(
    `${baseUrl}/${patientId}/entries`,
    entryObject
  );
  return res.data;
};

export default { create };
