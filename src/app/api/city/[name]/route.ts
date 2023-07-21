import { NextResponse, NextRequest } from 'next/server';
import { searchCities } from '@/lib/city/utils';

interface params {
  name: string;
}

export async function GET(request: NextRequest, { params }: { params: params }) {
  const cityName = params.name;
  const filteredCities = cityName ? searchCities(cityName) : [];
  return NextResponse.json({ cities: filteredCities });
}
