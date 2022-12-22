import type { FC } from 'react';
import React from 'react';
import { DateTimeConverter } from '../atom/DateTimeConverter';

export interface CurrentWeatherDataProps {
  dt: number;
  temp: number;
  sunrise: number;
  sunset: number;
  pressure: number;
  humidity: number;
  feels_like: number;
  wind_speed: number;
  uvi: number;
  weather: [
    {
      icon: string;
      description: string;
    },
  ];
  city: string;
}

export const CurrentWeather: FC<CurrentWeatherDataProps> = ({
  dt,
  humidity,
  pressure,
  sunrise,
  sunset,
  temp,
  wind_speed,
  feels_like,
  uvi,
  weather,
  city,
}) => {
  return (
    <div className="flex w-96 flex-col items-start rounded-xl bg-slate-100 p-4 text-base shadow-xl shadow-slate-300">
      <div className="flex flex-col items-start pt-5">
        <div className="text-orange-600">
          {DateTimeConverter(dt, 'MMM DD, h:mm a')}
        </div>
        <div className="flex flex-row items-center justify-center">
          <img
            src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
            alt="icon"
            height="54"
            width="54"
          />
          <div className="w-full pt-2 pl-2 text-2xl font-semibold text-slate-600">
            {temp.toFixed()}°C
          </div>
        </div>
      </div>
      <div className="font-medium">
        Feels like {`${feels_like}°C`}. {weather[0].description}.
      </div>
      <div className=" font-serif text-xl font-semibold text-slate-500">
        {city}
      </div>
      <div className="grid grid-cols-2 gap-x-4 py-4">
        <div>Sunrise: {DateTimeConverter(sunrise, 'h:mm:ss a')}</div>
        <div>Sunset: {DateTimeConverter(sunset, 'h:mm:ss a')}</div>
        <div>Pressure: {pressure} hPa</div>
        <div>Humidity: {humidity}%</div>
        <div>UV Index: {uvi}</div>
        <div>Wind Speed: {wind_speed} m/s</div>
      </div>
    </div>
  );
};
