"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Droplets, Search, Thermometer, Wind } from "lucide-react";
import { getWeatherData } from "./actions";
import type { WeatherData } from "@/types/weather";
import { Card, CardContent } from "@/components/ui/card";
import { useFormStatus } from "react-dom";

function SubmitButton() {
const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      <Search className="w-4 h-4" />
    </Button>
  );
}

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>("null");

  const handleSearch = async (formData: FormData) => {
    setError("")
  const city = formData.get("city") as string;
  const { data, error: weatherError } = await getWeatherData(city);
   
    if(weatherError) {
      setError(weatherError);
      setWeather(null);
    }

  if (data) {
      setWeather(data);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-blue-500 flex items-center justify-center">
      <div className="w-full max-w-md space-y-4">
        <form action={handleSearch} className="flex gap-2">
          <Input
            name="city"
            type="text"
            placeholder="Enter city name"
            className="bg-white/90"
            required
          />
          <SubmitButton />
        </form>


      {error && (
        <div className="text-center text-red-200 bg-red-500/20 rounded-md p-2">
          {error}
        </div>
      )}

        {weather && (
          <div>
            <Card className="bg-white/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="mb-4 text-center">
                  <h2>{weather.name}</h2>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                      alt={weather.weather[0].description}
                      width={64}
                      height={64}
                    />
                    <div>{Math.round(weather.main.temp)}°C</div>
                  </div>
                  <div className="text-gray-500 mt-1 capitalize">
                    {weather.weather[0].description}
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <Thermometer className="mx-auto h-6 w-6 text-orange-500" />
                    <div className="mt-2 text-sm text-gray-500">Feels like</div>
                    <div className="font-semibold">
                      {Math.round(weather.main.feels_like)}°C
                    </div>
                  </div>
                  <div className="text-center">
                    <Droplets className="mx-auto h-6 w-6 text-blue-500" />
                    <div className="mt-2 text-sm text-gray-500">Humidity</div>
                    <div className="font-semibold">
                      {Math.round(weather.main.humidity)}%
                    </div>
                  </div>
                  <div className="text-center">
                    <Wind className="mx-auto h-6 w-6 text-orange-500" />
                    <div className="mt-2 text-sm text-gray-500">Wind Speed</div>
                    <div className="font-semibold">
                      {Math.round(weather.wind.speed)} m/s
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
