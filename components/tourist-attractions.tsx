type Props = {
  sights: string;
};

export default function TouristAttractions({ sights }: Props) {
  return (
    <div>
      <pre className='whitespace-pre-wrap'>{sights}</pre>
    </div>
  );
}
