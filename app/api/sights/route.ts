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

  return NextResponse.json(firstResponse);
}
