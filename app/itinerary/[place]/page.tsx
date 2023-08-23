import TouristAttractions from '@/components/tourist-attractions';
import Plan from '@/components/plan';
import { DiscussServiceClient } from '@google-ai/generativelanguage';
import { GoogleAuth } from 'google-auth-library';

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
      content: `Introduce must-see attractions in ${decodedPlace} to people who wants to visit it like you're a tour guide.`,
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
      // examples: [
      //   {
      //     input: { content: `` },
      //     output: {
      //       content: ``,
      //     },
      //   },
      // ],
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
    <main>
      <h1 className='text-3xl font-bold'>{`Your trip to ${decodedPlace} for ${tripLength} ${dayOrDays}`}</h1>
      <br />
      <TouristAttractions sights={sights} />
      <Plan plan={plan} />
    </main>
  );
}
