import { DiscussServiceClient } from '@google-ai/generativelanguage';
import { GoogleAuth } from 'google-auth-library';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { replacedPlace } = await req.json();
  const MODEL_NAME = 'models/chat-bison-001';
  const API_KEY = process.env.PALM_API_KEY;
  const client = new DiscussServiceClient({
    authClient: new GoogleAuth().fromAPIKey(API_KEY as string),
  });
  const messages = [
    {
      content: `
      what are the top 3 must-see attractions in ${replacedPlace}? Make sure each description of the sight is less than 150 characters.
      `,
    },
  ];

  const res = await client.generateMessage({
    model: MODEL_NAME,
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
              what are the top 3 must-see attractions in Paris? Make sure each description of the sight is less than 150 characters.`,
          },
          output: {
            content: `
              1. Eiffel Tower: This iconic iron tower is synonymous with Paris and offers breathtaking views of the city from its observation decks. It's especially stunning when lit up at night.

              2. Louvre Museum: One of the world's largest and most famous art museums, the Louvre is home to thousands of artworks, including the Mona Lisa and the Venus de Milo.

              3. Notre-Dame Cathedral: Despite the fire in 2019, this historic cathedral still remains a marvel of Gothic architecture. Visitors can admire its intricate facade and interior.
            `,
          },
        },
      ],
      // Required. Alternating prompt/response messages.
      messages,
    },
  });

  const data = res[0].candidates![0].content;

  return NextResponse.json(data);
}
