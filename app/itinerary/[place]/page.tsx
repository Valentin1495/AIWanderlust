import TouristAttractions from '@/components/tourist-attractions';
import Plan from '@/components/plan';
import { DiscussServiceClient } from '@google-ai/generativelanguage';
import { GoogleAuth } from 'google-auth-library';
import { MapPinIcon } from '@/components/icons';

type Props = {
  params: {
    place: string;
  };

  searchParams: {
    tripLength: string;
    numOfPeople: string;
  };
};

export default async function Itinerary({ params, searchParams }: Props) {
  const { numOfPeople, tripLength } = searchParams;
  const { place } = params;
  const decodedPlace = decodeURIComponent(place);
  const dayOrDays = tripLength === '1' ? 'day' : 'days';
  const people = numOfPeople === 'Going solo' ? '' : `with my ${numOfPeople}`;

  const MODEL_NAME = 'models/chat-bison-001';
  const API_KEY = process.env.PALM_API_KEY;

  const client = new DiscussServiceClient({
    authClient: new GoogleAuth().fromAPIKey(API_KEY as string),
  });

  const messages = [
    {
      content: `Introduce must-see attractions in ${decodedPlace} to people who wants to visit it like you're a tour guide. They should be clearly labeled "1.", "2.", "3."...`,
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
          Introduce must-see attractions in Paris to people who wants to visit it like you're a tour guide. They should be clearly labeled "1.", "2.", "3."...
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
  // const activitiesList = ['Must-see Attractions', 'Great Food'];
  // const activities = activitiesList.join(', ');

  messages.push({ content: sights });
  messages.push({
    content: `I'm planning to visit ${decodedPlace} ${people} for ${tripLength} days. Can you curate a tour for me based on the sights you mentioned?`,
  });

  const secondResult = await client.generateMessage({
    model: MODEL_NAME,
    temperature: 0.5,
    candidateCount: 1,
    prompt: { messages },
  });

  const secondResponse = secondResult[0].candidates![0].content as string;
  const plan = secondResponse;

  // messages.push({ content: plan });
  // messages.push({
  //   content:
  //     'Give me the exact names of the places mentioned above that I can search for on google map.',
  // });

  // const thirdResult = await client.generateMessage({
  //   model: MODEL_NAME,
  //   temperature: 0.5,
  //   candidateCount: 1,
  //   prompt: { messages },
  // });

  //   const thirdResponse = thirdResult[0].candidates![0].content as string;

  return (
    <main className='pb-5'>
      <h6 className='flex gap-x-2 items-center text-neutral-600'>
        <MapPinIcon className='h-8 w-8 rounded-full  bg-orange-200 p-1.5' />
        <span>This trip is powered by AI.</span>
      </h6>
      <h1 className='text-3xl font-bold'>{`Your trip to ${decodedPlace} for ${tripLength} ${dayOrDays}`}</h1>
      <br />
      <TouristAttractions sights={sights} />
      <Plan plan={plan} />
    </main>
  );
}
