import { cities } from '@/lib/city';
import CityData from '@/interfaces/city';

const Cities = cities as CityData[];
const NUM_SUGGESTIONS = 5;

export function searchCities(value: string): CityData[] {
  return Cities.filter(city =>
    city.name.toLocaleLowerCase().startsWith(value.toLocaleLowerCase())
  ).slice(0, NUM_SUGGESTIONS);
}

export function getCityById(cityId: string): CityData | undefined {
  const city: CityData | undefined = Cities.find(city => city.id.toString() === cityId);

  if (!city) {
    throw new Error('City not found');
  }

  return city;
}
