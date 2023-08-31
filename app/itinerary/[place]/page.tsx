import TouristAttractions from '@/components/tourist-attractions';
import Plan from '@/components/plan';
import Map from '@/components/map';
import { MapPinIcon } from '@/components/icons';
import formatNumOfPeople from '@/utils/formatNumOfPeople';
import replacePlusWithBlank from '@/utils/replacePlusWithBlank';
import { DiscussServiceClient } from '@google-ai/generativelanguage';
import { GoogleAuth } from 'google-auth-library';

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

export const revalidate = 0;

export async function generateMetadata({ params }: Prop) {
  const { place } = params;
  const decodedPlace = decodeURIComponent(place);
  const replacedPlace = replacePlusWithBlank(decodedPlace);
  return {
    title: `TravelGPT - ${replacedPlace} Itinerary`,
  };
}

export default async function Itinerary({ params, searchParams }: Props) {
  const { numOfPeople, tripLength, lat, lng } = searchParams;
  const { place } = params;
  const decodedPlace = decodeURIComponent(place);
  const replacedPlace = replacePlusWithBlank(decodedPlace);
  const dayOrDays = tripLength === '1' ? 'day' : 'days';
  const withWhom1 =
    numOfPeople === 'Going+Solo' ? '' : `with my ${numOfPeople}`;
  const withWhom2 = formatNumOfPeople(numOfPeople);
  const MODEL_NAME = 'models/chat-bison-001';
  const API_KEY = process.env.PALM_API_KEY;

  const client = new DiscussServiceClient({
    authClient: new GoogleAuth().fromAPIKey(API_KEY as string),
  });

  const messages = [
    {
      content: `Introduce must-see attractions in ${replacedPlace} to people who wants to visit it like you're a tour guide. They should be clearly labeled '1.', '2.', '3.'... etc.`,
    },
  ];

  const firstResult = await client.generateMessage({
    model: MODEL_NAME, // Required. The model to use to generate the result.
    temperature: 0.5, // Optional. Value `0.0` always uses the highest-probability result.
    candidateCount: 1, // Optional. The number of candidate results to generate.
    prompt: {
      // optional, preamble context to prime responses
      // context: "",
      // Optional. Examples for further fine-tuning of responses.
      examples: [
        {
          input: {
            content: `
          Introduce must-see attractions in Paris to people who wants to visit it like you're a tour guide. They should be clearly labeled '1.', '2.', '3.'... etc.
          `,
          },
          output: {
            content: `
            Paris, often referred to as the "City of Light," is renowned for its rich history, iconic landmarks, and artistic heritage. There are numerous must-see attractions in Paris that cater to a wide range of interests. Here are some of the most popular ones:

            1. Eiffel Tower: This iconic iron tower is synonymous with Paris and offers breathtaking views of the city from its observation decks. It's especially stunning when lit up at night.
            
            2. Louvre Museum: One of the world's largest and most famous art museums, the Louvre is home to thousands of artworks, including the Mona Lisa and the Venus de Milo.
            
            3. Notre-Dame Cathedral: Despite the fire in 2019, this historic cathedral still remains a marvel of Gothic architecture. Visitors can admire its intricate facade and interior.
            
            4. Champs-Élysées and Arc de Triomphe: The grand Champs-Élysées avenue leads to the Arc de Triomphe, a monument honoring those who fought and died during the French Revolutionary and Napoleonic Wars.
            
            5. Montmartre and Sacré-Cœur Basilica: The charming neighborhood of Montmartre offers narrow streets, artists' studios, and the beautiful Sacré-Cœur Basilica with panoramic views of the city.
            
            6. Seine River Cruises: Cruising along the Seine River offers a unique perspective of Paris, allowing you to see many of its landmarks from a different angle.
            
            7. Musée d'Orsay: Housed in a former railway station, this museum showcases an impressive collection of Impressionist and Post-Impressionist masterpieces.
            
            8. Palace of Versailles: While technically just outside Paris, the opulent Palace of Versailles is a must-visit. Its stunning architecture, vast gardens, and rich history are awe-inspiring.
            
            9. Sainte-Chapelle: This medieval Gothic chapel is known for its stunning stained glass windows that depict biblical scenes in vibrant colors.
            
            10. Les Invalides: This complex includes the Musée de l'Armée, which houses military artifacts and the tomb of Napoleon Bonaparte.
            
            11. Musée Rodin: Home to numerous works by the sculptor Auguste Rodin, including his famous piece "The Thinker."
            
            12. Panthéon: An impressive neoclassical mausoleum that houses the remains of many notable French figures.
            
            13. Cruise on the Seine River: Taking a boat cruise along the Seine River allows you to enjoy a different perspective of the city and its landmarks.
            
            14. Luxembourg Gardens: A serene oasis in the heart of the city, perfect for a leisurely stroll and enjoying the picturesque surroundings.
            
            These are just a few of the many attractions Paris has to offer. Remember that the city is also known for its culinary scene, charming neighborhoods, and vibrant cultural life, so take the time to explore beyond the well-known landmarks as well.
            `,
          },
        },
      ],
      // Required. Alternating prompt/response messages.
      messages,
    },
  });
  const firstResponse = firstResult[0].candidates![0].content as string;
  const sights = firstResponse;

  messages.push({ content: sights });
  messages.push({
    content: `I'm planning to visit ${replacedPlace} ${withWhom1} for ${tripLength} days. Can you curate a tour for me based on the sights you mentioned?`,
  });

  const secondResult = await client.generateMessage({
    model: MODEL_NAME,
    temperature: 0.5,
    candidateCount: 1,
    prompt: {
      examples: [
        {
          input: {
            content: `
      I'm planning to visit New York for 3 days. Can you curate a tour for me based on the sights you mentioned?
      `,
          },
          output: {
            content: `
      Of course! Paris is a beautiful city with a wealth of attractions to explore. Here's a suggested itinerary for your 3-day trip:

      Day 1: Explore the Icons
        Morning: Start your day at the iconic Eiffel Tower. Arrive early to beat the crowds and enjoy breathtaking views of the city from the top.
        Afternoon: Head to the Louvre Museum, home to an incredible collection of art and historical artifacts. Don't miss the Mona Lisa and other famous masterpieces.
        Evening: Take a leisurely stroll along the Seine River and enjoy the romantic atmosphere. Consider a Seine River cruise to see the city's landmarks beautifully illuminated at night.
      
      Day 2: Art, History, and Montmartre
        Morning: Visit the artistic Montmartre neighborhood. Explore the Sacré-Cœur Basilica for panoramic city views and discover the charming streets that have inspired many artists.
        Afternoon: Spend the afternoon at the Musée d'Orsay, which houses an impressive collection of Impressionist and Post-Impressionist masterpieces.
        Evening: Explore the vibrant Le Marais district, known for its historic architecture, trendy boutiques, and lively nightlife. Enjoy a leisurely dinner at a local bistro.
      
      Day 3: Champs-Élysées, Notre-Dame, and River Cruise
        Morning: Walk down the famous Champs-Élysées avenue, lined with shops, cafes, and landmarks. Reach the Arc de Triomphe and admire the grandeur of the city from its viewpoint.
        Afternoon: Visit the Cathédrale Notre-Dame de Paris. Although parts of it were damaged in a fire, it's still worth seeing for its historical significance and Gothic architecture.
        Late Afternoon: Embark on a relaxing Seine River cruise to see many of Paris' major landmarks from the water.
        Evening: Wrap up your trip with a delightful dinner at a traditional Parisian brasserie.
      
      Remember that this itinerary is just a suggestion, and you should tailor it to your interests and pace. Paris has so much to offer, from its world-class museums and landmarks to its charming neighborhoods and culinary delights. Make sure to also take time to wander the streets, indulge in some delicious pastries, and soak in the Parisian atmosphere. Bon voyage!
      `,
          },
        },
      ],
      messages,
    },
  });

  const secondResponse = secondResult[0].candidates![0].content as string;
  const plan = secondResponse;

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
