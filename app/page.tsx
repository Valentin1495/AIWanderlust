import { BotIcon, PlaneIcon } from '@/components/icons';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='bg-orange-50 rounded-md flex flex-col items-center gap-y-3 p-5'>
      <h6 className='text-orange-600 flex items-center gap-x-2'>
        <span>Powered by AI</span>
        <BotIcon className='w-5 h-5' />{' '}
      </h6>
      <h1 className='font-bold text-4xl text-orange-600'>
        Build a trip in minutes
      </h1>
      <p className='font-bold text-xl text-orange-600'>
        Get a personalized itinerary just for you, guided by traveler tips and
        reviews.
      </p>
      <Link
        href={'/generate-itinerary'}
        className='bg-orange-600 text-white font-bold rounded-full gap-x-2 text-center flex px-5 py-3 hover:bg-opacity-90 transition-all mt-3'
      >
        <PlaneIcon className='w-6 h-6' /> Start a trip with AI
      </Link>
    </div>
  );
}
