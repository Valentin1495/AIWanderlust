'use client';

import PlaceCombobox from '@/components/place-combobox';
import { useMultistepForm } from '@/hooks/useMultistepForm';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

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
  } = useMultistepForm([<PlaceCombobox updateFields={updateFields} />]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
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

          <button
            type='submit'
            className='fixed bottom-10 right-10 bg-black text-white px-[72px] py-3 rounded-full font-bold hover:opacity-80 transition-opacity'
          >
            {isLastStep ? 'Submit' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  );
}

//  {currentStepIndex + 1} / {steps.length}{' '}
