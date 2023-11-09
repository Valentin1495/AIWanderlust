import { Dispatch, SetStateAction, useState, useRef, useEffect } from 'react';
import { useAutocomplete } from '@vis.gl/react-google-maps';
import { Input } from './ui/input';
import { Data } from './multi-step-form';

type Props = {
  setData: Dispatch<SetStateAction<Data>>;
};

export default function PlaceCombobox({ setData }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');

  const onPlaceChanged = (place: any) => {
    if (place) {
      setInputValue(place.formatted_address || place.name);
    }

    // Keep focus on input element
    inputRef.current && inputRef.current.focus();
  };

  const autocompleteInstance = useAutocomplete({
    inputField: inputRef && inputRef.current,
    onPlaceChanged,
  });

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    if (autocompleteInstance?.getPlace()) {
      const { formatted_address, name } = autocompleteInstance.getPlace();

      setData((prev) => {
        return {
          ...prev,
          place: formatted_address || name,
        };
      });
    }
  }, [inputValue]);

  return (
    <div className='space-y-5 pt-10 flex flex-col items-center'>
      <h1 className='text-3xl font-bold text-neutral-600 mb-5'>
        Where do you want to go?
      </h1>

      <Input
        required
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
        placeholder='Search by city or town'
        className='rounded-full shadow-custom text-neutral-500 px-4 py-2 w-96'
      />
    </div>
  );
}
