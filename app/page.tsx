import { DiscussServiceClient } from '@google-ai/generativelanguage';
import { GoogleAuth } from 'google-auth-library';

export default async function Home() {
  const MODEL_NAME = 'models/chat-bison-001';
  const API_KEY = process.env.API_KEY;

  const client = new DiscussServiceClient({
    authClient: new GoogleAuth().fromAPIKey(API_KEY as string),
  });
  const city = 'seoul';
  const messages = [{ content: `Explain ${city}.` }];

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
  const firstResponse = firstResult[0].candidates![0].content as string;

  const numOfPeople = 'solo';
  const tripLength = '3 days';

  messages.push({ content: firstResponse });
  messages.push({
    content: `Generate a personalized itinerary just for me. I'm going ${numOfPeople} to ${city} for ${tripLength}.`,
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
    content: 'Give me google.maps.LatLngLiteral of the places mentioned',
  });

  const thirdResult = await client.generateMessage({
    model: MODEL_NAME,
    temperature: 0.5,
    candidateCount: 1,
    prompt: { messages },
  });

  const thirdResponse = thirdResult[0].candidates![0].content;

  return (
    <main>
      <pre>First response: {firstResponse}</pre>
      <br />
      <pre>Second response: {secondResponse}</pre>
      <br />
      <pre>Third response: {thirdResponse}</pre>
    </main>
  );
}
