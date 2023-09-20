import { DiscussServiceClient } from '@google-ai/generativelanguage';
import { GoogleAuth } from 'google-auth-library';

export async function chat(place: string, activity: string) {
  const MODEL_NAME = 'models/chat-bison-001';
  const API_KEY = process.env.PALM_API_KEY;
  const client = new DiscussServiceClient({
    authClient: new GoogleAuth().fromAPIKey(API_KEY as string),
  });
  const messages = [
    {
      content: `
          I want to spend my time enjoying ${activity} in ${place} for 1 day. Can you curate a tour for me? Make sure it is short and simple.
        `,
    },
  ];

  const data = await client.generateMessage({
    model: MODEL_NAME,
    temperature: 0, // Optional. Value `0.0` always uses the highest-probability result.
    candidateCount: 1, // Optional. The number of candidate results to generate.
    prompt: {
      // optional, preamble context to prime responses
      // context: ''
      // Optional. Examples for further fine-tuning of responses.
      examples: [
        {
          input: {
            content: `
                Can you curate a tour to paris for 1 day? Make sure the itinerary is clearly labeled morning, lunch, afternoon, evening, dinner and night. It should contain less than 700 characters. Don't provide additional details about it. I just need an itinerary.
                `,
          },
          output: {
            content: `
              Morning:
              1. Eiffel Tower: Start your day early at the iconic Eiffel Tower. You can admire its beauty from the outside or choose to go up to the second floor for panoramic views of the city (consider booking tickets in advance to skip the lines).
  
              Lunch:
              2. Café Break: Head to a charming Parisian café nearby for a leisurely French breakfast or brunch. Try croissants, café au lait, or a classic omelette.
  
              Afternoon:
              3. Louvre Museum: Visit the world-famous Louvre Museum, home to the Mona Lisa and many other remarkable artworks. You can explore the highlights in a couple of hours.
  
              Late Afternoon:
              4. Seine River Cruise: Take a relaxing Seine River cruise to see Paris from a different perspective. These tours often depart near the Eiffel Tower and provide great photo opportunities.
  
              Evening:
              5. Notre-Dame Cathedral: Stroll over to the Notre-Dame Cathedral and admire its stunning architecture from the outside.
  
              Dinner:
              6. Dinner in Le Marais: Enjoy a delicious dinner in the charming Le Marais district. You'll find many restaurants offering a variety of French and international cuisines.
  
              Night:
              7. Illuminated Eiffel Tower: End your day by returning to the Eiffel Tower in the evening. It's beautifully illuminated after sunset, creating a magical atmosphere.
                `,
          },
        },
      ],
      // Required. Alternating prompt/response messages.
      messages,
    },
  });

  const answer = data[0].candidates![0].content;

  return answer;
}
