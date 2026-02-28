import React, { useEffect, useState, useRef } from 'react'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import humidity_icon from '../assets/humidity.png'
import wind_icon from '../assets/wind.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import './Weather.css'

// Define the shape of your weather data
interface WeatherDataType {
  humidity: number;
  windspeed: number;
  temperature: number;
  location: string;
  icon: string;
}

const Weather = () => {
    // 1. Properly type the Ref
    const inputRef = useRef<HTMLInputElement>(null);

    // 2. Properly type the State
    const [weatherdata, setweatherdata] = useState<WeatherDataType | false>(false);

    // 3. Properly type the Icon mapping keys
    const allIcons: Record<string, string> = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    }

    // 4. Add type for 'city' parameter
    const search = async (city: string) => {
        if (city === "") {
            alert("Enter City Name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();
            
            if (!response.ok) {
                alert(data.message);
                return;
            }

            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            
            setweatherdata({
                humidity: data.main.humidity,
                windspeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            });
        } catch (error) {
            console.error("Error fetching weather data", error);
        }
    }

    useEffect(() => {
        search("London");
    }, []);

    return (
        <div className='weather'>
            <div className='search-bar'>
                <input ref={inputRef} type='text' placeholder='Search' />
                {/* 5. Use optional chaining for the ref value */}
                <img 
                    src={search_icon} 
                    alt='search' 
                    onClick={() => search(inputRef.current?.value || "")} 
                />
            </div>

            {weatherdata ? (
                <>
                    <img src={weatherdata.icon} alt='weather' className='weather-icon' />
                    <p className='temperature'>{weatherdata.temperature}°C</p>
                    <p className='location'>{weatherdata.location}</p>

                    <div className='weather-data'>
                        <div className='col'>
                            <img src={humidity_icon} alt='humidity' />
                            <div>
                                <p>{weatherdata.humidity}%</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className='col'>
                            <img src={wind_icon} alt='wind' />
                            <div>
                                <p>{weatherdata.windspeed} Km/h</p>
                                <span>Wind Speed</span>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    )
}

export default Weather;