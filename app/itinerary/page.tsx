import Explanation from '@/components/explanation';
import { DiscussServiceClient } from '@google-ai/generativelanguage';
import { GoogleAuth } from 'google-auth-library';

type SearchParams = {
  city: string;
  numOfPeople: string;
  tripLength: string;
};

export default async function Itinerary({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { city, numOfPeople, tripLength } = searchParams;

  const MODEL_NAME = 'models/chat-bison-001';
  const API_KEY = process.env.PALM_API_KEY;

  const client = new DiscussServiceClient({
    authClient: new GoogleAuth().fromAPIKey(API_KEY as string),
  });

  const messages = [
    {
      content: `Explain ${city} to people who wants to visit it like you're a tour guide.`,
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
          input: { content: `Explain Seoul.` },
          output: {
            content: `
            Seoul, the bustling capital city of South Korea, is a perfect destination for a 3-day trip in September with your partner. With a lively nightlife scene and a plethora of bars and breweries, Seoul is an ideal place for wine and beer enthusiasts. The city is also known for its unique blend of ancient traditions and modern technology, offering a diverse range of activities and attractions. Explore the traditional markets, indulge in the mouth-watering street food, visit the stunning palaces and temples, and take a stroll in the beautiful parks. Seoul has something for everyone, making it a great destination for a memorable trip with your loved one.`,
          },
        },
      ],
      // Required. Alternating prompt/response messages.
      messages,
    },
  });
  const cityInfo = firstResult[0].candidates![0].content as string;

  // const activitiesList = ['Must-see Attractions', 'Great Food'];
  // const activities = activitiesList.join(', ');

  messages.push({ content: cityInfo });
  messages.push({
    content: `I'm going ${numOfPeople} to ${city} for ${tripLength}.Generate a personalized itinerary for me.`,
  });

  const secondResult = await client.generateMessage({
    model: MODEL_NAME,
    temperature: 0.5,
    candidateCount: 1,
    prompt: { messages },
  });

  const secondResponse = secondResult[0].candidates![0].content as string;

  messages.push({ content: secondResponse });
  messages.push({
    content:
      'Give me the exact names of the places mentioned above that I can search for on google map.',
  });

  const thirdResult = await client.generateMessage({
    model: MODEL_NAME,
    temperature: 0.5,
    candidateCount: 1,
    prompt: { messages },
  });

  const thirdResponse = thirdResult[0].candidates![0].content as string;

  return (
    <main>
      <h1 className='text-3xl font-bold'>{`Your trip to ${city} for ${tripLength}`}</h1>
      <br />
      <Explanation cityInfo={cityInfo} />
    </main>
  );
}
