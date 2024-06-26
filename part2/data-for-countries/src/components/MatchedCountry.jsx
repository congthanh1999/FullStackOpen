import { useState, useEffect } from "react";
import weatherService from "../services/weather";

const MatchedCountry = ({ matchedCountry }) => {
  const [weather, setWeather] = useState(null);
  const languages = Object.entries(matchedCountry.languages).map(
    (entry) => entry[1]
  );

  useEffect(() => {
    weatherService
      .getCapitalWeather(matchedCountry.capital[0])
      .then((initialWeather) => {
        setWeather(initialWeather);
        console.log(initialWeather);
      });
  }, []);

  return (
    <div className="matched-country">
      <h2>{matchedCountry.name.common}</h2>
      <div>capital {matchedCountry.capital.join(", ")}</div>
      <div>area {matchedCountry.area}</div>
      <h3>languages:</h3>
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={matchedCountry.flags.png} height={150} />
      <h2>Weather in {matchedCountry.capital[0]}</h2>
      <div>temperature {weather && weather.main.temp} Celcius</div>
      <img
        src={`https://openweathermap.org/img/wn/${
          weather && weather.weather[0].icon
        }.png`}
        height={150}
      />
      <div>win {weather && weather.wind.speed} m/s</div>
    </div>
  );
};

export default MatchedCountry;
