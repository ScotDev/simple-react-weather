import React, { Component } from 'react';
import axios from 'axios';

class Content extends Component {
    state = { location: '', countryCode: '', temp: '', feelsLike: '', type: '', windSpeed: '', icon: '', typeClassName: '' }

    componentDidMount() {
        let lat = '55.95';
        let lon = '-3.15';

        axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=metric`).then(res => {
            console.log(res)
            this.setState({ location: res.data.name, temp: res.data.main.temp.toFixed(1), feelsLike: res.data.main.feels_like.toFixed(1), type: res.data.weather[0].main, icon: res.data.weather[0].icon, windSpeed: res.data.wind.speed, countryCode: res.data.sys.country, typeClassName: res.data.weather[0].main.toLowerCase() })
        })

    }

    componentDidUpdate() {
        document.getElementById('favicon').href = `http://openweathermap.org/img/wn/${this.state.icon}@2x.png`
    }

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