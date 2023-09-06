import TouristAttractions from '@/components/tourist-attractions';
import Map from '@/components/map';
import { MapPinIcon } from '@/components/icons';
import formatPlace from '@/utils/formatPlace';

type Props = {
  params: {
    place: string;
  };
  searchParams: {
    lat: string;
    lng: string;
  };
};

type Prop = Pick<Props, 'params'>;

export async function generateMetadata({ params }: Prop) {
  const { place } = params;
  const decodedPlace = decodeURIComponent(place);
  const replacedPlace = formatPlace(decodedPlace);
  return {
    title: `TravelGPT - ${replacedPlace} Itinerary`,
  };
}

export default async function Itinerary({ params, searchParams }: Props) {
  const { lat, lng } = searchParams;
  const { place } = params;
  const decodedPlace = decodeURIComponent(place);
  const replacedPlace = formatPlace(decodedPlace);

  const res = await fetch('https://travel-gpt-noahhan.vercel.app/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      replacedPlace,
    }),
  });

  const data = await res.json();
  const sights = data.candidates[0].content;

  return (
    <main className='pb-5'>
      <h6 className='flex gap-x-2 items-center mb-3 text-neutral-600'>
        <MapPinIcon className='h-8 w-8 rounded-full bg-orange-200 p-1.5' />
        <span>This is powered by AI.</span>
      </h6>
      <h1 className='text-3xl font-bold'>{`Top 3 must-see attractions in ${replacedPlace}`}</h1>
      <br />
      <Map lat={Number(lat)} lng={Number(lng)} />
      <br />
      <TouristAttractions sights={sights} />
    </main>
  );
}
