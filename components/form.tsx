'use client';

import PlaceCombobox from '@/components/place-combobox';
import { useMultistepForm } from '@/hooks/useMultistepForm';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import TripLength from './trip-length';
import { BotIcon } from './icons';

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
  const [areCleared, setAreCleared] = useState<boolean>(false);
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
    <PlaceCombobox
      {...data}
      updateFields={updateFields}
      setAreCleared={setAreCleared}
    />,
    <TripLength />,
  ]);
  const indexOfComma = place.includes(',') ? place.indexOf(',') : place.length;
  const formattedPlace = place.slice(0, indexOfComma);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!place.trim()) return;
    if (!isLastStep) return next();

    router.push(
      `/${formattedPlace}+itinerary?tripLength=${tripLength}&numOfPeople=${numOfPeople}`
    );
  };
  const progress = (currentStepIndex + 1 / steps.length) * 100;

  return (
    <div>
      <div className='fixed top-0 inset-x-0 flex flex-col items-center justify-center h-20 shadow-md'>
        <span className='text-sm flex items-center gap-x-2'>
          <BotIcon className='w-6 h-6' /> Powered by AI
        </span>
        {formattedPlace && areCleared && (
          <h4 className='font-bold'>{formattedPlace} itinerary</h4>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        {step}
        <div>
          {!isFirstStep && (
            <button type='button' onClick={back}>
              Back
            </button>
          )}
          <div className='justify-end fixed bottom-0 inset-x-0 shadow-top flex items-center px-5 h-20'>
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
