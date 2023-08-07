'use client';

import { City, Country } from 'country-state-city';
import { useState } from 'react';
import Select from 'react-select';

type CountryOption = {
  value: string;
  label: string;
  code: string;
} | null;

type CityOption = {
  value: string;
  label: string;
} | null;

type Props = {};

export default function CityPicker({}: Props) {
  const allCountries = Country.getAllCountries();
  const countryOptions = allCountries.map((country) => {
    return {
      value: country.name,
      label: country.name,
      code: country.isoCode,
    };
  });

  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(null);
  const [selectedCity, setSelectedCity] = useState<CityOption>(null);

  const handleCountryChange = (countryOption: CountryOption) => {
    setSelectedCountry(countryOption);
  };
  const handleCityChange = (cityOption: CityOption) => {
    setSelectedCity(cityOption);
  };

  const countryCode = selectedCountry?.code;

  const cityOptions = City.getCitiesOfCountry(countryCode as string)?.map(
    (city) => {
      return {
        value: city.name,
        label: city.name,
      };
    }
  );

  return (
    <div>
      <Select
        options={countryOptions}
        value={selectedCountry}
        onChange={handleCountryChange}
      />

      {selectedCountry && (
        <Select
          options={cityOptions}
          value={selectedCity}
          onChange={handleCityChange}
        />
      )}
    </div>
  );
}
