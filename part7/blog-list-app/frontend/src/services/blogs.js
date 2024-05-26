import axios from "axios";
import { object } from "prop-types";
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
  return res.data.sort((blog1, blog2) => blog2.likes - blog1.likes);
};

const create = async (object) => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.post(baseUrl, object, config);
  return res.data;
};

const update = async (id, object) => {
  const config = {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };

  const res = await axios.put(`${baseUrl}/${id}`, object, config);
  return res.data;
};

const comment = async (id, comment) => {
  const res = await axios.post(`${baseUrl}/${id}/comments`, { comment });
  return res.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.delete(`${baseUrl}/${id}`, config);
  return res.data;
};

export default { getAll, create, update, remove, setToken, comment };
