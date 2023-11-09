import { formatPlace } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

type Props = {
  place?: string;
  currentStep: number;
};
export default function Header({ place, currentStep }: Props) {
  const progress = (currentStep / 3) * 100;
  const progressPct = progress.toString() + '%';
  const formattedPlace = place ? formatPlace(place) : null;

  return (
    <div className='fixed top-0 inset-x-0'>
      <div className='flex flex-col items-center justify-center h-20 shadow-md shadow-primary/30'>
        <span className='text-sm flex items-center gap-x-2'>
          <Sparkles className='text-primary' /> Powered by AI
        </span>
        {formattedPlace && (
          <h4 className='font-semibold'>{formattedPlace} Itinerary</h4>
        )}
      </div>
      <div
        className='bg-primary h-1'
        style={{
          width: progressPct,
          transition: 'width 0.15s linear',
        }}
      ></div>
    </div>
  );
}
