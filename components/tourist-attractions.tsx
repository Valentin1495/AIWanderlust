type Props = {
  sights: string;
};

import { Lora } from 'next/font/google';

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
});

export default function TouristAttractions({ sights }: Props) {
  return (
    <div>
      <pre className={`whitespace-pre-wrap font-sans ${lora.variable}`}>
        {sights}
      </pre>
    </div>
  );
}
