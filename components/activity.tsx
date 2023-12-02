import { Dispatch, MouseEvent, SetStateAction } from 'react';
import { Data } from './multi-step-form';

type Props = {
  activity: string;
  setData: Dispatch<SetStateAction<Data>>;
};

export default function Activity({ activity, setData }: Props) {
  const activities = [
    'Must-see Attractions',
    'Hidden Gems',
    'Museums',
    'History',
    'Culture',
    'Great Food',
    'Outdoors',
    'Wine & Beer',
    'Arts & Theatre',
    'Adventure and Sports',
    'Nightlife',
    'Spas',
    'Shopping',
  ];

  const handleClick = (e: MouseEvent, activity: string) => {
    e.preventDefault();
    setData((prev) => {
      return {
        ...prev,
        activity,
      };
    });
  };

  return (
    <div className='pt-10'>
      <h1 className='text-3xl font-bold text-neutral-600'>
        How do you want to spend your time?
      </h1>
      <h4 className='text-neutral-600 mt-1'>Choose one.</h4>
      <section className='mt-10'>
        {activities.map((el, i) => (
          <button
            key={i}
            onClick={(e) => handleClick(e, el)}
            className={`${
              activity === el ? 'border-black' : 'border-black/20'
            } border-2 mr-3 mb-3 px-3 py-1.5 rounded-full cursor-pointer transition-colors`}
          >
            {el}
          </button>
        ))}
      </section>
    </div>
  );
}
