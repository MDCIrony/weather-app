import CityData from '@/interfaces/city';

interface jsonResponse {
  cities: CityData[];
}

const getCitiesRecomendation = async (
  cityName: string,
  citiesSetter: React.Dispatch<React.SetStateAction<CityData[]>>
) => {
  await fetch(`/api/city/${cityName}`)
    .then(res => res.json())
    .then((data: jsonResponse) => citiesSetter(data.cities))
    .catch(err => console.log(err));
};

export default getCitiesRecomendation;
