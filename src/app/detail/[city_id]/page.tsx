import { getCityById } from '@/lib/city/utils';
import getWeatherData from '@/services/getWeatherData';
import Link from 'next/link';

interface Params {
  params: { city_id: string };
}

export default async function Detail({ params }: Params): Promise<React.ReactElement> {
  const cityInfo = await getCityById(params.city_id);
  const weatherInfo = cityInfo && (await getWeatherData(cityInfo));
  return (
    <>
      <main>
        <div className="container">
          <Link href={'/'}>&larr; Home</Link>
          {cityInfo && (
            <h1>
              {cityInfo.name} ({cityInfo.country})
            </h1>
          )}
          {weatherInfo && (
            <>
              <h2>
                {weatherInfo.weather.main.temp_max.toFixed(0)}&deg;C{' '}
                {weatherInfo.weather.main.temp_min.toFixed(0)}&deg;C
              </h2>
              <div>{weatherInfo.weather.weather[0].description}</div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
