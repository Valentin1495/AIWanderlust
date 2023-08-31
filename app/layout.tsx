import GoogleMapsApiLoader from '@/google-maps-api-loader';
import './globals.css';
import type { Metadata } from 'next';
import { Lora } from 'next/font/google';

export const metadata: Metadata = {
  title: 'TravelGPT - AI-Powered Travel Itinerary Planner',
  description:
    "TravelGPT is your ultimate companion for planning memorable and personalized travel experiences. Say goodbye to hours of researching and organizing, and let our AI-powered Travel Itinerary Planner take care of the hard work for you. Whether you're a globetrotter or a casual traveler, TravelGPT will create a tailor-made itinerary that matches your interests, preferences, and schedule.",
};

const lora = Lora({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={lora.className}>
      <head>
        <link rel='icon' href='/favicons/favicon.ico' />
      </head>
      <body className='mt-20 mx-auto px-5 sm:max-w-xl xl:max-w-3xl'>
        <GoogleMapsApiLoader>{children}</GoogleMapsApiLoader>
      </body>
    </html>
  );
}
