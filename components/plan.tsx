type Props = {
  plan: string;
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
        {plan}
      </pre>
    </div>
  );
}
