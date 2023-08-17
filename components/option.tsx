import { FormData } from './form';
import { OptionType } from './number-of-people';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  option: OptionType;
  selectedOptionId: number | null;
  setSelectedOptionId: Dispatch<SetStateAction<number | null>>;
  updateFields: (fields: Partial<FormData>) => void;
};

export default function Option({
  option,
  selectedOptionId,
  setSelectedOptionId,
  updateFields,
}: Props) {
  const { title, icon, id } = option;
  const selected = selectedOptionId === id;
  const selectOption = () => {
    setSelectedOptionId(id);
    updateFields({
      numOfPeople: title,
    });
  };

  return (
    <div
      onClick={selectOption}
      className={`space-y-3 ${
        selected ? 'border-black' : 'border-black/20'
      } border-2 w-36 p-3 rounded-lg cursor-pointer transition-colors`}
    >
      {icon}
      <h3 className='text-lg font-bold text-neutral-600'>{title}</h3>
    </div>
  );
}
