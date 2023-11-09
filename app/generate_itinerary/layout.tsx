import '@/app/globals.css';
import MapsApiProvider from '@/components/maps-api-provider';
import { Lora } from 'next/font/google';

const lora = Lora({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={lora.className} suppressHydrationWarning>
      <body className='mt-20 mx-auto px-5 sm:max-w-xl xl:max-w-3xl'>
        <MapsApiProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ''}>
          {children}
        </MapsApiProvider>
      </body>
    </html>
  );
}
