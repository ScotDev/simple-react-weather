import React, { Component } from 'react';

class Content extends Component {



    render() {
        const { icon, location, countryCode, temp, feelsLike, type, windSpeed } = this.props.weather;

        return (
            <div className="helper-bg">
                <h1>{location}, {countryCode} <i className="fas fa-map-marker-alt"></i></h1>
                <h2>Current: {temp}°C</h2>
                <h3>Feels like: {feelsLike}°C</h3>
                <h4>{type}</h4><img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt=''></img>
                <h5>Wind: {windSpeed} mph</h5>
            </div>
        )

    }
}

export default Content;