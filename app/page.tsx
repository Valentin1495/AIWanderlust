import { Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='min-h-[calc(100vh-160px)] flex items-center justify-center'>
      <div className='bg-primary/5 rounded-md flex flex-col items-center gap-y-3 p-10 shadow-lg mb-5'>
        <span className='text-primary'>Powered by AI</span>
        <h1 className='font-bold text-4xl text-primary'>
          Build a trip in minutes
        </h1>
        <p className='font-bold text-xl text-primary'>
          Get a personalized itinerary just for you.
        </p>
        <Link
          href={'/generate_itinerary'}
          className='gap-x-2 text-center flex px-5 py-3 btn mt-10'
        >
          <Sparkles /> Start a trip with AI
        </Link>
      </div>
    </div>
  );
}
