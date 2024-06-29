import React, { useState, useEffect } from 'react';

const Weather = () => {
  const [weather, setWeather] = useState(null); // Store weather data
  const [error, setError] = useState(null); // Store error data

  const handleGetWeather = async () => {
    const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your OpenWeatherMap API key
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Odivelas&appid=${apiKey}&units=metric`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const weatherData = await response.json();
      setWeather(weatherData);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    handleGetWeather(); // Fetch weather data on component mount
  }, []);

  return (
    <div>
      <button onClick={handleGetWeather}>Get Weather</button>
      {error && <p>{error}</p>}
      {weather && (
        <div>
          <h2>Weather in {weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
