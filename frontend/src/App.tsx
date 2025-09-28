import React, { useState } from 'react';
import { Search, CloudRain, Sun, Cloud, CloudSnow, AlertCircle } from 'lucide-react';

interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  icon: string;
}

interface WeatherError {
  error: string;
}

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  const getWeatherIcon = (iconCode: string) => {
    if (iconCode.startsWith('01')) return <Sun className="w-16 h-16 text-yellow-500" />;
    if (iconCode.startsWith('02') || iconCode.startsWith('03') || iconCode.startsWith('04')) return <Cloud className="w-16 h-16 text-gray-500" />;
    if (iconCode.startsWith('09') || iconCode.startsWith('10')) return <CloudRain className="w-16 h-16 text-blue-500" />;
    if (iconCode.startsWith('13')) return <CloudSnow className="w-16 h-16 text-blue-200" />;
    return <Cloud className="w-16 h-16 text-gray-500" />;
  };

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const response = await fetch(`${API_BASE_URL}/weather?city=${encodeURIComponent(city.trim())}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch weather data');
      }

      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-4">
      <div className="max-w-md mx-auto pt-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Weather App</h1>
          <p className="text-blue-100">Get current weather for any city</p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name..."
              className="w-full px-4 py-3 pr-12 rounded-lg border-0 focus:ring-4 focus:ring-blue-300 focus:outline-none text-gray-700 shadow-lg"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !city.trim()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white p-2 rounded-md transition-colors duration-200 disabled:cursor-not-allowed"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-lg shadow-xl p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading weather data...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-4">
            <div className="flex items-center">
              <AlertCircle className="w-6 h-6 text-red-500 mr-3" />
              <div>
                <h3 className="text-red-800 font-semibold">Error</h3>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Weather Display */}
        {weather && (
          <div className="bg-white rounded-lg shadow-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{weather.city}</h2>
            
            <div className="flex justify-center mb-4">
              {getWeatherIcon(weather.icon)}
            </div>
            
            <div className="mb-4">
              <span className="text-5xl font-bold text-gray-800">{weather.temperature}</span>
              <span className="text-2xl text-gray-600">°C</span>
            </div>
            
            <p className="text-xl text-gray-600 capitalize">{weather.description}</p>
            
            <button
              onClick={fetchWeather}
              className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center mx-auto"
            >
              <Search className="w-4 h-4 mr-2" />
              Refresh
            </button>
          </div>
        )}

        {/* Instructions */}
        {!weather && !loading && !error && (
          <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Welcome!</h3>
            <p className="text-gray-600">Enter a city name above to get the current weather conditions.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;