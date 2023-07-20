'use client';
import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import CityData from '@/interfaces/city';
import { debounce } from '@/utils';

const MIN_CITY_CHARS = 3;
interface jsonResponse {
  cities: CityData[];
}

export default function SearchBox(): React.ReactElement {
  const [inputValue, setInputValue] = useState<string>('');
  const [cities, setCities] = useState<CityData[]>([]);

  const fetchData = useCallback(async (cityName: string) => {
    await fetch(`/api/city/${cityName}`)
      .then(res => res.json())
      .then((data: jsonResponse) => setCities(data.cities))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    inputValue.length >= MIN_CITY_CHARS && debounce(fetchData)(inputValue);
  }, [inputValue, fetchData]);

  return (
    <>
      <input
        className="bg-gray-200 p-2 rounded-lg w-64 text-blue-950"
        type="text"
        placeholder="City Name"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      {inputValue.length >= MIN_CITY_CHARS && (
        <ul>
          {cities.map(city => (
            <li key={city.id}>
              <Link href={`/detail/${city.id}`}>
                {city.name}
                {city.state ? `, ${city.state}` : ''} ({city.country})
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
