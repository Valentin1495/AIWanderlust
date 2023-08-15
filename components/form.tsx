'use client';

import PlaceCombobox from '@/components/place-combobox';
import { useMultistepForm } from '@/hooks/useMultistepForm';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import TripLength from './trip-length';

type FormData = {
  place: string;
  tripLength: string;
  numOfPeople: string;
};

const INITIAL_DATA = {
  place: '',
  tripLength: '',
  numOfPeople: '',
};

export default function Form() {
  const [data, setData] = useState<FormData>(INITIAL_DATA);
  const router = useRouter();
  const { place, tripLength, numOfPeople } = data;

  const updateFields = (fields: Partial<FormData>) => {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const {
    currentStepIndex,
    step,
    steps,
    isFirstStep,
    isLastStep,
    goTo,
    next,
    back,
  } = useMultistepForm([
    <PlaceCombobox {...data} updateFields={updateFields} />,
    <TripLength />,
  ]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!place.trim()) return;
    if (!isLastStep) return next();

    const formattedPlace = place.replace(',', '').split(' ').join('+');

    router.push(
      `/${formattedPlace}+itinerary?tripLength=${tripLength}&numOfPeople=${numOfPeople}`
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {step}
        <div>
          {!isFirstStep && (
            <button type='button' onClick={back}>
              Back
            </button>
          )}
          <div
            className={`${
              !place.trim() ? 'justify-between' : 'justify-end'
            } fixed bottom-0 inset-x-0 shadow-top flex items-center px-5 h-20`}
          >
            {!place.trim() && <p className=''>Please select a location</p>}

            <button
              type='submit'
              className='bg-black text-white px-[72px] py-3 rounded-full font-bold hover:opacity-80 transition-opacity h-fit'
            >
              {isLastStep ? 'Submit' : 'Next'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

//  {currentStepIndex + 1} / {steps.length}{' '}
