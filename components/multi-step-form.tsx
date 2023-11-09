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
  const firstStep = currentStep === 1;
  const lastStep = currentStep === 3;
  const router = useRouter();
  const back = () => {
    setCurrentStep((prev) => prev - 1);
  };
  const nextOrPush = () => {
    lastStep ? router.push('/') : setCurrentStep((prev) => prev + 1);
  };
  const { place, activity, duration } = data;

  return (
    <div>
      <Header place={place} currentStep={currentStep} />

      {currentStep === 1 && <PlaceCombobox setData={setData} />}

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
