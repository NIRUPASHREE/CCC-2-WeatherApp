import type { FC } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import type { CurrentWeatherDataProps } from '../molecules/CurrentWeather';
import { CurrentWeather } from '../molecules/CurrentWeather';
import { GoogleMapDisplay } from '../organisms/GoogleMapDisplay';
import { getWeatherData } from '../services/weatherApi';
import type { HourlyWeatherDataProps } from '../molecules/HourlyWeather';
import { HourlyWeather } from '../molecules/HourlyWeather';
import { DateTimeConverter } from '../atom/DateTimeConverter';
import { Header } from '../atom/Header';
import type { DailyWeatherDataProps } from '../molecules/DailyWeather';
import { DailyWeather } from '../molecules/DailyWeather';
import { Loading } from '../atom/Loading';

export interface LatAndLng {
  lat: number;
  lng: number;
  setLat: (val: number) => void;
  setLng: (val: number) => void;
  setCity: (val: string) => void;
}

export const Homepage: FC = () => {
  const [lat, setLat] = useState(35.6895); 
  const [lng, setLng] = useState(139.6917);
  const [loading, setLoading] = useState(false);
  const [currentActive, setCurrentActive] = useState(-1);
  const [city, setCity] = useState('Tokyo, Japan');

  const [currentWeatherData, setCurrentWeatherData] =
    useState<CurrentWeatherDataProps>();
  const [dailyWeatherData, setDailyWeatherData] = useState<
    [] | DailyWeatherDataProps[]
  >([]);
  const [hourlyWeatherData, setHourlyWeatherData] = useState<
    [] | HourlyWeatherDataProps[]
  >([]);

  useEffect(() => {
    setLoading(true);
    getWeatherData(lat, lng)
      .then((data) => {
        if (data !== null) {
          if (data.current !== null) setCurrentWeatherData(data.current);
          if (data.daily !== null && data.daily.length > 0)
            setDailyWeatherData(data.daily);
          if (data.hourly !== null && data.hourly.length > 0) {
            if (data.hourly.length > 8) {
              const slicedData = data.hourly.slice(1, 9);
              const actualData = slicedData.map(
                (d: { dt: number; temp: number }) => {
                  return {
                    date: DateTimeConverter(d.dt, 'h a'),
                    temp: d.temp,
                  };
                },
              );
              setHourlyWeatherData(actualData);
            } else {
              const actualData = data.hourly.map(
                (d: { dt: number; temp: number }) => {
                  return {
                    date: DateTimeConverter(d.dt, 'h a'),
                    temp: d.temp,
                  };
                },
              );
              setHourlyWeatherData(actualData);
            }
          }
        } else {
          setCurrentWeatherData(undefined);
          setDailyWeatherData([]);
          setHourlyWeatherData([]);
        }
      })
      .finally(() => setLoading(false));
  }, [lat, lng]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-around">
        <div className="flex flex-col">
          <Header />
          <div className="pt-4">
            {currentWeatherData ? (
              <CurrentWeather
                dt={currentWeatherData.dt}
                wind_speed={currentWeatherData.wind_speed}
                humidity={currentWeatherData.humidity}
                pressure={currentWeatherData.pressure}
                sunrise={currentWeatherData.sunrise}
                feels_like={currentWeatherData.feels_like}
                sunset={currentWeatherData.sunset}
                temp={currentWeatherData.temp}
                uvi={currentWeatherData.uvi}
                weather={currentWeatherData.weather}
                city={city}
              />
            ) : (
              <div> Sorry, no response</div>
            )}
          </div>
        </div>
        <GoogleMapDisplay
          setLat={(e): void => setLat(e)}
          setLng={(e): void => setLng(e)}
          lat={lat}
          lng={lng}
          setCity={(e): void => setCity(e)}
        />
      </div>
      <div className="flex flex-row justify-around pt-4">
        {hourlyWeatherData.length > 0 ? (
          <HourlyWeather data={hourlyWeatherData} />
        ) : (
          <div> Sorry, no response</div>
        )}
        <div className="flex flex-col">
          <div className="pb-4 font-serif text-xl font-semibold text-slate-600">
            Forecast for the following week
          </div>
          {dailyWeatherData.length > 0 ? (
            dailyWeatherData.map((data) => (
              <div
                key={data.dt}
                onMouseEnter={(): void => setCurrentActive(data.dt)}
                onMouseLeave={(): void => setCurrentActive(-1)}
              >
                <DailyWeather
                  dt={data.dt}
                  temp={data.temp}
                  weather={data.weather}
                  active={data.dt === currentActive}
                />
              </div>
            ))
          ) : (
            <div> Sorry, no response</div>
          )}
        </div>
      </div>
    </div>
  );
};
