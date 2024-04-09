const Filter = ({ searchInput, onChange }) => {
  return (
    <div className="filter">
      filter shown with <input value={searchInput} onChange={onChange} />
    </div>
  );
};

export default Filter;
