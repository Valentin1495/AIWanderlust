import { BotIcon } from './icons';

type Props = {
  formattedPlace: string;
  areCleared: boolean;
  progress: number;
};
export default function Header({
  formattedPlace,
  areCleared,
  progress,
}: Props) {
  const progressPct = progress.toString() + '%';

  return (
    <div className='fixed top-0 inset-x-0'>
      <div className='flex flex-col items-center justify-center h-20 shadow-md shadow-orange-200/80'>
        <span className='text-sm flex items-center gap-x-2'>
          <BotIcon className='w-6 h-6 text-orange-500' /> Powered by AI
        </span>
        {formattedPlace && areCleared && (
          <h4 className='font-bold'>{formattedPlace} Itinerary</h4>
        )}
      </div>
      <div
        className='bg-orange-300 h-1.5 duration'
        style={{
          width: progressPct,
          transition: 'width 0.3s linear',
        }}
      ></div>
    </div>
  );
}
