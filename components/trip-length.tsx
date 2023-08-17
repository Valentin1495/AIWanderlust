import { FormData } from './form';
import { CalendarMinusIcon, CalendarPlusIcon } from './icons';
import { MouseEvent, useState, useEffect } from 'react';

type Props = {
  updateFields: (fields: Partial<FormData>) => void;
  tripLength: number;
};

export default function TripLength({ updateFields, tripLength }: Props) {
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

  const addDays = (e: MouseEvent) => {
    e.preventDefault();
    if (tripLength < 7) {
      updateFields({ tripLength: tripLength + 1 });
    }
  };

  const subtractDays = (e: MouseEvent) => {
    e.preventDefault();
    if (tripLength > 1) {
      updateFields({ tripLength: tripLength - 1 });
    }
  };

  return (
    <div className='pt-10 space-y-3'>
      <h1 className='text-3xl font-bold text-neutral-600 mb-5'>
        How many days?
      </h1>
      <h4 className='text-sm text-neutral-600'>
        Choose a number of days. (7 days maximum)
      </h4>
      <section className='flex items-center gap-x-3'>
        <button onClick={subtractDays}>
          <CalendarMinusIcon
            className={`${
              deactivateMinus
                ? 'text-black/20 cursor-not-allowed active:text-black/20'
                : 'active:text-black/50'
            } w-6 h-6 `}
          />
        </button>
        <span className='text-lg font-bold'>{tripLength}</span>
        <button onClick={addDays}>
          <CalendarPlusIcon
            className={`${
              deactivatePlus
                ? 'text-black/20 cursor-not-allowed active:text-black/20'
                : 'active:text-black/50'
            } w-6 h-6 `}
          />
        </button>
      </section>
    </div>
  );
}
