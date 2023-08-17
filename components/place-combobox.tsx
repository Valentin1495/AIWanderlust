'use client';

import { Dispatch, SetStateAction } from 'react';
import usePlacesAutocomplete from 'use-places-autocomplete';
import { FormData } from './form';

type Props = {
  place: string;
  updateFields: (fields: Partial<FormData>) => void;
  setAreCleared: Dispatch<SetStateAction<boolean>>;
};

export default function PlaceCombobox({
  place,
  updateFields,
  setAreCleared,
}: Props) {
  const {
    ready,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (val: string) => {
    setValue(val, false);
    clearSuggestions();
    setAreCleared(true);
    // const results = await getGeocode({ address: val });
    // const { lat, lng } = getLatLng(results[0]);
    // setSelectedPlace({ address: val, lat, lng });
    updateFields({ place: val });
  };

  return (
    <div className='space-y-3 pt-10'>
      <h1 className='text-3xl font-bold text-neutral-600 mb-5'>
        Where do you want to go?
      </h1>
      <h4 className='text-sm text-neutral-600'>Select a City/Town.</h4>
      <section className='space-y-2'>
        <input
          required
          value={place}
          onChange={(e) => {
            setAreCleared(false);
            updateFields({ place: e.target.value });
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder='Where to?'
          className='rounded-full shadow-custom px-5 py-3 outline-none text-neutral-500 w-full'
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
      </section>
    </div>
  );
}
