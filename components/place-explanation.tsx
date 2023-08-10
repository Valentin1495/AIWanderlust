type Props = {
  placeInfo: string;
};

export default function PlaceExplanation({ placeInfo }: Props) {
  return (
    <div>
      <pre className='whitespace-pre-wrap'>{placeInfo}</pre>
    </div>
  );
}
