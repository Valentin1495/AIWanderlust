import { PlaneIcon } from '@/components/icons';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='min-h-[calc(100vh-160px)] flex items-center justify-center'>
      <div className='bg-orange-50 rounded-md flex flex-col items-center gap-y-3 p-10 shadow-lg mb-5'>
        <span className='text-orange-600'>Powered by AI</span>
        <h1 className='font-bold text-4xl text-orange-600'>
          Build a trip in minutes
        </h1>
        <p className='font-bold text-xl text-orange-600'>
          Get a personalized itinerary just for you.
        </p>
        <Link
          href={'/generate-itinerary'}
          className='gap-x-2 text-center flex px-5 py-3 btn mt-10'
        >
          <PlaneIcon className='w-6 h-6' /> Start a trip with AI
        </Link>
      </div>
    </div>
  );
}
