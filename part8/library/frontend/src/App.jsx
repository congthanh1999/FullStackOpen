import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import { useApolloClient } from "@apollo/client";
import RecommendPage from "./components/RecommendPage";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(localStorage.getItem("currentUser"));
  const client = useApolloClient();

  const handleLogOut = (event) => {
    event.preventDefault();

    localStorage.removeItem("currentUser");
    client.resetStore();
    setToken(null);
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={handleLogOut}>log out</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>log in</button>
        )}
      </div>

      <Authors show={page === "authors"} token={token} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <RecommendPage show={page === "recommend"} />

      <Login show={page === "login"} setToken={setToken} />
    </div>
  );
};

export default App;
