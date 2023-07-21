import Link from 'next/link';
import getWeatherData from '@/services/remote/getWeatherData';

interface Params {
  params: { city_id: string };
}

export default async function Detail({ params }: Params): Promise<React.ReactElement> {
  const weatherInfo = await getWeatherData(params.city_id);
  return (
    <>
      <main>
        <div className="container">
          <Link href={'/'}>&larr; Home</Link>
          {weatherInfo && (
            <h1>
              {weatherInfo.city.name} ({weatherInfo.city.country})
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
