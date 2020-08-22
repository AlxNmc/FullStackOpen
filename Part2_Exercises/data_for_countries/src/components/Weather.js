import React, { useState, useEffect } from 'react'
import Axios from 'axios'

const Weather = ({location}) => {
    const [weatherData, setWeatherData] = useState({})

    const params = {
        access_key: process.env.REACT_APP_API_KEY,
        query: location
    }

    useEffect(()=> {
        Axios.get('http://api.weatherstack.com/current', {params})
        .then(response => {
            console.log("weather state updated")
            setWeatherData(response.data)
        }).catch(error => {
            console.log("weather state invalid");
            setWeatherData(null)
          });
    }, [location])

    console.log(weatherData)
    if(weatherData.current != null){
        return (
            <div>
                <h2>Weather in {location}</h2>
                <p>
                    <b>temperature:</b> {weatherData.current.temperature} Celsius
                </p>
                <img src={weatherData.current.weather_icons[0]} alt="weather" width="100"/>
                <p>
                    <b>wind:</b> {weatherData.current.wind_speed}mph {weatherData.current.wind_dir}
                </p>

            </div>
        )
    }
    else return <div></div>
}

export default Weather