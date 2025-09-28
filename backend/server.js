const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Weather endpoint
app.get('/weather', async (req, res) => {
  try {
    const { city } = req.query;
    
    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }

    const API_KEY = process.env.OPENWEATHER_API_KEY;
    
    if (!API_KEY) {
      return res.status(500).json({ error: 'Weather API key not configured' });
    }

    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    const weatherData = weatherResponse.data;
    
    const cleanedData = {
      city: weatherData.name,
      temperature: Math.round(weatherData.main.temp),
      description: weatherData.weather[0].description,
      icon: weatherData.weather[0].icon
    };

    res.json(cleanedData);

  } catch (error) {
    console.error('Weather API Error:', error.message);
    
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ error: 'City not found' });
    }
    
    if (error.response && error.response.status === 401) {
      return res.status(500).json({ error: 'Invalid API key' });
    }
    
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Weather API is running' });
});

app.listen(PORT, () => {
  console.log(`Weather API server running on port ${PORT}`);
});