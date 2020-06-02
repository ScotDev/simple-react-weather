import React, { Component } from 'react';

class Content extends Component {



    render() {
        const { icon, location, countryCode, temp, feelsLike, type, windSpeed } = this.props.weather;

        return (
            <div className="helper-bg">
                <h1>Current: {temp}°C</h1>
                <h2>Feels like: {feelsLike}°C</h2>
                <h3>{type}</h3><img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt=''></img>
                <h4>Wind: {windSpeed} mph</h4>
                <h5>{location}, {countryCode} <i className="fas fa-map-marker-alt"></i></h5>
            </div>
        )

    }
}

export default Content;