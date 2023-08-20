type Props = {
  plan: string;
};

export default function Plan({ plan }: Props) {
  return (
    <div>
      <pre className='whitespace-pre-wrap'>{plan}</pre>
    </div>
  );
}
