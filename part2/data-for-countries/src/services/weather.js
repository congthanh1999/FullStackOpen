import axios from "axios";

const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=`;

const getCapitalWeather = (query) => {
  const req = axios(
    `${baseUrl}${query}&appid=${import.meta.env.VITE_SOME_KEY}`
  );
  return req.then((response) => response.data);
};

export default { getCapitalWeather };
