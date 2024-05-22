import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data);

export const createAnecdote = (content) =>
  axios.post(baseUrl, { content, votes: 0 }).then((res) => res.data);

export const updateAnecdote = (anecdoteToUpdate) =>
  axios
    .put(`${baseUrl}/${anecdoteToUpdate.id}`, anecdoteToUpdate)
    .then((res) => res.data);
