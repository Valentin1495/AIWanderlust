'use client';

import replacePlusWithBlank from '@/utils/replacePlusWithBlank';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function Loading() {
  const { place } = useParams();
  const decodedPlace = decodeURIComponent(place as string);
  const replacedPlace = replacePlusWithBlank(decodedPlace);

  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-160px)] gap-y-3'>
      <Image
        src={'/plane-unsplash.jpg'}
        alt='plane'
        width={402}
        height={267}
        className='rounded-xl animate-bounce'
      />
      <p className='w-[402px] text-neutral-600 text-lg bg-neutral-100 p-2 rounded-sm'>
        {replacedPlace} is a great choice! We're gathering must-see attractions,
        some tips, and more... <br />
        (Friendly reminder: AI isn't always perfect, but it'll help you hit the
        ground running.)
      </p>
    </div>
  );
}
