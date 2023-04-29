import "./WeatherWidget.css";
import { weatherClient } from '../../clients/weatherClient';
import { FC, useEffect, useState } from "react";
import { Weather } from "../../models/Weather";
import "./defaultWeatherIcon.svg";

const defaultWeatherIcon = require("./defaultWeatherIcon.svg") as string;


export const WeatherWidget: FC = () => {
    const [weather, setWeather] = useState<Weather>({ temperature: "Loading", icon: defaultWeatherIcon, location: "Tbilisi" });
    useEffect(() => {
        const fetchWeather = async () => {
            const weatherData = await weatherClient.getWeather();
            setWeather(weatherData);
        }
        fetchWeather();   
    }, []);
    return (
        <div className="divWidget">
            <img src={weather.icon} className="weatherIcon" />
            <span className="weather">{weather.temperature}</span>
            <span className="city">{weather.location}</span>
        </div>
    );

}