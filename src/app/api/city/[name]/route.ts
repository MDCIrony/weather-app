import CityData from "@/interfaces/city";
import cities from "@/lib/city.list.json"
import { NextResponse, NextRequest } from "next/server";

interface params {
    name: string
}

const Cities= cities as CityData[];
const NUM_SUGGESTIONS = 4;


function searchCities(value: string): CityData[]{
    return Cities.filter(city => 
        city.name.toLocaleLowerCase().startsWith(value.toLocaleLowerCase())
        ).slice(0,NUM_SUGGESTIONS)
}


export async function GET(request: NextRequest, {params}: {params: params}) {
    const cityName = params.name;
    const filteredCities = cityName ? searchCities(cityName) : [];
    return NextResponse.json({cities: filteredCities})
}