// all API data seperated in a new file
const API_KEY = '0ebbb9dcecf51930055acc7f33243e80';

const IconURL = (iconID) => `https://openweathermap.org/img/wn/${iconID}@2x.png`

const WeatherData = async (city, units = 'metric') => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

    const data = await fetch(URL)
        .then((res) => res.json())
        .then((data) => data)

    // object distructuring 

    const {
        weather,
        main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
        wind: { speed }, sys: {country},name, } = data;

    const { description, icon } = weather[0]

    return {
        description,
        IconURL: IconURL(icon),
        temp,
        feels_like,
        temp_min,
        temp_max,
        pressure,
        humidity,
        speed,
        country,
        name
    }
}

export { WeatherData }