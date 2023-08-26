import { Dispatch, SetStateAction } from 'react';
import usePlacesAutocomplete from 'use-places-autocomplete';
import { FormData } from './form';
import { SearchIcon } from './icons';

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
    <div className='space-y-5 pt-10 flex flex-col items-center'>
      <h1 className='text-3xl font-bold text-neutral-600 mb-5'>
        Where do you want to go?
      </h1>
      <div className='space-y-2'>
        <section className='rounded-full flex items-center gap-x-3 shadow-custom text-neutral-500 px-5 py-3 w-96'>
          <SearchIcon className='w-6 h-6' />
          <input
            required
            value={place}
            onChange={(e) => {
              setAreCleared(false);
              updateFields({ place: e.target.value });
              setValue(e.target.value);
            }}
            disabled={!ready}
            placeholder='Search by city or town'
            className='outline-none w-full'
          />
        </section>
        {status === 'OK' && (
          <ul className='shadow-md rounded-md w-96'>
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
      </div>
    </div>
  );
}
