'use client';

import { DirectionsRenderer, GoogleMap, Marker } from '@react-google-maps/api';
import { useEffect, useMemo, useState } from 'react';
import { getGeocode, getLatLng } from 'use-places-autocomplete';

interface Coordinate {
  address: string;
  lat: number;
  lng: number;
}
type LatLngLiteral = google.maps.LatLngLiteral;

type Props = {
  lat: number;
  lng: number;
  addresses?: string[];
};

export default function Map({ lat, lng, addresses }: Props) {
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);
  const [directions, setDirections] = useState<google.maps.DirectionsResult>();
  const center = useMemo<LatLngLiteral>(() => ({ lat, lng }), []);

  const options = useMemo<google.maps.MapOptions>(
    () => ({
      mapId: '3e77dd68d40e394',
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );
  const handleGeocode = async (address: string) => {
    const results = await getGeocode({ address });
    const { lat, lng } = getLatLng(results[0]);

    setCoordinates((prevCoordinates) => [
      ...prevCoordinates,
      { address, lat, lng },
    ]);
  };

  useEffect(() => {
    addresses?.forEach((address) => handleGeocode(address));
  }, []);

  const fetchDirections = (place: LatLngLiteral) => {
    if (!lat || !lng) return;

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: { lat, lng },
        destination: place,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK' && result) {
          setDirections(result);
        }
      }
    );
  };

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
        {/* <MarkerClusterer>
          {(clusterer) => (
            <section>
              {coordinates.map((coord) => {
                const { lat, lng, address } = coord;
                return (
                  <Marker
                    key={address}
                    position={{ lat, lng }}
                    clusterer={clusterer}
                  />
                );
              })}
            </section>
          )}
        </MarkerClusterer> */}
        {coordinates.map((coord, i) => {
          const { lat, lng } = coord;
          return (
            <Marker
              key={i}
              position={{ lat, lng }}
              onClick={() => fetchDirections({ lat, lng })}
            />
          );
        })}
        <DirectionsRenderer
          directions={directions}
          options={{
            polylineOptions: {
              strokeWeight: 5,
            },
          }}
        />
      </GoogleMap>
    </div>
  );
}
