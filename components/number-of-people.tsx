import { FormData } from './form';
import { HeartIcon, UserGroupIcon, UserIcon, UsersIcon } from './icons';
import Option from './option';
import { useState } from 'react';

export type OptionType = {
  id: number;
  title: string;
  icon: JSX.Element;
};

type Props = {
  updateFields: (fields: Partial<FormData>) => void;
};

export default function NumOfPeople({ updateFields }: Props) {
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);

  const options = [
    {
      id: 1,
      title: 'Going Solo',
      icon: (
        <UserIcon
          className={`option ${
            selectedOptionId === 1 ? 'bg-orange-200' : 'bg-transparent'
          }`}
        />
      ),
    },
    {
      id: 2,
      title: 'Partner',
      icon: (
        <HeartIcon
          className={`option ${
            selectedOptionId === 2 ? 'bg-orange-200' : 'bg-transparent'
          }`}
        />
      ),
    },
    {
      id: 3,
      title: 'Friends',
      icon: (
        <UsersIcon
          className={`option ${
            selectedOptionId === 3 ? 'bg-orange-200' : 'bg-transparent'
          }`}
        />
      ),
    },
    {
      id: 4,
      title: 'Family',
      icon: (
        <UserGroupIcon
          className={`option ${
            selectedOptionId === 4 ? 'bg-orange-200' : 'bg-transparent'
          }`}
        />
      ),
    },
  ];

  return (
    <div className='pt-10 space-y-3'>
      <h1 className='text-3xl font-bold text-neutral-600 mb-5'>
        Who’s coming with you?
      </h1>
      <h4 className='text-sm text-neutral-600'>Choose one.</h4>
      <section className='grid grid-cols-2 xl:grid-cols-4 gap-3'>
        {options.map((option) => (
          <Option
            key={option.id}
            option={option}
            selectedOptionId={selectedOptionId}
            setSelectedOptionId={setSelectedOptionId}
            updateFields={updateFields}
          />
        ))}
      </section>
    </div>
  );
}
