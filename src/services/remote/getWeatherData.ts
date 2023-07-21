import CityData from '@/interfaces/city';
import { weatherApiKey, weatherApiUrl } from '@/config';
import { getCityById } from '@/lib/city/utils';

interface returnedData {
  city: CityData;
  weather: WeatherData;
}

export default async function getWeatherData(city_id: string): Promise<returnedData> {
  const cityObj = await getCityById(city_id);

  if (!cityObj) {
    throw new Error('Weather data not found');
  }

  const searchParams = new URLSearchParams();
  Object.entries(cityObj.coord).forEach(([key, value]) =>
    searchParams.append(key, value.toString())
  );
  searchParams.append('appid', weatherApiKey);
  searchParams.append('exclude', 'minutely');
  searchParams.append('units', 'metric');

  const weatherEndpoint = new URL(`${weatherApiUrl}/weather`);
  weatherEndpoint.search = searchParams.toString();
  console.log(weatherEndpoint.href);

  const res = await fetch(weatherEndpoint.href);
  const weatherData: WeatherData = await res.json();

  if (!weatherData) {
    throw new Error('Weather data not found');
  }

  return {
    city: cityObj,
    weather: weatherData,
  };
}
