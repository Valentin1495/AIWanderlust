type Props = {
  plan?: string | null;
};

import { Lora } from 'next/font/google';

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
});

export default function Plan({ plan }: Props) {
  return (
    <div>
      <pre className={`whitespace-pre-wrap font-sans ${lora.variable}`}>
        {plan ?? 'Model chat-bison-001 cannot generate an itinerary.'}
      </pre>
    </div>
  );
}
