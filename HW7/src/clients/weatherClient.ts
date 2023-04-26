let coordinates = [41.716667, 44.783333];
const URL = "http://api.weatherapi.com/v1/current.json"
const API_KEY = "f8c3dc5311f44fd8a98141433231804";

type Temperature = string;
type Icon = string;
type Location = string;

function getCoordinates(): Promise<GeolocationPosition> {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

export const weatherClient = {
    getWeather: async function(): Promise<[Temperature, Icon, Location]> {
        if ("geolocation" in navigator) {
            let position = await getCoordinates();
            coordinates = [position.coords.latitude, position.coords.longitude];
        }
        const coordinateString = `${coordinates[0]},${coordinates[1]}`
        const query = `?key=${API_KEY}&q=${coordinateString}&aqi=no`;
        
        const response = await fetch(URL + query);
        const data = await response.json();
        return [data.current.temp_c, data.current.condition.icon, data.location.name];
    }
} 