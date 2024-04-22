import axios from "axios";
const baseUrl = "/api/login";

const login = async (loginObject) => {
  const res = await axios.post(baseUrl, loginObject);

  return res.data;
};

export default { login };
