import { DiscussServiceClient } from '@google-ai/generativelanguage';
import { GoogleAuth } from 'google-auth-library';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { replacedPlace, withWhom1, tripLength } = await req.json();
  const MODEL_NAME = 'models/chat-bison-001';
  const API_KEY = process.env.PALM_API_KEY;
  const dayOrDays = tripLength === '1' ? 'day' : 'days';
  const client = new DiscussServiceClient({
    authClient: new GoogleAuth().fromAPIKey(API_KEY as string),
  });

  const messages = [
    {
      content: `I'm planning to visit ${replacedPlace} ${withWhom1} for ${tripLength} ${dayOrDays}. Can you curate a tour for me based on the top attractions?`,
    },
  ];

  const secondResult = await client.generateMessage({
    model: MODEL_NAME,
    temperature: 0.5,
    candidateCount: 1,
    prompt: {
      examples: [
        {
          input: {
            content: `
            I'm planning to visit New York for 3 days. Can you curate a tour for me based on the top attractions?
            `,
          },
          output: {
            content: `
            Paris is a beautiful city with a wealth of attractions to explore. Here's a suggested itinerary for your 3-day trip:
      
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

  return NextResponse.json(secondResponse);
}
