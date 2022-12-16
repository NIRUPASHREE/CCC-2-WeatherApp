import type { FC } from 'react';
import React from 'react';
import Autocomplete from 'react-google-autocomplete';

interface SearchBarProps {
  setLat: (val: number | undefined) => void;
  setLng: (val: number | undefined) => void;
  setCity: (val: string | undefined) => void;
}

export const SearchBar: FC<SearchBarProps> = ({ setLat, setLng, setCity }) => {
  return (
    <div>
      <div className="flex flex-row justify-center">
        <Autocomplete
          apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
          onPlaceSelected={(place): void => {
            setLat(place.geometry?.location?.lat());
            setLng(place.geometry?.location?.lng());
            setCity(place.formatted_address);
          }}
          className="h-10 rounded border border-transparent pl-4 "
        />
      </div>
    </div>
  );
};
