import Map from '@/components/map';
import { MapPinIcon } from '@/components/icons';
import Plan from '@/components/plan';
import deleteString from '@/utils/delete-string';
import { chat } from '@/utils/chat';

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
    title: `AIWanderlust - ${replacedPlace} Itinerary`,
  };
}

export const revalidate = 3600;

export default async function Itinerary({ params, searchParams }: Props) {
  const { lat, lng, activity } = searchParams;
  const { place } = params;
  const decodedPlace = decodeURIComponent(place);
  const replacedPlace = deleteString(decodedPlace);
  const replacedActivity = deleteString(activity);

  const answer = await chat(replacedPlace, replacedActivity);

  return (
    <main className='pb-5'>
      <h6 className='flex gap-x-2 items-center mb-3 text-neutral-600'>
        <MapPinIcon className='h-8 w-8 rounded-full bg-orange-200 p-1.5' />
        <span>This trip is powered by AI.</span>
      </h6>
      <h1 className='text-3xl font-bold'>
        {`Your trip to ${replacedPlace}`} for 1 day
      </h1>
      <br />
      <Map lat={Number(lat)} lng={Number(lng)} />
      <br />
      <Plan plan={answer} />
    </main>
  );
}
