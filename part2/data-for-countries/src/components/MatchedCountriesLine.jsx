import { useState } from "react";
import MatchedCountry from "./MatchedCountry";

const MatchedCountriesLine = ({ country }) => {
  const [content, setContent] = useState(null);

  const handleShowCountryInfo = (event, country) => {
    if (event.target.innerHTML === "show") {
      event.target.innerHTML = "hide";
      setContent(<MatchedCountry matchedCountry={country} />);
    } else {
      event.target.innerHTML = "show";
      setContent(null);
    }
  };

  return (
    <div key={country.fifa} className={country.name.common.toLowerCase()}>
      <div>
        {country.name.common}{" "}
        <button onClick={(event) => handleShowCountryInfo(event, country)}>
          show
        </button>
      </div>
      {content}
    </div>
  );
};

export default MatchedCountriesLine;
