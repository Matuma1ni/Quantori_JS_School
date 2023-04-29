import {Weather} from "../models/Weather";

const URL = "http://api.weatherapi.com/v1/current.json"
const API_KEY = "f8c3dc5311f44fd8a98141433231804";


function getCoordinates(): Promise<GeolocationPosition> {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

export const weatherClient = {
    getWeather: async function(): Promise<Weather> {
        let coordinates: number[] = [];
        if ("geolocation" in navigator) {
            try {
                let position = await getCoordinates();
                coordinates = [position.coords.latitude, position.coords.longitude];
            } catch (error) {
                coordinates = [41.716667, 44.783333]
            }
        }
        const coordinateString = `${coordinates[0]},${coordinates[1]}`
        const query = `?key=${API_KEY}&q=${coordinateString}&aqi=no`;
        
        const response = await fetch(URL + query);
        const data = await response.json();
        return {temperature: data.current.temp_c, 
            icon: data.current.condition.icon, 
            location: data.location.name};
    }
} 