'use client';

import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { Data } from './multi-step-form';
import { CalendarMinus, CalendarPlus } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = { data: Data; setData: Dispatch<SetStateAction<Data>> };

export default function TripLength({ data, setData }: Props) {
  const { tripLength } = data;

  const [deactivateMinus, setDeactivateMinus] = useState<boolean>(false);
  const [deactivatePlus, setDeactivatePlus] = useState<boolean>(false);

  useEffect(() => {
    if (tripLength === 7) {
      setDeactivatePlus(true);
    } else {
      setDeactivatePlus(false);
    }
    if (tripLength === 1) {
      setDeactivateMinus(true);
    } else {
      setDeactivateMinus(false);
    }
  }, [tripLength]);

  const addDays = () => {
    if (tripLength < 7) {
      setData((prev) => {
        return { ...prev, tripLength: tripLength + 1 };
      });
    }
  };

  const subtractDays = () => {
    if (tripLength > 1) {
      setData((prev) => {
        return { ...prev, tripLength: tripLength - 1 };
      });
    }
  };
  return (
    <div className='pt-10'>
      <h1 className='text-3xl font-bold text-neutral-600 mb-5'>
        How many days?
      </h1>
      <h4 className='text-sm text-neutral-600 mb-3'>
        Choose a number of days. (7 days maximum)
      </h4>

      <section className='flex items-center gap-x-3'>
        <button
          className={cn(
            'active:text-black/50',
            deactivateMinus &&
              'text-black/20 cursor-not-allowed active:text-black/20'
          )}
          onClick={subtractDays}
        >
          <CalendarMinus className='w-6 h-6' />
        </button>
        <span className='text-lg font-bold'>{tripLength}</span>
        <button
          className={cn(
            'active:text-black/50',
            deactivatePlus &&
              'text-black/20 cursor-not-allowed active:text-black/20'
          )}
          onClick={addDays}
        >
          <CalendarPlus className='w-6 h-6' />
        </button>
      </section>
    </div>
  );
}
