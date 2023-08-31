'use client';

import { Libraries, useJsApiLoader } from '@react-google-maps/api';
import { ReactNode } from 'react';
import Loader from './components/loader';

type Props = {
  children: ReactNode;
};

const libraries: Libraries = ['places'];

export default function GoogleMapsApiLoader({ children }: Props) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
    libraries,
  });

  if (!isLoaded)
    return (
      <div className='flex justify-center'>
        <Loader />
      </div>
    );

  return <div>{children}</div>;
}
