import { City } from 'country-state-city';

type Props = {};
export default function CityPicker({}: Props) {
  const allCities = City.getAllCities();
  console.log(allCities);
  return <div>city-picker</div>;
}
