import React from 'react'

export default function Results(props) {
    const data = props.weatherData;

    // Sets weather icon class
    let icon_class;
    if (props.weatherData.cod !== "404" && props.weatherData) {
        switch (data.weather[0].main) {
            case 'Rain':
                icon_class = 'heavy-showers';
                break;
            case 'Clear':
                icon_class = 'sun';
                break;
            case 'Clouds':
                icon_class = 'cloudy-2';
                break;
            case 'Thunderstorm':
                icon_class = 'thunderstorms';
                break;
            case 'Mist':
                icon_class = 'mist';
                break;
            case 'Fog':
                icon_class = 'foggy';
                break;
            case 'Haze':
                icon_class = 'haze';
                break;
            case 'Snow':
                icon_class = 'snowy';
                break;
            case 'Drizzle':
                icon_class = 'drizzle';
                break;
            default:
                icon_class = 'sun';
        }
    }

    // Sets temperature icon class

    let temp_class;
    if (props.weatherData.cod !== "404" && props.weatherData) {
        let tempAsNumber = parseInt(data.main.temp);
        if (tempAsNumber > 25) {
            temp_class = 'fire';
        }
        else if (tempAsNumber < 25 & tempAsNumber > 15) {
            temp_class = 'blaze'
        } else {
            temp_class = 'temp-cold';
        }
    }
    if (props.isLoading) {
        return null
    }
    if (props.weatherData.cod !== "404" && props.weatherData) {
        return (<><div className="results" >
            <h1>{data.main.temp.toString()}°C <i id="temp-icon" className={`ri-${temp_class}-line`}></i></h1>
            <h2>{props.langVals.feelsLike.toString()}{data.main.feels_like.toString()}°C</h2>
            <h3>{data.weather[0].description}</h3><i id="weather-icon" className={`ri-${icon_class}-line`}></i>
            <h4>{data.wind.speed.toString()} mph <i id="wind-icon" className="ri-windy-line"></i></h4>
            <h5>{data.name}, {data.sys.country} <i id="map-icon" className="ri-map-pin-2-line"></i></h5>
        </div>

        </>)
    } else {
        return null
    }
}
