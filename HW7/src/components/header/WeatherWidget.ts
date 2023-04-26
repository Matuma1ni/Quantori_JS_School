import './WeatherWidget.css';
import { weatherClient } from '../../clients/weatherClient';

export async function WeatherWidget(): Promise<HTMLElement> {
    const divWidget = document.createElement("div");
    divWidget.classList.add("divWidget");
    const weather = await weatherClient.getWeather();
    const weatherSpan = document.createElement("span");
    weatherSpan.innerHTML = `${weather[0]}°`;
    weatherSpan.classList.add("weather");
    const weatherIcon = document.createElement("img");
    weatherIcon.classList.add("weatherIcon");
    weatherIcon.setAttribute("src", weather[1]);
    const city = weather[2];
    const citySpan = document.createElement("span");
    citySpan.classList.add("city");
    citySpan.innerHTML = city;
    divWidget.append(weatherIcon, weatherSpan, citySpan);
    return divWidget;
}