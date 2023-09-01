import TouristAttractions from '@/components/tourist-attractions';
import formatPlace from '@/utils/formatPlace';
import Link from 'next/link';

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
    title: `TravelGPT - Top Attractions in ${replacedPlace}`,
  };
}
export const revalidate = 0;
export default async function Sights({ params, searchParams }: Props) {
  const { numOfPeople, tripLength, lat, lng } = searchParams;
  const { place } = params;
  console.log(place);
  const decodedPlace = decodeURIComponent(place);
  const replacedPlace = formatPlace(decodedPlace);

  const res = await fetch('https://travel-gpt-noahhan.vercel.app/api/sights', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      replacedPlace,
    }),
  });

  const sights = await res.json();

  return (
    <main className='pb-5'>
      <h1 className='text-3xl font-bold'>{`Top Attractions in ${replacedPlace}`}</h1>
      <br />
      <TouristAttractions sights={sights} />
      <br />
      <Link
        href={`/itinerary/${place}?lat=${lat}&lng=${lng}&tripLength=${tripLength}&numOfPeople=${numOfPeople}`}
      >
        Get your itinerary based on these.
      </Link>
    </main>
  );
}
