import MatchedCountry from "./MatchedCountry";
import MatchedCountriesLine from "./MatchedCountriesLine";

const MatchedCountries = ({ searchInput, countries }) => {
  const nameComparator = (a, b) => {
    return a.name.common.localeCompare(b.name.common);
  };

  const matchedCountries = countries
    .filter((country) =>
      country.name.common.toLowerCase().includes(searchInput.toLowerCase())
    )
    .sort(nameComparator);

  let content;

  if (matchedCountries.length > 10) {
    content = <div>Too many matches, specify another filter</div>;
  } else if (matchedCountries.length === 1) {
    content = <MatchedCountry matchedCountry={matchedCountries[0]} />;
  } else {
    content = matchedCountries.map((country) => (
      <MatchedCountriesLine key={country.fifa} country={country} />
    ));
  }

  if (!searchInput) return null;
  else {
    return <div className="matched-countries">{content}</div>;
  }
};

export default MatchedCountries;
