import React, { Component } from 'react';

// import _Rain from '../img/weather-icon/10n.svg';

class Content extends Component {

    render() {

        const { location, countryCode, temp, feelsLike, type, windSpeed } = this.props.weather;


        // Sets weather icon class
        let icon_class;
        switch (type) {
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
        // Sets temperature icon class
        let tempAsNumber = parseInt(temp);
        let temp_class;
        if (tempAsNumber > 20) {
            temp_class = 'fire';
        }
        else if (tempAsNumber < 20 & tempAsNumber > 10) {
            temp_class = 'blaze'
        } else {
            temp_class = 'temp-cold';
        }



        return (
            <div className="helper-bg" >
                <h1>Current: {temp}°C <i className={`temp-icon ri-${temp_class}-line`}></i></h1>
                <h2>Feels like: {feelsLike}°C <i className={`temp-icon ri-${temp_class}-line`}></i></h2>
                <h3>{type}</h3><i id="weather-icon" className={`ri-${icon_class}-line`}></i>
                <h4>Wind: {windSpeed} mph <i id="wind-icon" className="ri-windy-line"></i></h4>
                <h5>{location}, {countryCode} <i id="map-icon" className="ri-map-pin-line"></i></h5>
            </div>
        )

    }
}

export default Content;