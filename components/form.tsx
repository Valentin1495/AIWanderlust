'use client';

import PlaceCombobox from '@/components/place-combobox';
import { useMultistepForm } from '@/hooks/useMultistepForm';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import TripLength from './trip-length';
import Header from './header';
import { ArrowBigLeftDashIcon } from './icons';
import NumOfPeople from './number-of-people';

export type FormData = {
  place: string;
  tripLength: number;
  numOfPeople: string;
};

const INITIAL_DATA = {
  place: '',
  tripLength: 3,
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
    // goTo,
    next,
    back,
  } = useMultistepForm([
    <PlaceCombobox
      {...data}
      updateFields={updateFields}
      setAreCleared={setAreCleared}
    />,
    <TripLength {...data} updateFields={updateFields} />,
    <NumOfPeople {...data} updateFields={updateFields} />,
  ]);
  const indexOfComma = place.includes(',') ? place.indexOf(',') : place.length;
  const formattedPlace = place.slice(0, indexOfComma);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!areCleared) return;
    if (!isLastStep) return next();

    router.push(
      `/itinerary/${formattedPlace}?tripLength=${tripLength}&numOfPeople=${numOfPeople}`
    );
  };
  const progress = (currentStepIndex / (steps.length - 1)) * 100;

  return (
    <div>
      <Header
        formattedPlace={formattedPlace}
        areCleared={areCleared}
        progress={progress}
      />
      <form onSubmit={handleSubmit}>
        {step}

        <div
          className={`${
            isFirstStep ? 'justify-end' : 'justify-between'
          } fixed bottom-0 inset-x-0 shadow-top flex items-center px-5 h-20`}
        >
          {!isFirstStep && (
            <button
              type='button'
              onClick={back}
              className='flex items-center gap-x-1 hover:opacity-80 transition-opacity'
            >
              <ArrowBigLeftDashIcon className='w-7 h-7 text-orange-500' />
              <span className='text-orange-500 font-bold underline underline-offset-4'>
                Back
              </span>
            </button>
          )}
          <button
            type='submit'
            className='bg-orange-500 text-white py-3 rounded-full font-bold hover:opacity-80 transition-opacity h-fit w-48'
          >
            {isLastStep ? 'Submit' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  );
}
