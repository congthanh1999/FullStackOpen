import { createAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleCreateAnecdote = async (event) => {
    event.preventDefault();

    dispatch(createAnecdote(event.target.anecdote.value));
    dispatch(setNotification(`you created ${event.target.anecdote.value}`, 5));

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
