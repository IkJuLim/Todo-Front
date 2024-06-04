import React, { useEffect, useState } from 'react';

const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = () => {
    fetch('https://api.weatherapi.com/v1/forecast.json?key=ff9b41622f994b1287a73535210809&q=Seoul&days=3')
      .then(response => response.json())
      .then(data => setWeatherData(data));
  };

  const formattedDateDisplay = (date) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return (new Date(date)).toLocaleDateString('en-US', options);
  };

  return (
    <div className="bg-white shadow rounded-lg p-5 dark:bg-gray-800 w-full">
      <h2 className="font-bold text-gray-800 text-lg dark:text-gray-400">
        {formattedDateDisplay(new Date())}
      </h2>

      {weatherData ? (
        <div>
          <div className="flex mt-4 mb-2">
            <div className="flex-1">
              <div className="text-gray-600 text-sm dark:text-gray-400">
                {weatherData.location.name}, {weatherData.location.region}
              </div>
              <div className="text-3xl font-bold text-gray-800 dark:text-gray-300">
                {weatherData.current.temp_c} &deg;C
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {weatherData.current.condition.text}
              </div>
            </div>
            <div className="w-24">
              <img src={`https:${weatherData.current.condition.icon}`} alt={weatherData.current.condition.text} loading="lazy" />
            </div>
          </div>
          <div className="flex space-x-2 justify-between border-t dark:border-gray-500">
            {weatherData.forecast.forecastday.slice(1).map((forecast, key) => (
              <div key={key} className="flex-1 text-center pt-3">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {`${forecast.date.split('-')[2]}/${forecast.date.split('-')[1]}/${forecast.date.split('-')[0]}`}
                </div>
                <img src={`https:${forecast.day.condition.icon}`} alt={forecast.day.condition.text} loading="lazy" className="mx-auto" />
                <div className="font-semibold text-gray-800 mt-1.5 dark:text-gray-300">
                  {forecast.day.maxtemp_c} &deg;C
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {forecast.day.condition.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="animate-pulse">
          {/* Loading Skeleton */}
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
