import type { FC } from 'react';
import { Line } from '@ant-design/plots';

export interface HourlyWeatherDataProps {
  data: Array<{}>;
}

export const HourlyWeather: FC<HourlyWeatherDataProps> = ({ data }) => {
  const config = {
    data,
    xField: 'date',
    yField: 'temp',
    width: 700,
    height: 350,

    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#5B8FF9',
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    interactions: [
      {
        type: 'marker-active',
      },
    ],

    label: {},
  };

  return (
    <div className="flex flex-col">
      <div className="font-serif text-xl font-semibold text-slate-600">
        Forecast for next 8 hours
      </div>
      <Line {...config} className="pt-4" />
    </div>
  );
};
