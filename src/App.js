import React, { Component } from 'react';
import axios from 'axios';
import './styles.min.css'

import Content from './components/Content';
const secret = process.env.REACT_APP_SECRET;

class App extends Component {
  state = { randomNumberTo2: '', randomNumberTo7: '', errorMsg: '', showClass: '', hideClass: 'hide', query: null, location: '', countryCode: '', temp: '', feelsLike: '', type: '', windSpeed: '', typeClassName: '' };

  getData = () => axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.query}&appid=${secret}&units=metric`).then(res => {
    this.setState({ hideClass: null, location: res.data.name, temp: res.data.main.temp.toFixed(1), feelsLike: res.data.main.feels_like.toFixed(1), type: res.data.weather[0].main, windSpeed: res.data.wind.speed.toFixed(1), countryCode: res.data.sys.country, typeClassName: res.data.weather[0].main.toLowerCase() });
  })
    .catch((error) => {
      if (error.response) {
        this.showError();
      }
    });

  showError = () => {
    this.setState({ showClass: 'show' });
    this.setState({ errorMsg: 'Location not found' })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.query.value.length < 1 | e.target.query.value.startsWith(' ')) {
      this.setState({ showClass: "show" });
      this.setState({ errorMsg: 'Please enter a location' })
    } else {
      this.setState({ showClass: null });
      this.getData();
      document.title = `theweather.xyz | ${this.state.query}`
    }
  };

  handleInputChange = e => this.setState({ [e.target.name]: e.target.value });

  bgRandomiser = () => {
    const randomNumberTo7 = Math.floor(Math.random() * 7);
    const randomNumberTo2 = Math.floor(Math.random() * 2);
    this.setState({ randomNumberTo7: randomNumberTo7 })
    this.setState({ randomNumberTo2: randomNumberTo2 })
  };

  componentDidMount() {
    this.bgRandomiser()
  };

  render() {

    const { randomNumberTo7, randomNumberTo2, errorMsg, showClass, typeClassName, hideClass } = this.state;
    return (
      <div className="App">
        <div className={`container bg default-bg-${randomNumberTo7} weather-bg-${typeClassName}-${randomNumberTo2}`}>
          <form className={`${showClass}`} onSubmit={this.handleSubmit}>
            <input type="text" name="query" placeholder="Enter a location" value={this.state.value} onChange={this.handleInputChange}></input>
            <div id="warning" className={`warning hide ${showClass}`}>{errorMsg}</div>
            <button className="button">Search</button>
          </form>
          <div className={`${hideClass}`}>
            <Content weather={this.state}></Content>
          </div>
          <div className="credits"><a href="https://github.com/ScotDev" rel="noopener noreferrer" target="_blank"
          >Created by ScotDev <i className="ri-github-fill"></i></a></div>
        </div>
      </div>
    );
  }

}

export default App;