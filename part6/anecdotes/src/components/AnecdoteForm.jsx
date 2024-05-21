import { createAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleCreateAnecdote = (event) => {
    event.preventDefault();

    dispatch(createAnecdote(event.target.anecdote.value));
    event.target.anecdote.value = "";
  };

  return (
    <div className="anecdote-form">
      <h2>create new</h2>
      <form onSubmit={handleCreateAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
