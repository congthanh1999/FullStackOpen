import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const votesComparator = (a, b) => b.votes - a.votes;

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const anecdoteToVote = state.find(
        (anecdote) => anecdote.id === action.payload
      );

      const changedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };

      return state
        .map((anecdote) =>
          anecdote.id === changedAnecdote.id ? changedAnecdote : anecdote
        )
        .sort(votesComparator);
    },
    setAnecdotes(state, action) {
      return action.payload.sort(votesComparator);
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
  },
});

export const { voteAnecdote, setAnecdotes, appendAnecdote } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const updatedAnecdote = (id, content) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update(id, content);
    dispatch(voteAnecdote(updatedAnecdote.id));
  };
};

export default anecdoteSlice.reducer;
