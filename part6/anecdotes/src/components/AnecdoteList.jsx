import { useSelector, useDispatch } from "react-redux";
import { updatedAnecdote } from "../reducers/anecdoteReducer";
import {
  changeNotification,
  resetNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter === "ALL") {
      return state.anecdotes;
    }

    return state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter)
    );
  });
  const dispatch = useDispatch();

  const vote = async (id) => {
    const anecdoteToVote = anecdotes.find((anecdote) => anecdote.id === id);
    dispatch(updatedAnecdote(id, { votes: anecdoteToVote.votes + 1 }));

    dispatch(changeNotification(`you voted ${anecdoteToVote.content}`));
    setTimeout(() => dispatch(resetNotification()), 5000);
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
