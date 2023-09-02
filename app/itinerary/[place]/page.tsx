import TouristAttractions from '@/components/tourist-attractions';
import Plan from '@/components/plan';
import Map from '@/components/map';
import { MapPinIcon } from '@/components/icons';
import formatNumOfPeople from '@/utils/formatNumOfPeople';
import formatPlace from '@/utils/formatPlace';

type Props = {
  params: {
    place: string;
  };
  searchParams: {
    lat: string;
    lng: string;
    tripLength: string;
    numOfPeople: string;
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
  const { numOfPeople, tripLength, lat, lng } = searchParams;
  const { place } = params;
  const decodedPlace = decodeURIComponent(place);
  const replacedPlace = formatPlace(decodedPlace);
  const dayOrDays = tripLength === '1' ? 'day' : 'days';
  const withWhom1 =
    numOfPeople === 'Going%20Solo' ? '' : `with my ${numOfPeople}`;
  const withWhom2 = formatNumOfPeople(numOfPeople);
  const res = await fetch(
    'https://main.dqm17qky4qoqa.amplifyapp.com/api/itinerary`',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        replacedPlace,
        withWhom1,
        tripLength,
      }),
    }
  );

  const answer = await res.json();
  const { sights, plan } = answer;

  return (
    <main className='pb-5'>
      <h6 className='flex gap-x-2 items-center mb-3 text-neutral-600'>
        <MapPinIcon className='h-8 w-8 rounded-full bg-orange-200 p-1.5' />
        <span>This trip is powered by AI.</span>
      </h6>
      <h1 className='text-3xl font-bold'>{`Your trip to ${replacedPlace} for ${tripLength} ${dayOrDays} ${withWhom2}`}</h1>
      <br />
      <Map lat={Number(lat)} lng={Number(lng)} />
      <br />
      <TouristAttractions sights={sights} />
      <Plan plan={plan} />
    </main>
  );
}
