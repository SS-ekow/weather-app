'use client'

import Navbar from "@/components/navbar";
import Image from "next/image";
import { useQuery } from "react-query";
import axios from "axios";
import { format, parseISO } from "date-fns";
interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherInfo[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

interface WeatherInfo {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}



export default function Home() {

  const {isLoading, error, data}= useQuery<WeatherData>(
    'repoData',
     async ()=>
  {
    const {data} = await axios.get('https://api.openweathermap.org/data/2.5/forecast?q=accra&appid=fcc2bc7ae0293ef2b46ff62bc9755a22&cnt=5'
    );
    return data;
  }   
  );

  const firstData= data?.list[0]

   console.log('data', data);
   if (isLoading) return (
    <div className="flex items-center min-h-screen justify-center">
      <p className="animate-bounce">Loading...</p>
    </div>
   );


  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar/>
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        {/* today data section */}
        <section className="today">
          <div>
            <h2 className="flex gap-1 text-2xl items-end">
               <p className="text-lg">{format(parseISO(firstData?.dt_txt ?? ""), "EEEE")}</p>
               <p className="text-lg">({format(parseISO(firstData?.dt_txt ?? ""), "dd.MM.yyyy")})</p>
            </h2>
          </div>

        </section>

        {/* seven day forecast data */}
        <section className="forecast"></section>
      </main>
      
    </div>
  );
}
