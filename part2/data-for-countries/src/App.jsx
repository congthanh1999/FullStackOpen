import { useEffect, useState } from "react";
import countryService from "./services/countries";
import SearchBar from "./components/SearchBar";
import MatchedCountries from "./components/MatchedCountries";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    countryService.getAll().then((initialCountries) => {
      setCountries(initialCountries);
    });
  }, []);

  return (
    <div className="app">
      <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
      <MatchedCountries countries={countries} searchInput={searchInput} />
    </div>
  );
}

export default App;
