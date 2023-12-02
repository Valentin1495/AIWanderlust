'use client';

import { useState } from 'react';
import PlaceCombobox from './place-combobox';
import Header from './header';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Activity from './activity';

export type Data = {
  place?: string;
  activity: string;
  duration: string;
};

export default function MultiStepForm() {
  const initialData: Data = {
    place: undefined,
    activity: '',
    duration: '',
  };

  const [data, setData] = useState<Data>(initialData);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [secondErr, setSecondErr] = useState<string>('');
  const firstStep = currentStep === 1;
  const lastStep = currentStep === 3;
  const router = useRouter();
  const { place, activity, duration } = data;

  const back = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const nextOrPush = () => {
    if (lastStep && duration) {
      router.push('/');
    } else if (lastStep && !duration) {
      return;
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <div>
      <Header place={place} currentStep={currentStep} />

      {currentStep === 1 && (
        <section className='space-y-3'>
          <PlaceCombobox setData={setData} />
        </section>
      )}

      {currentStep === 2 &&
        (place ? (
          <Activity activity={activity} setData={setData} />
        ) : (
          <p className='text-sm bg-primary/20 rounded-sm max-w-fit p-1.5 mt-10'>
            Please select a location
          </p>
        ))}

      {currentStep === 3 &&
        (activity ? (
          <h1>duration</h1>
        ) : (
          <p className='text-sm bg-primary/20 rounded-sm max-w-fit p-1.5 mt-10'>
            Please select an activity
          </p>
        ))}

      <div
        className={cn(
          firstStep ? 'justify-end' : 'justify-between',
          'fixed bottom-0 inset-x-0 shadow-top flex items-center px-5 h-20'
        )}
      >
        {!firstStep && (
          <Button
            variant='outline'
            className='rounded-full w-10 h-10 p-0'
            onClick={back}
          >
            <ArrowLeft />
          </Button>
        )}

        <Button
          variant='outline'
          className='rounded-full w-10 h-10 p-0'
          onClick={nextOrPush}
        >
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
