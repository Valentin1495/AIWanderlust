'use client';

import { GoogleMap, Marker } from '@react-google-maps/api';
import { useMemo } from 'react';

type LatLngLiteral = google.maps.LatLngLiteral;

type Props = {
  lat: number;
  lng: number;
  addresses?: string[];
};

export default function Map({ lat, lng }: Props) {
  const center = useMemo<LatLngLiteral>(() => ({ lat, lng }), [lat, lng]);

  const options = useMemo<google.maps.MapOptions>(
    () => ({
      mapId: '3e77dd68d40e394',
      disableDefaultUI: true,
      clickableIcons: true,
    }),
    []
  );

  return (
    <div>
      <GoogleMap
        zoom={10}
        mapContainerClassName='map-container'
        options={options}
        center={center}
      >
        <Marker
          position={{ lat, lng }}
          icon={`
            https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png
        `}
        />
      </GoogleMap>
    </div>
  );
}
