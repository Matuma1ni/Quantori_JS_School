import "./WeatherWidget.css";
import { weatherClient } from '../../clients/weatherClient';
import { FC, useEffect, useState } from "react";
import { Weather } from "../../models/Weather";
import {ReactComponent as DefaultIcon} from "./assets/defaultWeatherIcon.svg";

export const WeatherWidget: FC = () => {
    const [weather, setWeather] = useState<Weather>({ temperature: "Loading", icon: null, location: "Tbilisi" });
    useEffect(() => {
        const fetchWeather = async () => {
            const weatherData = await weatherClient.getWeather();
            setWeather(weatherData);
        }
        void fetchWeather();   
    }, []);
    return (
        <div className="divWidget">
            {weather.icon ? <img src={weather.icon} className="weatherIcon" />: <DefaultIcon className="defaultWeatherIcon"/>}
            <span className="weather">{weather.temperature}°</span>
            <span className="city">{weather.location}</span>
        </div>
    );

}