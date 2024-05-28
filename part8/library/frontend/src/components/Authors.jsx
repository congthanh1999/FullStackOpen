/* eslint-disable react/prop-types */
import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries";
import { useState } from "react";

const BirthdayForm = (props) => {
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });
  const [author, setAuthor] = useState("");
  const [born, setBorn] = useState("");

  const handleUpdateAuthor = (event) => {
    event.preventDefault();

    updateAuthor({ variables: { name: author, setBornTo: parseInt(born) } });

    setBorn("");
  };

  return (
    <>
      <h2>Set birthday</h2>
      <form onSubmit={handleUpdateAuthor}>
        <label htmlFor="author">
          name
          <select
            defaultValue=""
            onChange={(event) => setAuthor(event.target.value)}
          >
            <option value="" disabled>
              --select author--
            </option>
            {props.authors.map((author, index) => (
              <option value={author.name} key={index}>
                {author.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label htmlFor="born">born</label>
        <input
          type="number"
          id="born"
          onChange={(event) => setBorn(event.target.value)}
        />
        <br />
        <input type="submit" value="update author" />
      </form>
    </>
  );
};

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);

  if (result.loading) return null;

  const authors = result.data.allAuthors;

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.token ? <BirthdayForm authors={authors} /> : null}
    </div>
  );
};

export default Authors;
