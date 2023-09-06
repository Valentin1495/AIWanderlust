import { DiscussServiceClient } from '@google-ai/generativelanguage';
import { GoogleAuth } from 'google-auth-library';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { replacedPlace, replacedActivity } = await req.json();
  const MODEL_NAME = 'models/chat-bison-001';
  const API_KEY = process.env.PALM_API_KEY;
  const client = new DiscussServiceClient({
    authClient: new GoogleAuth().fromAPIKey(API_KEY as string),
  });
  const messages = [
    {
      content: `
        I want to spend my time enjoying ${replacedActivity} in ${replacedPlace}. Can you recommend a plan for me? Make sure your answer is less than 400 characters.
      `,
    },
  ];

  const data = await client.generateMessage({
    model: MODEL_NAME,
    temperature: 0, // Optional. Value `0.0` always uses the highest-probability result.
    candidateCount: 1, // Optional. The number of candidate results to generate.
    prompt: {
      // optional, preamble context to prime responses
      // context: "",
      // Optional. Examples for further fine-tuning of responses.
      //   examples: [
      //     {
      //       input: {
      //         content: `
      //       },
      //       output: {
      //         content: `
      //         `,
      //       },
      //     },
      //   ],
      // Required. Alternating prompt/response messages.
      messages,
    },
  });

  const answer = data[0].candidates![0].content;

  return NextResponse.json(answer);
}
