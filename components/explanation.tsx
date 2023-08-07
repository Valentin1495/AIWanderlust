type Props = {
  cityInfo: string;
};

export default function Explanation({ cityInfo }: Props) {
  return (
    <div>
      <pre className='whitespace-pre-wrap'>{cityInfo}</pre>
    </div>
  );
}
