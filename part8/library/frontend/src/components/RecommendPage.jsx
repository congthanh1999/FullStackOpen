/* eslint-disable react/prop-types */
import { ME, ALL_BOOKS } from "../queries";
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";

const Recommend = (props) => {
  const [favoriteGenre, setFavoriteGenre] = useState();
  const [books, setBooks] = useState();

  const result = useQuery(ME);
  const bookResult = useQuery(ALL_BOOKS, {
    variables: {
      genre: favoriteGenre,
    },
  });

  useEffect(() => {
    if (!result.loading && !bookResult.loading) {
      setFavoriteGenre(result.data.me.favoriteGenre);
      setBooks(bookResult.data.allBooks);
    }
  }, [result, bookResult]);

  if (!props.show) {
    return null;
  }

  if (result.loading || bookResult.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h1>Recommendations</h1>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
