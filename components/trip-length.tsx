type Props = {};

export default function TripLength({}: Props) {
  return (
    <div className='pt-10 space-y-3'>
      <h1 className='text-3xl font-bold text-neutral-600 mb-5'>
        How many days?
      </h1>
      <h4 className='text-sm text-neutral-600'>
        Choose a number of days. (7 days maximum)
      </h4>
      <section></section>
    </div>
  );
}
