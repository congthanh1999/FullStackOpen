import { useDispatch } from "react-redux";
import { filterAnecdote } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();

  const filterStyle = {
    marginBottom: 10,
  };

  const handleChange = (event) => {
    dispatch(filterAnecdote(event.target.value.toLowerCase()));
  };

  return (
    <div style={filterStyle}>
      filter <input type="text" onChange={handleChange} />
    </div>
  );
};

export default Filter;
