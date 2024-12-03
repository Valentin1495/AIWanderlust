import '@/app/globals.css';
import Background from '@/components/background';
import MapsApiProvider from '@/components/maps-api-provider';
import { Lora } from 'next/font/google';

const lora = Lora({
  subsets: ['latin'],
});

export default function generateItineraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={lora.className}>
      <Background />
      <MapsApiProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}>
        {children}
      </MapsApiProvider>
    </div>
  );
}
