import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getAll = () => {
  const req = axios(baseUrl);
  return req.then((response) => response.data);
};

export default { getAll };
