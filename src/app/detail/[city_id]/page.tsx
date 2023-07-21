import Link from 'next/link';
import Image from 'next/image';
import getWeatherData from '@/services/remote/getWeatherData';

interface Params {
  params: { city_id: string };
}

export default async function Detail({ params }: Params): Promise<React.ReactElement> {
  const weatherInfo = await getWeatherData(params.city_id);
  const iconUrl = `https://openweathermap.org/img/wn/${weatherInfo.weather.weather[0].icon}@2x.png`;
  return (
    <>
      <main className="mt-5 mx-5">
        <h1 className="text-xl font-medium mb-4">WeatherWise</h1>
        <Link href="/" className="text-sm">
          &larr; Home
        </Link>
        <div className="py-5">
          <div className="bg-blue-500 rounded p-4">
            <div className="grid grid-cols-2">
              {weatherInfo && (
                <>
                  <div>
                    <h2 className="text-2xl mb-4 text-white">
                      {weatherInfo.city.name} ({weatherInfo.city.country})
                    </h2>
                    <span className="font-medium text-lg text-white">
                      {weatherInfo.weather.main.temp_max.toFixed(0)}&deg;C
                    </span>
                    <span className="text-gray-300 text-sm">
                      {weatherInfo.weather.main.temp_min.toFixed(0)}&deg;C
                    </span>
                  </div>

                  <div className="justify-self-end">
                    <Image
                      src={iconUrl}
                      width={60}
                      height={60}
                      alt={`${weatherInfo.city.name} Weather Icon`}
                    />
                    <div className="text-white text-sm">
                      {weatherInfo.weather.weather[0].description}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
