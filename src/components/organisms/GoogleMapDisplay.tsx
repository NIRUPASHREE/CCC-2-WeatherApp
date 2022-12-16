/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC } from 'react';
import { useMemo } from 'react';
import { useEffect } from 'react';
import React, { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import type { LatAndLng } from '../page/Homepage';
import { SearchBar } from './SearchBar';

const containerStyle = {
  width: '700px',
  height: '300px',
  borderRadius: '12px',
  boxShadow: '2px 2px 4px 4px lightGrey'
};

export const GoogleMapDisplay: FC<LatAndLng> = ({
  lat,
  lng,
  setLat,
  setLng,
  setCity,
}) => {
  const setCenterData = (lat: number, lng: number): any => ({ lat, lng });

  const [, setMap] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const center = useMemo(() => setCenterData(lat, lng), [lat, lng]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMap(true);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });

  const onLoad = useCallback(
    (map: any) => {
      new window.google.maps.LatLngBounds(center);
      map.setZoom(7);
      setMap(map);
    },
    [center],
  );

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div className="pt-9">
      {showMap && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={5}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <div className="absolute top-5 left-5 rounded">
            <SearchBar
              setLat={(e: any): void => setLat(e)}
              setLng={(e: any): void => setLng(e)}
              setCity={(e: any): void => setCity(e)}
            />
          </div>
        </GoogleMap>
      )}
    </div>
  ) : (
    <div className="w-3/5" />
  );
};
