'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function Loading() {
  const { place } = useParams();
  const decodedPlace = decodeURIComponent(place as string);

  return (
    <div className='flex flex-col items-center gap-y-3'>
      <Image
        src={'/plane-unsplash.jpg'}
        alt='plane'
        width={402}
        height={267}
        className='rounded-xl'
      />
      <p className='w-[402px] text-neutral-600 text-lg bg-neutral-100 p-2 rounded-sm'>
        {decodedPlace} is a great choice! We're gathering popular things to do,
        restaurants and more... <br />
        (Friendly reminder: AI isn't always perfect, but it'll help you hit the
        ground running.)
      </p>
    </div>
  );
}
