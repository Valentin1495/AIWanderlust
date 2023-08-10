'use client';

import { useState } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

interface SelectedPlace {
  address: string;
  lat: number;
  lng: number;
}

type Place = {
  place: string;
};

type Props = {
  updateFields: (fields: Partial<Place>) => void;
};

function PlaceCombobox({ updateFields }: Props) {
  const [selectedPlace, setSelectedPlace] = useState<SelectedPlace | null>(
    null
  );
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (val: string) => {
    setValue(val, false);
    clearSuggestions();

    const results = await getGeocode({ address: val });
    const { lat, lng } = getLatLng(results[0]);
    setSelectedPlace({ address: val, lat, lng });
    updateFields({ place: val });
  };

  return (
    <div className='space-y-5'>
      <h4 className='text-sm text-neutral-500'>Select a City/Town</h4>
      <section className='space-y-2'>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          placeholder='Where to?'
          className='rounded-full shadow-md px-5 py-3 outline-none text-neutral-500'
        />
        {status === 'OK' && (
          <ul className='shadow-md rounded-md'>
            {data.map(({ place_id, description }) => (
              <li
                key={place_id}
                className='hover:bg-neutral-100 p-3 cursor-pointer'
                onClick={() => handleSelect(description)}
              >
                {description}
              </li>
            ))}
          </ul>
        )}
        {selectedPlace && (
          <div>
            <h5>Selected Place:</h5>
            <p>{selectedPlace.address}</p>
            <p>Latitude: {selectedPlace.lat}</p>
            <p>Longitude: {selectedPlace.lng}</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default PlaceCombobox;
