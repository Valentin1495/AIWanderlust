'use client';

import { useJsApiLoader } from '@react-google-maps/api';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function GoogleMapsApiLoader({ children }: Props) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
  });
  if (isLoaded) return children;
  return <p>Loading...</p>;
}
