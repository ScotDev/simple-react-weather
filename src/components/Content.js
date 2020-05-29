import React, { Component } from 'react';
import axios from 'axios';

class Content extends Component {
    state = { location: '', countryCode: '', temp: '', feelsLike: '', type: '', windSpeed: '', icon: '', typeClassName: '' }

    componentDidMount() {
        const secret = 'b67ac96df4ea94db13c759467a804770';
        // const secret = process.env.REACT_APP_SECRET

        let searchLocation = 'Edinburgh'

        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchLocation}&appid=${secret}&units=metric`).then(res => {
            console.log(res);
            this.setState({ location: res.data.name, temp: res.data.main.temp.toFixed(1), feelsLike: res.data.main.feels_like.toFixed(1), type: res.data.weather[0].main, icon: res.data.weather[0].icon, windSpeed: res.data.wind.speed, countryCode: res.data.sys.country, typeClassName: res.data.weather[0].main.toLowerCase() });
        })
            .catch(error => {
                console.log(error)
            });

    };

    componentDidUpdate() {
        document.getElementById('favicon').href = `https://openweathermap.org/img/wn/${this.state.icon}@2x.png`
        document.title = `theweather.xyz | ${this.state.location}`
    };

    render() {
        const { icon, location, countryCode, temp, feelsLike, type, windSpeed, typeClassName } = this.state;

        return (
            <div id="bg" className={`container ${typeClassName}`}>
                <span><h1>{location}, {countryCode} <i className="fas fa-map-marker-alt"></i></h1></span>
                <span><h2>Current temperature: {temp}°C</h2></span>
                <span><h3>Feels like: {feelsLike}°C</h3></span>
                <span><h4>{type}</h4><img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt=''></img></span>
                <span><h5>Wind: {windSpeed} mph</h5></span>
                <div className="credits"><a href="https://github.com/ScotDev" rel="noopener noreferrer" target="_blank"
                >Created by ScotDev <i className="fab fa-github"></i></a></div>
            </div>
        )

    }
}

export default Content;