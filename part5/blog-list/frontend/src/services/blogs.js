import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.get(baseUrl, config);
  return res.data;
};

const create = async (object) => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.post(baseUrl, object, config);
  return res.data;
};

export default { getAll, create, setToken };
