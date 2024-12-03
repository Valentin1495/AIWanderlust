'use client';

import Background from '@/components/background';
import deleteString from '@/lib/delete-string';
import { useParams } from 'next/navigation';

export default function Loading() {
  const { place } = useParams();
  const decodedPlace = decodeURIComponent(place as string);
  const replacedPlace = deleteString(decodedPlace);

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <Background />
      <p className='text-white font-bold text-lg bg-primary p-2 rounded-full'>
        {replacedPlace}는 좋은 선택이에요! 추천 장소를 생성 중입니다...
      </p>
    </div>
  );
}
