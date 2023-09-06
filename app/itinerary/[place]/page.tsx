import Map from '@/components/map';
import { MapPinIcon } from '@/components/icons';
import Plan from '@/components/plan';
import deleteString from '@/utils/delete-string';

type Props = {
  params: {
    place: string;
  };
  searchParams: {
    lat: string;
    lng: string;
    activity: string;
  };
};

type Prop = Pick<Props, 'params'>;

export async function generateMetadata({ params }: Prop) {
  const { place } = params;
  const decodedPlace = decodeURIComponent(place);
  const replacedPlace = deleteString(decodedPlace);

  return {
    title: `TravelGPT - ${replacedPlace} Itinerary`,
  };
}
export const revalidate = 0;
export default async function Itinerary({ params, searchParams }: Props) {
  const { lat, lng, activity } = searchParams;
  const { place } = params;
  const decodedPlace = decodeURIComponent(place);
  const replacedPlace = deleteString(decodedPlace);
  const replacedActivity = deleteString(activity);

  const res = await fetch('https://travel-gpt-noahhan.vercel.app/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      replacedPlace,
      replacedActivity,
    }),
  });
  const answer = await res.json();

  return (
    <main className='pb-5'>
      <h6 className='flex gap-x-2 items-center mb-3 text-neutral-600'>
        <MapPinIcon className='h-8 w-8 rounded-full bg-orange-200 p-1.5' />
        <span>This trip is powered by AI.</span>
      </h6>
      <h1 className='text-3xl font-bold'>{`Your trip to ${replacedPlace}`}</h1>
      <br />
      <Map lat={Number(lat)} lng={Number(lng)} />
      <br />
      <Plan plan={answer} />
    </main>
  );
}
