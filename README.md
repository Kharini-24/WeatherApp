# Weather App

A full-stack weather application built with React (frontend) and Node.js/Express (backend) that fetches real-time weather data from OpenWeatherMap API.

## Features

- 🔍 Search weather by city name
- 🌤️ Display current temperature, weather description, and icon
- 📱 Responsive design for all devices
- ❌ Proper error handling for invalid cities
- 🔄 Loading states and user feedback
- 🔐 Secure API key management with environment variables

## Project Structure

```
weather-app/
├── frontend/          # React application
├── backend/           # Node.js/Express API
└── README.md         # This file
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- OpenWeatherMap API key (free at https://openweathermap.org/api)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```
   OPENWEATHER_API_KEY=your_api_key_here
   PORT=5000
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

The backend will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory:
   ```
   VITE_API_BASE_URL=http://localhost:5000
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

The frontend will run on http://localhost:5173

## API Endpoints

### GET /weather?city={cityname}

Returns weather data for the specified city.

**Response:**
```json
{
  "city": "London",
  "temperature": 15,
  "description": "Clear sky",
  "icon": "01d"
}
```

**Error Response:**
```json
{
  "error": "City not found"
}
```

## Environment Variables

### Backend (.env)
```
OPENWEATHER_API_KEY=your_openweathermap_api_key
PORT=5000
```

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:5000
```

## Getting OpenWeatherMap API Key

1. Go to https://openweathermap.org/api
2. Sign up for a free account
3. Navigate to API Keys section
4. Generate a new API key
5. Add it to your backend `.env` file

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express, Axios
- **API**: OpenWeatherMap API