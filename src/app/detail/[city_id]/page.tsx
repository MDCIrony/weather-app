import Link from 'next/link';
import Image from 'next/image';
import getWeatherData from '@/services/remote/getWeatherData';
import { Fragment } from 'react';

interface Params {
  params: { city_id: string };
}

export default async function Detail({ params }: Params): Promise<React.ReactElement> {
  const weatherInfo = await getWeatherData(params.city_id);
  const iconUrl = `https://openweathermap.org/img/wn/${weatherInfo.weather.weather[0].icon}@2x.png`;
  return (
    <>
      <main>
        <div className="container">
          <Link href={'/'}>&larr; Home</Link>
          {weatherInfo && (
            <Fragment>
              <h1>
                {weatherInfo.city.name} ({weatherInfo.city.country})
              </h1>
              <h2>
                {weatherInfo.weather.main.temp_max.toFixed(0)}&deg;C{' '}
                {weatherInfo.weather.main.temp_min.toFixed(0)}&deg;C
              </h2>
              <div>{weatherInfo.weather.weather[0].description}</div>
              <Image
                src={iconUrl}
                width={50}
                height={50}
                alt={`${weatherInfo.city.name} Weather Icon`}
              />
            </Fragment>
          )}
        </div>
      </main>
    </>
  );
}
