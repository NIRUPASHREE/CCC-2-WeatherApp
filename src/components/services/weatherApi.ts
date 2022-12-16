import axios from 'axios';

export const getWeatherData = (lat: number, lng: number) => {
  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely,alerts&units=metric&appid=${
        import.meta.env.VITE_OPEN_WEATHER_API_KEY
      }`,
    )
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      } else {
        const error = new Error('no response');
        throw error;
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
