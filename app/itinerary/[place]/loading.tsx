'use client';

import deleteString from '@/utils/delete-string';
import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';

export default function Loading() {
  const { place } = useParams();
  const searchParams = useSearchParams();
  const activity = searchParams.get('activity');
  const decodedPlace = decodeURIComponent(place as string);
  const replacedPlace = deleteString(decodedPlace);

  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-160px)] gap-y-3'>
      <Image
        src={'/plane-unsplash.jpg'}
        alt='plane'
        width={402}
        height={267}
        priority
        className='rounded-xl animate-pulse'
      />
      <p className='w-[402px] text-neutral-600 text-lg bg-neutral-100 p-2 rounded-sm'>
        {replacedPlace} is a great choice! We&#39;re gathering information on{' '}
        {activity}
        ...
        <br />
        (Friendly reminder: AI isn&#39;t always perfect, but it&#39;ll help you
        hit the ground running.)
      </p>
    </div>
  );
}
