/* eslint-disable react/prop-types */
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useState } from "react";

const Books = (props) => {
  const [genre, setGenre] = useState("");
  const resultByGenre = useQuery(ALL_BOOKS, {
    variables: { genre },
  });
  const result = useQuery(ALL_BOOKS);

  if (resultByGenre.loading || result.loading) return <div>loading...</div>;

  const booksByGenre = resultByGenre.data.allBooks;
  const books = result.data.allBooks;

  const genresSet = books.reduce((acc, book) => {
    book.genres.forEach((genre) => acc.add(genre));
    return acc;
  }, new Set());
  const uniqueGenres = [...genresSet, "all genres"];

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksByGenre.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {uniqueGenres.map((genre, idx) => (
        <button
          key={idx}
          onClick={() => {
            setGenre(genre);
            if (genre === "all genres") setGenre("");
          }}
        >
          {genre}
        </button>
      ))}
    </div>
  );
};

export default Books;
