'use client';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import CityData from '@/interfaces/city';
import getCitiesRecomendation from '@/services/getCitiesRecomendation';
import { debounce } from '@/utils';

const MIN_CITY_CHARS = 2;

export default function SearchBox(): React.ReactElement {
  const [inputValue, setInputValue] = useState<string>('');
  const [cities, setCities] = useState<CityData[]>([]);
  const fetchData = useCallback(getCitiesRecomendation, []);

  useEffect(() => {
    inputValue.length >= MIN_CITY_CHARS && debounce(fetchData)(inputValue, setCities);
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
