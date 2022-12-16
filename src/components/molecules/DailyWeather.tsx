import type { FC } from 'react';
import { DateTimeConverter } from '../atom/DateTimeConverter';

export interface DailyWeatherDataProps {
  dt: number;
  temp: {
    min: number;
    max: number;
  };
  weather: [
    {
      icon: string;
      description: string;
    },
  ];
  active: boolean;
}

export const DailyWeather: FC<DailyWeatherDataProps> = ({
  dt,
  temp,
  weather,
  active,
}) => {
  return (
    <div className="flex flex-col rounded bg-slate-300 text-sm shadow-2xl shadow-slate-500 duration-300 ease-in-out hover:scale-110">
      <div className="flex flex-row items-center justify-center text-sm text-black">
        <div className='px-2'>{DateTimeConverter(dt, 'MMM DD')}</div>
        <img
          src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
          alt="icon"
          height="42"
          width="42"
        />
        <div className="pl-4">{`${temp.min}°C / ${temp.max}°C`}</div>
      </div>
      {active && (
        <div className="pl-2 text-center">
          Day Summary: {weather[0].description}
        </div>
      )}
    </div>
  );
};
