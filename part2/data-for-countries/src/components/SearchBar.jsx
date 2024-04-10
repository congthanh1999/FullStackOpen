const SearchBar = ({ searchInput, setSearchInput }) => {
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <div className="search-bar">
      find countries{" "}
      <input value={searchInput} onChange={handleSearchInputChange} />
    </div>
  );
};

export default SearchBar;
