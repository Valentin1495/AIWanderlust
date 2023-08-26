'use client';

import { GoogleMap, Marker } from '@react-google-maps/api';
import { useMemo } from 'react';

type Props = {
  lat: number;
  lng: number;
};

export default function Map({ lat, lng }: Props) {
  const center = useMemo<google.maps.LatLngLiteral>(() => ({ lat, lng }), []);

  const options = useMemo<google.maps.MapOptions>(
    () => ({
      mapId: '3e77dd68d40e394',
      disableDefaultUI: true,
      clickableIcons: false,
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
