import GoogleMapsApiLoader from '@/google-maps-api-loader';
import '@/app/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className='mt-20 mx-auto px-5 sm:max-w-xl xl:max-w-3xl'>
        <GoogleMapsApiLoader>{children}</GoogleMapsApiLoader>
      </body>
    </html>
  );
}
