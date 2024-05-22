import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAnecdotes, updateAnecdote } from "./requests";
import { useContext } from "react";
import NotificationContext from "./contexts/NotificationContext";

const App = () => {
  const [notification, dispatch] = useContext(NotificationContext);

  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const handleVote = (anecdote) => {
    newAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    dispatch({ type: "VOTE", payload: anecdote });
    console.log("vote");
  };

  // const anecdotes = [
  //   {
  //     content: "If it hurts, do it more often",
  //     id: "47145",
  //     votes: 0,
  //   },
  // ];

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: false,
  });
  // console.log(JSON.parse(JSON.stringify(result)));

  if (result.isLoading) {
    return <div>Loading data...</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
