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

const Weather = () => {
    const inputRef = useRef()
    const [weatherdata,setweatherdata]=useState(false)
    const allIcons={
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
    const search= async(city)=>{
        if (city === "") {
        alert("Enter City Name");
        return;
    }
        try{
            const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response=await fetch(url);
            const data= await response.json();
            
            const icon=allIcons[data.weather[0].icon]||clear_icon;
            setweatherdata({
                humidity:data.main.humidity,
                windspeed:data.wind.speed,
                temperature:Math.floor(data.main.temp),
                location:data.name,
                icon: icon
            })
        }
        catch(error){

        }
    }
    useEffect(()=>{
        search("London")
    },[])
  return (
    <div className='weather'>
      {/* Search Section */}
      <div className='search-bar'>
        <input ref={inputRef} type='text' placeholder='Search'/>
        <img src={search_icon} alt='search' onClick={() => search(inputRef.current.value)}/>
      </div>

      {/* Main Weather Display */}
      {weatherdata ? <>
      <img src={weatherdata.icon} alt='weather' className='weather-icon'/>
      <p className='temperature'>{weatherdata.temperature}°C</p>
      <p className='location'>{weatherdata.location}</p>

      {/* Bottom Data Section */}
      <div className='weather-data'>
        <div className='col'>
          <img src={humidity_icon} alt='humidity'/>
          <div>
            <p>{weatherdata.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className='col'>
          <img src={wind_icon} alt='wind'/>
          <div>
            <p>{weatherdata.windspeed}Km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
      </> : <></>}
    </div>
  )
}

export default Weather